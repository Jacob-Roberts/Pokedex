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

      <PokemonList :pokemon="pokemon" />
    </div>
    <Login v-else />
  </div>
</template>

<script>
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
    pokemon() {
      return this.$root.$data.pokemon;
    },
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

      if (this.$root.$data.pokemon.some((i) => i.id === pokemon.id)) {
        this.errorMessage = "You already caught that pokemon";
        return;
      }

      this.$root.$data.pokemon.push(pokemon);
    },
  },
};
</script>
