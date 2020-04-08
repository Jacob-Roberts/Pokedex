<template>
  <div>
    <div class="info" v-bind:style="{ background: color }">
      <div class="d-flex justify-content-between">
        <h1>
          {{ pokemon.name }}
        </h1>
        <button
          v-if="!orderEditing"
          @click="beginReorder"
          class="badge badge-light"
        >
          {{ pokemon.order + 1 }}
        </button>
        <form v-else v-on:submit.prevent="reorder">
          <input
            ref="orderInput"
            autocomplete="off"
            autocorrect="off"
            v-model="order"
            class="form-control"
            style="max-width: 40px;"
            type="text"
          />
        </form>
      </div>
      <b-button
        v-if="!editing"
        variant="link"
        @click="beginEditing"
        class="p-0"
        >{{ pokemon.nickname ? pokemon.nickname : "Add Nickname" }}</b-button
      >
      <form v-else v-on:submit.prevent="addNickname">
        <input
          ref="nicknameInput"
          autocomplete="off"
          autocorrect="off"
          v-model="nickname"
          class="form-control"
          style="max-width: 400px;"
          type="text"
        />
      </form>
      <p>
        {{ types }}
      </p>
    </div>
    <div class="image">
      <img :src="pokemon.image" />
    </div>
    <b-button variant="danger" @click="remove">Delete</b-button>
  </div>
</template>

<script>
import axios from "axios";
import { typeToColorMap } from "../Constants";
export default {
  name: "PokemonDisplay",
  data() {
    return { editing: false, orderEditing: false, nickname: "", order: 0 };
  },
  reorder() {},
  created() {
    if (this.pokemon.nickname) {
      this.nickname = this.pokemon.nickname;
    }
    this.order = this.pokemon.order + 1;
  },
  props: {
    pokemon: Object,
  },
  methods: {
    async addNickname() {
      try {
        let response = await axios.put("/api/pokemon/" + this.pokemon._id, {
          nickname: this.nickname,
        });

        let pokemon = this.$root.$data.pokedex;

        var index = -1;
        for (let i = 0; i < pokemon.length; i++) {
          if (pokemon[i]._id === this.pokemon._id) {
            index = i;
            break;
          }
        }
        if (index < 0) {
          console.error("Index was less than 0. it is " + index);
        }

        this.$root.$data.pokedex.splice(index, 1, response.data.pokemon);
        this.editing = false;
      } catch (error) {
        console.error(error);
      }
    },
    async reorder() {
      console.log("sending the order of " + (this.order - 1));
      try {
        let pokemon = this.$root.$data.pokedex;

        // if (this.order > pokemon.length) {
        //   this.order = pokemon.length;
        // }

        // Find my pokemon
        var index = -1;
        for (let i = 0; i < pokemon.length; i++) {
          if (pokemon[i]._id === this.pokemon._id) {
            index = i;
            break;
          }
        }
        if (index < 0) {
          console.error("Index was less than 0. it is " + index);
        }

        let oldOrder = pokemon[index].order;
        let newOrder = 0;

        if (this.order - 1 === oldOrder) {
          return;
        } else if (this.order - 1 < oldOrder) {
          newOrder = this.order - 1.5;
        } else {
          newOrder = this.order - 0.5;
        }

        pokemon[index].order = newOrder;

        await axios.put("/api/pokemon/order/" + this.pokemon._id, {
          order: newOrder,
        });

        pokemon.sort((a, b) => a.order - b.order);

        // Reorder the pokemon order
        for (let i = 0; i < pokemon.length; i++) {
          pokemon[i].order = i;
        }

        this.$root.$data.pokedex = pokemon;

        this.orderEditing = false;
      } catch (error) {
        console.error(error);
      }
    },
    beginEditing() {
      this.editing = true;
      // Focus the component, but we have to wait
      // so that it will be showing first.
      this.$nextTick(function() {
        this.$refs.nicknameInput.focus();
      });
    },
    beginReorder() {
      this.orderEditing = true;
      // Focus the component, but we have to wait
      // so that it will be showing first.
      this.$nextTick(function() {
        this.$refs.orderInput.focus();
      });
    },
    async remove() {
      try {
        await axios.delete("/api/pokemon/" + this.pokemon._id);

        let pokemon = this.$root.$data.pokedex;
        var filteredPokemon = pokemon.filter((i) => i._id !== this.pokemon._id);
        // Reorder the pokemon order
        for (let i = 0; i < filteredPokemon.length; i++) {
          filteredPokemon[i].order = i;
        }
        this.$root.$data.pokedex = filteredPokemon;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    types() {
      return [...this.pokemon.types]
        .sort((a, b) => a.slot - b.slot)
        .map((i) => i.name)
        .join(", ");
    },
    color() {
      return typeToColorMap[
        [...this.pokemon.types].sort((a, b) => a.slot - b.slot)[0].name
      ];
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  max-height: 26px;
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
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
  margin-bottom: 1px;
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

.auto {
  margin-left: auto;
}
</style>
