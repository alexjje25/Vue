import { servAuth } from "@/database.js";

export default {
  CLEAR({ commit }) {
    commit("REMOVE_USER");
    servAuth
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        window.alert("erro:" + error);
      });
  }
};
