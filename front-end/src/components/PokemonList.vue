<template>
  <div class="wrapper">
    <div class="pokemon-list">
      <div class="pokemon" v-for="pokemon in pokedex" :key="pokemon._id">
        <PokemonDisplay :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PokemonDisplay from "./PokemonDisplay";
export default {
  name: "PokemonList",
  components: {
    PokemonDisplay,
  },
  async created() {
    try {
      // Load Pokedex
      let response = await axios.get("/api/pokemon");
      let pokedex = response.data.pokemon;
      this.$root.$data.pokedex = pokedex;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    pokedex() {
      let newPokedex = this.$root.$data.pokedex;
      newPokedex.sort((a, b) => a.order < b.order);
      return newPokedex;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.pokemon {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.pokemon img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.pokemon .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #f2921d;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
