<template>
  <div class="browse">
    <h1>Available Pokemon</h1>
    <b-container class="bg-light px-0 rounded text-dark">
      <div v-if="loading" class="text-center p-5">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
      <div v-else>
        <PokemonAccordian :pokemon="allPokemon" />
      </div>
      <b-pagination
        align="fill"
        class="p-4"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import { baseUrl } from "../Constants";
import PokemonAccordian from "../components/PokemonAccordian";
export default {
  data() {
    return {
      allPokemon: [],
      currentPage: 1,
      rows: 964,
      perPage: 20,
      loading: false
    };
  },
  components: {
    PokemonAccordian
  },
  watch: {
    currentPage() {
      this.getAllPokemon();
    }
  },
  methods: {
    async getAllPokemon() {
      const url = `${baseUrl}/pokemon?offset=${(this.currentPage - 1) *
        this.perPage}&limit=${this.perPage}`;
      this.loading = true;
      let list = await fetch(url);
      let json = await list.json();
      // Get all the Pokemon Data
      var promises = [];
      for (let pokemon of json.results) {
        promises.push(fetch(pokemon.url));
      }
      // Unwrap it all to json
      let promisesJson = [];
      for (let promise of promises) {
        let result = await promise;
        promisesJson.push(result.json());
      }

      // Now extract the data
      let pokemonList = [];
      for (let promise of promisesJson) {
        let pokemon = await promise;
        pokemonList.push(pokemon);
      }
      this.loading = false;
      this.allPokemon = pokemonList;
    }
  },
  created() {
    this.getAllPokemon();
  }
};
</script>
