<script>
	import { page } from '$app/stores';
	import { Collection } from 'sveltefire';
</script>

<Collection ref="babies" let:data>
	<nav>
		<ul>
			{#each data as baby}
				<a href={'../' + baby.id} class:active={baby.id === $page.params.name}>
					<li>
						{baby.name}
					</li>
				</a>
			{/each}
		</ul>
	</nav>
</Collection>
{#key $page.url}
	<slot />
{/key}

<style>
	ul {
		display: flex;
		list-style-type: none;
		padding: 0;
		widows: 100%;
		justify-content: space-around;
		background: lightgrey;
	}
	a {
		background: transparent;
		border-bottom: 1px solid black;
		width: 100%;
		text-align: center;
	}
	.active {
		border-width: 1px 1px 0 1px;
		border-style: solid;
		border-color: black;
		background: white;
	}
</style>
