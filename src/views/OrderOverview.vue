<template>
  <div id="Productionlist">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2 font-weight-bold">Bestellübersicht</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-data-table
              hide-details
              hide-default-footer
              class="font-weight-bold"
              groupBy="mischdatum_tag"
              :groupDesc="true"
              :headers="productsToMakeHeader"
              :items="productsToMake"
              @click:row="produceItem"
            >
              <template v-slot:group.header="{ group, headers }">
                <td class="test" :colspan="headers.length">
                  <span style="font-weight: bold;">
                    {{ group }}
                  </span>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="1000">
        <v-card>
          <v-card-title class="headline font-weight-bold">
            {{ selected.rezept }} am
            {{ selected.produktionsdatum | formatDate }}
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-row>
              <v-col cols="6">
                wird aufgeteilt in folgende Chargen:
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <template v-for="(item, index) in productionCharge">
                  <p v-bind:key="index" class="font-weight'bold">
                    Charge {{ index + 1 }}: Menge: {{ item.amount }}
                  </p>
                </template>
              </v-col>
              <v-col cols="3">
                <v-btn @click="changeCharge('-')" depressed>
                  <v-icon left>fas fa-minus</v-icon>
                  Menge verringern</v-btn
                >
              </v-col>
              <v-col cols="3">
                <v-btn @click="changeCharge('+')" depressed color="primary">
                  <v-icon left>fas fa-plus</v-icon>
                  Menge herhöhen</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed x-large @click="dialog = false">Abbruch</v-btn>
            <v-btn
              color="primary"
              x-large
              depressed
              @click="
                dialog = false;
                postProductionHelper(productionCharge);
              "
              >Herstellen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  created() {
    this.getProductionList();
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
  },
  computed: {
    getOrderIDList: function (OrderIDString) {
      return new String(OrderIDString).split("");
    },
    createCharge: function () {
      let list = [];
      let chargeMenge = this.selected.chargemenge;
      let amount = this.selected.menge;
      if (amount > chargeMenge) {
        var count = Math.ceil(amount / chargeMenge);
        var AVGAmount = Math.round((amount * 100) / count) / 100;
        for (var i = 0; i < count; i++) {
          list.push({
            created: new Date().toISOString(),
            bake_date: this.selected.backdatum,
            mix_date: this.selected.mischdatum,
            checked: false,
            orders: this.selected.orderid,
            amount: AVGAmount,
            recipe: this.selected.rezeptid,
            unit: this.selected.einheitid,
          });
        }
      } else {
        list.push({
          created: new Date().toISOString(),
          bake_date: this.selected.backdatum,
          mix_date: this.selected.mischdatum,
          checked: false,
          orders: this.selected.orderid,
          amount: this.selected.menge,
          recipe: this.selected.rezeptid,
          unit: this.selected.einheitid,
        });
      }
      return list;
    },
  },
  methods: {
    changeCharge(operator) {
      for (var item in this.productionCharge) {
        if (operator == "-") {
          this.productionCharge[item].amount--;
        } else {
          this.productionCharge[item].amount++;
        }
        this.productionCharge[item].amount =
          Math.round(this.productionCharge[item].amount * 1000) / 1000;
      }
    },
    postProductionHelper: function (list) {
      for (var item in list) {
        this.postProduction(list[item]);
      }
    },
    postProduction: function (payload) {
      this.axios.post("production/", payload).then(() => {
        this.getProductionList();
      });
    },
    produceItem: function (item) {
      this.selected = item;
      this.productionCharge = this.createCharge;
      this.dialog = true;
    },
    getProductionList: function () {
      this.axios
        .get("orderoverviewList/")
        .then((response) => {
          this.productsToMake = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data() {
    return {
      product: null,
      dialog: false,
      productionCharge: [{}],
      productData: null,
      status: false,
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toTimeString().split(" ")[0],
      productsToMake: [{}],
      selected: "",
      productsToMakeHeader: [
        {
          text: "Mischdatum",
          value: "mischdatum_tag",
          class: "th-right",
        },
        {
          text: "Rezept",
          value: "rezept",
          sortable: false,
          class: "th",
          align: "start",
        },
        {
          text: "Menge",
          value: "menge",
          class: "th",
          align: "right",
          sortable: false,
        },
        {
          text: "Einheit",
          value: "einheit",
          class: "th",
          align: "left",
          sortable: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* ::v-deep .v-data-table-header {
  background-color: black;
}

::v-deep th {
  color: white !important;
  border-radius: 5px;
} */
</style>
