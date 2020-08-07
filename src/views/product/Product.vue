<template>
  <div id="product">
    <v-container>
      <h1>Produktverwaltung</h1>
      <v-row>
        <v-col cols="12">
          <v-btn depressed large color="primary" to="/produkt/neues-produkt"
            >Neues Produkt</v-btn
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
              :headers="productListHeaders"
              :items="productList"
              :search="search"
              :sort-by="['id']"
              class="font-weight-bold"
              hide-default-footer
              itemsPerPage="100"
              height="600"
              fixed-header
            >
              <template v-slot:item.action-edit="{ item }">
                <v-icon large @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </template>
              <template v-slot:item.action-delete="{ item }">
                <v-icon large @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialogEdit" max-width="800">
        <v-card>
          <v-card-title class="headline"
            >Änderung am Produkt: {{ productName }}</v-card-title
          >
          <v-card-text>
            <v-text-field v-model="productName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" depressed @click="dialogEdit = false">
              Abbrechen
            </v-btn>
            <v-btn color="primary" depressed @click="patchProduct()">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="800">
        <v-card>
          <v-card-title class="headline"
            >Produkt {{ productName }} wirklich löschen?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey darken-1"
              depressed
              @click="dialogDelete = false"
            >
              Abbrechen
            </v-btn>
            <v-btn color="primary" depressed @click="deleteProduct()">
              Löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getProductList();
  },
  methods: {
    deleteProduct: function () {
      this.axios.delete("products/" + this.productID + "/").then(() => {
        this.getProductList();
      });
      this.dialogDelete = false;
    },
    getProduct: function (item) {
      this.axios.get("products/" + item.id + "/").then((response) => {
        console.log(response);
        this.productName = response.data.name;
        this.productID = response.data.id;
      });
    },
    patchIngredient: function () {
      const payload = {
        name: this.productName,
      };
      this.axios
        .patch("products/" + this.productName + "/", payload)
        .then((response) => {
          console.log(response);
          this.getProductList();
          this.dialogEdit = false;
        });
    },
    editItem: function (item) {
      console.log(item);
      this.getProduct(item);
      this.dialogEdit = true;
    },
    deleteItem: function (item) {
      console.log(item);
      this.getProduct(item);
      this.dialogDelete = true;
    },
    rowClick: function (value) {
      console.log(value);
    },
    getProductList: function () {
      this.axios
        .get("products/")
        .then((response) => {
          this.productList = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  beforeDestroy() {},
  data() {
    return {
      dialogEdit: false,
      dialogDelete: false,
      search: "",
      polling: null,
      productName: null,
      productID: null,
      productListHeaders: [
        {
          text: "Nr.",
          value: "id",
          width: "5%",
          sortable: false,
        },
        {
          text: "Produktname",
          value: "name",
          sortable: false,
        },
        {
          text: "Bearbeiten",
          value: "action-edit",
          sortable: false,
          align: "center",
        },
        {
          text: "Löschen",
          value: "action-delete",
          sortable: false,
          align: "center",
        },
      ],
      productList: [],
    };
  },
};
</script>

<style scoped></style>>
