<template>
  <div class="home">
    <div v-if="user">
      <h1>My Pokemon</h1>
      <hr />
      <form v-on:submit.prevent="addPokemon">
        <div class="form-group">
          <label>Add New Pokemon</label>
          <input
            autocomplete="off"
            autocorrect="off"
            v-model="search"
            class="d-block border form-control"
            style="max-width: 400px;"
            type="text"
          /><br />
        </div>
        <button type="submit" class="btn btn-lg btn-secondary">
          Add
        </button>
      </form>
      <span class="text-danger">{{ errorMessage }}</span>

      <PokemonList />
    </div>
    <Login v-else />
  </div>
</template>

<script>
import axios from "axios";
import PokemonList from "../components/PokemonList.vue";
import Login from "@/components/Login.vue";
import { baseUrl } from "../Constants";
export default {
  name: "Home",
  components: {
    PokemonList,
    Login,
  },
  data() {
    return { search: "", loading: false, errorMessage: "" };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async addPokemon() {
      this.errorMessage = "";
      const url = `${baseUrl}/pokemon/${this.search.toLowerCase()}`;

      this.loading = true;
      let data = await fetch(url);
      this.loading = false;
      if (!data.ok) {
        this.errorMessage = "No Pokemon found by that name";
        return;
      } else {
        this.search = "";
      }

      let pokemon = await data.json();

      let nextOrder = this.$root.$data.pokedex.length;

      // Add the pokemon to the backend
      let response = await axios.post("/api/pokemon", {
        name: pokemon.name,
        order: nextOrder,
        nickname: "",
        types: pokemon.types.map((i) => ({
          slot: i.slot,
          name: i.type.name,
        })),
        image: pokemon.sprites.front_default,
      });

      this.$root.$data.pokemon.push(pokemon);
      this.$root.$data.pokedex.push(response.data.pokemon);
    },
  },
};
</script>
