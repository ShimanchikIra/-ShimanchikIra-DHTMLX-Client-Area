<script>
	import Archive from "./Archive.svelte";
	import LatestVersions from "./LatestVersions.svelte";
	import { getDownloads } from "../services/downloads";
	let isShowArchive = false;
	let allDownloads = [];
	let productNames = [];

	async function getData(url) {
		let response = await fetch(url);
		let data = await response.json();
		return data;
	}

	// let downloadPromise = getDownloads().then(data => {
	// 	allDownloads = chahgeDownloads(data);
	// 	productNames = getProductNames(data);
	// });
	$: downloadPromise = getData("/").then(d => {
		allDownloads = chahgeDownloads(d);
		 productNames = getProductNames(d);
	});

	function hideArchive() {
		//isShowArchive = event.detail.isShowArchive;
		isShowArchive = true;
	}

	function showArchive() {
		//isShowArchive = event.detail.isShowArchive;
		//console.log(event.detail.isShowArchive);
		isShowArchive = false;
	}

	function getProductNames(downloads) {
		let result = [];
		downloads.forEach(element => {
			if (!result.includes(element.product)) {
				result.push(element.product);
			}
		});
		return result;
	}

	function chahgeDownloads(downloads) {
		downloads.map(element => {
			element.isActive = true;
			element.isShowTooltip = false;
			element.released = new Date(element.released);
		});
		return downloads;
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