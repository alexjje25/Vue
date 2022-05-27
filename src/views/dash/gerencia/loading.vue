<template>
  <div class="carregando centralizaTudo">
    <img src="@/assets/icons/carregando.gif" alt="" />
    <div class="titulo">Carregando recursos</div>
  </div>
</template>

<script>
export default {
  name: "LoadingVue"
};
</script>

<style lang="scss" scoped>
.titulo {
  font-size: 20px;
  color: rgba(130, 130, 130, 1);
  font-weight: 400;
}
.carregando {
  font-weight: 900;
  padding-top: 80px;
  img {
    margin: 10px auto;
    width: 300px;
  }
}
</style>
