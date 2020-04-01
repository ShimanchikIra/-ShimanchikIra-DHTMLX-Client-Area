<script>
	import { getUsers } from "../services/users";
	import UsersInfo from "./UsersInfo.svelte";
	let addImg = "add.png",
		deleteImg = "delete.png";

	// get users as array
	let usersData = [];
	let usersPromise = getUsers().then(d => (usersData = d));

	let currentUser = null;
	let userName = "";
	let userEmail = "";
	$: error =
		usersData.filter(a => a.email == userEmail || a.name === userName).length &&
		!currentUser
			? "This name or email is not available!"
			: ""; //  в массив запишутся совпадающие данные из массива userData, пересчтивается каждый раз при изменении input

	function setCurrentUser(user) {
		currentUser = user;
		userName = currentUser.name;
		userEmail = currentUser.email;
	}

	function createNewItem() {
		currentUser = null;
		userName = "";
		userEmail = "";
	}

	function save() {
		if (!currentUser) {
			if (!error && userName != "" && userEmail != "") {
				let newUser = {
					id: usersData.length + 1,
					name: userName,
					email: userEmail,
					npm: { user: "asdasd", password: "asdasd" },
				};

				currentUser = newUser;
				return (usersData = [...usersData, newUser]);
			} else {
				return (error = "This fields is required");
			}
		} else {
			currentUser.email = userEmail;
			currentUser.name = userName;
			usersData = [...usersData];
			let user = currentUser;
			user.saved = true;
			setTimeout(() => {
				user.saved = false;
				usersData = usersData;
			}, 5000);

			return currentUser;
		}

		return (usersData = [...usersData]);
	}

	let deleteItem = user => {
		usersData = usersData.filter(i => i !== user);
		currentUser = null;
	};
</script>

<style>
	.wrapper {
		padding: 30px;
		display: flex;
		height: 100vh;
	}

	.usersWrapper {
		max-width: 560px;
		width: 100%;
		margin-left: 20px;
		border: 1px solid #d8dfea;
		margin-right: 20px;
	}

	.NpmAccessWrapper {
		width: 430px;
		border: 1px solid #d8dfea;
	}

	header {
		padding: 20px;
		background-color: #1877d3;
		max-width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addImg {
		width: 40px;
	}

	header span {
		color: white;
	}

	input[type="text"] {
		max-width: 520px;
		width: 100%;
	}

	.addUser {
		display: flex;
		padding: 20px;
		flex-direction: column;
		border-bottom: 1px solid #d8dfea;
	}

	.addButtons {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addButtons input {
		margin: 0;
	}

	.saveButton {
		background: linear-gradient(0deg, #1877d3, #1877d3), #4786ff;
		border-radius: 2px;
		text-align: center;
		color: white;
		max-width: 200px;
		padding: 15px;
		width: 100%;
	}

	.saveButton:hover,
	.addImg:hover,
	.itemWrapper:hover,
	.deleteImg:hover,
	.name:hover {
		cursor: pointer;
	}

	.email {
		color: grey;
	}
	.deleteImg {
		width: 25px;
		margin-right: 5px;
	}

	.itemWrapper {
		display: flex;
		align-items: center;
		padding: 10px;
	}

	.users {
		padding-top: 30px;
	}

	.error {
		background: #fff2f0;
		border: 1px solid #fc6d5a;
	}

	.errorP {
		color: #fc6d5a;
	}

	.selected {
		background: #e7f1fa;
	}

	.success {
		color: #1877d3;
		font-weight: 600;
		flex-grow: 1;
		text-align: end;
	}
</style>

<div>
	{#await usersPromise}
		loading...
	{:then data}
		<div class="wrapper">
			<div class="usersWrapper">
				<header>
					<span>Users</span>
					<img src={addImg} alt="add" class="addImg" on:click={createNewItem} />
				</header>
				<div class="addUser">
					<input
						type="text"
						placeholder="Name"
						bind:value={userName}
						class:error />
					<input
						type="text"
						placeholder="Email"
						bind:value={userEmail}
						class:error />
					<div class="addButtons">
						<input type="checkbox" />
						<span>Receive emails about Webix updates</span>
						<div class="saveButton" on:click={save}>
							{!currentUser ? 'ADD USER' : 'SAVE'}
						</div>
					</div>
					{#if error}
						<p class="errorP">{error}</p>
					{/if}
				</div>
				<div class="users">

					{#each usersData as user}
						<div class="itemWrapper" class:selected={currentUser == user}>
							<img
								src={deleteImg}
								alt=""
								class="deleteImg"
								on:click={() => deleteItem(user)} />
							<div class="name" on:click={() => setCurrentUser(user)}>
								<strong>{user.name}</strong>
								<span class="email">&lt;{user.email}&gt;</span>
							</div>
							{#if user.saved}
								<div class="success">
									<span>&#10004; Saved</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			<div class="NpmAccessWrapper">

				<UsersInfo user={currentUser} />
			</div>
		</div>

	{/await}
</div>