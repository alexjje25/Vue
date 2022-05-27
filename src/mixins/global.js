import store from "@/store/index.js";

const GET_NIVEL = {
  computed: {
    GET_NIVEL() {
      return store.getters["auth/GET_NIVEL"];
    }
  }
};

export { GET_NIVEL };
