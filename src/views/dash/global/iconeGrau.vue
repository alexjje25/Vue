<template>
  <div class="inline">
    <icone
      :icon="['fas', 'bug']"
      class="icone"
      :class="{
        danger: grau == 3,
        warning: grau == 2,
        safe: grau == 1
      }"
    />
  </div>
</template>

<script>
export default {
  props: ["grau"]
};
</script>

<style lang="scss">
.inline {
  display: inline;
}
.icone {
  &.danger {
    color: red;
  }
  &.warning {
    color: rgba(255, 200, 10, 1);
  }
  &.safe {
    color: green;
  }
}
</style>
