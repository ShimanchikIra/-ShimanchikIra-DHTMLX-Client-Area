<script>
	import LicenseRenew from "./LicenseRenew.svelte";

	export let license;
	export let isRenewDialogActive;

	const { owner } = license;

	let isProductListActive = !license.isExpired;
	let isArrowRotate = false;

	function showProductList() {
		isArrowRotate = !isArrowRotate;
		isProductListActive = !isProductListActive;
	}
</script>

<style>
	p {
		margin: 0;
	}

	.license {
		margin-bottom: 20px;
		border: 1px solid #b8d8f6;
		border-radius: 2px;
	}

	.license-header {
		display: flex;
		justify-content: space-between;
		background-color: #e5f0fb;
	}

	.license-info {
		padding: 20px;
	}

	.license-id {
		margin-bottom: 10px;
		color: #202b3c;
	}

	.license-label {
		display: inline-block;
		padding: 0 10px;
		padding-bottom: 2px;
		background-color: #2095f3;
		border-radius: 2px;
		font-size: 12px;
		line-height: 20px;
		color: #fff;
	}

	.license-date {
		display: inline-block;
	}

	.license.is-expired {
		border: 1px solid #fdd7d3;
	}

	.license.is-expired .license-header {
		background-color: #fff2f0;
	}

	.license.is-expired .license-label {
		background-color: #fc6d5a;
	}

	.license-renew {
		display: flex;
		align-items: center;
	}

	.products {
		display: flex;
		align-items: center;
		padding: 20px;
	}

	.products.is-hiden {
		display: none;
	}

	.product-list {
		width: 200px;
	}

	.is-rotated {
		transform: rotate(180deg);
	}

	.is-hidden {
		display: none;
	}

	.chevron-down {
		padding: 10px;
		position: relative;
		width: 16px;
		height: 8px;
		opacity: 0.5;
		cursor: pointer;
	}

	.chevron-down:hover {
		opacity: 1;
	}

	.chevron-down:after,
	.chevron-down:before {
		position: absolute;
		top: 13px;
		content: " ";
		width: 11px;
		height: 2px;
		background-color: #000;
	}

	.chevron-down:before {
		left: 9px;
		transform: rotate(45deg);
	}

	.chevron-down:after {
		left: 16px;
		transform: rotate(-45deg);
	}
</style>

<div class="license {license.isExpired ? 'is-expired' : ''}">
	<div class="license-header">
		<div class="license-info">

			<p class="license-id">
				<b>Commercial license with Standard Support</b>
				- License ID {license.licenseID}
			</p>

			<span class="license-label">
				{license.isExpired ? 'Support Expired' : 'Active Support'}
			</span>

			<p class="license-date">
				You have free updates till
				<b>{license.date}</b>
				( for next {license.activeMonths} months )
			</p>

		</div>

		<div class="license-renew {license.isExpired ? '' : 'is-hidden'}">
			<div
				class="chevron-down {isArrowRotate ? 'is-rotated' : ''}"
				on:click={showProductList} />
			<LicenseRenew {license} {isRenewDialogActive} on:refresh />
		</div>
	</div>

	<div class="products {isProductListActive ? '' : 'is-hiden'}">

		<ul class="product-list">
			{#each license.products as product}
				<li class="product-name">{product}</li>
			{/each}
		</ul>

		<div class="product-owner">
			<p class="owner-name">{owner.name} {`<${owner.email}>`}</p>
			<p class="owner-place">{owner.organization}</p>
		</div>

	</div>
</div> 