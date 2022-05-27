export default {
  CLEAR(state) {
    state.schoolLeads = [];
    state.franquia = [];
    state.clientes = [];
    state.clientesAngolas = [];
    state.fazendas = [];
    state.fazendasAngolas = [];
    state.users = [];
    state.usersAngolas = [];
    state.pragas = [];
    state.pragasTipo = [];
    state.pragasEspecie = [];
    state.pragasEstagio = [];
    state.daninhasTipo = [];
    state.daninhasEspecie = [];
    state.daninhasEstagio = [];
    state.doencasTipo = [];
    state.doencasEspecie = [];
    state.doencasEstagio = [];
    state.colors = [];
    state.armadilhasEstagio = [];
    state.armadilhasEspecie = [];
    state.armadilhasTipo = [];
    state.talhoes = [];
  },
  SET_LEAD_SCHOOL(state, pay) {
    state.schoolLeads.push(pay);
  },
  UPDATE_LEAD_SCHOOL(state, pay) {
    state.schoolLeads.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.schoolLeads.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_LEAD_SCHOOL(state, chave) {
    state.schoolLeads.filter((item, index) => {
      if (item.chave == chave) {
        state.schoolLeads.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_LEAD_FRANQUIA(state, pay) {
    state.franquia.push(pay);
  },
  UPDATE_LEAD_FRANQUIA(state, pay) {
    state.franquia.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.schoolLeads.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_LEAD_FRANQUIA(state, chave) {
    state.franquia.filter((item, index) => {
      if (item.chave == chave) {
        state.franquia.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_TALHAO(state, pay) {
    state.talhoes.push(pay);
  },
  UPDATE_TALHAO(state, pay) {
    state.talhoes.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.talhoes.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_TALHAO(state, chave) {
    state.talhoes.filter((item, index) => {
      if (item.chave == chave) {
        state.talhoes.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_FAZENDA(state, pay) {
    state.fazendas.push(pay);
  },
  UPDATE_FAZENDA(state, pay) {
    state.fazendas.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.fazendas.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_FAZENDA(state, chave) {
    state.fazendas.filter((item, index) => {
      if (item.chave == chave) {
        state.fazendas.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  REMOVE_FAZENDA_ANGOLAS(state, chave) {
    state.fazendasAngolas.filter((item, index) => {
      if (item.chave == chave) {
        state.fazendasAngolas.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_CLIENTE(state, pay) {
    state.clientes.push(pay);
  },
  SET_CLIENTE_ANGOLAS(state, pay) {
    state.clientesAngolas.push(pay);
  },

  UPDATE_CLIENTE(state, pay) {
    state.clientes.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.clientes.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  UPDATE_CLIENTE_ANGOLAS(state, pay) {
    state.clientesAngolas.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.clientesAngolas.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },

  REMOVE_CLIENTE(state, chave) {
    state.clientes.filter((item, index) => {
      if (item.chave == chave) {
        state.clientes.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  REMOVE_CLIENTE_ANGOLAS(state, chave) {
    state.clientesAngolas.filter((item, index) => {
      if (item.chave == chave) {
        state.clientesAngolas.splice(index, 1);
      } else {
        //nada
      }
    });
  },

  SKYFALL(state) {
    state.clientes = [];
    state.fazendas = [];
    state.users = [];
    state.pragasTipo = [];
    state.pragasEspecie = [];
    state.pragasEstagio = [];
    state.daninhasTipo = [];
    state.daninhasEspecie = [];
    state.daninhasEstagio = [];
    state.doencasTipo = [];
    state.doencasEspecie = [];
    state.doencasEstagio = [];
    state.colors = [];
  },
  SET_COLOR(state, pay) {
    state.colors.push(pay);
  },
  UPDATE_COLOR(state, pay) {
    state.colors.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.colors.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_COLOR(state, pay) {
    state.colors.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.colors.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  setFazenda(state, pay) {
    state.fazendas.push(pay);
  },
  updateFazenda(state, pay) {
    state.fazendas.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.fazendas.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  removeFazenda(state, chave) {
    state.fazendas.filter((item, index) => {
      if (item.chave == chave) {
        state.fazendas.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_USER(state, pay) {
    state.users.push(pay);
  },
  UPDATE_USER(state, pay) {
    state.users.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.users.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_USER(state, chave) {
    state.users.filter((item, index) => {
      if (item.chave == chave) {
        state.users.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_PRAGA_TIPO(state, pay) {
    state.pragasTipo.push(pay);
  },
  UPDATE_PRAGA_TIPO(state, pay) {
    state.pragasTipo.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.pragasTipo.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_PRAGA_TIPO(state, chave) {
    state.pragasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.pragasTipo.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_PRAGA_ESPECIE(state, pay) {
    state.pragasEspecie.push(pay);
  },
  UPDATE_PRAGA_ESPECIE(state, pay) {
    state.pragasEspecie.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.pragasEspecie.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_PRAGA_ESPECIE(state, chave) {
    state.pragasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.pragasEspecie.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_PRAGA_ESTAGIO(state, pay) {
    state.pragasEstagio.push(pay);
  },
  UPDATE_PRAGA_ESTAGIO(state, pay) {
    state.pragasEstagio.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.pragasEstagio.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_PRAGA_ESTAGIO(state, chave) {
    state.pragasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.pragasEstagio.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DANINHA_TIPO(state, pay) {
    state.daninhasTipo.push(pay);
  },
  UPDATE_DANINHA_TIPO(state, pay) {
    state.daninhasTipo.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.daninhasTipo.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DANINHA_TIPO(state, chave) {
    state.daninhasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.daninhasTipo.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DANINHA_ESPECIE(state, pay) {
    state.daninhasEspecie.push(pay);
  },
  UPDATE_DANINHA_ESPECIE(state, pay) {
    state.daninhasEspecie.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.daninhasEspecie.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DANINHA_ESPECIE(state, chave) {
    state.daninhasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.daninhasEspecie.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DANINHA_ESTAGIO(state, pay) {
    state.daninhasEstagio.push(pay);
  },
  UPDATE_DANINHA_ESTAGIO(state, pay) {
    state.daninhasEstagio.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.daninhasEstagio.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DANINHA_ESTAGIO(state, chave) {
    state.daninhasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.daninhasEstagio.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DOENCA_TIPO(state, pay) {
    state.doencasTipo.push(pay);
  },
  UPDATE_DOENCA_TIPO(state, pay) {
    state.doencasTipo.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.doencasTipo.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DOENCA_TIPO(state, chave) {
    state.doencasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.doencasTipo.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DOENCA_ESPECIE(state, pay) {
    state.doencasEspecie.push(pay);
  },
  UPDATE_DOENCA_ESPECIE(state, pay) {
    state.doencasEspecie.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.doencasEspecie.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DOENCA_ESPECIE(state, chave) {
    state.doencasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.doencasEspecie.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_DOENCA_ESTAGIO(state, pay) {
    state.doencasEstagio.push(pay);
  },
  UPDATE_DOENCA_ESTAGIO(state, pay) {
    state.doencasEstagio.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.doencasEstagio.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_DOENCA_ESTAGIO(state, chave) {
    state.doencasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.doencasEstagio.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_ARMADILHA_ESTAGIO(state, pay) {
    state.armadilhasEstagio.push(pay);
  },
  UPDATE_ARMADILHA_ESTAGIO(state, pay) {
    state.armadilhasEstagio.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.armadilhasEstagio.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_ARMADILHA_ESTAGIO(state, chave) {
    state.armadilhasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.armadilhasEstagio.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_ARMADILHA_ESPECIE(state, pay) {
    state.armadilhasEspecie.push(pay);
  },
  UPDATE_ARMADILHA_ESPECIE(state, pay) {
    state.armadilhasEspecie.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.armadilhasEspecie.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_ARMADILHA_ESPECIE(state, chave) {
    state.armadilhasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.armadilhasEspecie.splice(index, 1);
      } else {
        //nada
      }
    });
  },
  SET_ARMADILHA_TIPO(state, pay) {
    state.armadilhasTipo.push(pay);
  },
  UPDATE_ARMADILHA_TIPO(state, pay) {
    state.armadilhasTipo.filter((item, index) => {
      if (item.chave == pay.chave) {
        state.armadilhasTipo.splice(index, 1, pay);
      } else {
        //nada
      }
    });
  },
  REMOVE_ARMADILHA_TIPO(state, chave) {
    state.armadilhasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.armadilhasTipo.splice(index, 1);
      } else {
        //nada
      }
    });
  }
};
