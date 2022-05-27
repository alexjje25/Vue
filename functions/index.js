const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment-timezone");
import serviceKey from "./serviceAccount.js";

admin.initializeApp(serviceKey);

const db = admin.database().ref();
const servTasks = db.child("tasks");
// identificador de fuso horário IANA America/Sao_Paulo
// padrão para datas 2020/02/25

function tempo() {
  let atual = moment();
  let timeZONE = moment.tz(atual, "America/Sao_Paulo");
  let timestamp = timeZONE.format("x");
  let response = timeZONE.format("YYYY-MM-DD");
  let zona = timeZONE.format();
  return { timestamp: timestamp, data: response, zona: zona };
}

function OLDtempo() {
  var data = new Date();
  var stamp = data.getTime();
  let m = data.getMonth() + 1;
  let d = data.getDate();
  var dia = d < 10 ? "0" + d : d;
  var mes = m < 10 ? "0" + m : m;
  var ano = data.getFullYear();
  var response = `${ano}-${mes}-${dia}`;
  return { timestamp: stamp, data: response };
}

async function createNewUser(email, password) {
  //config =======================
  if (!password || !email) {
    return { status: false };
  }

  let userName = "Guest" + timestamp;
  let timestamp = new Date().getTime();

  //create
  return await admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      phoneNumber: "+5521910011001",
      password: password,
      displayName: userName,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/rurall-apk-01202-1580563139830.appspot.com/o/assets%2Fsem-foto.jpg?alt=media&token=1cbc18ad-a051-498c-a4c9-9b232c55eaf3", // foto padrao
      disabled: false
    })
    .then(userRecord => {
      console.log("Successfully created new user:");
      return {
        status: true,
        uid: userRecord.uid
      };
    })
    .catch(error => {
      console.log("Error creating new user:", error);
      return {
        status: false
      };
    });
}

exports.includeCliente = functions.database
  .ref("tasks/includeCliente/{pushId}")
  .onCreate(snapshot => {
    let userAccess = snapshot.val().acesso;
    let fazendaBin = snapshot.val().fazenda;
    createNewUser(userAccess.email, userAccess.password);

    let tokenFazenda = db.child("Fazendas").push().key;
  });

exports.handleTalhao = functions.database
  .ref("Talhoes/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.handleProducoes = functions.database
  .ref("Producoes/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.handleTarefas = functions.database
  .ref("Tarefas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.handleEstoqueLog = functions.database
  .ref("EstoqueLog/{pushId}")
  .onCreate(snapshot => {
    let dados = snapshot.val();
    let query = dados.idProduto;
    let tipoOperacao = dados.tipoOperacao;
    let referenciaQuantidade = db.child(`Estoque/${query}/quantidade`);
    let referenciaFornecedor = db.child(`Estoque/${query}/fornecedor`);
    let referenciaValorUnitario = db.child(`Estoque/${query}/valorUnitario`);

    if (tipoOperacao === "saida") {
      //operacao para remocao de quantidade apenas
      return referenciaQuantidade.transaction(change => {
        return (change -= dados.quantidade);
      });
    } else if (tipoOperacao === "entrada") {
      referenciaQuantidade.transaction(change => {
        return (change += dados.quantidade);
      });
      referenciaFornecedor.transaction(change => {
        return (change = dados.fornecedor);
      });
      referenciaValorUnitario.transaction(change => {
        return (change = dados.valorUnitario);
      });
    } else {
      console.log("ERRO INCOMUM DE TIPO DE OPERAÇÃO");
      return false;
    }
    let response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
    /*referencia.transaction(pay => {
      pay.quantidade += dados.quantidade;
      pay.fornecedor = dados.fornecedor;
      pay.valorUnitario = dados.valorUnitario;
    });*/
  });

exports.createdPreSchool = functions.database
  .ref("/PreCadastro/School/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.createdPragas = functions.database
  .ref("/MonitoramentosPragas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp) //&&
      //snapshot.ref.child("zonaTESTE").set(response.zona)
      //zona
    );
  });

exports.createdAplicacao = functions.database
  .ref("/Aplicacoes/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.createdDaninhas = functions.database
  .ref("/MonitoramentosDaninhas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.createdArmadilhas = functions.database
  .ref("/MonitoramentosArmadilhas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.createdArmadilhaReview = functions.database
  .ref("/ListaArmadilhas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.createdDoencas = functions.database
  .ref("/MonitoramentosDoencas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });

exports.novoCliente = functions.database
  .ref("/Clientes/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });
exports.novaFazenda = functions.database
  .ref("/Fazendas/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });
exports.novoUsuario = functions.database
  .ref("/users/{pushId}")
  .onCreate(snapshot => {
    var response = tempo();
    return (
      snapshot.ref.child("created").set(response.data) &&
      snapshot.ref.child("createdTimestamp").set(response.timestamp)
    );
  });
