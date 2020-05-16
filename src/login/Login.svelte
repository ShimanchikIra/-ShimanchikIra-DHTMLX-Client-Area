    <script>
	import { getAuth } from "../services/login.js";
	import { user } from '../stores/authorization_user.js';

	let email = "",
		license = "";
	$: isAuth = " " || email || license;
	let is_Auth;

	// async function getData(url) {
	// 	let response = await fetch(url);
	// 	let data = await response.text();
	// 	return data;
	// }

	// $: downloadPromise = getData("/api/t").then(d => {
	// 	alert(d);
	// });

	function submit() {
		getAuth(email, license).then(res => {
		//	let user = res;
			// let user = {
			// 	email_user: email,
			// 	license_user: license,
			// 	role_user: role
			// }
			alert(res)
			setUser(res);
		});
	}

	function setUser(auth) {
		user.set(auth);
	}
</script>

<style>
	.wrapper {
		display: flex;
		width: 100vw;
		box-sizing: border-box;
	}

	.loginForm {
		max-width: 490px;
		width: 100%;
		padding: 205px 90px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	h1 {
		margin-bottom: 80px;
		font-size: 24px;
	}

	.button {
		background: #1876d2;
		border-radius: 2px;
		padding: 15px 0;
		display: flex;
		color: white;
		justify-content: center;
		max-width: 310px;
		width: 100%;
		margin-top: 25px;
	}

	.button:hover {
		cursor: pointer;
	}

	input {
		max-width: 310px;
		width: 100%;
	}

	.info {
		background: #1876d2;
		color: white;
		padding: 205px 90px;
		flex-grow: 1;
	}
	.content {
		max-width: 50%;
	}
	.err {
		background: #fff2f0;
		border: 1px solid #fc6d5a;
	}

	.errorWrapper {
		color: #fc6d5a;
		height: 60px;
		padding-top: 20px;
		box-sizing: border-box;
	}

	a {
		color: black;
		margin-top: 80px;
	}
</style>

<div class="wrapper">

	<!-- <div class="loginForm">
		<h1>DHTMLX Client Area</h1>
		<div class="form">
			<div class="errorWrapper">
				{#if !isAuth}
					<span class="spanErr">Invalid license</span>
				{/if}
			</div>
			<input
				type="text"
				placeholder="Email"
				bind:value={email}
				class:err={!isAuth} />
			<input
				type="text"
				placeholder="License"
				bind:value={license}
				class:err={!isAuth} />
			<div class="button" on:click={submit}>Login</div>
		</div>
		<a href="/">Buy a license &rarr;</a>
	</div> -->
	<div class="loginForm">
		<h1>DHTMLX Client Area</h1>
		<div class="form">
			<div class="errorWrapper">
				{#if !isAuth}
					<span class="spanErr">Invalid license</span>
				{/if}
			</div>
			<input
				type="text"
				placeholder="Email"
				bind:value={email}
				class:err={!isAuth} />
			<input
				type="text"
				placeholder="Company"
				bind:value={license}
				class:err={!isAuth} />
			<div class="button" on:click={submit}>Login</div>
		</div>
		<a href="/">Buy a license &rarr;</a>
	</div>
	<div class="info">
		<div class="content">

			<h2>DHTMLX Scheduler.NET</h2>
			<p>
				DHTMLX Scheduler .NET is a web control that provides rich scheduling
				capabilities found in MS Outlook or Google Calendar, powered with
				seamless Ajax loading and advanced drag-and-drop.
			</p>
		</div>
	</div>
</div>