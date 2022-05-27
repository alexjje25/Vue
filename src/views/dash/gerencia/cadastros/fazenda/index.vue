<template>
  <div class="fazendaConfig">
    <div v-if="GET_NIVEL >= 50" class="boxPadrao">
      <h1 class="ContentTitle">
        CONFIGURAÇÕES DA FAZENDA
      </h1>
      <div class="sect">
        <div v-if="updateMode">
          Hectares <input v-model="postOBJ.hectares" type="number" />
        </div>
        <div v-else>Hectares {{ GET_FAZENDA.hectares }}</div>
      </div>
      <div class="sect">
        <div>Coordenada central da fazenda</div>
        <div v-if="updateMode">
          LAT: <input v-model="postOBJ.coord.x" type="number" /> LONG:
          <input v-model="postOBJ.coord.y" type="number" />
        </div>
        <div v-else>
          LAT.: {{ GET_FAZENDA.coord.x }} / LONG.: {{ GET_FAZENDA.coord.y }}
        </div>
      </div>
      <div class="sect">
        <div>Logomarca</div>
        <div>Não registrado</div>
      </div>
      <div v-if="updateMode == true" class="actions">
        <button @click="cancelaUpdate()">
          CANCELAR
        </button>
        <button @click="updateFazenda()">
          SALVAR
        </button>
      </div>
      <div v-else class="actions">
        <button @click="updateMode = true">
          EDITAR
        </button>
      </div>
      <code v-if="GET_NIVEL >= 99" class="RootSection">
        POST:
        {{ postOBJ }}
        <hr />
        {{ GET_FAZENDA }}
      </code>
    </div>
    <div v-else class="boxPadrao centralizaTudo">
      Você não tem permissão para acessar essa área.
    </div>
  </div>
</template>

<script>
import { servFazendas } from "@/database.js";
//import vBtn from "@/components/dash/btnIconMini";
export default {
  data() {
    return {
      updateMode: false,
      postOBJ: {
        hectares: this.$store.getters["fazenda/GET_MINHAFAZENDA"].hectares,
        coordenada: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coordenada,
        coord: {
          x: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x,
          y: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y
        }
      },
      fazendaUID: this.$store.getters["auth/GET_FAZENDA_ID"]
    };
  },
  computed: {
    GET_FAZENDA() {
      return this.$store.getters["fazenda/GET_MINHAFAZENDA"];
    },
    GET_NIVEL() {
      return this.$store.getters["auth/GET_NIVEL"];
    }
  },
  beforeMount() {
    const { hectares, nome, nomeFazenda } = this.$store.getters[
      "fazenda/GET_MINHAFAZENDA"
    ];
  },
  methods: {
    cancelaUpdate() {
      this.updateMode = false;
    },
    toogleUpdateMode() {
      this.updateMode = !this.updateMode;
    },
    updateFazenda() {
      let self = this;
      let stringCoordenada = this.postOBJ.coord.x + ", " + this.postOBJ.coord.y;
      this.postOBJ.coordenada = stringCoordenada;

      servFazendas.child(self.fazendaUID).update(
        {
          hectares: Number(self.postOBJ.hectares),
          coordenada: self.postOBJ.coordenada,
          coord: {
            x: Number(self.postOBJ.coord.x),
            y: Number(self.postOBJ.coord.y)
          }
        },
        function() {
          self.$store.commit("resource/SET_NOTIFY", {
            status: true,
            mensagem:
              "Update com sucesso, recomendamos que aperte a tecla F5 para entrar em vigor as novas configurações",
            type: "sucess"
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.fazendaConfig {
  .sect {
    padding: 10px;
  }
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
