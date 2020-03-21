<script>
	// import Licenses from "./Licenses.svelte";
	import Downloads from "./downloads/Downloads.svelte";
	// import Users from "./Users.svelte";

	let mode = "licenses";

	function showPage(v) {
		mode = v;
	}
</script>

<style>
	main {
		display: grid;
		grid-template-columns: 200px auto;
		grid-template-areas: "left center";
	}
	.navigation {
		grid-area: left;
	}
	.content {
		grid-area: center;
	}
</style>

<main>
	<div class="navigation">
		<ul>
			<li on:click={() => (mode = 'licenses')}>Licenses</li>
			<li on:click={() => (mode = 'downloads')}>Downloads</li>
			<li on:click={() => (mode = 'users')}>Users</li>
		</ul>
	</div>
	<div class="content">
		<!-- {#if mode == 'licenses'}
			<Licenses />
		{:else if mode == 'downloads'} -->
			<Downloads />
		<!-- {:else if mode == 'users'}
			<Users />
		{:else}not ready yet{/if} -->
	</div>
</main>