<template>
  <div>
    <v-app-bar app color="primary" flat dense>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold white--text"
        >JB Brothandwerk</v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer
      mobile-breakpoint="0"
      floating
      v-model="drawer"
      app
      class="grey lighten-3"
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          permanent
          expand-on-hover
          router
          :to="item.route"
          active-class="white--text selected-nav"
        >
          <v-list-item-icon>
            <v-icon class>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-navigation
      :input-value="showNav"
      heigt="60px"
      :value="activeBtn"
      color="primary"
      app
    >
      <v-btn to="/bestellübersicht" class="mx-4">
        <span>Bestellübersicht</span>
        <v-icon>fa-calendar</v-icon>
      </v-btn>
      <v-btn to="/teigmischen" class="mx-4 mb-4">
        <span>Teig mischen</span>
        <v-icon>fas fa-blender</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    dialog: false,
    drawer: false,
    activeBtn: 0,
    showNav: true,
    items: [
      {
        icon: "fab fa-pagelines",
        text: "Rohstoffe",
        route: "/rohstoffe",
      },
      {
        icon: "mdi-file-document",
        text: "Rezepte",
        route: "/rezepte",
      },
      { icon: "mdi-bread-slice", text: "Produkte", route: "/produkt" },
      {
        icon: "mdi-calendar",
        text: "Bestellungen",
        route: "/bestellungen",
      },
    ],
  }),
};
</script>

<style scoped>
.selected-nav {
  background-color: #001871 !important;
  color: white !important;
}
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
