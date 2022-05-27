export default {
  SET_ROTAGPS(state, payload) {
    state.rotaGPS.push(payload);
  },
  UPDATE_ROTAGPS(state, payload) {
    state.rotaGPS.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.rotaGPS.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ROTAGPS(state, chave) {
    state.rotaGPS.filter((item, index) => {
      if (item.chave === chave) {
        state.rotaGPS.splice(index, 1);
      }
    });
  },
  SET_PONTOGPS(state, payload) {
    state.pontoGPS.push(payload);
  },
  UPDATE_PONTOGPS(state, payload) {
    state.pontoGPS.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.pontoGPS.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PONTOGPS(state, chave) {
    state.pontoGPS.filter((item, index) => {
      if (item.chave === chave) {
        state.pontoGPS.splice(index, 1);
      }
    });
  },
  UPDATE_PAYLOAD(state, payload) {
    state.payload = payload;
  },
  SET_ALERTA_CATEGORIA(state, payload) {
    state.alertaCategorias.push(payload);
  },
  UPDATE_ALERTA_CATEGORIA(state, payload) {
    state.alertaCategorias.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.alertaCategorias.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ALERTA_CATEGORIA(state, chave) {
    state.alertaCategorias.filter((item, index) => {
      if (item.chave === chave) {
        state.alertaCategorias.splice(index, 1);
      }
    });
  },
  SET_ALERTA(state, payload) {
    state.alertas.push(payload);
  },
  UPDATE_ALERTA(state, payload) {
    state.alertas.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.alertas.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ALERTA(state, chave) {
    state.alertas.filter((item, index) => {
      if (item.chave === chave) {
        state.alertas.splice(index, 1);
      }
    });
  },
  SET_VEICULO(state, payload) {
    state.veiculos.push(payload);
  },
  UPDATE_VEICULO(state, payload) {
    state.veiculos.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.veiculos.splice(index, 1, payload);
      }
    });
  },
  REMOVE_VEICULO(state, chave) {
    state.veiculos.filter((item, index) => {
      if (item.chave === chave) {
        state.veiculos.splice(index, 1);
      }
    });
  },
  SET_REVIEW_TRAPS(state, payload) {
    state.reviewTraps.push(payload);
  },
  UPDATE_REVIEW_TRAPS(state, payload) {
    state.reviewTraps.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.reviewTraps.splice(index, 1, payload);
      }
    });
  },
  REMOVE_REVIEW_TRAPS(state, chave) {
    state.reviewTraps.filter((item, index) => {
      if (item.chave === chave) {
        state.reviewTraps.splice(index, 1);
      }
    });
  },
  SET_LISTA_PRAGA_GLOBAL(state, payload) {
    state.globalPragasMonitoradas = payload;
  },
  SET_PRODUCAO(state, payload) {
    state.producoes.push(payload);
  },
  UPDATE_PRODUCAO(state, payload) {
    state.producoes.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.producoes.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PRODUCAO(state, chave) {
    state.producoes.filter((item, index) => {
      if (item.chave === chave) {
        state.producoes.splice(index, 1);
      }
    });
  },
  //ESTE METODO É ON(VALUE) nao requer update / remove
  SET_MINHAFAZENDA(state, pay) {
    state.minhaFazenda = pay;
  },
  SET_COMBUSTIVEL(state, payload) {
    state.fuells.push(payload);
  },
  UPDATE_COMBUSTIVEL(state, payload) {
    state.fuells.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.fuells.splice(index, 1, payload);
      }
    });
  },
  REMOVE_COMBUSTIVEL(state, chave) {
    state.fuells.filter((item, index) => {
      if (item.chave === chave) {
        state.fuells.splice(index, 1);
      }
    });
  },
  SET_COLABORADOR(state, payload) {
    state.colaboradores.push(payload);
  },
  UPDATE_COLABORADOR(state, payload) {
    state.colaboradores.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.colaboradores.splice(index, 1, payload);
      }
    });
  },
  REMOVE_COLABORADOR(state, chave) {
    state.colaboradores.filter((item, index) => {
      if (item.chave === chave) {
        state.colaboradores.splice(index, 1);
      }
    });
  },
  //report - importante
  SET_PRAGA(state, payload) {
    state.reportedPragas.push(payload);
  },
  UPDATE_PRAGA(state, payload) {
    state.reportedPragas.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.reportedPragas.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PRAGA(state, chave) {
    state.reportedPragas.filter((item, index) => {
      if (item.chave === chave) {
        state.reportedPragas.splice(index, 1);
      }
    });
  },
  SET_DANINHA(state, payload) {
    state.reportedDaninhas.push(payload);
  },
  UPDATE_DANINHA(state, payload) {
    state.reportedDaninhas.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.reportedDaninhas.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DANINHA(state, chave) {
    state.reportedDaninhas.filter((item, index) => {
      if (item.chave === chave) {
        state.reportedDaninhas.splice(index, 1);
      }
    });
  },
  //global
  SET_PRAGA_TIPO(state, payload) {
    state.global.pragasTipo.push(payload);
  },
  UPDATE_PRAGA_TIPO(state, payload) {
    state.global.pragasTipo.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.global.pragasTipo.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PRAGA_TIPO(state, chave) {
    state.global.pragasTipo.filter((item, index) => {
      if (item.chave === chave) {
        state.global.pragasTipo.splice(index, 1);
      }
    });
  },
  SET_PRAGA_ESPECIE(state, payload) {
    state.global.pragasEspecie.push(payload);
  },
  UPDATE_PRAGA_ESPECIE(state, payload) {
    state.global.pragasEspecie.filter((item, index) => {
      if (item.chave === payload.chave) {
        state.global.pragasEspecie.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PRAGA_ESPECIE(state, chave) {
    state.global.pragasEspecie.filter((item, index) => {
      if (item.chave === chave) {
        state.global.pragasEspecie.splice(index, 1);
      }
    });
  },
  SET_PRAGA_ESTAGIO(state, payload) {
    state.global.pragasEstagio.push(payload);
  },
  UPDATE_PRAGA_ESTAGIO(state, payload) {
    state.global.pragasEstagio.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.pragasEstagio.splice(index, 1, payload);
      }
    });
  },
  REMOVE_PRAGA_ESTAGIO(state, chave) {
    state.global.pragasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.pragasEstagio.splice(index, 1);
      }
    });
  },
  SET_DOENCA(state, payload) {
    state.reportedDoencas.push(payload);
  },
  UPDATE_DOENCA(state, payload) {
    state.reportedDoencas.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.reportedDoencas.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DOENCA(state, chave) {
    state.reportedDoencas.filter((item, index) => {
      if (item.chave == chave) {
        state.reportedDoencas.splice(index, 1);
      }
    });
  },
  SET_TRAP(state, payload) {
    state.reportedTraps.push(payload);
  },
  UPDATE_TRAP(state, payload) {
    state.reportedTraps.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.reportedTraps.splice(index, 1, payload);
      }
    });
  },
  REMOVE_TRAP(state, chave) {
    state.reportedTraps.filter((item, index) => {
      if (item.chave == chave) {
        state.reportedTraps.splice(index, 1);
      }
    });
  },
  SET_TALHAO(state, payload) {
    state.talhoes.push(payload);
  },
  UPDATE_TALHAO(state, payload) {
    state.talhoes.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.talhoes.splice(index, 1, payload);
      }
    });
  },
  REMOVE_TALHAO(state, chave) {
    state.talhoes.filter((item, index) => {
      if (item.chave == chave) {
        state.talhoes.splice(index, 1);
      }
    });
  },
  SET_TAREFA(state, payload) {
    state.tarefas.push(payload);
  },
  UPDATE_TAREFA(state, payload) {
    state.tarefas.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.tarefas.splice(index, 1, payload);
      }
    });
  },
  REMOVE_TAREFA(state, chave) {
    state.tarefas.filter((item, index) => {
      if (item.chave == chave) {
        state.tarefas.splice(index, 1);
      }
    });
  },
  SET_APLICACAO(state, payload) {
    state.aplicacoes.push(payload);
  },
  UPDATE_APLICACAO(state, payload) {
    state.aplicacoes.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.aplicacoes.splice(index, 1, payload);
      }
    });
  },
  REMOVE_APLICACAO(state, chave) {
    state.aplicacoes.filter((item, index) => {
      if (item.chave == chave) {
        state.aplicacoes.splice(index, 1);
      }
    });
  },
  SET_SETOR(state, payload) {
    state.setores.push(payload);
  },
  UPDATE_SETOR(state, payload) {
    state.setores.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.setores.splice(index, 1, payload);
      }
    });
  },
  REMOVE_SETOR(state, chave) {
    state.setores.filter((item, index) => {
      if (item.chave == chave) {
        state.setores.splice(index, 1);
      }
    });
  },
  SET_FORNECEDOR(state, payload) {
    state.fornecedores.push(payload);
  },
  UPDATE_FORNECEDOR(state, payload) {
    state.fornecedores.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.fornecedores.splice(index, 1, payload);
      }
    });
  },
  REMOVE_FORNECEDOR(state, chave) {
    state.fornecedores.filter((item, index) => {
      if (item.chave == chave) {
        state.fornecedores.splice(index, 1);
      }
    });
  },
  SET_CULTIVAR(state, payload) {
    state.cultivares.push(payload);
  },
  UPDATE_CULTIVAR(state, payload) {
    state.cultivares.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.cultivares.splice(index, 1, payload);
      }
    });
  },
  REMOVE_CULTIVAR(state, chave) {
    state.cultivares.filter((item, index) => {
      if (item.chave == chave) {
        state.cultivares.splice(index, 1);
      }
    });
  },
  SET_ESTOQUE(state, payload) {
    state.estoque.push(payload);
  },
  UPDATE_ESTOQUE(state, payload) {
    state.estoque.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.estoque.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ESTOQUE(state, chave) {
    state.estoque.filter((item, index) => {
      if (item.chave == chave) {
        state.estoque.splice(index, 1);
      }
    });
  },
  SET_ESTOQUELOG(state, payload) {
    state.estoquelog.push(payload);
  },
  UPDATE_ESTOQUELOG(state, payload) {
    state.estoquelog.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.estoquelog.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ESTOQUELOG(state, chave) {
    state.estoquelog.filter((item, index) => {
      if (item.chave == chave) {
        state.estoquelog.splice(index, 1);
      }
    });
  },
  SET_ARMADILHA_TIPO(state, payload) {
    state.global.armadilhasTipo.push(payload);
  },
  UPDATE_ARMADILHA_TIPO(state, payload) {
    state.global.armadilhasTipo.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.armadilhasTipo.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ARMADILHA_TIPO(state, chave) {
    state.global.armadilhasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.global.armadilhasTipo.splice(index, 1);
      }
    });
  },
  SET_ARMADILHA_ESPECIE(state, payload) {
    state.global.armadilhasEspecie.push(payload);
  },
  UPDATE_ARMADILHA_ESPECIE(state, payload) {
    state.global.armadilhasEspecie.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.armadilhasEspecie.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ARMADILHA_ESPECIE(state, chave) {
    state.global.armadilhasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.global.armadilhasEspecie.splice(index, 1);
      }
    });
  },
  SET_ARMADILHA_ESTAGIO(state, payload) {
    state.global.armadilhasEstagio.push(payload);
  },
  UPDATE_ARMADILHA_ESTAGIO(state, payload) {
    state.global.armadilhasEstagio.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.armadilhasEstagio.splice(index, 1, payload);
      }
    });
  },
  REMOVE_ARMADILHA_ESTAGIO(state, chave) {
    state.global.armadilhasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.global.armadilhasEstagio.splice(index, 1);
      }
    });
  },
  //DANINHAS
  SET_DANINHA_TIPO(state, payload) {
    state.global.daninhasTipo.push(payload);
  },
  UPDATE_DANINHA_TIPO(state, payload) {
    state.global.daninhasTipo.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.daninhasTipo.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DANINHA_TIPO(state, chave) {
    state.global.daninhasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.global.daninhasTipo.splice(index, 1);
      }
    });
  },
  SET_DANINHA_ESPECIE(state, payload) {
    state.global.daninhasEspecie.push(payload);
  },
  UPDATE_DANINHA_ESPECIE(state, payload) {
    state.global.daninhasEspecie.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.daninhasEspecie.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DANINHA_ESPECIE(state, chave) {
    state.global.daninhasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.global.daninhasEspecie.splice(index, 1);
      }
    });
  },
  SET_DANINHA_ESTAGIO(state, payload) {
    state.global.daninhasEstagio.push(payload);
  },
  UPDATE_DANINHA_ESTAGIO(state, payload) {
    state.global.daninhasEstagio.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.daninhasEstagio.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DANINHA_ESTAGIO(state, chave) {
    state.global.daninhasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.global.daninhasEstagio.splice(index, 1);
      }
    });
  },
  SET_DOENCA_TIPO(state, payload) {
    state.global.doencasTipo.push(payload);
  },
  UPDATE_DOENCA_TIPO(state, payload) {
    state.global.doencasTipo.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.doencasTipo.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DOENCA_TIPO(state, chave) {
    state.global.doencasTipo.filter((item, index) => {
      if (item.chave == chave) {
        state.global.doencasTipo.splice(index, 1);
      }
    });
  },
  SET_DOENCA_ESPECIE(state, payload) {
    state.global.doencasEspecie.push(payload);
  },
  UPDATE_DOENCA_ESPECIE(state, payload) {
    state.global.doencasEspecie.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.doencasEspecie.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DOENCA_ESPECIE(state, chave) {
    state.global.doencasEspecie.filter((item, index) => {
      if (item.chave == chave) {
        state.global.doencasEspecie.splice(index, 1);
      }
    });
  },
  SET_DOENCA_ESTAGIO(state, payload) {
    state.global.doencasEstagio.push(payload);
  },
  UPDATE_DOENCA_ESTAGIO(state, payload) {
    state.global.doencasEstagio.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.doencasEstagio.splice(index, 1, payload);
      }
    });
  },
  REMOVE_DOENCA_ESTAGIO(state, chave) {
    state.global.doencasEstagio.filter((item, index) => {
      if (item.chave == chave) {
        state.global.doencasEstagio.splice(index, 1);
      }
    });
  },
  SET_COLORS(state, payload) {
    state.global.colors.push(payload);
  },
  UPDATE_COLORS(state, payload) {
    state.global.colors.filter((item, index) => {
      if (item.chave == payload.chave) {
        state.global.colors.splice(index, 1, payload);
      }
    });
  },
  REMOVE_COLORS(state, chave) {
    state.global.colors.filter((item, index) => {
      if (item.chave == chave) {
        state.global.colors.splice(index, 1);
      }
    });
  },
  _clear(state) {
    state.aplicacoes = [];
    state.payload = false;
    state.alertas = [];
    state.pontoGPS = [];
    state.colaboradores = [];
    state.reportedPragas = [];
    state.reportedDoencas = [];
    state.reportedDaninhas = [];
    state.reportedTraps = [];
    state.reviewTraps = [];
    state.talhoes = [];
    state.tarefas = [];
    state.setores = [];
    state.cultivares = [];
    state.fornecedores = [];
    state.combustiveis = [];
    state.minhaFazenda = [];
    state.producoes = [];
    state.estoque = [];
    state.estoquelog = [];
    state.global.armadilhasTipo = [];
    state.global.armadilhasEspecie = [];
    state.global.armadilhasEstagio = [];
    state.global.daninhasTipo = [];
    state.global.daninhasEspecie = [];
    state.global.daninhasEstagio = [];
    state.global.doencasTipo = [];
    state.global.doencasEspecie = [];
    state.global.doencasEstagio = [];
    state.global.colors = [];
    state.globalPragasMonitoradas = [];
  }
};
