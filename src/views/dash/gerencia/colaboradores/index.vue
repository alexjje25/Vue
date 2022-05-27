<template>
  <div class="marginPadrao">
    <!-- RELEASE: VERIFICAR ISSO -->
    <div class="menu">
      <router-link to="lista"
        ><vBtn @handle="setFolha" valor="lista" name="LISTA DE COLABORADORES"
      /></router-link>
      <router-link to="rota"
        ><vBtn @handle="setFolha" valor="rota" name="ROTA DE COLABORADORES"
      /></router-link>
    </div>
    <div class="folhas ">
      <router-view />
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btnIconMini";

export default {
  components: { vBtn },
  methods: {
    setFolha(named) {
      this.$router.push(named);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  margin: 5px;
  text-align: center;
  a {
    margin: 5px;
  }
}
</style>

<style lang="scss" scoped></style>
