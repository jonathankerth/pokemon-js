let pokemonRepository = (function () {
	let pokemonList = [
		{ name: "bulbasaur", height: ".7", types: ["grass", "poison"] },
		{ name: "squitle", height: ".5", types: ["water", "monster"] },
		{ name: "ekans", height: "2", types: ["ground", "psychic"] },
	];
	function getAll() {
		return pokemonList;
	}

	function add(pokemon) {
		pokemonList.push(pokemon);
	}
	return {
		getAll: getAll,
		add: add,
	};
})();
pokemonRepository.getAll().forEach(function (pokemon) {
	if (pokemon.height > 1) {
		document.write(
			pokemon.name +
				"is (" +
				pokemon.height +
				")M's tall. Wow, that's a big pokemon!"
		);
	} else {
		document.write(pokemon.name + " is (" + pokemon.height + ")M's tall");
	}
	document.write("<br>");
});
