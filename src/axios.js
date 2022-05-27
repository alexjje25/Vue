import { _API_KEY } from "@/database";

const axios = require("axios").default;
axios.defaults.headers.post["Content-Type"] = "application/json";

function commonCreateUser(email, senha, callback) {
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${_API_KEY}`,
      {
        email: email,
        password: senha,
        returnSecureToken: true
      },
      {
        responseType: "json"
      }
    )
    .then(function(response) {
      return callback(response);
    })
    .catch(function(error) {
      window.console.log(error);
      window.alert("erro catastrofico verificar console");
      return false;
    });
}

//DESCONTINUADO ..
export { commonCreateUser };
