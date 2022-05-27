<template>
  <div
    class="btnIconMini"
    :class="{
      hasIcon: existeIcon == true,
      confirm: type == 'padrao',
      danger: type == 'danger'
    }"
    @click="emitHandle"
  >
    <div v-if="existeIcon" class="icon">
      <img v-if="type == ''" :src="renderIcon" alt="imagem de name" />
      <img
        v-if="type == 'padrao'"
        :src="require('@/assets/icons/sinais/adicionar-white.png')"
        alt="imagem de name"
      />
      <img v-if="type == 'danger'" :src="renderIcon" alt="imagem de name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    valor: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    corPrimaria: {
      type: String,
      default: "#1e5100"
    },
    corSecundaria: {
      type: String,
      default: "#3dce00"
    }
  },
  computed: {
    existeIcon() {
      if (this.icon.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    renderIcon() {
      return this.icon;
    },
    renderText() {
      return this.name;
    }
  },
  watch: {
    corPrimaria: function(newValue, oldValue) {
      this.updateCorPrimaria();
    },
    corSecundaria: function(newValue, oldValue) {
      this.updateCorSecundaria();
    }
  },
  mounted() {
    this.updateCorPrimaria();
    this.updateCorSecundaria();
  },
  methods: {
    emitHandle() {
      this.$emit("handle", this.valor);
    },
    updateCSSVariable: function(name, value) {
      this.$el.style.setProperty(name, value);
    },
    updateCorPrimaria: function() {
      this.updateCSSVariable("--cor-primaria", `${this.corPrimaria}`);
    },
    updateCorSecundaria: function() {
      this.updateCSSVariable("--cor-secundaria", `${this.corSecundaria}`);
    }
  }
};
</script>
<style lang="scss" scoped>
//$cor-tema: #a0be37;
//$cor-tema-hover: #1C4700;
.btnIconMini {
  background-color: var(--cor-primaria);
  padding: 4px 6px;
  padding-top: 6px;
  text-align: center;
  vertical-align: middle;
  align-self: center;
  align-items: center;
  align-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.5s background;
  display: inline-block;
  &.hasIcon {
    display: inline-grid;
    grid-template-columns: auto 1fr;
  }
  &:hover {
    background-color: var(--cor-secundaria);
  }
  .icon {
    img {
      width: 30px;
    }
  }
  .name {
    color: white;
    padding: 0 5px;
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
