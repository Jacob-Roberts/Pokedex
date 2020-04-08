<template>
  <b-card-body>
    <p>Type: {{ types }}</p>
    <p>Abilities: {{ abilities }}</p>
    Stats:
    <dl v-for="stat of pokemon.stats" :key="stat.stat.name">
      <dt>{{ stat.stat.name }}</dt>
      <dd>{{ stat.base_stat }}</dd>
    </dl>
  </b-card-body>
</template>

<script>
export default {
  name: "PokemonDetails",
  props: {
    pokemon: Object
  },
  computed: {
    types() {
      return [...this.pokemon.types]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.type.name)
        .join(", ");
    },
    abilities() {
      return [...this.pokemon.abilities]
        .sort((a, b) => a.slot - b.slot)
        .map(i => i.ability.name)
        .join(", ");
    }
  }
};
</script>
