<template>
  <v-container>
    <v-btn depressed color="primary" large class="my-2" @click="$router.go(-1)">
      <v-icon left>fas fa-arrow-left</v-icon>Zurück
    </v-btn>
    <v-row>
      <v-col cols="12">
        <div class="d-flex">
          <h1>Neues Produkt</h1>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            large
            class="ml-auto"
            @click="
              postProduct();
              $router.go(-1);
            "
            >Speichern</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-card class="mx-auto" outlined>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              outlined
              v-model="productName"
              clearable
              label="Produktname"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="recipeID"
              :items="recipeList"
              outlined
              item-text="name"
              item-value="id"
              hide-no-data
              hide-selected
              label="Rezept"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getRecipeList();
  },
  data() {
    return {
      productName: "",
      recipeList: [{}],
      recipeID: null,
    };
  },
  methods: {
    getRecipeList() {
      this.axios.get("recipes/").then((response) => {
        this.recipeList = response.data.results;
      });
    },
    postProduct: function () {
      axios.post("products/", {
        name: this.productName,
        recipe: this.recipeID.id,
      });
    },
  },
};
</script>
