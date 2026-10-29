/** @jsxImportSource solid-js */
import { createSignal, For, onMount, Show } from 'solid-js';
import './TechStack.css';

interface Tech {
  name: string;
  path?: string;
  hex?: string;
}

export default function TechStack(props: { stack: Tech[] }) {
  // Hovering a tech highlights it everywhere it appears, across both jobs.
  const [active, setActive] = createSignal<string | null>(null);
  // The server-rendered HTML is fully visible; the entrance animation starts on mount.
  const [ready, setReady] = createSignal(false);

  onMount(() => setReady(true));

  return (
    <div class="tech" classList={{ 'is-ready': ready() }}>
      <ul class="tech__list">
        <For each={props.stack}>
          {(tech, i) => (
            <li
              class="tech__item"
              classList={{
                'is-active': active() === tech.name,
                'is-dim': active() !== null && active() !== tech.name,
              }}
              style={{
                '--i': i(),
                '--brand': tech.hex ? `#${tech.hex}` : 'var(--muted)',
              }}
              onMouseEnter={() => setActive(tech.name)}
              onMouseLeave={() => setActive(null)}
            >
              <Show
                when={tech.path}
                fallback={
                  <span class="tech__glyph" aria-hidden="true">
                    {tech.name.slice(0, 2)}
                  </span>
                }
              >
                <svg class="tech__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={tech.path} />
                </svg>
              </Show>
              <span class="tech__name">{tech.name}</span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
