<script>
	import Licenses from "./lisences/MLicenses.svelte";
	import { user } from './stores/authorization_user.js';
	import Downloads from "./downloads/Downloads.svelte";
	import Users from "./users/Users.svelte";
	import Login from "./login/Login.svelte";
	import Support from "./support/support.svelte";
	import DownloadsAdmin from "./Admin/DownloadsAdmin.svelte";
	import SupportInfo from "./support/supportInfo.svelte"

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
		list-style: none;
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
		list-style: none;
	}
	.navigation-list__item{
		width: 100%;
		padding: 5px 10px 5px 0;
		cursor: pointer;
		box-sizing: border-box;
	}
	.navigation-list__item:hover{
		background: #EAEAEA;
		border-left: 5px solid #2D4359;
		list-style: none;

	}
	.content {
		grid-area: center;
	}
</style>
{#if authorizationUser}
<main class="main client-area">
	<div class="navigation">
		<header class="navigation__header">DHTMLX Client Area </header>
		{#if authorizationUser.role==='user'}
		<ul class="navigation-list">
			<li class="navigation-list__item" on:click={() => (mode = 'licenses')}>Лицензии</li>
			<li class="navigation-list__item" on:click={() => (mode = 'downloads')}>Загрузки</li>
			<li class="navigation-list__item" on:click={() => (mode = 'support')}>Поддержка</li>
			<li class="navigation-list__item" on:click={() => (mode = 'supportInfo')}>Мои заявки</li>
		</ul>
		{:else if  authorizationUser.role==='admin'}
		<ul class="navigation-list">
			<li class="navigation-list__item" on:click={() => (mode = 'licenses')}>Услуги клиентов</li>
			<li class="navigation-list__item" on:click={() => (mode = 'downloads')}>Заявки</li>
			<li class="navigation-list__item" on:click={() => (mode = 'users')}>Пользователи</li> 
			<li class="navigation-list__item" on:click={() => (mode = 'downloadsAdmin')}>Загрузки</li>
		</ul>
		{/if}
		<footer class="navigation__footer"  on:click={setUser}>
		Выйти
		</footer>
	</div>
	<div class="content">
		{#if mode == 'licenses'}
			<Licenses />
		{:else if mode == 'downloads'}
			<Downloads />
		{:else if mode == 'support'}
			<Support />
			{:else if mode == 'supportInfo'}
			<SupportInfo />
			{:else if mode == 'users'}
			<Users />
		{:else if mode == 'downloadsAdmin'}
			<DownloadsAdmin />
		{/if}
	</div>
</main>
{:else}
<main class="main login">
	<Login />
</main>
{/if}