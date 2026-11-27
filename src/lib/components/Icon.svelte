<script lang="ts" module>
	const paths = {
		play: 'M8 5.5v13l10.5-6.5z',
		pause: 'M8 5h3v14H8zM13 5h3v14h-3z',
		reset: 'M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4',
		skip: 'M5 5.5v13l9-6.5zM15.5 5H18v14h-2.5z',
		popout: 'M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
		sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
		moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
		close: 'M6 6l12 12M18 6L6 18',
		plus: 'M12 5v14M5 12h14'
	} as const;

	export type IconName = keyof typeof paths;
</script>

<script lang="ts">
	let { name, class: className = 'size-5' }: { name: IconName; class?: string } = $props();
	const filled = $derived(name === 'play' || name === 'pause' || name === 'skip');
</script>

<svg
	viewBox="0 0 24 24"
	class={className}
	fill={filled ? 'currentColor' : 'none'}
	stroke="currentColor"
	stroke-width={filled ? 0 : 1.8}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={paths[name]} />
</svg>
