import store from "@/store/index";

const notify = {
  methods: {
    setNotify(payload) {
      let statusOp;
      if (payload.status == null || payload.status == undefined) {
        statusOp = true;
      } else {
        statusOp = payload.status;
      }
      store.commit("resource/SET_NOTIFY", {
        status: statusOp,
        mensagem: payload.mensagem,
        lista: payload.lista | null,
        type: payload.type
      });
    },
    getNotify() {
      return store.getters["resource/GET_NOTIFY"];
    }
  }
};

export { notify };
