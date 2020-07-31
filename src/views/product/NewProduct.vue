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
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                outlined
                v-model="productName"
                clearable
                label="Produktname"
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
      productName: "",
    };
  },
  methods: {
    postProduct: function () {
      axios.post("products/", {
        name: this.productName,
      });
    },
  },
};
</script>
