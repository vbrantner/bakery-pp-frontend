<template>
  <v-container>
    <v-btn depressed color="primary" large class="my-2" @click="$router.go(-1)">
      <v-icon left>fas fa-arrow-left</v-icon>Zurück
    </v-btn>
    <div class="d-flex">
      <h1>Rohstoff bearbeiten</h1>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        depressed
        large
        class="ml-auto"
        @click="
          saveNewIngredient();
          $router.go(-1);
        "
        >Speichern</v-btn
      >
    </div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                outlined
                v-model="ingredientName"
                clearable
                label="Rezeptname"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {},
  data() {
    return {
      ingredientName: "",
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    getIngredient: function () {
      axios.get("ingredients/");
    },
    saveNewIngredient: function () {
      axios.post("ingredients/", {
        name: this.ingredientName,
      });
    },
  },
};
</script>
