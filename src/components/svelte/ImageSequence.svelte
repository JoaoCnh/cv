<script lang="ts">
  // We know it has 45 frames and Apple pads their URLs with 3 0's before the index of the frame
  const AIRPODS_MAX_FRAMES: string[] = Array.from({ length: 45 }, (_, i) => {
    const paddedIndex = i.toString().padStart(4, '0');
    return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large_2x/large_2x_${paddedIndex}.jpg`;
  });

  interface Props {
    /** Frame URLs. */
    images?: string[];
    /** Height of the scroll section in vh. The longer it is, the slower the frames advance. */
    duration?: number;
    /** Accessible description of the animation. */
    label?: string;
  }

  let {
    images = AIRPODS_MAX_FRAMES,
    duration = 250,
    label = 'AirPods Max turning as you scroll',
  }: Props = $props();

  let section = $state<HTMLElement>();
  let pin = $state<HTMLDivElement>();
  let canvas = $state<HTMLCanvasElement>();

  // plain variables: they never need to trigger a re-render
  let frames: HTMLImageElement[] = [];
  let currentFrame = -1;

  let loaded = $state(0);
  let ready = $state(false);
  let failed = $state(false);
  let isVisible = $state(false);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  function loadImages(urls: string[], onProgress: (loaded: number) => void) {
    let count = 0;

    return Promise.all(
      urls.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              count += 1;
              onProgress(count);
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
  function drawFrame(target: HTMLCanvasElement, image: HTMLImageElement) {
    const context = target.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, target.width, target.height);
    context.drawImage(image, 0, 0);
  }

  // 1. Load every frame before drawing anything
  $effect(() => {
    const urls = images;
    let cancelled = false;

    ready = false;
    failed = false;
    loaded = 0;

    loadImages(urls, (count) => {
      if (!cancelled) loaded = count;
    })
      .then((loadedFrames) => {
        if (cancelled || loadedFrames.length === 0) return;

        frames = loadedFrames;
        currentFrame = -1;

        if (canvas) {
          canvas.width = frames[0].naturalWidth;
          canvas.height = frames[0].naturalHeight;
          drawFrame(canvas, frames[0]);
        }

        ready = true;
      })
      .catch(() => {
        if (!cancelled) failed = true;
      });

    return () => {
      cancelled = true;
    };
  });

  // 2. Know whether any part of the scroll section is on screen
  $effect(() => {
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  });

  // 3. Only while visible: map scroll progress through the section to a frame.
  //    When the section is off screen there is no scroll listener at all.
  $effect(() => {
    if (!ready || !isVisible || !section || !pin || !canvas) return;

    const sectionEl = section;
    const pinEl = pin;
    const canvasEl = canvas;

    let rafId = 0;

    const update = () => {
      rafId = 0;

      const rect = sectionEl.getBoundingClientRect();
      // the pinned box sticks at `top`, so progress starts once the section reaches it
      const pinTop = parseFloat(getComputedStyle(pinEl).top) || 0;
      const range = rect.height - pinEl.offsetHeight;
      const progress = range > 0 ? clamp((pinTop - rect.top) / range, 0, 1) : 0;
      const frame = Math.min(
        frames.length - 1,
        Math.floor(progress * frames.length),
      );

      if (frame !== currentFrame) {
        currentFrame = frame;
        drawFrame(canvasEl, frames[frame]);
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
  });
</script>

<section class="seq" bind:this={section} style:height="{duration}vh">
  <div class="seq__pin" bind:this={pin}>
    <canvas bind:this={canvas} class="seq__canvas" role="img" aria-label={label}
    ></canvas>

    {#if !ready && !failed}
      <div class="seq__status" role="status">
        Loading frames… {loaded}/{images.length}
      </div>
    {/if}

    {#if failed}
      <div class="seq__status">Couldn't load the image frames.</div>
    {/if}
  </div>
</section>

<style>
  .seq {
    /* where the frame sticks; keeps it just below the site's sticky header */
    --seq-top: 4rem;

    position: relative;
    margin: 1.5rem 0;
  }

  /* The tall section above creates the scroll distance; this box stays pinned while it passes. */
  .seq__pin {
    position: sticky;
    top: var(--seq-top);
    height: min(calc(100vh - var(--seq-top) - 1rem), 40rem);
    height: min(calc(100svh - var(--seq-top) - 1rem), 40rem);
    overflow: hidden;
    border: 1px solid var(--rule);
    border-radius: 0.75rem;
    /* the product frames have a white background, so the box stays white in dark mode too */
    background: #fff;
  }

  .seq__canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .seq__status {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: #fff;
    color: #555;
    font-size: 0.9rem;
  }
</style>
