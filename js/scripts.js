let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

	function add(pokemon) {
		if (typeof pokemon === "object" && "name" in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log("pokemon is not correct");
		}
	}

	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		let listpokemon = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
		button.addEventListener("click", function (event) {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showDetails(item) {
		loadDetails(item).then(function () {
			showModal(item.name, item.height);
		});
	}

	function showModal(name, height, imageUrl) {
		let modalContainer = document.querySelector("#modal-container");
		modalContainer.innerHTML = "";

		let modal = document.createElement("div");
		modal.classList.add("modal");

		let closeButtonElement = document.createElement("button");
		closeButtonElement.classList.add("modal-close");
		closeButtonElement.innerText = "Close";
		closeButtonElement.addEventListener("click", hideModal);

		let nameElement = document.createElement("h1");
		nameElement.innerText = name;

		let heightElement = document.createElement("p");
		heightElement.innerText = `Height: ${height}`;

		let imageElement = document.createElement("img");
		imageElement.src = imageUrl;

		modal.appendChild(closeButtonElement);
		modal.appendChild(nameElement);
		modal.appendChild(heightElement);
		modal.appendChild(imageElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add("is-visible");
	}

	function hideModal() {
		let modalContainer = document.querySelector("#modal-container");
		modalContainer.classList.remove("is-visible");
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
(function () {
	let modalContainer = document.querySelector("#modal-container");
	let dialogPromiseReject; // This can be set later, by showDialog
	function showDialog(title, text) {
		showModal(title, text);

		// We want to add a confirm and cancel button to the modal
		let modal = modalContainer.querySelector(".modal");

		let confirmButton = document.createElement("button");
		confirmButton.classList.add("modal-confirm");
		confirmButton.innerText = "Confirm";

		let cancelButton = document.createElement("button");
		cancelButton.classList.add("modal-cancel");
		cancelButton.innerText = "Cancel";

		modal.appendChild(confirmButton);
		modal.appendChild(cancelButton);

		// We want to focus the confirmButton so that the user can simply press Enter
		confirmButton.focus();

		// Return a promise that resolves when confirmed, else rejects
		return new Promise((resolve, reject) => {
			cancelButton.addEventListener("click", hideModal);
			confirmButton.addEventListener("click", () => {
				dialogPromiseReject = null; // Reset this
				hideModal();
				resolve();
			});
			// This can be used to reject from other functions
			dialogPromiseReject = reject;
		});
	}
	document.querySelector("#show-dialog").addEventListener("click", () => {
		showDialog("Confirm action", "Are you sure you want to do this?").then(
			function () {
				alert("confirmed!");
			},
			() => {
				alert("not confirmed");
			}
		);
	});

	window.addEventListener("keydown", (e) => {
		if (
			e.key === "Escape" &&
			modalContainer.classList.contains("is-visible")
		) {
			hideModal();
		}
	});

	modalContainer.addEventListener("click", (e) => {
		// Since this is also triggered when clicking INSIDE the modal container,
		// We only want to close if the user clicks directly on the overlay
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});
})();
