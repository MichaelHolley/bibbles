<script lang="ts">
	import { timer } from '#lib/timer/timer.svelte.js';
	import Icon from './Icon.svelte';

	let {
		compact = false,
		ontoggle = () => timer.toggle()
	}: { compact?: boolean; ontoggle?: () => void } = $props();
</script>

<div class="flex shrink-0 items-center justify-center gap-3 narrow:gap-2">
	{#if !compact}
		<button
			class="btn btn-quiet size-12 px-0"
			onclick={() => timer.reset()}
			disabled={timer.fresh}
			aria-label="Reset timer"
		>
			<Icon name="reset" />
		</button>
	{/if}
	<button
		class={[
			'btn btn-primary',
			compact ? 'min-w-28 narrow:size-11 narrow:min-w-0 narrow:px-0' : 'min-h-14 min-w-40 text-lg'
		]}
		onclick={ontoggle}
		aria-label={timer.running ? 'Pause' : timer.fresh ? 'Start' : 'Resume'}
	>
		<Icon name={timer.running ? 'pause' : 'play'} />
		<span class={[compact && 'narrow:hidden']} aria-hidden="true">
			{timer.running ? 'Pause' : timer.fresh ? 'Start' : 'Resume'}
		</span>
	</button>
	<button
		class={['btn btn-quiet px-0', compact ? 'size-11 tiny:hidden' : 'size-12']}
		onclick={() => timer.skip()}
		aria-label={timer.custom ? 'Restart timer' : 'Skip to next phase'}
	>
		<Icon name="skip" />
	</button>
</div>
