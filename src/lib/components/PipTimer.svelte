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

<main
	class="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-paper p-3 text-ink short:flex-row short:gap-5 tiny:gap-3"
>
	<div class="short:hidden">
		<TimerFace compact />
	</div>

	<div class="hidden min-w-0 flex-col short:flex">
		<p
			class="font-display text-[clamp(1.75rem,32vh,3.5rem)] leading-none font-medium tracking-[-0.04em] tabular-nums"
			role="timer"
			aria-label="{timer.clock} left of {timer.label}"
		>
			{timer.clock}
		</p>
		<p class="mt-1 truncate text-sm font-medium text-muted tiny:hidden">{timer.label}</p>
	</div>

	<TimerControls compact />

	<div class="absolute inset-x-0 bottom-0 hidden h-1 bg-surface short:block" aria-hidden="true">
		<div
			class="h-full origin-left bg-accent transition-transform duration-300 ease-linear"
			style:transform="scaleX({timer.progress})"
		></div>
	</div>
</main>
