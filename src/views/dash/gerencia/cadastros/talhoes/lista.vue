<template>
  <div>
    <vEditor @handle="handleOut()" :chave="token" v-if="editor == true" />
    <div v-else class="lista">
      <div
        v-for="(item, index) in GET_TALHOES"
        :key="index"
        class="boxPadrao item"
      >
        <button class="btnPadrao warning" @click="toggleEditor(item.chave)">
          editar
        </button>
        <div>
          Nome: <b>{{ item.dados.name }}</b>
        </div>
        <div>
          Hectares: <b>{{ item.dados.size }}</b>
        </div>
        <div>
          Area GPS:
          <div style="font-size:12px;font-weight:600;">
            <div v-if="item.dados.area == undefined">
              Não registrado
            </div>
            <div else>
              {{ item.dados.area }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vEditor from "./editor";
export default {
  components: { vEditor },
  data() {
    return {
      editor: false,
      token: ""
    };
  },
  methods: {
    handleOut() {
      this.editor = false;
      this.token = "";
    },
    toggleEditor(isKey) {
      this.token = isKey;
      this.editor = !this.editor;
    }
  },
  computed: {
    GET_TALHOES() {
      let lista = this.$store.getters["fazenda/GET_TALHOES"];
      return lista.reverse();
    }
  }
};
</script>

<style lang="scss" scoped>
.lista {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .item {
    margin: 10px !important ;
  }
}
</style>
