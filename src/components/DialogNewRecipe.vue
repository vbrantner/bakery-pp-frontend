<template>
  <div id="newRecipeDialog">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn dark v-on="on">Neues Rezept</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Neues Rezept</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="recipeName"
                  label="Rezeptname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  label="Beschreibung"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Kategorie" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="
              dialog = false;
              saveNewRecipe();
            "
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    recipeName: "test",
    description: "",
    category: "",
    dialog: false,
  }),
  methods: {
    saveNewRecipe: function () {
      axios.post("http://localhost:8000/api/recipes/", {
        name: this.recipeName,
        description: this.description,
        category: 1,
      });
    },
  },
};
</script>
