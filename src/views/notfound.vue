<template>
  <div class="nopage">
    <h1>404</h1>
    <h2>Link não encontrado</h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap");
.nopage {
  font-family: "Roboto";
  font-size: 15px;
  background-image: linear-gradient(
    to bottom,
    rgba(50, 120, 60, 1) 20%,
    rgba(255, 255, 255, 1) 80%
  );
  background-repeat: 10px 10px;
  height: 90vh;
  width: 100%;
  padding-top: 30px;
  margin: 0px;
}
h1,
h2 {
  font-weight: 900;
  font-family: "Roboto";
  text-align: center;
  padding-top: 10px;
  margin: 0px;
}
h1 {
  font-size: 120px;
  color: rgb(255, 255, 255, 1);
}
h2 {
  font-size: 30px;
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
}
</style>
