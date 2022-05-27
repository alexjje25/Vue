<template>
  <div>
    <div class="menu">
      <button @click="mount('tipo')" :class="{ actived: rota == 'tipo' }">
        TIPO
      </button>
      <button @click="mount('especie')" :class="{ actived: rota == 'especie' }">
        ESPÉCIE
      </button>
      <button @click="mount('estagio')" :class="{ actived: rota == 'estagio' }">
        ESTÁGIO
      </button>
    </div>
    <div class="views">
      <includeEstagio v-show="rota === 'estagio'" />
      <includeEspecie v-show="rota === 'especie'" />
      <includeTipo v-show="rota === 'tipo'" />
    </div>
  </div>
</template>

<script>
import includeEstagio from "./estagio";
import includeEspecie from "./especie";
import includeTipo from "./tipo";

export default {
  components: { includeEstagio, includeEspecie, includeTipo },
  data() {
    return {
      rota: "tipo"
    };
  },
  methods: {
    mount(rota) {
      this.rota = rota;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  display: inline-block;
  margin: 10px auto;
  button {
    margin: 2px;
    color: white;
    background-color: rgba(35, 35, 35, 1);
    padding: 8px 20px;
    border-radius: 20px;
    border: 1px solid rgba(35, 35, 35, 1);
    &.actived {
      color: rgba(35, 35, 35, 1);
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
