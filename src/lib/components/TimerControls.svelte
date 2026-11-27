<script lang="ts">
	import { timer } from '#lib/timer/timer.svelte.js';
	import Icon from './Icon.svelte';

	let { compact = false }: { compact?: boolean } = $props();
</script>

<div class="flex items-center justify-center gap-3">
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
		class={['btn btn-primary', compact ? 'min-w-28' : 'min-h-14 min-w-40 text-lg']}
		onclick={() => timer.toggle()}
	>
		<Icon name={timer.running ? 'pause' : 'play'} />
		{timer.running ? 'Pause' : timer.fresh ? 'Start' : 'Resume'}
	</button>
	<button
		class={['btn btn-quiet px-0', compact ? 'size-11' : 'size-12']}
		onclick={() => timer.skip()}
		aria-label={timer.custom ? 'Restart timer' : 'Skip to next phase'}
	>
		<Icon name="skip" />
	</button>
</div>
