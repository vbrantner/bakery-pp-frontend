<template>
  <div id="recipe">
    <v-container>
      <h1>Rohstoffverwaltung</h1>
      <v-row>
        <v-col cols="12">
          <v-btn depressed large color="primary" to="/rohstoffe/neuer-rohstoff"
            >Neuer Rohstoff</v-btn
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
              :headers="ingredientListHeaders"
              :items="ingredientList"
              itemsPerPage="100"
              height="600"
              fixed-header
              hide-default-footer
              :search="search"
              :sort-by="['id']"
              class="font-weight-bold"
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
            >Änderung am Rohstoff: {{ ingredientName }}</v-card-title
          >
          <v-card-text>
            <v-text-field v-model="ingredientName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" depressed @click="dialogEdit = false">
              Abbrechen
            </v-btn>
            <v-btn color="primary" depressed @click="patchIngredient()">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="800">
        <v-card>
          <v-card-title class="headline"
            >Rohstoff {{ ingredientName }} wirklich löschen?</v-card-title
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
            <v-btn color="primary" depressed @click="deleteIngredient()">
              Löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getIngredientList();
  },
  methods: {
    deleteIngredient: function () {
      this.axios
        .delete("ingredients/" + this.ingredientID + "/")
        .then((response) => {
          console.log(response);
          this.getIngredientList();
        });
      this.dialogDelete = false;
    },
    getIngredient: function (item) {
      this.axios.get("ingredients/" + item.id + "/").then((response) => {
        console.log(response);
        this.ingredientName = response.data.name;
        this.ingredientID = response.data.id;
      });
    },
    patchIngredient: function () {
      const payload = {
        name: this.ingredientName,
      };
      this.axios
        .patch("ingredients/" + this.ingredientID + "/", payload)
        .then((response) => {
          console.log(response);
          this.getIngredientList();
          this.dialogEdit = false;
        });
    },
    editItem: function (item) {
      console.log(item);
      this.getIngredient(item);
      this.dialogEdit = true;
    },
    deleteItem: function (item) {
      console.log(item);
      this.getIngredient(item);
      this.dialogDelete = true;
    },
    rowClick: function (value) {
      console.log(value);
    },
    getIngredientList: function () {
      axios
        .get("ingredients/")
        .then((response) => {
          this.ingredientList = response.data.results;
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
      ingredientName: null,
      ingredientID: null,
      ingredientListHeaders: [
        {
          text: "Nr.",
          value: "id",
          width: "5%",
          sortable: false,
        },
        {
          text: "Rohstoffname",
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
      ingredientList: [],
    };
  },
};
</script>

<style scoped></style>>
