<template>
  <b-card-body>
    <h3>Attack</h3>
    <p>
      Weak Against:
      <label
        v-for="weakness in weaknessAttack"
        :class="'ml-3 p-1 rounded ' + textColor(weakness)"
        :key="weakness"
        v-bind:style="{ background: color(weakness) }"
        >{{ weakness }}</label
      >
    </p>
    <p>
      Strong Against:
      <label
        v-for="strength in strengthAttack"
        :class="'ml-3 p-1 rounded ' + textColor(strength)"
        :key="strength"
        v-bind:style="{ background: color(strength) }"
        >{{ strength }}</label
      >
    </p>
    <p>
      Ineffective Against:
      <label
        v-for="ineffective in ineffectiveAttack"
        :class="'ml-3 p-1 rounded ' + textColor(ineffective)"
        :key="ineffective"
        v-bind:style="{ background: color(ineffective) }"
        >{{ ineffective }}</label
      >
    </p>

    <h3>Defense</h3>
    <p>
      Weak Against:
      <label
        v-for="weakness in weaknessDefense"
        :class="'ml-3 p-1 rounded ' + textColor(weakness)"
        :key="weakness"
        v-bind:style="{ background: color(weakness) }"
        >{{ weakness }}</label
      >
    </p>
    <p>
      Strong Against:
      <label
        v-for="strength in strengthDefense"
        :class="'ml-3 p-1 rounded ' + textColor(strength)"
        :key="strength"
        v-bind:style="{ background: color(strength) }"
        >{{ strength }}</label
      >
    </p>
    <p>
      Invulnerable Against:
      <label
        v-for="invulnerable in invulnerableDefense"
        :class="'ml-3 p-1 rounded ' + textColor(invulnerable)"
        :key="invulnerable"
        v-bind:style="{ background: color(invulnerable) }"
        >{{ invulnerable }}</label
      >
    </p>
  </b-card-body>
</template>

<script>
import { typeToColorMap, darkTypeList } from "../Constants";
export default {
  name: "TypeDetails",
  props: {
    type: Object
  },
  methods: {
    color(type) {
      return typeToColorMap[type];
    },
    textColor(type) {
      return darkTypeList.some(i => i === type) ? "text-white" : "text-dark";
    }
  },
  computed: {
    darkText() {
      return darkTypeList.some(i => i === this.type.name);
    },
    weaknessAttack() {
      return this.type.damage_relations.half_damage_to.map(i => i.name);
    },
    weaknessDefense() {
      return this.type.damage_relations.double_damage_from.map(i => i.name);
    },
    strengthAttack() {
      return this.type.damage_relations.double_damage_to.map(i => i.name);
    },
    strengthDefense() {
      return this.type.damage_relations.half_damage_from.map(i => i.name);
    },
    ineffectiveAttack() {
      return this.type.damage_relations.no_damage_to.map(i => i.name);
    },
    invulnerableDefense() {
      return this.type.damage_relations.no_damage_from.map(i => i.name);
    }
  }
};
</script>
