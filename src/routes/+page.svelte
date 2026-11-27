<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import CustomTimers from '#lib/components/CustomTimers.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import TimerControls from '#lib/components/TimerControls.svelte';
	import TimerFace from '#lib/components/TimerFace.svelte';
	import { pip } from '#lib/pip.svelte.js';
	import { theme } from '#lib/theme.svelte.js';
	import { phaseLabels, phases, presets, type PresetId } from '#lib/timer/presets.js';
	import { timer } from '#lib/timer/timer.svelte.js';

	const phaseIndex = $derived(timer.custom ? -1 : phases.indexOf(timer.phase));
	const presetEntries = Object.entries(presets) as [PresetId, (typeof presets)[PresetId]][];

	$effect(() => {
		document.documentElement.dataset.theme = theme.current;
	});

	$effect(() => {
		document.title = timer.running ? `${timer.clock} · ${timer.label}` : 'Bibbles · Pomodoro timer';
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.code !== 'Space' || event.repeat) return;
		const target = event.target as HTMLElement;
		if (target.closest('input, button, textarea, select')) return;
		event.preventDefault();
		timer.toggle();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 sm:px-8">
	<header class="flex h-20 items-center justify-between">
		<div class="flex items-center gap-2.5">
			<img src={favicon} alt="" class="size-8" />
			<span class="font-display text-xl font-medium tracking-[-0.02em]">Bibbles</span>
		</div>
		<button
			class="btn btn-quiet size-11 px-0"
			onclick={() => theme.toggle()}
			aria-label={theme.current === 'oat' ? 'Switch to evening theme' : 'Switch to daytime theme'}
		>
			<Icon name={theme.current === 'oat' ? 'moon' : 'sun'} />
		</button>
	</header>

	<main
		class="grid flex-1 items-start gap-6 pt-4 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pt-10"
	>
		<h1 class="sr-only">Bibbles pomodoro timer</h1>

		<section aria-label="Timer" class="enter rounded-[32px] bg-card p-5 shadow-cozy sm:p-8">
			<div
				class="relative grid grid-cols-2 rounded-full bg-surface p-1"
				role="group"
				aria-label="Phase"
			>
				<span
					class={[
						'absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] rounded-full bg-card shadow-sm transition-[translate,opacity] duration-[240ms] ease-cozy',
						phaseIndex < 0 && 'opacity-0'
					]}
					style:translate="{Math.max(phaseIndex, 0) * 100}% 0"
					aria-hidden="true"
				></span>
				{#each phases as phase, i (phase)}
					<button
						class={[
							'relative min-h-11 cursor-pointer rounded-full px-2 text-sm font-medium transition-colors duration-150 sm:text-base',
							i === phaseIndex ? 'text-ink' : 'text-muted hover:text-ink'
						]}
						aria-pressed={i === phaseIndex}
						onclick={() => timer.selectPhase(phase)}
					>
						{phaseLabels[phase]}
					</button>
				{/each}
			</div>

			<div class="py-8 sm:py-10">
				<TimerFace />
				{#if !timer.custom}
					<p class="mt-4 text-center text-muted">
						Session {timer.session}
					</p>
				{/if}
			</div>

			<TimerControls />

			{#if pip.supported}
				<div class="mt-8 flex justify-center border-t border-line pt-6">
					<button class="btn btn-quiet" onclick={() => (pip.window ? pip.close() : pip.open())}>
						<Icon name="popout" class="size-4" />
						{pip.window ? 'Close floating timer' : 'Float over other tabs'}
					</button>
				</div>
			{/if}
		</section>

		<div class="grid gap-6 lg:gap-8">
			<section
				aria-labelledby="rhythm-heading"
				class="rounded-[28px] bg-card p-6 shadow-cozy sm:p-8"
			>
				<h2 id="rhythm-heading" class="font-display text-2xl font-medium tracking-[-0.02em]">
					Rhythm
				</h2>
				<p class="mt-1 text-muted">Minutes of focus, then a break. It loops until you stop.</p>
				<div class="mt-5 grid gap-3">
					{#each presetEntries as [id, p] (id)}
						{@const active = timer.presetId === id}
						<button
							class={[
								'flex min-h-16 cursor-pointer items-center justify-between rounded-2xl border px-5 text-left transition-[translate,border-color,background-color] duration-150 ease-cozy hover:-translate-y-0.5',
								active ? 'border-accent bg-accent/8' : 'border-line bg-paper hover:border-muted/50'
							]}
							aria-pressed={active}
							onclick={() => timer.selectPreset(id)}
						>
							<span class="font-medium">{p.name}</span>
							<span
								class="flex gap-2 font-display text-lg tabular-nums"
								aria-label="{p.focus} minutes focus, {p.break} minutes break"
							>
								{#each [p.focus, p.break] as n, i (i)}
									{#if i}<span class="text-muted" aria-hidden="true">·</span>{/if}
									<span aria-hidden="true">{n}</span>
								{/each}
							</span>
						</button>
					{/each}
				</div>
			</section>

			<CustomTimers />
		</div>
	</main>

	<footer class="pb-8 text-center text-sm text-muted">
		Press <kbd class="rounded-md bg-surface px-1.5 py-0.5 font-sans">Space</kbd> to start or pause.
	</footer>
</div>
