# Interactive CV

The source code for my personal website: a navigable, always up-to-date CV built with [Astro](https://astro.build).

**Live site:** [JoaoCnh](https://joaocnh.dev)

## What this is

Instead of a static PDF, my CV is a small website you can browse: experience, projects, skills and writing, each a page of its own. 
It started from Astro's blog template and has been reshaped into a CV.

## Built with

- **[Astro](https://astro.build)**: static-first rendering, content collections and file-based routing, so pages ship almost no JavaScript by default
- **Islands architecture**: interactive pieces are hydrated only where they're needed, and Astro lets me mix UI frameworks in a single project:
  - **React**
  - **Svelte**
  - **Solid**
- **TypeScript**
- **pnpm** for package management
- **vitest** for testing

## Why islands?

A CV is mostly content, so most of the site is plain HTML. The few interactive parts (filters, toggles, small widgets) are islands, which also makes this repo a place to compare React, Svelte and Solid side by side on real, small components.

## License

Code is available under the MIT license. The CV content (text and personal details) is my own, so please don't reuse it.