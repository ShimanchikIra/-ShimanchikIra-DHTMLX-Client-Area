<script>
	import Archive from "./Archive.svelte";
	import LatestVersions from "./LatestVersions.svelte";
	import { getDownloads } from "../services/downloads";
	import {
		changeDownloads,
		getProductNames
	} from "../services/methods.js";
	let isShowArchive = false;
	let allDownloads = [];
	let productNames = [];

	let downloadPromise = getDownloads().then(data => {
		allDownloads = changeDownloads(data);
		productNames = getProductNames(data);
	});

	function hideArchive() {
		isShowArchive = true;
	}

	function showArchive() {
		isShowArchive = false;
	}


</script>

<style>
	.wrap {
		width: 1065px;
		height: 800px;
		padding: 30px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		font-size: 14px;
		line-height: 20px;
		color: #424242;
		text-align: start;
	}
</style>

<div class="wrap">
	<LatestVersions
		downloads={allDownloads}
		products={productNames}
		isShowButton={!isShowArchive}
		on:stateArchive={hideArchive} />
	{#if isShowArchive}
		<Archive
			downloads={allDownloads}
			products={['All Products', ...productNames]}
			on:stateArchive={showArchive} />
	{/if}
</div>