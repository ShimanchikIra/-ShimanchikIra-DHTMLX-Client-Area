<script>
	import { getProducts } from "../services/trials.js";
    import { format, differenceInDays, addDays } from "date-fns";
    // import moment from "moment-es6";
	import Product from "./Product.svelte";

	$: products = sort(data);
	let data;
	let now = new Date();
	let trialsProducts = getProducts().then(i => {
		data = i;
		// sort2(i);
	});

	function sort(data) {
		if (!data) {
			return;
		}
		let products = data.products,
			trials = data.trials;
		for (let i = 0; i < products.length; i++) {
			let product = products[i];
			let trial = trials.find(el => el.productId === product.id);
			if (trial) {
				product.trial = trial;
			}
		}
		return products.sort((a, b) => {
			let trialA = a.trial,
				trialB = b.trial;

			if (trialA && trialB) {
				return (
					differenceInDays(new Date(b.trial.end), now) -
					differenceInDays(new Date(a.trial.end), now)
				);
			} else if (!trialA && trialB) {
				return 1;
			} else if (trialA && !trialB) {
				return -1;
			} else {
				return 0;
			} //sort from more days till the end of the trial period to less
		});
	}

	function addTrial(event) {
		let product = event.detail;

		let newItem = {
			start: format(now, "P"),
			end: format(addDays(now, product.trialLength), "P"),
			productId: product.id,
		};

		data.trials = [...data.trials, newItem];
	}
</script>

<style>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 10px;
		padding-left: 0%;
	}
</style>

<div>
	{#await trialsProducts}
		loading...
	{:then data}
		<div class="wrapper">

			{#each products as product}
				<Product {product} on:add={addTrial} />
			{/each}

		</div>
	{/await}
</div>