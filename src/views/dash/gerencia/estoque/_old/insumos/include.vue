<template>
  <div>
    <div class="tituloContent">CADASTRO DE Insumo</div>
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
              v-model="include.quantidade"
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
              <option value="UND">U - Unidade</option>
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
        <div class="scopo">
          <div class="titulo">Insumos Agrícolas</div>
          <div class="include">
            <select v-model="include.categoria">
              <option value="sementes">Sementes</option>
              <option value="defensivos">Defensivos</option>
              <option value="adubos">Adubos</option>
              <option value="fertilizantes">fertilizantes</option>
            </select>
          </div>
        </div>
      </div>

      <p><v-btn texto="CADASTRAR" @handleClick="enviar()" /></p>
    </div>
  </div>
</template>

<script>
import { Estoque } from "@/database.js";
import vbtn from "@/components/dash/btn";
export default {
  components: {
    "v-btn": vbtn
  },
  data() {
    return {
      itsOk: false,
      //remaker 20/03
      include: {
        categoria: "sementes",
        fornecedor: "selecione",
        cultivar: "selecione",
        nome: null,
        marca: null,
        quantidade: 0,
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
      this.include.categoria = null;
      this.include.quantidade = null;
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
      // 20/03
      let _CHAVE = Estoque.push().key;
      this.include.chave = _CHAVE;
      Estoque.child(_CHAVE).update(this.include, this.process);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
