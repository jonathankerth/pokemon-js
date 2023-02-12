let pokemonList = [
	{ name: "bulbasaur", height: ".7", types: ["grass", "poison"] },
	{ name: "squitle", height: ".5", types: ["water", "monster"] },
	{ name: "ekans", height: "2", types: ["ground", "psychic"] },
];
for (let i = 0; i < pokemonList.length; i++) {
	let currentPokemon = pokemonList[i];
	document.write(currentPokemon.name + " " + currentPokemon.height);
	if (currentPokemon.height > 1) {
		document.write("Wow! That's big!");
	}
}
