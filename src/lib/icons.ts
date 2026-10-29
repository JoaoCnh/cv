import * as simpleIcons from 'simple-icons';
import type { Tech } from '../data/cv';

export interface ResolvedTech {
  name: string;
  path?: string;
  hex?: string;
}

type SimpleIcon = { path: string; hex: string };

// simple-icons exports each icon as `si` + the slug with a capital first letter,
// e.g. slug "react" -> siReact, slug "nextdotjs" -> siNextdotjs.
const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
const find = (slug: string) =>
  icons['si' + slug.charAt(0).toUpperCase() + slug.slice(1)];

/**
 * Runs at build time inside Astro, so the whole icon library stays on the server:
 * the browser only receives the few SVG paths it actually needs.
 */
export function resolveStack(stack: Tech[]): ResolvedTech[] {
  return stack.map(({ name, icon }) => {
    const slugs = [icon ?? []].flat();
    const match = slugs.map((slug) => find(slug)).find(Boolean);

    if (!match) {
      console.warn(
        `[icons] no icon found for "${name}", showing a text tile instead`,
      );
      return { name };
    }

    return { name, path: match.path, hex: match.hex };
  });
}
