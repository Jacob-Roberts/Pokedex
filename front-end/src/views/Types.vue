<template>
  <div class="browse">
    <h1>All Types</h1>
    <b-container class="bg-light px-0 rounded text-dark">
      <div v-if="loading" class="text-center p-5">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
      <div v-else>
        <TypeAccordian :types="allTypes" />
      </div>
    </b-container>
  </div>
</template>

<script>
import { baseUrl } from "../Constants";
import TypeAccordian from "../components/TypeAccordian";
export default {
  data() {
    return {
      allTypes: [],
      loading: false
    };
  },
  components: {
    TypeAccordian
  },
  methods: {
    async getAllTypes() {
      const url = `${baseUrl}/type?limit=18`;
      this.loading = true;
      let list = await fetch(url);
      let json = await list.json();
      // Get all the Pokemon Types
      var promises = [];
      for (let type of json.results) {
        promises.push(fetch(type.url));
      }
      // Unwrap it all to json
      let promisesJson = [];
      for (let promise of promises) {
        let result = await promise;
        promisesJson.push(result.json());
      }

      // Now extract the data
      let typeList = [];
      for (let promise of promisesJson) {
        let type = await promise;
        typeList.push(type);
      }
      this.loading = false;
      this.allTypes = typeList;
    }
  },
  created() {
    this.getAllTypes();
  }
};
</script>
