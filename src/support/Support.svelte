<script>
	import {
		formatLicenseDate,
		getLicenseActiveMonths,
		checkLicenseDate,
	} from "../services/date.js";

	import { getLicenses } from "../services/licenses";
	import LicenceItemSupport from "./LicenceItemSupport.svelte"
	

	let data = [];
	let hasExpiredLicenses = false;
	let isRenewDialogActive = false;

	let waitLicense = getLicenses().then(raw => {
		data = raw.map(license => {
			license.isChecked = false;
			license.date = formatLicenseDate(license.activeTill);
			license.activeMonths = getLicenseActiveMonths(license.activeTill);
			license.isExpired = checkLicenseDate(license.activeTill);
			if (license.isExpired) hasExpiredLicenses = true;

			return license;
		});
	});

	function checkAll() {
		data.forEach((license, i) => {
			if (license.isExpired)
				// if we user license.isChecked auto-update will not be triggered
				// we need to clearly modify `data`
				data[i].isChecked = true;
		});
	}

	function renderData() {
		data = data;
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
{#each data as license}
<LicenceItemSupport support={license.support}/>
{/each}
</div>

