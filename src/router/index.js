import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/rohstoffe",
    name: "Rohstoffe",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/ingredient/Ingredients.vue"),
  },
  {
    path: "/rohstoffe/neuer-rohstoff",
    name: "Neuer Rohstoffe",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/ingredient/NewIngredient.vue"),
  },
  {
    path: "/rohstoffe/:ingredientSlug",
    name: "Rohstoff bearbeiten",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/ingredient/EditIngredient.vue"),
  },
  {
    path: "/rezepte",
    name: "Rezepte",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/recipe/Recipe.vue"),
  },
  {
    path: "/rezepte/neues-rezept",
    name: "Neues Rezept",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/recipe/NewRecipe.vue"),
  },
  {
    path: "/rezepte/:recipeSlug",
    name: "RezepteDetail",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/recipe/RecipeDetail.vue"),
  },
  {
    path: "/produktherstellung/:production_id/",
    name: "Produktherstellung Detail",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/ProductMakingDetail.vue"),
  },
  {
    path: "/produkt",
    name: "Produkt",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/product/Product.vue"),
  },
  {
    path: "/produkt/neues-produkt",
    name: "Neues Produkt",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/product/NewProduct.vue"),
  },
  {
    path: "/bestellungen",
    name: "Bestellungen",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/order/Orders.vue"),
  },
  {
    path: "/bestellübersicht",
    name: "Bestellübersicht",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/OrderOverview.vue"),
  },
  {
    path: "/teigmischen",
    name: "Teig mischen",
    meta: {
      title: "Rezeptcomputer",
      requiresAuth: true,
    },
    component: () => import("../views/DoughMixing.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
