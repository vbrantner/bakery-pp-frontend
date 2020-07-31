<template>
  <div id="newRecipeIngredientDialog">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Neuer Rohstoff</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Neuer Rohstoff</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="ingredientID"
                :items="ingredientsList"
                item-text="name"
                item-value="id"
                hide-no-data
                hide-selected
                placeholder="Rohstoffname"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="unitID"
                :items="unitsList"
                item-text="name"
                item-value="id"
                hide-no-data
                hide-selected
                placeholder
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="amount"
                label="Menge"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="grey lighten-1" @click="dialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            color="primary"
            depressed
            @click="
              dialog = false;
              saveNewRecipeIngredient();
            "
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    recipeID: {},
    getRecipe: { type: Function },
  },
  mounted() {},
  data: () => ({
    valid: false,
    ingredientID: null,
    ingredientName: "",
    unitID: null,
    amount: null,
    dialog: false,
    ingredientsList: [],
    unitsList: [],
  }),
  created: function () {
    this.getIngredientsList();
    this.getUnitsList();
  },
  methods: {
    getUnitsList: function () {
      axios
        .get("measurements/")
        .then((response) => {
          this.unitsList = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getIngredientsList: function () {
      axios
        .get("ingredients/")
        .then((response) => {
          this.ingredientsList = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    saveNewRecipeIngredient: function () {
      axios
        .post("recipeingredient/", {
          amount: this.amount,
          unit: this.unitID.id,
          ingredient: this.ingredientID.id,
          recipe: this.recipeID,
        })
        .then(this.getRecipe);
    },
  },
};
</script>
