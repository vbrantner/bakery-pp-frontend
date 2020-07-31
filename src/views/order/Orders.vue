<template>
  <div id="recipe">
    <v-container>
      <h1>Bestellungen</h1>
      <v-row>
        <v-col cols="12">
          <v-btn depressed large color="primary" @click="dialog = true"
            >Neue Bestellung</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card outlined>
            <v-data-table
              :headers="orderListHeader"
              :items="orderList"
              sortBy="date"
              :sortDesc="true"
              :groupDesc="true"
              class="font-weight-bold"
              group-by="date"
            >
              <template v-slot:group.header="{ group, headers }">
                <td class="test" :colspan="headers.length">
                  <span style="font-weight: bold;">
                    {{ group | formatDate }}
                  </span>
                </td>
              </template>
              <template v-slot:item.action-delete="{ item }">
                <v-icon large @click="deleteOrder(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="800">
        <v-card>
          <v-card-title class="headline">Neue Bestellung</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="orderProductID"
                  :items="productList"
                  item-text="name"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  placeholder="Produktname"
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="orderAmount"
                  label="Menge"
                  type="Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-date-picker
                  first-day-of-week="1"
                  color="primary"
                  v-model="picker"
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" depressed @click="dialog = false"
              >Abbrechen</v-btn
            >
            <v-btn
              color="primary"
              depressed
              @click="
                dialog = false;
                postOrder();
              "
              >Bestellung anlegen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbar"
        color="light-green darken-1"
        :timeout="4000"
        :top="true"
        :vertical="true"
        >Erfolgreich gelöscht!</v-snackbar
      >
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  created() {
    this.getOrderList();
    this.getProductList();
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
  },
  methods: {
    deleteOrder: function (item) {
      console.log(item);
      this.axios.delete("orders/" + item.id + "/").then((response) => {
        console.log(response);
        this.snackbar = true;
        this.getOrderList();
      });
    },
    postOrder: function () {
      const payload = {
        date: this.picker,
        amount: this.orderAmount,
        product: this.orderProductID.id,
        unit: 1,
      };
      this.axios.post("orders/", payload).then((response) => {
        console.log(response);
        this.getOrderList();
      });
    },
    getProductList: function () {
      this.axios.get("products/").then((response) => {
        this.productList = response.data.results;
      });
    },
    getOrderList: function () {
      axios
        .get("orders/")
        .then((response) => {
          this.orderList = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data() {
    return {
      productList: "",
      snackbar: false,
      picker: new Date().toISOString().substr(0, 10),
      dialog: false,
      orderDate: "",
      orderProductID: "",
      orderAmount: "",
      orderListHeader: [
        {
          text: "Lieferdatum",
          value: "date",
          sortable: false,
        },
        {
          text: "Tag",
          value: "day_name",
          sortable: false,
        },
        {
          text: "Produkt",
          value: "product_name",
          sortable: false,
        },
        {
          text: "Menge",
          value: "amount",
          sortable: false,
          align: "end",
        },
        {
          text: "Einheit",
          value: "unit_name",
          sortable: false,
        },
        // { text: "", value: "action-edit", sortable: false },
        { text: "", value: "action-delete", sortable: false },
      ],
      orderList: [],
    };
  },
};
</script>

<style scoped></style>>
