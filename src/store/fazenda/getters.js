export default {
  GET_PAYLOAD(state) {
    return state.payload;
  },
  GET_ROTAGPS(state) {
    return state.rotaGPS;
  },
  GET_PONTOGPS(state) {
    return state.pontoGPS;
  },
  GET_ALERTAS(state) {
    return state.alertas;
  },
  GET_ALERTA_CATEGORIAS(state) {
    return state.alertaCategorias;
  },
  GET_VEICULOS(state) {
    return state.veiculos;
  },
  GET_COLORS(state) {
    return state.global.colors;
  },
  GET_APLICACOES(state) {
    return state.aplicacoes;
  },
  GET_REVIEW_TRAPS(state) {
    return state.reviewTraps;
  },
  GET_MINHAFAZENDA(state) {
    return state.minhaFazenda;
  },
  GET_AREA_FAZENDA(state) {
    return state.minhaFazenda.area;
  },
  GET_PRODUCOES(state) {
    return state.producoes;
  },
  GET_COMBUSTIVEIS(state) {
    return state.combustiveis;
  },
  GET_COLABORADORES(state) {
    return state.colaboradores;
  },
  GET_COLABORADORES_BY_ID: state => id => {
    return state.colaboradores.filter(item => item.chave === id);
  },
  GET_COLABORADORES_BY_NAME: state => payload => {
    return state.colaboradores.filter(item => {
      if (payload.type === "RETURN_ID") {
        let nameLocal = String(item.dados.name.toLowerCase());
        let namePayload = String(payload.value.toLowerCase());
        return nameLocal === namePayload;
        /*
          let name = String(item.dados.name.toLowerCase());
          let query = String(payload.value.toLowerCase());
          return name.match(`${query}`);
          */
      } else {
        return item.dados.name.toLowerCase() === payload.value.toLowerCase();
      }
    });
  },
  GET_THIS_COLABORADOR: state => id => {
    return state.colaboradores.find(item => {
      if (item.chave === id) {
        return item;
      }
    });
  },
  //datre
  GET_FORNECEDORES(state) {
    return state.fornecedores;
  },
  GET_CULTIVARES(state) {
    return state.cultivares;
  },
  GET_SETOR(state) {
    return state.setores;
  },
  GET_PRAGAS(state) {
    return state.reportedPragas;
  },
  GET_DOENCAS(state) {
    return state.reportedDoencas;
  },
  GET_DANINHAS(state) {
    return state.reportedDaninhas;
  },
  GET_TRAPS(state) {
    return state.reportedTraps;
  },
  GET_TAREFAS(state) {
    return state.tarefas;
  },
  GET_TALHOES(state) {
    return state.talhoes;
  },
  GET_SETORES(state) {
    return state.setores;
  },
  GET_GLOBAL_PRAGAS_MARKS(state) {
    return state.globalPragasMonitoradas;
  },
  GET_ESTOQUE(state) {
    return state.estoque;
  },
  GET_ESTOQUELOG(state) {
    return state.estoquelog;
  },
  GET_SEMENETES(state) {
    return state.estoque.filter(item => {
      if (
        item.dados.categoria === "sementes" &&
        item.dados.modulo === "insumos"
      ) {
        return true;
      }
    });
  },
  GET_GLOBAL_PRAGAS_TIPO(state) {
    return state.global.pragasTipo;
  },
  GET_GLOBAL_PRAGAS_ESPECIE(state) {
    return state.global.pragasEspecie;
  },
  GET_GLOBAL_PRAGAS_ESTAGIO(state) {
    return state.global.pragasEstagio;
  },
  GET_GLOBAL_ARMADILHAS_TIPO(state) {
    return state.global.armadilhasTipo;
  },
  GET_GLOBAL_ARMADILHAS_ESPECIE(state) {
    return state.global.armadilhasEspecie;
  },
  GET_GLOBAL_ARMADILHAS_ESTAGIO(state) {
    return state.global.armadilhasEstagio;
  },
  GET_GLOBAL_DANINHAS_TIPO(state) {
    return state.global.daninhasTipo;
  },
  GET_GLOBAL_DANINHAS_ESPECIE(state) {
    return state.global.daninhasEspecie;
  },
  GET_GLOBAL_DANINHAS_ESTAGIO(state) {
    return state.global.daninhasEstagio;
  },
  GET_GLOBAL_DOENCAS_TIPO(state) {
    return state.global.doencasTipo;
  },
  GET_GLOBAL_DOENCAS_ESPECIE(state) {
    return state.global.doencasEspecie;
  },
  GET_GLOBAL_DOENCAS_ESTAGIO(state) {
    return state.global.doencasEstagio;
  }
};
