import { useEffect, useRef, useState } from 'react';
import './ImageSequence.css';

// We know it has 45 frames and Apple pads their URLs with 3 0's before the index of the frame
export const AIRPODS_MAX_FRAMES: string[] = Array.from(
  { length: 45 },
  (_, i) => {
    const paddedIndex = i.toString().padStart(4, '0');
    return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large_2x/large_2x_${paddedIndex}.jpg`;
  },
);

interface ImageSequenceProps {
  /** Frame URLs. Keep the array reference stable (module constant), or frames reload on every render. */
  images?: string[];
  /** Height of the scroll section in vh. The longer it is, the slower the frames advance. */
  duration?: number;
  /** Accessible description of the animation. */
  label?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function loadImages(
  urls: string[],
  onProgress: (loaded: number) => void,
): Promise<HTMLImageElement[]> {
  let loaded = 0;

  return Promise.all(
    urls.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loaded += 1;
            onProgress(loaded);
            resolve(img);
          };
          img.onerror = () => reject(new Error(`Failed to load ${src}`));
          img.src = src;
        }),
    ),
  );
}

// The canvas is sized to the frames' natural size once, and CSS (object-fit: contain)
// scales it to the container, so there is no per-frame ratio math to do.
function drawFrame(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
}

export const ImageSequence = ({
  images = AIRPODS_MAX_FRAMES,
  duration = 250,
  label = 'AirPods Max turning as you scroll',
}: ImageSequenceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Load every frame before drawing anything
  useEffect(() => {
    let cancelled = false;

    setReady(false);
    setFailed(false);
    setLoaded(0);

    loadImages(images, (count) => {
      if (!cancelled) setLoaded(count);
    })
      .then((frames) => {
        if (cancelled || frames.length === 0) return;

        framesRef.current = frames;
        currentFrameRef.current = -1;

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = frames[0].naturalWidth;
          canvas.height = frames[0].naturalHeight;
          drawFrame(canvas, frames[0]);
        }

        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [images]);

  // 2. Know whether any part of the scroll section is on screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 3. Only while visible: map scroll progress through the section to a frame.
  //    When the section is off screen there is no scroll listener at all.
  useEffect(() => {
    if (!ready || !isVisible) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!section || !pin || !canvas || frames.length === 0) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;

      const rect = section.getBoundingClientRect();
      // the pinned box sticks at `top`, so progress starts once the section reaches it
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const range = rect.height - pin.offsetHeight;
      const progress = range > 0 ? clamp((pinTop - rect.top) / range, 0, 1) : 0;
      const frame = Math.min(
        frames.length - 1,
        Math.floor(progress * frames.length),
      );

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        drawFrame(canvas, frames[frame]);
      }
    };

    // at most one update per animation frame, however fast scroll events fire
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update(); // jump straight to the right frame if the visitor arrives mid-section
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ready, isVisible]);

  return (
    <section
      className="seq"
      ref={sectionRef}
      style={{ height: `${duration}vh` }}
    >
      <div className="seq__pin" ref={pinRef}>
        <canvas
          ref={canvasRef}
          className="seq__canvas"
          role="img"
          aria-label={label}
        />

        {!ready && !failed && (
          <div className="seq__status" role="status">
            Loading frames… {loaded}/{images.length}
          </div>
        )}

        {failed && (
          <div className="seq__status">Couldn't load the image frames.</div>
        )}
      </div>
    </section>
  );
};
