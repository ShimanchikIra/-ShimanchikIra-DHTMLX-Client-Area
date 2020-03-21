<script>
	import { createEventDispatcher } from "svelte";
	import DownloadsTable from "./DownloadsTable.svelte";
	export let isShowButton = true;
	export let downloads;
	export let products;

	const dispatch = createEventDispatcher();

	let headersForTable = ["", "Product", "Version", "Released On"];

	$: sortedDownloads = [...downloads].sort((a, b) => b.released - a.released);
	$: latestVersions = findLatestVersions(sortedDownloads, products);

	$: groupedByReleasedAndVersion = latestVersions.reduce(
		(currentArr, download, ind, arr) => {
			let hasInCurrentArr = false;
			currentArr.forEach(group => {
				if (
					group.version === download.version &&
					group.released.getTime() === download.released.getTime()
				) {
					hasInCurrentArr = true;
				}
			});
			if (hasInCurrentArr) return currentArr;
			let currentGroup = arr.slice(ind).filter(elm => {
				return (
					elm.version === download.version &&
					elm.released.getTime() === download.released.getTime()
				);
			});
			let newObj = {
				version: download.version,
				released: download.released,
				link: download.moreInfo,
				downloads: currentGroup,
			};
			currentArr.push(newObj);
			return currentArr;
		},
		[]
	);

	function showArchive() {
		dispatch("stateArchive", {
			isShowArchive: true,
		});
	}

	function findLatestVersions(data, products) {
		let result = [];
		products.forEach(product => {
			result.push(data.find(item => item.product === product));
		});
		return result;
	}
</script>

<style>
	.latest-version-box {
		width: 560px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #fafafa;
		border-radius: 2px;
		border: 1px solid #eee;
		text-align: start;
		position: relative;
	}
	.latest-version-box__header {
		background: #1877d3;
		color: #ffffff;
		font-weight: 600;
		font-size: 16px;
		border-radius: 2px 2px 0px 0px;
		font-style: normal;
		line-height: 24px;
	}
	.latest-version,
	.show-archive,
	.latest-version-box__header {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.more-info {
		display: flex;
		justify-content: flex-start;
		color: #1876d2;
	}
	.more-info__version {
		padding: 8px 20px;
		background: #f4f4f4;
		border-radius: 2px;
		font-weight: 600;
		text-align: center;
		box-sizing: border-box;
	}
	.more-info__link {
		padding: 8px 20px;
	}
	.show-archive {
		cursor: pointer;
		background: #e3e9f2;
		position: absolute;
		bottom: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		color: #202b3c;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 0px 0px 2px 2px;
	}
</style>

<div class="latest-version-box">
	<div class="latest-version-box__header">Latest Versions</div>
	{#each groupedByReleasedAndVersion as downloadsObj}
		<div class="latest-version">
			<div class="more-info">
				<div class="more-info__version">{downloadsObj.version}</div>
				<a href={downloadsObj.link} class="more-info__link">
					Read details &#8594;
				</a>
			</div>
			<DownloadsTable
				headers={headersForTable}
				downloads={downloadsObj.downloads} />
		</div>
	{/each}
	{#if isShowButton}
		<button class="show-archive" on:click={showArchive}>
			Archive Of Previous Versions
			<img src="arrow-right.png" alt="" />
		</button>
	{/if}
</div>