<template>
  <div id="productMakingDetail">
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
      <v-row>
        <v-col>
          <h1>Rezept verwiegung von {{ tableData[0].rezept_name }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p class="my-2 text-h6">Mischzeit</p>
          <p class="my-1 font-weight-medium">1 Gang: {{ recipe.mixTimeOne }}</p>
          <p class="my-1 font-weight-medium">2 Gang: {{ recipe.mixTimeTwo }}</p>
        </v-col>
        <v-col cols="6">
          <p class="my-2 text-h6">Soll Teigtemperatur</p>
          <p class="my-1 font-weight-medium">{{ recipe.temperatur }} Grad</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-data-table
              v-model="selected"
              :items="tableData"
              :disable-select-all="true"
              :headers="tableHeader"
              show-select
              hide-default-footer
              :itemsPerPage="100"
              @input="allChecked($event)"
              @item-selected="changeStatus"
            >
              <template v-slot:header.data-table-select></template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            depressed
            :disabled="!valid"
            large
            @click="$router.go(-1)"
            class="float-right"
            color="primary"
            >Fertigstellen</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getRecipeToMake();
    this.getProductionList();
  },
  methods: {
    genSelected: function (data) {
      for (var item in data) {
        if (data[item].checked == true) {
          this.selected.push(data[item]);
        }
      }
    },
    changeStatus: function (item) {
      var payload = {
        date: new Date().toISOString(),
        amount: item.item.menge,
        checked: item.value,
        data: null,
        production: this.ProductionID,
        ingredient: item.item.rohstoff_id,
        unit: item.item.einheit_id,
      };
      if (item.item.checked == null) {
        this.postProductionIngredient(payload);
      } else {
        this.updateProductionIngredient(item, payload);
      }
    },
    updateProductionIngredient: function (item, payload) {
      this.axios.patch(
        "productioningredient/" + item.item.production_ingredient_id + "/",
        payload
      );
    },
    postProductionIngredient: function (payload) {
      this.axios.post("productioningredient/", payload).then((response) => {
        console.log(response);
        this.getRecipeToMake();
      });
    },
    getRecipe: function (slug) {
      this.axios.get("recipes/" + slug + "/").then((response) => {
        this.recipe = response.data;
      });
    },
    getProductionList: function () {
      this.axios
        .get("production/" + this.ProductionID + "/")
        .then((response) => {
          this.productionList = response.data;
        });
    },
    updateProduction: function (bool) {
      let payload = {
        checked: bool,
      };
      this.axios.patch("production/" + this.ProductionID + "/", payload);
    },
    getRecipeToMake: function () {
      this.axios
        .get("make/" + this.$route.params.production_id + "/")
        .then((response) => {
          this.tableData = response.data;
          this.getRecipe(response.data[0].slug);
          this.genSelected(response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    allChecked: function () {
      if (this.selected.length == this.tableData.length) {
        this.valid = true;
        this.updateProduction(true);
      } else {
        this.updateProduction(false);
        this.valid = false;
      }
    },
  },
  data() {
    return {
      selected: [],
      valid: false,
      date: new Date().toISOString().substr(0, 10),
      tllcime: new Date().toTimeString().split(" ")[0],
      tableData: [{}],
      mixTimeOne: "",
      productionList: [{}],
      recipe: [{}],
      ProductionID: this.$route.params.production_id,
      tableHeader: [
        {
          text: "Zutat",
          value: "rohstoff_name",
          sortable: false,
        },
        {
          text: "Menge",
          value: "menge",
          align: "right",
          sortable: false,
        },
        {
          text: "Einheit",
          value: "einheit",
          sortable: false,
        },
      ],
    };
  },
};
</script>
