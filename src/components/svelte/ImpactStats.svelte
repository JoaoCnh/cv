<script lang="ts">
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  interface Stat {
    value: number;
    suffix?: string;
    label: string;
  }

  let { stats }: { stats: Stat[] } = $props();

  // The server-rendered HTML shows the real numbers (good for no-JS, search engines
  // and the PDF). The count-up only starts in the browser, once the island mounts.
  let animating = $state(false);
  const tweens = stats.map(
    () => new Tween(0, { duration: 1600, easing: cubicOut }),
  );

  onMount(() => {
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('print').matches;
    if (skip) return;

    animating = true;
    stats.forEach((stat, i) => {
      tweens[i].target = stat.value;
    });
  });

  const shown = (stat: Stat, i: number) =>
    animating ? Math.round(tweens[i].current) : stat.value;
</script>

<ul class="stats">
  {#each stats as stat, i}
    <li>
      <span class="value" aria-hidden="true"
        >{shown(stat, i)}{stat.suffix ?? ''}</span
      >
      <span class="sr-only">{stat.value}{stat.suffix ?? ''}</span>
      <span class="label">{stat.label}</span>
    </li>
  {/each}
</ul>

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 1rem 2rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }

  .value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }

  .label {
    display: block;
    color: var(--muted);
    font-size: 0.9rem;
  }

  /* screen readers get the final number once, not every animation frame */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media print {
    .stats {
      display: none;
    }
  }
</style>
