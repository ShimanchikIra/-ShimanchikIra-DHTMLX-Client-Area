<script>
	import ButtonRenew from "./ButtonRenew.svelte";
	import CheckBoxRenew from "./CheckBoxRenew.svelte";

	export let license;
	export let isRenewDialogActive;
</script>

<style>
	p {
		margin: 0;
	}

	.license-renew {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.renew-info {
		display: flex;
		flex-direction: column;
		width: 200px;
	}

	.renew-discount {
		font-size: 14px;
		line-height: 20px;
		color: #202b3c;
	}

	.terms-of-license {
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;
		color: #1876d2;
	}

	.discount-percent {
		color: #1876d2;
	}
</style>

<div class="license-renew">

	<div class="renew-info">
		<p class="renew-discount">
			Renew with
			<span class="discount-percent">{license.discount}% discount</span>
			till {license.date}
		</p>
		<p class="terms-of-license">Check the Terms of Support/Updates Policy</p>
	</div>

	<ButtonRenew />
	{#if isRenewDialogActive}
		<CheckBoxRenew {license} on:refresh />
	{/if}
</div>
