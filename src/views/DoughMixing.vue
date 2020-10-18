<template>
  <div id="Productionlist">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2 font-weight-bold">
            List der herzustellenden Teige
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="my-1">
            <v-btn depressed color="light-green lighten-3"></v-btn>bedeutet,
            dass Teig fertig herstellt wurde.
          </div>
          <div class="my-1">
            <v-btn depressed color="yellow lighten-3"></v-btn>bedeutet, dass der
            Mischvorgang angefangen hat.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-data-table
              hide-details
              hide-default-footer
              :headers="mixingDataHeader"
              :items="mixingData"
              :item-class="itemClasses"
              disable-pagination
              groupBy="mischdatum"
              class="font-weight-bold"
              @click:row="makeRecipe"
            >
              <template v-slot:item.action-delete="{ item }">
                <v-icon large @click.stop="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
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
        return moment(String(value)).format("MM.DD.YYYY");
      }
    },
  },
  methods: {
    deleteItem(item) {
      const productionID = item.production_id;
      confirm("Are you sure you want to delete this item?") &&
        this.axios.delete(`production/${productionID}/`).then(() => {
          this.getProductionList();
        });
    },
    itemClasses: function (item) {
      if (item.misch_status == true && item.teig_status == false) {
        return "yellow lighten-3";
      } else if (item.misch_status == true && item.teig_status == true) {
        return "light-green lighten-3";
      } else {
        return "";
      }
    },
    makeRecipe: function (item) {
      this.$router.push("produktherstellung/" + item.production_id + "/");
    },
    getProductionList: function () {
      this.axios
        .get("mixinglist/")
        .then((response) => {
          this.mixingData = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data() {
    return {
      mixingData: [{}],
      mixingDataHeader: [
        {
          text: "Rezept",
          value: "rezeptname",
          sortable: false,
          class: "th-left",
        },
        {
          text: "Charge",
          value: "charge",
          sortable: false,
          class: "th",
          align: "left",
        },
        {
          text: "Mischdatum",
          value: "mischdatum",
          sortable: false,
          class: "th",
          align: "left",
        },
        {
          text: "Menge",
          value: "menge",
          sortable: false,
          class: "th",
          align: "right",
        },
        {
          text: "Einheit",
          value: "einheit",
          sortable: false,
          class: "th",
          align: "left",
        },
        {
          text: "Löschen",
          value: "action-delete",
          sortable: false,
          align: "center",
        },
      ],
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toTimeString().split(" ")[0],
    };
  },
};
</script>

<style></style>
