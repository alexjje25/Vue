export default {
  GET_TALHOES(state) {
    return state.talhoes;
  },
  GET_COLORS(state) {
    return state.colors;
  },
  getUsers(state) {
    return state.users;
  },
  getUsersAngolas(state) {
    return state.usersAngolas;
  },
  filterUsersType: state => type => {
    return state.users.filter(user => user.dados.type == type);
  },
  GET_PRAGAS_TIPO(state) {
    return state.pragasTipo;
  },
  GET_PRAGAS_ESPECIE(state) {
    return state.pragasEspecie;
  },
  GET_PRAGAS_ESTAGIO(state) {
    return state.pragasEstagio;
  },
  GET_DANINHAS_TIPO(state) {
    return state.daninhasTipo;
  },
  GET_DANINHAS_ESPECIE(state) {
    return state.daninhasEspecie;
  },
  GET_DANINHAS_ESTAGIO(state) {
    return state.daninhasEstagio;
  },
  GET_DOENCAS_TIPO(state) {
    return state.doencasTipo;
  },
  GET_DOENCAS_ESPECIE(state) {
    return state.doencasEspecie;
  },
  GET_DOENCAS_ESTAGIO(state) {
    return state.doencasEstagio;
  },
  GET_ARMADILHAS_TIPO(state) {
    return state.armadilhasTipo;
  },
  GET_ARMADILHAS_ESPECIE(state) {
    return state.armadilhasEspecie;
  },
  GET_ARMADILHAS_ESTAGIO(state) {
    return state.armadilhasEstagio;
  },
  GET_FAZENDAS(state) {
    return state.fazendas;
  },
  GET_FAZENDAS_ANGOLAS(state) {
    return state.fazendasAngolas;
  },
  GET_CLIENTES(state) {
    return state.clientes;
  },
  GET_CLIENTES_ANGOLAS(state) {   
    return state.clientesAngolas;
  },
  GET_LEADS_SCHOOL(state) {
    return state.schoolLeads;
  },
  GET_LEADS_FRANQUIA(state) {
    return state.franquia;
  }
};
