<script>
	import Licenses from "./lisences/MLicenses.svelte";
	import { user } from './stores/authorization_user.js';
	import Downloads from "./downloads/Downloads.svelte";
	import Users from "./users/Users.svelte";
	import Login from "./login/Login.svelte"

	let mode = "licenses";
	let authorizationUser;

	const unsubscribe = user.subscribe(value => {
		authorizationUser = value;
	});

	function showPage(v) {
		mode = v;
	}
	function setUser() {
		user.set(null);
	}
</script>

<style>
	.main {
		margin: 0 auto;
		width: 80%;
		max-width: 1365;
	}
	.client-area {
		display: grid;
		grid-template-columns: 300px auto;
		grid-template-areas: "left center";
	}
	.navigation {
		grid-area: left;
		background: linear-gradient(0deg, #F4F4F4, #F4F4F4), #F7F7F7;
	}
	.navigation__header{
		background: linear-gradient(0deg, #2D4359, #2D4359);
		width: 100%;
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		color: #FFFFFF;
		padding: 30px;
		box-sizing: border-box;
	}
	.navigation-list{
		width: 100%;
		padding: 30px 0;
		box-sizing: border-box;
	}
	.navigation-list__item{
		width: 100%;
		padding: 5px 10px 5px 0;
		cursor: pointer;
	}
	.navigation-list__item:hover{
		background: #EAEAEA;
		border-left: 5px solid #2D4359;

	}
	.content {
		grid-area: center;
	}
</style>
{#if authorizationUser}
<main class="main client-area">
	<div class="navigation">
		<header class="navigation__header">DHTMLX Client Area </header>
		<ul class="navigation-list">
			<li class="navigation-list__item" on:click={() => (mode = 'licenses')}>Licenses</li>
			<li class="navigation-list__item" on:click={() => (mode = 'downloads')}>Downloads</li>
			<li class="navigation-list__item" on:click={() => (mode = 'support')}>Support</li>
			<li class="navigation-list__item" on:click={() => (mode = 'users')}>Users</li>
		</ul>
		<footer class="navigation__footer"  on:click={setUser}>
		Logout
		</footer>
	</div>
	<div class="content">
		{#if mode == 'licenses'}
			<Licenses />
		{:else if mode == 'downloads'}
			<Downloads />
		{:else if mode == 'users'}
			<Users />
		{/if}
	</div>
</main>
{:else}
<main class="main login">
	<Login />
</main>
{/if}