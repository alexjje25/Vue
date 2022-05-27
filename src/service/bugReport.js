import { serverErros } from "@/database.js";

import store from "@/store/index.js";
//import route from "@/router/index.js";

const reportarBug = function(mensagem) {
  let response = {
    rota: window.location.pathname,
    token: store.getters["auth/TOKEN"],
    fazenda: store.getters["auth/GET_FAZENDA"],
    mensagem: mensagem
  };
  serverErros.push(response, () => {
    store.commit("resource/SET_NOTIFY", {
      mensagem: "Suporte ao erro enviado com sucesso.",
      type: "info",
      status: true
    });
  });
};

export { reportarBug };
