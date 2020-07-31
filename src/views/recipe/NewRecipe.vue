<template>
  <v-container>
    <v-btn depressed color="primary" large class="my-2" @click="$router.go(-1)">
      <v-icon left>fas fa-arrow-left</v-icon>Zurück
    </v-btn>
    <div class="d-flex">
      <h1>Neues Rezept</h1>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!valid"
        depressed
        large
        @click="postRecipe()"
        >Speichern</v-btn
      >
    </div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="recipeName"
                    clearable
                    label="Rezeptname"
                    required
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="temperatur"
                    clearable
                    label="Teigtemperatur"
                    suffix="°C"
                    required
                  ></v-text-field>
                </v-form>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="rest"
                    clearable
                    label="Stehzeit"
                    suffix="Stunden"
                    placeholder="24:00:00"
                  ></v-text-field>
                </v-form>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="chargeAmount"
                    clearable
                    type="number"
                    suffix="kg"
                    label="Chargengröße"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="6">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="mixTimeOne"
                    clearable
                    label="Mischzeit 1"
                    suffix="Minuten"
                    placeholder="10:00"
                  ></v-text-field>
                </v-form>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="font-weight-bold"
                    outlined
                    v-model="mixTimeTwo"
                    clearable
                    suffix="Minuten"
                    label="Mischzeit 2"
                    placeholder="10:00"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getCategorys();
  },
  data() {
    return {
      valid: true,
      recipeName: "",
      categories: [],
      categoryID: "",
      rest: null,
      mixTimeOne: null,
      mixTimeTwo: null,
      chargeAmount: null,
      temperatur: null,
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    getCategorys: function () {
      axios
        .get("categories/")
        .then((response) => {
          this.categories = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    postRecipe: function () {
      let payload = {
        name: this.recipeName,
        temperatur: this.temperatur,
        data: null,
        mixTimeOne: this.mixTimeOne,
        mixTimeTwo: this.mixTimeTwo,
        rest: this.rest,
        charge_amount: this.chargeAmount,
        charge_unit: 1,
      };
      axios.post("recipes/", payload).then((resolve) => {
        console.log(resolve);
        this.$router.go(-1);
      });
    },
  },
};
</script>
