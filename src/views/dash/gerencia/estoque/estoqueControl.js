/*
ref == server
metodo é referente se é aditivo ou remoção
uid é o ID do ITEM
*/
//libs
import { Estoque, EstoqueLog } from "@/database.js";
import moment from "moment";

// construct
function transacaoQtdEstoque(uid, metodo, quantidade) {
  Estoque.child(uid).transaction(item => {
    if (item) {
      if (metodo == "add") {
        // adição
        item.quantidade += quantidade;
      }
      if (metodo == "remove") {
        // subtração
      }
    }
  });
  transferLog(uid, metodo, { quantidade: quantidade });
}

function transferLog(uid, metodo, payload) {
  EstoqueLog.push({
    timeStamp: moment(),
    updates: payload,
    item: uid,
    metodo: metodo
  });
}

export { transacaoQtdEstoque };
