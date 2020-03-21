<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let license;

	const onClick = () => {
		license.isChecked = !license.isChecked;
		dispatch("refresh");
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.container {
		display: block;
		position: relative;
		margin-left: 20px;
	}

	.checkbox {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		display: block;
		width: 20px;
		height: 20px;
		border: 1px solid #1876d2;
		border-radius: 2px;
		background-color: #fff;
		cursor: pointer;
	}

	.checkbox:checked + .checkmark {
		background-color: #1876d2;
	}

	.checkmark:after {
		display: none;
		position: absolute;
		content: "";
	}

	.checkbox:checked:checked ~ .checkmark:after {
		display: block;
	}

	.checkmark:after {
		left: 8px;
		top: 4px;
		width: 5px;
		height: 10px;
		border: solid #fff;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
</style>

<label class="container">
	<input
		class="checkbox"
		type="checkbox"
		checked={license.isChecked}
		on:click={onClick} />
	<span class="checkmark" />
</label>