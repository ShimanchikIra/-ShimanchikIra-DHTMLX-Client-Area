<script>
	export let data;
	export let checkAll;
	export let isRenewDialogActive;

	$: isRenewButtonActive = data.some(license => license.isChecked);

	const showRenewDialog = () => {
		isRenewDialogActive = !isRenewDialogActive;
	};
</script>

<style>
	p {
		margin: 0;
	}

	.license-check {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px 0;
	}

	.renew-all {
		color: #1876d2;
		cursor: pointer;
	}

	.renew-all:hover {
		text-decoration: underline;
	}

	.renew-messsage {
		font-size: 16px;
		line-height: 24px;
		color: #202b3c;
		cursor: pointer;
	}

	.renew-dialog {
		display: flex;
		align-items: center;
	}

	.button {
		margin-bottom: 0;
		background-color: #1876d2;
		border-radius: 2px;
		font-weight: 600;
		font-size: 14px;
		line-height: 19px;
		text-transform: uppercase;
		color: #ffffff;
		cursor: pointer;
	}

	.button-renew {
		width: 109px;
		height: 46px;
		margin-left: 25px;
	}

	.button-renew:disabled {
		background-color: #aaaaaa;
	}

	.button-choose-license {
		width: 184px;
		height: 46px;
	}

	.close-dialog {
		padding: 10px 22px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 20px;
		height: 20px;
		opacity: 0.5;
		cursor: pointer;
	}

	.close-dialog:hover {
		opacity: 1;
	}

	.close-dialog:before,
	.close-dialog:after {
		position: absolute;
		content: " ";
		height: 20px;
		width: 2px;
		background-color: #000;
	}

	.close-dialog:before {
		transform: rotate(45deg);
	}

	.close-dialog:after {
		transform: rotate(-45deg);
	}

	.is-hidden {
		display: none;
	}
</style>

<div class="license-check">

	<p class="renew-messsage">
		You have a licenses with expired support, выберите те, которые хотите
		обновить
	</p>

	<div class="renew-dialog {isRenewDialogActive ? '' : 'is-hidden'}">
		<div class="renew-all" on:click={checkAll()}>Check all</div>
		<button class="button button-renew" disabled={!isRenewButtonActive}>
			renew
		</button>
		<div class="close-dialog" on:click={showRenewDialog} />
	</div>

	<button
		class="button button-choose-license {isRenewDialogActive ? 'is-hidden' : ''}"
		on:click={showRenewDialog}>
		Choose license
	</button>

</div>
