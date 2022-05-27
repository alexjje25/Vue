<template>
  <div class="layout">
    <div class="formulario">
      <h3>
        Incluir Estágio
      </h3>
      <div>
        Tipo:
        <select v-model="include.tipo">
          <option value="selecione">selecione</option>
          <option
            :key="index"
            :value="item.chave"
            v-for="(item, index) in GET_DOENCAS_TIPO"
            >{{ item.dados.name }}</option
          >
        </select>
      </div>
      <br />
      <div>
        Espécie:
        <select v-model="include.especie">
          <option value="selecione">selecione</option>
          <option
            :key="index"
            :value="item.chave"
            v-for="(item, index) in GET_DOENCAS_ESPECIE"
            >{{ item.dados.name }}</option
          >
        </select>
      </div>
      <br />
      <div>Nome: <input v-model="include.name" type="text" /></div>
      <br />
      <div class="scope">
        color:
        <select v-model="include.cor">
          <option value="selecione">selecione</option>
          <option
            v-for="(cor, index) in GET_COLORS"
            :key="index"
            :value="cor.chave"
          >
            {{ cor.dados.comment }}</option
          >
        </select>
        <br /><br />
        <div v-for="(cor, index) in GET_COLORS_FILTER" :key="index">
          <div
            class="inlineColor"
            style="color:white"
            :style="{ backgroundColor: cor.dados.cor }"
          >
            {{ cor.dados.cor }} - {{ cor.dados.comment }}
          </div>
        </div>
      </div>
      <br />
      <div><button class="btn" @click="POST()">Cadastrar</button></div>
    </div>

    <div class="lista">
      <h3>
        <v-badge color="green" :content="GET_DOENCAS_ESTAGIO.length"
          >Lista de Pragas/Estágios</v-badge
        >
      </h3>
      <div
        class="item"
        :key="index"
        v-for="(item, index) in GET_DOENCAS_ESTAGIO"
      >
        <vColor :chave="item.dados.cor" /> {{ item.dados.name }}
        <button class="btn danger small" @click="REMOVE(item.chave)">
          REMOVER
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { servDoencasEstagio } from "@/database";
import vColor from "@/components/colorBlock";
export default {
  components: { vColor },
  data() {
    return {
      include: {
        name: "",
        chave: "",
        tipo: "selecione",
        especie: "selecione",
        cor: "selecione"
      },
      bloqueado: false
    };
  },
  mounted() {
    this.findErrorEstagio();
  },
  methods: {
    // estagio update include tipo
    updateEstagio(estagio, tipo) {
      servDoencasEstagio.child(estagio).update({
        tipo: tipo
      });
    },
    findEspecie(especie, estagio) {
      this.$store.getters["admin/GET_DOENCAS_ESPECIE"].find(item => {
        if (item.chave == especie) {
          this.updateEstagio(estagio, item.dados.tipo);
        }
      });
    },
    remakerBug(chave) {
      //DEV TOOLS
      servDoencasEstagio
        .child(chave)
        .child("tipo")
        .remove();
      window.console.log("removidos!");
    },
    findErrorEstagio() {
      this.$store.getters["admin/GET_DOENCAS_ESTAGIO"].filter(item => {
        if (item.dados.tipo) {
          window.console.log("Existe tipo - ok");
          //this.remakerBug(item.chave);
          return false;
        } else {
          this.findEspecie(item.dados.especie, item.chave);
          window.console.log("Não existe tipo - danger");
          return true;
        }
      });
    },
    REMOVE(chave) {
      let decisao = window.confirm("Tem certeza que deseja excluir este item?");
      if (decisao) {
        servDoencasEstagio.child(chave).remove();
        window.alert("Removido com sucesso");
      } else {
        window.alert("Cancelado com sucesso");
      }
    },
    POST() {
      window.console.log("init");
      if (
        this.include.name.length < 3 ||
        this.include.tipo == "selecione" ||
        this.include.especie == "selecione" ||
        this.include.cor == "selecione"
      ) {
        window.alert(
          "Você se esqueceu de selecionar algo, verifique todos os campos"
        );
      } else {
        let POST_KEY = servDoencasEstagio.push().key;
        let self = this;
        this.include.chave = POST_KEY;
        servDoencasEstagio
          .child(self.include.chave)
          .update(self.include, function(error) {
            if (error) {
              window.alert("Erro " + error.code);
            } else {
              window.alert("Enviado com sucesso ");
            }
          });
      }
    }
  },
  computed: {
    GET_COLORS_FILTER() {
      return this.$store.getters["admin/GET_COLORS"].filter(
        item => item.chave == this.include.cor
      );
    },
    GET_COLORS() {
      return this.$store.getters["admin/GET_COLORS"].filter(item => {
        if (item.dados.type == "marks") {
          return true;
        } else {
          return false;
        }
      });
    },
    GET_DOENCAS_ESPECIE() {
      return this.$store.getters["admin/GET_DOENCAS_ESPECIE"].filter(
        item => item.dados.tipo == this.include.tipo
      );
    },
    GET_DOENCAS_TIPO() {
      return this.$store.getters["admin/GET_DOENCAS_TIPO"];
    },
    GET_DOENCAS_ESTAGIO() {
      return this.$store.getters["admin/GET_DOENCAS_ESTAGIO"].filter(item => {
        if (
          item.dados.tipo == this.include.tipo &&
          this.include.especie == item.dados.especie
        ) {
          return true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  padding: 10px;
}
.inlineColor {
  display: inline-block;
  padding: 6px;
  color: white;
  width: 120px;
  text-align: center;
}
.lista {
  .item {
    padding: 4px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 4px;
    align-content: center;
    align-items: center;
  }
}
</style>
