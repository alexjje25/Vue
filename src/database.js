import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";

import credencialFirebase from "@/keys/credencialFirebase";
const fireConfig = credencialFirebase; //updates

firebase.initializeApp(fireConfig);

const firePerf = firebase.performance();

//common
const servAuth = firebase.auth();
const server = firebase.database().ref();

//storage
const Storage = firebase.storage().ref();
const StorageTaskState = firebase.storage.TaskState;
const StorageColab = Storage.child("colaborador");

//error
const serverErros = server.child("listenErrors");

//subrefs
const servUsers = server.child("users");
const servUsersAngolas = server.child("usersAngolas");
const servFazendas = server.child("Fazendas");
const servFazendasAngolas = server.child("FazendasAngolas");
const servColors = server.child("Colors");
const servIncludeStaffUser = server.child("includeStaffUser"); // auth required
//global
const servPragasEspecieTipo = server.child("Pragas/EspecieTipo");
const servPragasEspecie = server.child("Pragas/Especie");
const servPragasEstagio = server.child("Pragas/Estagio");
const servDaninhasTipo = server.child("Daninhas/EspecieTipo");
const servDaninhasEspecie = server.child("Daninhas/Especie");
const servDaninhasEstagio = server.child("Daninhas/Estagio");
const servDoencasTipo = server.child("Doencas/EspecieTipo");
const servDoencasEspecie = server.child("Doencas/Especie");
const servDoencasEstagio = server.child("Doencas/Estagio");
const servArmadilhasTipo = server.child("Armadilhas/EspecieTipo");
const servArmadilhasEspecie = server.child("Armadilhas/Especie");
const servArmadilhasEstagio = server.child("Armadilhas/Estagio");
const servAlertaCategorias = server.child("Alertas");
const servCombustiveis = server.child("Combustiveis"); // verificar

// ESTOQUE ================
const Estoque = server.child("Estoque"); //indexado idFazenda
const EstoqueLog = server.child("EstoqueLog"); //indexado idFazenda

// SCHOOL =====
const servPreSchool = server.child("PreCadastro/School");

// FRANQUIA =====
const servPreFranquia = server.child("PreCadastro/Franquia");


// MONITORAMENTOS ===
const servMonitorPragas = server.child("MonitoramentosPragas"); //indexado idFazenda
const servMonitorDoencas = server.child("MonitoramentosDoencas"); //indexado idFazenda
const servMonitorArmadilhas = server.child("MonitoramentosArmadilhas"); //indexado idFazenda
const servReviewArmadilhas = server.child("ListaArmadilhas"); //indexado idFazenda
const servMonitorDaninhas = server.child("MonitoramentosDaninhas"); //indexado idFazenda
const servAlertas = server.child("AlertaProducao"); //indexado idFazenda
const servPontoGPS = server.child("PontoFuncionario"); //indexado idFazenda
const servRotaGPS = server.child("GpsColaborador");
// DIVERSOS ===
const servColaboradores = server.child("Funcionarios"); // indexado ["idFazenda", "codigo"]
const servColaboradoresArquivados = server.child("FuncionariosArquivados");

const servTalhoes = server.child("Talhoes"); //indexado idFazenda
const servProducoes = server.child("Producoes"); //indexado idFazenda
const servTarefas = server.child("Tarefas"); //indexado idFazenda
const servSetores = server.child("Setores"); //indexado idFazenda
const servFornecedores = server.child("Fornecedores"); //indexado idFazenda
const servCultivar = server.child("Cultivar"); //indexado idFazenda
const servAplicacoes = server.child("Aplicacoes"); //indexado idFazenda
const servVeiculos = server.child("Veiculos"); //indexado idFazenda
const servClientes = server.child("Clientes"); //
const servClientesAngolas = server.child("ClientesAngola"); //

//Arquivados
const servTarefasArquivo = server.child("Arquivado/Tarefas");
const servColaboradoresArquivo = server.child("Arquivado/Colaboradores");
const servVeiculosArquivo = server.child("Arquivado/Veiculos");
const servSetoresArquivo = server.child("Arquivado/Setores");
const servFornecedoresArquivo = server.child("Arquivado/Fornecedores");

function timeServer() {
  firebase
    .database()
    .ref("/.info/serverTimeOffset")
    .on("value", function (offset) {
      var offsetVal = offset.val() || 0;
      var serverTime = Date.now() + offsetVal;
      return serverTime;
    });
}

export {
  servIncludeStaffUser,
  servPontoGPS,
  servRotaGPS,
  servAlertaCategorias,
  servAlertas,
  firePerf,
  servSetoresArquivo,
  servTarefasArquivo,
  servColaboradoresArquivo,
  servVeiculosArquivo,
  servFornecedoresArquivo,
  //PERMANENTES
  servPreSchool,
  servPreFranquia,
  servAplicacoes,
  //estoque
  EstoqueLog, //
  Estoque, //produtos
  //outros
  servArmadilhasTipo,
  servArmadilhasEspecie,
  servArmadilhasEstagio,
  servColors,
  firebase,
  Storage,
  serverErros,
  StorageColab,
  StorageTaskState,
  servVeiculos,
  servCombustiveis,
  servCultivar,
  servFornecedores,
  timeServer,
  servSetores,
  servTarefas,
  servTalhoes,
  servProducoes,
  servColaboradoresArquivados,
  servMonitorPragas,
  servMonitorArmadilhas, //ARMADILHAS
  servReviewArmadilhas, //REVIEWS
  servMonitorDaninhas,
  servMonitorDoencas,
  servColaboradores,
  servAuth,
  server,
  servUsers, // contem colaboradores de alto nivel a baixo
  servUsersAngolas,
  servClientes,
  servClientesAngolas,
  servFazendas,
  servFazendasAngolas,
  servPragasEspecieTipo,
  servPragasEspecie,
  servPragasEstagio,
  servDaninhasTipo,
  servDaninhasEspecie,
  servDaninhasEstagio,
  servDoencasTipo,
  servDoencasEspecie,
  servDoencasEstagio
};
