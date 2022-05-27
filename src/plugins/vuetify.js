import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import pt from "vuetify/es5/locale/pt";


Vue.use(Vuetify)

const opts = {
  lang: {
    locales: { pt },
    current: "pt"
  },
  theme: {
    themes: {
      theme: {
        themes: {
          light: {
            primary: "rgb(0, 107, 44)",
            secondary: "#b0bec5",
            accent: "#8c9eff",
            error: "#b71c1c"
          }
        }
      }
    }
  }
}

export default new Vuetify(opts)
