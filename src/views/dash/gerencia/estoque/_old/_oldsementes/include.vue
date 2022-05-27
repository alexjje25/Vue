<template>
  <div>
    <div class="tituloContent">CADASTRO DE SEMENTES</div>
    <div class="form">
      <h4>Dados Importante</h4>
      <div class="grid g2">
        <div class="scopo">
          <div class="titulo">Nome</div>
          <div class="include">
            <input v-model="include.nome" type="text" placeholder="Nome" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Marca</div>
          <div class="include">
            <input v-model="include.marca" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Fornecedor</div>
          <div class="include">
            <select v-model="include.fornecedor">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in fornecedores"
                :key="index"
                :value="item.dados.nome"
              >
                {{ item.dados.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">CULTIVAR</div>
          <div class="include">
            <select v-model="include.cultivar">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in cultivar"
                :key="index"
                :value="item.dados.nome"
              >
                {{ item.dados.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="scopo">
          <div class="titulo">Quantidade</div>
          <div class="include">
            <input
              v-model="include.estoque"
              type="number"
              placeholder="ESTOQUE ATUAL"
            />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Unidade de Medida</div>
          <div class="include">
            <select v-model="include.unidade" type="text">
              <option value="KG">KG - Quilograma</option>
              <option value="T">T - Tonelada</option>
              <option value="UN">U - Unidade</option>
              <option value="LT">LT - Litro</option>
              <option value="SACA">SACA</option>
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Numero Nota Fiscal</div>
          <div class="include">
            <input v-model="include.numeroNF" type="text" />
          </div>
        </div>
      </div>

      <p><v-btn texto="CADASTRAR" @handleClick="enviar()" /></p>
    </div>
  </div>
</template>

<script>
import { StoqueSementes } from "@/database.js";
import vbtn from "@/components/dash/btn";
export default {
  components: {
    "v-btn": vbtn
  },
  data() {
    return {
      itsOk: false,
      include: {
        fornecedor: "selecione",
        cultivar: "selecione",
        nome: null,
        marca: null,
        estoque: 0,
        unidade: "UN",
        numeroNF: null,
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  computed: {
    fornecedores() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    },
    cultivar() {
      return this.$store.getters["fazenda/GET_CULTIVARES"];
    }
  },
  methods: {
    clear() {
      this.include.nome = null;
      this.include.marca = null;
      this.include.estoque = null;
      this.include.unidade = null;
      this.include.numeroNF = null;
      this.include.cultivar = "selecione";
      this.include.fornecedor = "selecione";
    },
    process(cond) {
      if (cond) {
        window.alert("Erro consulte um suporte");
        window.console.log("erro", cond);
        return false;
      } else {
        window.alert("Enviado com sucesso");
        this.clear();
      }
    },
    enviar() {
      if (this.include.cultivar == "selecione") {
        window.alert("Selecione o Cultivar cadastrado");
        return false;
      }
      if (this.include.fornecedor == "selecione") {
        window.alert("Selecione o Fornecedor cadastrado");
        return false;
      }
      const chave = StoqueSementes.push().key;
      StoqueSementes.child(chave).update(this.include, this.process);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
