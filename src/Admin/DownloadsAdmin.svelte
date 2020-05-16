<script>
import { getDownloads } from "../services/downloads";
import Archive from "../downloads/Archive.svelte";
import {changeDownloads,getProductNames} from "../services/methods.js";
let addImg = "add.png",
		deleteImg = "delete.png";

let allDownloads = [];
let productNames = [];
let downloadPromise = getDownloads().then(data => {
		allDownloads = changeDownloads(data);
		productNames = getProductNames(data);
});

	let currentDownload = null;
	let version = "";
	let link = "";
	$: error =
		allDownloads.filter(a => a.version == version || a.links === link).length &&
		!currentDownload
			? "This name or email is not available!"
			: ""; //  в массив запишутся совпадающие данные из массива userData, пересчтивается каждый раз при изменении input

	function setCurrentDownload(download) {
		currentDownload = download;
		version = currentUser.name;
		link  = currentUser.email;
	}

	function createNewItem() {
		currentDownload = null;
		version = "";
		link = "";
	}

	function save() {
		if (!currentDownload) {
			if (!error && version != "" && link != "") {
				let newDownload = {
					product: "Suite",
							version: version,
							links: link,
							released: "2018-01-01",
							moreInfo: "http://some.com/dhtmlx/4.4",
							details: "new suite functionality a12",
				};

				currentDownload = newDownload;
				return (allDownloads = [...allDownloads, newDownload]);
			} else {
				return (error = "This fields is required");
			}
		} else {
			currentDownload.version = version;
			currentDownload.links = link;
			allDownloads = [...allDownloads];
			let downloads = currentDownload;
			downloads.saved = true;
			setTimeout(() => {
				downloads.saved = false;
				allDownloads = allDownloads;
			}, 5000);

			return currentDownload;
		}

		return (allDownloads = [...allDownloads]);
	}

	let deleteItem = download => {
		allDownloads = allDownloads.filter(i => i !== download);
		currentDownload = null;
	};


function showArchive() {
		alert('Ye');
}
 </script>

<style>
	.wrap {
		width: 1065px;
		height: 800px;
		padding: 30px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		font-size: 14px;
		line-height: 20px;
		color: #424242;
		text-align: start;
		border: 1px solid #000;
	}

.usersWrapper {
		max-width: 560px;
		width: 100%;
		margin-left: 20px;
		border: 1px solid #d8dfea;
		margin-right: 20px;
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

<div class="wrap">
<div class="wrapper">
			<div class="usersWrapper">
				<header>
					<!-- <span>Users</span> -->
					<img src={addImg} alt="add" class="addImg" on:click={createNewItem} />
				</header>
				<div class="addUser">
					<input
						type="text"
						placeholder="Version"
						bind:value={version}
						class:error />
					<input
						type="text"
						placeholder="Link"
						bind:value={link}
						class:error />
					<div class="addButtons">
						<input type="checkbox" />
						<span>Receive emails about Webix updates</span>
						<div class="saveButton" on:click={save}>
							{!currentDownload ? 'ADD USER' : 'SAVE'}
						</div>
					</div>
					{#if error}
						<p class="errorP">{error}</p>
					{/if}
				</div>
				<div class="users">

					{#each allDownloads as download}
						<div class="itemWrapper" class:selected={currentDownload == download}>
							<img
								src={deleteImg}
								alt=""
								class="deleteImg"
								on:click={() => deleteItem(download)} />
							<div class="name" on:click={() => setCurrentDownload(download)}>
								<strong>{download.version}</strong>
								<span class="email">&lt;{download.links}&gt;</span>
							</div>
							{#if download.saved}
								<div class="success">
									<span>&#10004; Saved</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			</div>

    <!-- <Archive
			downloads={allDownloads}
			products={['All Products', ...productNames]}
			on:stateArchive={showArchive} 
            isVisibleButton = {false}
    /> -->
</div> 
