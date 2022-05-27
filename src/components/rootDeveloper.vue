<template>
  <div class="rootTools">
    Root Tools:
    <button @click="SET_MY('gerencia')">gerencia</button>
    <button @click="SET_MY('admin')">admin</button>
  </div>
</template>

<script>
import { servUsers } from "@/database";
export default {
  name: "RootDev",
  props: { tokenKey: { default: undefined, type: String } },
  methods: {
    SET_MY(payload) {
      let userUID = this.tokenKey;
      this.$store.commit("resource/SET_NOTIFY", {
        status: true,
        mensagem: `Redirecionando para: ${payload}`,
        type: "warning"
      });
      servUsers.child(userUID).update({
        type: payload
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rootTools {
  background-color: rgba(177, 50, 50, 1);
  color: white;
  padding: 4px;
  position: fixed;
  display: inline-block;
  opacity: 0.1;
  margin-top: -30px;
  padding-right: 30px;
  transition: 0.4s all;
  &:hover {
    opacity: 1;
    margin-top: 0px;
  }
  button {
    background-color: white;
    margin: 2px;
    border: none;
    color: black;
    padding: 4px;
    border-radius: 4px;
  }
}
</style>
