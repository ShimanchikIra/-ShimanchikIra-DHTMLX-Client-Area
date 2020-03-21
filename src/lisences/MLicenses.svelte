<script>
	import {
		formatLicenseDate,
		getLicenseActiveMonths,
		checkLicenseDate,
	} from "../services/date.js";

	import { getLicenses } from "../services/licenses";
	import LicenseCheck from "./LicenseCheck.svelte";
	import License from "./License.svelte";

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

<div class="license">

	{#await waitLicense}
		<div>...waiting</div>
	{:then _not_used}

		{#if hasExpiredLicenses}
			<LicenseCheck {data} {checkAll} bind:isRenewDialogActive />
		{/if}

		{#each data as license}
			<License {license} {isRenewDialogActive} on:refresh={renderData} />
		{/each}

	{/await}

</div>
