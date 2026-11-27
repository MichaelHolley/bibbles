<script lang="ts">
	import { theme } from '#lib/theme.svelte.js';
	import { timer } from '#lib/timer/timer.svelte.js';
	import TimerControls from './TimerControls.svelte';
	import TimerFace from './TimerFace.svelte';

	let { doc }: { doc: Document } = $props();

	$effect(() => {
		doc.documentElement.dataset.theme = theme.current;
	});

	$effect(() => {
		doc.title = `${timer.clock} · ${timer.label}`;
	});
</script>

<main class="flex min-h-screen flex-col items-center justify-center gap-5 bg-paper p-4 text-ink">
	<TimerFace compact />
	<TimerControls compact />
</main>
