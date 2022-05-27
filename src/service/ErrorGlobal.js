import { serverErros } from "@/database.js";
import store from "@/store/index";

function emitirError(user, erro, level) {
  let tempo = new Date().getTime();
  const response = {
    client: user,
    dados: erro,
    nivel: level,
    timestamp: tempo
  };
  serverErros.push(response);
}

//nivel de erro 0 - 10
function handleErrorGlobal(error, callback) {
  var USER_ID = store.getters["auth/TOKEN"];
  if (
    error.code == "storage/retry-limit-exceeded" ||
    error == "storage/retry-limit-exceeded"
  ) {
    emitirError(USER_ID, error, 10);
    return callback("ERRO INESPERADO, report urgentemente ao suporte");
  } else if (error.code == "storage/object-not-found") {
    return callback(false);
  } else if (error) {
    return callback(error.code);
  }
}

export default handleErrorGlobal;
