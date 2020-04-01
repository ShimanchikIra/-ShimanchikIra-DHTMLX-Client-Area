<script>
    import { format, isBefore, formatDistance } from "date-fns";
    //import moment from "moment-es6";
	import { createEventDispatcher } from "svelte";

	export let product;

	const dispatch = createEventDispatcher();

	let now = new Date();
	$: isTrial = !!product.trial;
	$: end = isTrial && new Date(product.trial.end);
	$: isActiveTrial = end && isBefore(now, end);
</script>

<style>
	.wrapper {
		padding: 15px;
		border: 1px solid #b8d8f6;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 15px;
		margin-bottom: 15px;
	}
	.trial {
		background: #e5f0fb;
	}
	span {
		color: #838e9c;
	}
	.end {
		background: #fff2f0;
		border: 1px solid #fdd7d3;
	}

	.button {
		background: linear-gradient(0deg, #1877d3, #1877d3), #4786ff;
		border-radius: 2px;
		text-align: center;
		color: white;
		max-width: 100px;
		padding: 10px;
		width: 100%;
	}
	.button:hover {
		cursor: pointer;
	}

	.button:first-child {
		margin-right: 20px;
	}

	.footerButtons {
		display: flex;
		padding: 15px 0;
		width: 300px;
		box-sizing: border-box;
		justify-content: center;
	}
</style>

<div
	class="wrapper"
	class:trial={isTrial}
	class:end={isTrial && !isActiveTrial}>
	<h2>{product.name}</h2>
	<img src={product.img} alt="" />
	{#if isTrial}
		<span>{product.trial.start}-{product.trial.end}</span>
	{/if}
	{#if !isTrial}
		<span>Trial ({product.trialLength} days)</span>
	{:else}
		<span>
			{isActiveTrial ? 'Ends in' : 'Expired '} {formatDistance(now, end)}
		</span>
	{/if}
	<div class="footerButtons">
		{#if !isTrial}
			<div class="button" on:click={() => dispatch('add', product)}>Start</div>
		{:else}
			{#if isActiveTrial}
				<div class="button">Download</div>
			{/if}
			<div class="button">Buy</div>
		{/if}
	</div>
</div>