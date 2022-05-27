<template>
  <v-app>
    <!--<btnRootDebug v-if="isDebugger == 99" />-->
    <router-view />
  </v-app>
</template>

<script>
//import btnRootDebug from "@/components/debuger";
export default {
  components: {
    //btnRootDebug
  },
  computed: {
    isDebugger() {
      return this.$store.getters["auth/GET_NIVEL"];
    }
  }
};
</script>

<style lang="scss" scoped>
$body-font-family: "Anteb";
$title-font: "Anteb";

.v-application {
  line-height: initial;
  font-family: $body-font-family, sans-serif !important;
  .title {
    // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
}
</style>
