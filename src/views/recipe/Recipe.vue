<template>
  <div id="recipe">
    <v-container>
      <h1>Rezeptverwaltung</h1>
      <v-row>
        <v-col cols="12">
          <v-btn depressed large color="primary" to="/rezepte/neues-rezept"
            >Neues Rezept</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Suche"
            hide-details
            outlined
            clearable
            class="font-weight-bold"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card outlined>
            <v-data-table
              :headers="recipeListHeaders"
              :items="recipesList"
              :search="search"
              :sort-by="['id']"
              hide-default-footer
              @click:row="handleClick"
              class="font-weight-bold"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getRecipesList();
  },
  methods: {
    handleClick: function (value) {
      this.$router.push({
        name: "RezepteDetail",
        params: { recipeSlug: value.slug },
      });
    },
    deleteRecipe: function (recipe) {
      const index = this.recipesList.indexOf(recipe);
      console.log(index);
    },
    editRecipe: function (recipe) {
      console.log(recipe);
    },
    getRecipesList: function () {
      axios
        .get("recipes/")
        .then((response) => {
          this.recipesList = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data() {
    return {
      search: "",
      polling: null,
      recipeListHeaders: [
        {
          text: "Nr.",
          value: "id",
          width: "5%",
          sortable: false,
        },
        {
          text: "Rezeptname",
          value: "name",
          sortable: false,
        },
      ],
      recipesList: [],
    };
  },
};
</script>

<style></style>
