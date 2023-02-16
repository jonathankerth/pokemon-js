let pokemonRepository = (function () {
	let pokemonList = [
		{ name: "bulbasaur", height: 0.7, types: ["grass", "poison"] },
		{ name: "squirtle", height: 0.5, types: ["water", "monster"] },
		{ name: "ekans", height: 2, types: ["ground", "psychic"] },
	];

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		pokemonList.forEach(function (pokemon) {
			if (pokemon.height > 1) {
				console.log(
					pokemon.name +
						" is " +
						pokemon.height +
						"M's tall. Wow, that's a big pokemon!"
				);
			} else {
				console.log(
					pokemon.name + " is " + pokemon.height + "M's tall"
				);
			}
		});
	}

	return {
		add: add,
		getAll: getAll,
	};
})();
console.log(pokemonRepository.getAll());
