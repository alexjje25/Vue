export default {
  ADD_USER(state, pay) {
    state.email = pay.email;
    state.authToken = pay.token;
  },
  UPDATE_USER(state, pay) {
    state.name = pay.name;
    state.type = pay.type;
    state.idFazenda = pay.idFazenda;
    state.telefone = pay.telefone;
    state.chave = pay.chave;
    state.nivel = pay.nivel;
  },
  REMOVE_USER(state) {
    state.nivel = 0;
    state.name = null;
    state.authToken = null;
    state.email = null;
    state.auth = false;
    state.type = null;
    state.chave = null;
    state.telefone = null;
    state.idFazenda = null;
  }
};
