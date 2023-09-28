<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import { feedingCaptions, feedingUnits } from '$lib/intl';
	import type { Feeding, FeedingType, QuantifiedFeedingType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: Feeding }>();

	let quantity: number;
	let comment: string;

	let dialog: HTMLDialogElement;
	$: dialog?.showModal();

	function submit() {
		if (!feedingType) return;
		if (feedingType === 'comment') comment && dispatch('submit', { type: 'comment', comment });
		else quantity && dispatch('submit', { type: feedingType, quantity });

		dialog?.close();
	}
	export let feedingType: QuantifiedFeedingType | 'comment' | undefined = undefined;
</script>

{#if feedingType !== undefined}
	<dialog bind:this={dialog} on:close={() => (feedingType = undefined)}>
		<button on:click={() => dialog.close()} style="right: 0">x</button>
		<h1>{feedingEmojies[feedingType]} {feedingCaptions[feedingType]}</h1>
		<label>
			{#if feedingType === 'comment'}
				<input
					type="text"
					bind:value={comment}
					on:keypress={(e) => e.key === 'Enter' && submit()}
					style="width: 20ch;"
				/>
			{:else}
				<input
					autofocus
					type="number"
					inputmode="numeric"
					bind:value={quantity}
					on:keypress={(e) => e.key === 'Enter' && submit()}
				/>
			{/if}
			{feedingUnits[feedingType]}
		</label>
		<button on:click={submit} disabled={!quantity && !comment}>💾</button>
	</dialog>
{/if}

<style>
	dialog {
		position: fixed;
		align-self: center;
		bottom: 0vh;
		display: flex;
		flex-direction: column;
		text-align: center;
		flex-wrap: wrap;
	}
	dialog::backdrop {
		background-color: rgba(80, 80, 80, 0.8);
	}
	button {
		width: min-content;
		align-self: flex-end;
	}
	input {
		width: 6ch;
	}
</style>
