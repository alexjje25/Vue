export default {
  namespaced: true,
  state: {
    notify: {
      mensagem: "Parabéns você se conectou com sucesso!",
      status: true,
      type: "sucess",
      lista: []
    },
    pragas: {
      especies: [],
      tipos: [],
      estagios: []
    }
  },
  getters: {
    GET_NOTIFY(state) {
      return state.notify;
    }
  },
  mutations: {
    SET_NOTIFY(state, payload) {
      state.notify.mensagem = payload.mensagem;
      state.notify.status = payload.status;
      if (payload.lista) {
        state.notify.lista = payload.lista;
      }
      if (!payload.lista || payload.lista == null) {
        state.notify.lista = [];
      }
      if (payload.type) {
        state.notify.type = payload.type;
      }
      if (!payload.type) {
        state.notify.type = "info";
      }
    },
    SKY_FALL(state) {
      state.pragas.especies = [];
      state.pragas.tipos = [];
      state.pragas.estagios = [];
    },
    SET_PRAGA_TIPO(state, payload) {
      state.pragas.tipos.push(payload);
    },
    SET_PRAGA_ESPECIE(state, payload) {
      state.pragas.especies.push(payload);
    },
    SET_PRAGA_ESTAGIO(state, payload) {
      state.pragas.estagios.push(payload);
    }
  }
};
