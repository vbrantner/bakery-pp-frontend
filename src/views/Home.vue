<template>
  <div name="Home">
    <v-container>
      <h1>
        Übersichtsseite
      </h1>
      <v-card>
        <v-card-title>
          Temperatursensoren
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  created: function () {
    this.getTempSensorList();
  },
  methods: {
    getTempSensorList() {
      this.axios.get("temperaturesensor/").then((response) => {
        this.temperaturSensorData = response.data.results;
      });
    },
  },
  data: () => ({
    temperaturSensorData: [{}],
  }),
};
</script>
