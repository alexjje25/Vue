import Vue from "vue";
import Vuex from "vuex";
import adminStore from "./admin/index.js";
import authStore from "./auth/index.js";
import fazendaStore from "./fazenda/index.js";
import resource from "./resource.js";
import representanteStore from "./representante";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rota: "/",
    impress: false,
    impressList: [],
    impressType: [],
    impressDataBin: {}
  },
  mutations: {
    mudaRota(state, payload) {
      state.rota = payload;
    },
    SET_IMPRESS(state, pay) {
      state.impress = pay;
    },
    SET_IMPRESS_LIST(state, pay) {
      state.impressList = pay;
    },
    SET_IMPRESS_TYPE(state, pay) {
      state.impressType = pay;
    },
    SET_IMPRESS_DATABIN(state, pay) {
      state.impressDataBin = pay;
    }
  },
  getters: {
    GET_IMPRESS(state) {
      return state.impress;
    },
    GET_IMPRESS_LIST(state) {
      return state.impressList;
    },
    GET_IMPRESS_TYPE(state) {
      return state.impressType;
    },
    GET_IMPRESS_DATABIN(state) {
      return state.impressDataBin;
    }
  },
  actions: {},
  modules: {
    admin: adminStore,
    auth: authStore,
    fazenda: fazendaStore,
    resource: resource,
    representante: representanteStore
  }
});
