<script lang="ts">
	import { timer } from '#lib/timer/timer.svelte.js';

	let { compact = false }: { compact?: boolean } = $props();

	const r = 92;
	const circumference = 2 * Math.PI * r;
</script>

<div
	class={[
		'@container relative mx-auto aspect-square',
		compact ? 'w-[min(72vw,calc(100vh-6.5rem))]' : 'w-full max-w-[22rem]'
	]}
>
	<svg viewBox="0 0 200 200" class="size-full -rotate-90" aria-hidden="true">
		<circle cx="100" cy="100" {r} fill="none" class="stroke-surface" stroke-width="7" />
		<circle
			cx="100"
			cy="100"
			{r}
			fill="none"
			class="stroke-accent transition-[stroke-dashoffset] duration-300 ease-linear"
			stroke-width="7"
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference * (1 - timer.progress)}
		/>
	</svg>
	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<p
			class="font-display text-[27cqw] leading-none font-medium tracking-[-0.04em] tabular-nums"
			role="timer"
			aria-label="{timer.clock} left of {timer.label}"
		>
			{timer.clock}
		</p>
		<p class="mt-[3cqw] text-[max(0.8125rem,5cqw)] font-medium text-muted">{timer.label}</p>
	</div>
</div>
