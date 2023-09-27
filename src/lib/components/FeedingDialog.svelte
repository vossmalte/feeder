<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import type { Feeding, FeedingType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: Feeding }>();

	let quantity = 60;

	function submit() {
		if (feedingType && quantity) dispatch('submit', { type: feedingType, quantity });
		feedingType = undefined;
	}
	export let feedingType: FeedingType | undefined;
</script>

{#if feedingType !== undefined}
	<dialog open>
		<button on:click={() => (feedingType = undefined)} style="margin-right: 0">x</button>
		<h1>{feedingEmojies[feedingType]}</h1>
		<input type="number" bind:value={quantity} />
		<button on:click={submit} disabled={!quantity}>💾</button>
	</dialog>
{/if}
