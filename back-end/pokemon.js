const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Pokemons
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a pokemon
const pokemonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: String,
  nickname: String,
  order: Number,
  types: [{ slot: Number, name: String }],
  image: String,
});

// The model for a pokemon
const Pokemon = mongoose.model("Pokemon", pokemonSchema);

// get pokemons -- will list pokemons that a user has submitted
router.get("/", validUser, async (req, res) => {
  let pokemon = [];
  try {
    pokemon = await Pokemon.find({
      user: req.user,
    });
    pokemon.sort((a, b) => a.order - b.order);

    return res.send({
      pokemon: pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit a pokemon -- only edits nickname
router.put("/:id", validUser, async (req, res) => {
  if (req.body.nickname === null || req.body.nickname === undefined) {
    return res.status(400).send({
      message: "nickname is required",
    });
  }
  try {
    pokemon = await Pokemon.findOne({
      _id: req.params.id,
    });
    if (pokemon === null) {
      return res.status(400).send({
        message: "not found",
      });
    }
    pokemon.nickname = req.body.nickname;
    await pokemon.save();

    return res.send({
      pokemon: pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit a pokemon -- only edits order
router.put("/order/:id", validUser, async (req, res) => {
  if (req.body.order === null || req.body.order === undefined) {
    return res.status(400).send({
      message: "order is required",
    });
  }
  try {
    pokemon = await Pokemon.findOne({
      _id: req.params.id,
    });
    if (pokemon === null) {
      return res.status(400).send({
        message: "not found",
      });
    }
    pokemon.order = req.body.order;
    await pokemon.save();

    // Edit the Order
    let pokemonList = await Pokemon.find({
      user: req.user,
    });

    let orderedList = pokemonList;
    orderedList.sort((a, b) => a.order - b.order);

    // Reorder the pokemon order
    for (let i = 0; i < orderedList.length; i++) {
      orderedList[i].order = i;
    }
    for (let pokemon of orderedList) {
      await pokemon.save();
    }

    return res.send("Reordered successfully");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// create a pokemon
router.post("/", validUser, async (req, res) => {
  const pokemon = new Pokemon({
    user: req.user,
    name: req.body.name,
    order: req.body.order,
    nickname: req.body.nickname,
    types: req.body.types,
    image: req.body.image,
  });
  try {
    await pokemon.save();
    return res.send({
      pokemon: pokemon,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Delete a pokemon
router.delete("/:id", validUser, async (req, res) => {
  try {
    await Pokemon.deleteOne({
      _id: req.params.id,
    });

    let pokemonList = await Pokemon.find({
      user: req.user,
    });

    // Reorder the pokemon order
    let currentOrderNumber = 0;
    for (let pokemon of pokemonList.sort((a, b) => a.order - b.order)) {
      pokemon.order = currentOrderNumber;
      currentOrderNumber++;
      pokemon.save();
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};
