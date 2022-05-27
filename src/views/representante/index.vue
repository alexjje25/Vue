<template>
  <div class="templateRepresentante">
    <div v-if="status == 'PRIMEIRO_ACESSO'">BEM VINDO, {{ userName }}</div>
    <div v-if="status == 'OK'">
      <v-header class="areaHead" />
      <v-menu class="areaMenu" />
      <h1>Representantes !</h1>
      <router-view class="areaContent" />
    </div>
  </div>
</template>

<script>
import vMenu from "./menu";
import vHeader from "./header";
export default {
  components: {
    vMenu,
    vHeader
  },
  data() {
    return {
      status: "OK"
    };
  },
  computed: {
    userName() {
      return "Guest User";
    }
  },
  methods: {}
};
</script>

<style></style>
