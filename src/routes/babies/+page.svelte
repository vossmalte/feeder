<script>
	import { Collection } from 'sveltefire';
</script>

<Collection ref="babies" let:data>
	<ul>
		{#each data as baby}
			<li>
				<a href={baby.id}>
					{baby.name}
				</a>
			</li>
		{/each}
	</ul>
</Collection>
