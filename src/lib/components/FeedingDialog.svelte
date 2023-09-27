<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import { feedingCaptions, feedingUnits } from '$lib/intl';
	import type { Feeding, FeedingType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: Feeding }>();

	let quantity: number;

	let dialog: HTMLDialogElement;
	$: dialog?.showModal();

	function submit() {
		if (feedingType && quantity) {
			dispatch('submit', { type: feedingType, quantity });
			dialog?.close();
		}
	}
	export let feedingType: FeedingType | undefined = undefined;
</script>

{#if feedingType !== undefined}
	<dialog bind:this={dialog} on:close={() => (feedingType = undefined)}>
		<button on:click={() => dialog.close()} style="right: 0">x</button>
		<h1>{feedingEmojies[feedingType]} {feedingCaptions[feedingType]}</h1>
		<label>
			<input
				autofocus
				type="number"
				bind:value={quantity}
				on:keypress={(e) => e.key === 'Enter' && submit()}
			/>{feedingUnits[feedingType]}
		</label>
		<button on:click={submit} disabled={!quantity}>💾</button>
	</dialog>
{/if}

<style>
	dialog {
		position: fixed;
		align-self: center;
		top: 0vh;
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
