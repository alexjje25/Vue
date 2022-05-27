<template>
  <div
    class="bloco"
    :style="{ backgroundColor: COLOR.dados.cor }"
    :class="{ total: tipo == '0' }"
  >
    {{ item.length | zeroNaFrente }}
  </div>
</template>

<script>
import { zeroNaFrente } from "@/mixins/valores.js";
export default {
  mixins: [zeroNaFrente],
  props: {
    item: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tipo: {
      type: String,
      default: "0"
    }
  },
  computed: {
    COLOR() {
      let self = this;
      if (self.tipo == "0") {
        return { dados: { cor: "white" } };
      } else {
        return this.$store.getters["fazenda/GET_COLORS"].find(color => {
          if (color.dados.nivel == self.tipo) {
            return true;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bloco {
  display: inline-block;
  padding: 10px 10px;
  min-width: 50px;
  color: white;
  margin: 6px;
  border-radius: 8px;
  font-size: 25px;
  font-weight: 900;
  box-shadow: 5px 5px 5px inset rgba(55, 55, 55, 0.2);
  &.total {
    color: rgb(50, 50, 50) !important;
    background-color: white;
    font-size: 25px;
  }
}
</style>
