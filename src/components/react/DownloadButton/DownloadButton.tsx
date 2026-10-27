import { useEffect, useState } from 'react';
import './DownloadButton.css';

interface Props {
  href: string;
  filename: string;
}

export const DownloadButton = ({ href, filename }: Props) => {
  const [visible, setVisible] = useState(false);

  // Stay out of the way of the masthead; appear once the visitor starts scrolling.
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 200);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <a
      className={`download-cv${visible ? ' is-visible' : ''}`}
      href={href}
      download={filename}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      <span>Download CV</span>
    </a>
  );
};
