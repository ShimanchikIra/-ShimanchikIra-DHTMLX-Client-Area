<script>
	import moment from "moment-es6";
	import { createEventDispatcher } from "svelte";
	export let headers;
	export let downloads;
	const dispatch = createEventDispatcher();
</script>

<style>
	.downloads-table {
		width: 100%;
		text-align: start;
	}
	.downloads-table__head-row {
		line-height: 16px;
		font-size: 13px;
		color: #aab2bd;
	}
	.downloads-table__row {
		cursor: pointer;
	}

	.downloads-table__cell {
		padding: 5px 0 5px 0;
	}

	.downloads-table__tooltip {
		display: none;
		padding: 10px 15px;
		font-size: 12px;
		background: #ffffff;
		border: 1px solid #e1e1e1;
		box-sizing: border-box;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
		position: absolute;
		margin-top: 10px;
	}
	.show-tooltip {
		display: block;
	}
</style>

<table class="downloads-table">
	<thead class="downloads-table__head-row">
		{#each headers as head}
			<td class="downloads-table__cell downloads-table__head-cell">{head}</td>
		{/each}
	</thead>
	<tbody>
		{#each downloads as download}
			<tr class="downloads-table__row">
				<td class="downloads-table__cell">
					<a href={download.links}>
						<img src="download-icon.png" alt="Icon" />
					</a>
				</td>
				<td
					class="downloads-table__cell"
					on:mouseover={() => (download.isShowTooltip = true)}
					on:mouseout={() => (download.isShowTooltip = false)}>
					{download.product}
					<span
						class="downloads-table__tooltip"
						class:show-tooltip={download.isShowTooltip}>
						{download.details}
					</span>
				</td>
				<td class="downloads-table__cell">{download.version}</td>
				<td class="downloads-table__cell">
					{moment(download.released).format('LL')}
				</td>
			</tr>
		{/each}
	</tbody>
</table>