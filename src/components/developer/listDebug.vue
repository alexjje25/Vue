<template>
  <div></div>
</template>

<script>
export default {
  computed: {
    GET_NIVEL() {
      return this.$store.getters["auth/GET_NIVEL"];
    }
  }
};
</script>

<style></style>
