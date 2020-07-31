import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/sass/main.scss"`,
        },
      },
    },
    themes: {
      light: {
        primary: "#001871",
      },
    },
  },
});
