<script lang="ts">
	import { timer } from '#lib/timer/timer.svelte.js';
	import Icon from './Icon.svelte';

	let name = $state('');
	let minutes = $state(10);
	let error = $state('');

	function add(event: SubmitEvent) {
		event.preventDefault();
		if (!timer.addCustom({ name, minutes })) {
			error = 'Pick between 1 and 180 minutes.';
			return;
		}
		error = '';
		name = '';
	}
</script>

<section aria-labelledby="custom-heading" class="rounded-[28px] bg-card p-6 shadow-cozy sm:p-8">
	<h2 id="custom-heading" class="font-display text-2xl font-medium tracking-[-0.02em]">
		Your timers
	</h2>
	<p class="mt-1 text-muted">One-off timers for tea, a stretch or a short nap.</p>

	{#if timer.customs.length}
		<ul class="mt-5 flex flex-wrap gap-2">
			{#each timer.customs as t (t.id)}
				{@const active = timer.custom?.id === t.id}
				<li
					class={[
						'flex items-center rounded-full border transition-colors duration-150',
						active ? 'border-accent bg-accent/10' : 'border-line bg-paper'
					]}
				>
					<button
						class="min-h-11 cursor-pointer rounded-full pr-1 pl-4 text-left"
						onclick={() => timer.selectCustom(t)}
						aria-pressed={active}
					>
						<span class="font-medium">{t.name}</span>
						<span class="ml-1 text-muted tabular-nums">{t.minutes} min</span>
					</button>
					<button
						class="grid size-11 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:text-ink"
						onclick={() => timer.removeCustom(t.id)}
						aria-label="Remove {t.name}"
					>
						<Icon name="close" class="size-4" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<form class="mt-5 grid grid-cols-[1fr_6rem] gap-3 sm:grid-cols-[1fr_6rem_auto]" onsubmit={add}>
		<label class="flex flex-col gap-1.5">
			<span class="text-sm font-medium text-muted">Name</span>
			<input class="field" bind:value={name} maxlength="24" placeholder="Tea" />
		</label>
		<label class="flex flex-col gap-1.5">
			<span class="text-sm font-medium text-muted">Minutes</span>
			<input
				class="field tabular-nums"
				type="number"
				bind:value={minutes}
				min="1"
				max="180"
				required
			/>
		</label>
		<button class="btn btn-quiet col-span-2 self-end sm:col-span-1">
			<Icon name="plus" class="size-4" />
			Add timer
		</button>
	</form>
	{#if error}
		<p class="mt-2 text-sm text-accent" role="alert">{error}</p>
	{/if}
</section>
