<script>
	export let user;
</script>

<style>
	header {
		padding: 20px;
		background-color: #1877d3;
		max-width: 100%;
	}
	header div {
		height: 40px;
		display: flex;
	}
	header span {
		color: white;
		align-self: center;
	}
	.content {
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.content span {
		color: grey;
	}
</style>

<div>

	<header>
		<div>
			<span>NPM access</span>
		</div>
	</header>
	{#if user === null}
		<div class="content">
			<span>
				You need to register users to get access to the private NPM server.
			</span>
			<hr />
			<span>
				Also, this is a convenient way to provide news about Webix updates to
				the developers.
			</span>

		</div>
	{:else}
		<div class="content">

			<p>Run the following command to log in to our private NPM server:</p>
			<span>npm login --registry=http://npm.webix.com --scope=@xbs</span>
			<p>When being asked for credential, use the data below:</p>
			<span>User: {user.npm.user}</span>
			<span>Password: {user.npm.password}</span>
			<p>
				After that you can use common npm commands to install Webix PRO and
				Complex Widgets according to your license:
			</p>
			<span>npm i @xbs/webix-pro</span>
			<span>npm i @xbs/pivot</span>
			<span>npm i @xbs/kanban</span>
			<span>npm i @xbs/filemanager</span>
			<span>npm i @xbs/scheduler</span>
			<span>npm i @xbs/spreadsheet</span>
		</div>
	{/if}
</div>
