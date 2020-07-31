<template>
  <v-bottom-navigation
    :input-value="showNav"
    :value="activeBtn"
    color="primary"
    app
  >
    <v-btn to="/produktionsliste" class="pa-1 mx-1" x-large outlined>
      <span>Produktionsliste</span>
      <v-icon>fa-calendar</v-icon>
    </v-btn>
    <v-btn to="/teigmischen" class="pa-1 mx-1" x-large outlined>
      <span>Teig mischen</span>
      <v-icon>fas fa-blender</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      activeBtn: 1,
      showNav: true,
    };
  },

  computed: {},
};
</script>

<style scoped>
.v-item-group.v-bottom-navigation {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.v-item-group.v-bottom-navigation .v-btn {
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
</style>
