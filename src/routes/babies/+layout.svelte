<script>
	import { Collection } from 'sveltefire';
</script>

<Collection ref="babies" let:data>
	<nav>
		<ul>
			{#each data as baby}
				<li>
					<a href={'../' + baby.id}>
						{baby.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</Collection>
<slot />

<style>
	ul {
		display: flex;
		list-style-type: none;
		padding: 0;
		widows: 100%;
		justify-content: space-around;
	}
</style>
