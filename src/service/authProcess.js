import { firebase } from "@/database";

let minimalPass = 4;
/*eslint no-control-regex: "error"*/
let emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function processAuth(email, password) {
  if (password.length < minimalPass)
    return { dados: "Password invalido, menor que 4 digitos", status: "ERROR" };
  if (email.match(emailValidate)) {
    // is valid
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        return { dados: response, status: "OK" };
      })
      .catch(function(error) {
        return { dados: error, status: "ERROR" };
      });
  } else {
    // is invalid
    return { dados: "O email não esta no formato correto", status: "ERROR" };
  }
}

export { processAuth };
