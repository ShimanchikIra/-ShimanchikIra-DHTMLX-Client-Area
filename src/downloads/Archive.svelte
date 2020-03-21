<script>
	import { createEventDispatcher } from "svelte";
	import DownloadsTable from "./DownloadsTable.svelte";
	export let downloads;
	export let products;

	let selectedProduct;
	let headersForTable = ["", "Product", "Version", "Release Date"];

	$: filteredProducts = filterDownloadsByName(selectedProduct);

	const dispatch = createEventDispatcher();

	function hideArchive() {
		dispatch("stateArchive", {
			isShowArchive: false,
		});
	}

	function filterDownloadsByName(selected) {
		if (selected === "All Products") return downloads;
		return downloads.filter(item => item.product === selected);
	}
</script>

<style>
	.archive-box {
		width: 425px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #fafafa;
		border-radius: 2px;
		border: 1px solid #eee;
	}
	.archive-box__button {
		background: linear-gradient(0deg, #e3e9f2, #e3e9f2);
		font-weight: 600;
		font-size: 16px;
		border-radius: 2px 2px 0px 0px;
		line-height: 24px;
		color: #202b3c;
		text-align: start;
		cursor: pointer;
	}
	.archive-box__img {
		margin-right: 20px;
	}
	.archive,
	.archive-box__button {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.archive-select {
		width: 100%;
		cursor: pointer;
	}
	.archive-select__option {
		padding: 5px 0;
	}
</style>

<div class="archive-box">
	<button class="archive-box__button" on:click={hideArchive}>
		<img src="arrow-left.png" alt="arrow" class="archive-box__img" />
		Archive Of Previous Versions
	</button>
	<div class="archive">
		<select bind:value={selectedProduct} class="archive-select">
			{#each products as product}
				-->
				<option class="archive-select__option" value={product}>
					{product}
				</option>
			{/each}
		</select>
		<DownloadsTable headers={headersForTable} downloads={filteredProducts} />
	</div>
</div>
