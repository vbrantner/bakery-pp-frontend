<template>
  <div id="recipeDetail">
    <v-container>
      <v-btn
        depressed
        color="primary"
        large
        class="my-2"
        @click="$router.go(-1)"
      >
        <v-icon left>fas fa-arrow-left</v-icon>Zurück
      </v-btn>
      <h1>Rezeptansicht - {{ recipeDetail.name }}</h1>
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
                  required
                  suffix="Tag/Stunden"
                  placeholder="24:00:00"
                ></v-text-field>
              </v-form>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  class="font-weight-bold"
                  outlined
                  v-model="chargeAmount"
                  clearable
                  suffix="kg"
                  label="Chargengröße"
                  required
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
                  suffix="Minuten"
                  label="Mischzeit 1"
                  placeholder="10:00"
                  required
                ></v-text-field>
              </v-form>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  class="font-weight-bold"
                  outlined
                  v-model="mixTimeTwo"
                  clearable
                  label="Mischzeit 2"
                  suffix="Minuten"
                  placeholder="10:00"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-right">
                <v-btn large depressed @click="patchRecipe()" color="primary"
                  >Speichern</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-5" outlined>
            <v-row>
              <v-col>
                <DialogNewIngredient
                  :getRecipe="getRecipe"
                  :recipeID="recipeDetail.id"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="ingredientTableHeader"
                  :items="recipeDetail.ingredients"
                  sortBy="id"
                  hide-default-footer
                  itemsPerPage="100"
                  height="600"
                  fixed-header
                  class="font-weight-bold"
                >
                  <template v-slot:item.temperatur="{ item }">
                    <v-text-field
                      class="mt-3"
                      @input="patchIngredientTemperatur(item)"
                      dense
                      outlined
                      suffix="°C"
                      v-model="item.temperatur"
                    ></v-text-field>
                  </template>
                  <template v-slot:item.action-delete="{ item }">
                    <v-icon large @click="deleteIngredient(item)"
                      >mdi-delete</v-icon
                    >
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DialogNewIngredient from "@/components/DialogNewIngredient";

export default {
  components: { DialogNewIngredient },
  created() {
    this.getRecipe();
  },
  methods: {
    log: function (item) {
      console.log(item);
    },
    patchIngredientTemperatur(item) {
      const recipeIngredientID = item.id;
      const recipeIngredientTemperatur = item.temperatur;
      const payload = {
        temperatur: recipeIngredientTemperatur,
      };
      this.axios.patch("recipeingredient/" + recipeIngredientID + "/", payload);
    },
    deleteIngredient(item) {
      this.axios
        .delete("recipeingredient/" + item.id + "/")
        .then((response) => {
          console.log(response);
          this.getRecipe();
        });
    },
    patchRecipe: function () {
      const payload = {
        name: this.recipeName,
        temperatur: this.temperatur,
        mixTimeOne: this.mixTimeOne,
        mixTimeTwo: this.mixTimeTwo,
        rest: this.rest,
        charge_amount: this.chargeAmount,
      };
      this.axios.patch("/recipes/" + this.slug + "/", payload);
    },
    getRecipe: function () {
      this.axios
        .get("recipes/" + this.slug + "/")
        .then((response) => {
          this.recipeDetail = response.data;
          this.recipeName = response.data.name;
          this.temperatur = response.data.temperatur;
          this.rest = response.data.rest;
          this.mixTimeOne = response.data.mixTimeOne;
          this.mixTimeTwo = response.data.mixTimeTwo;
          this.chargeAmount = response.data.charge_amount;
          return response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data() {
    return {
      valid: true,
      recipeDetail: [],
      recipeName: "",
      description: "",
      categories: [],
      categoryID: "",
      rest: "",
      mixTimeOne: "",
      mixTimeTwo: "",
      chargeAmount: "",
      temperatur: "",
      ingredientTableHeader: [
        {
          text: "Zutat",
          value: "ingredient_name",
        },
        {
          text: "Menge",
          value: "amount",
          align: "end",
        },
        {
          text: "Einheit",
          value: "unit_name",
        },
        {
          text: "Ist-Temperatur",
          value: "temperatur",
          width: "10%",
        },
        {
          text: "Löschen",
          value: "action-delete",
        },
      ],
      slug: this.$route.params.recipeSlug,
    };
  },
};
</script>
