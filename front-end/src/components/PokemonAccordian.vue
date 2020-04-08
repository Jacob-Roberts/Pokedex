<template>
  <div>
    <div v-for="pokemon in pokemon" :key="pokemon.id">
      <p class="border-top mb-0" v-bind:style="{ background: color(pokemon) }">
        <img :src="pokemon.sprites.front_default" />
        <b-button
          variant="link"
          v-b-toggle="pokemon.name"
          :class="textColor(pokemon)"
        >
          {{ pokemon.name }}
        </b-button>
      </p>
      <b-collapse accordion="pokemon-accordion" :id="pokemon.name">
        <PokemonDetails :pokemon="pokemon" />
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { typeToColorMap, darkTypeList } from "../Constants";
import PokemonDetails from "./PokemonDetails";
export default {
  name: "PokemonAccordian",
  components: {
    PokemonDetails
  },
  methods: {
    color(pokemon) {
      return typeToColorMap[
        [...pokemon.types].sort((a, b) => a.slot - b.slot)[0].type.name
      ];
    },
    textColor(pokemon) {
      return darkTypeList.some(
        i =>
          i === [...pokemon.types].sort((a, b) => a.slot - b.slot)[0].type.name
      )
        ? "text-white"
        : "text-dark";
    }
  },
  props: {
    pokemon: Array
  }
};
</script>
