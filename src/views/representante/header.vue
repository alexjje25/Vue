<template>
  <div class="header">
    <div class="col1">
      <img src="@/assets/icons/logo-white.png" />
    </div>

    <button @click="signout()">
      DESCONECTAR
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          window.alert(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #123301;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  div.col1 {
    img {
      width: 80px;
    }
  }
  button {
    background-color: rgba(177, 10, 20, 1);
    color: white;
    border: none;
    padding: 5px 10px;
    transition: 0.2s background-color;
    &:hover {
      background-color: rgba(207, 10, 40, 1);
      curosr: pointer;
    }
  }
}
</style>
