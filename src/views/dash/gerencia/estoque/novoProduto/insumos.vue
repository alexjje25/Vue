<template>
  <div>
    <div class="form">
      <div class="boxPadrao">
        <h4>TIPO DE INSUMO</h4>
        <div class="scopo">
          <div class="titulo"></div>
          <div class="include">
            <select v-model="include.categoria">
              <option value="sementes">Sementes</option>
              <option value="defensivos">Defensivos</option>
              <option value="adubos">Adubos</option>
              <option value="fertilizantes">Fertilizantes</option>
            </select>
          </div>
        </div>
        <h4>Detalhes do Produto</h4>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nome</div>
            <div class="include">
              <input
                v-model="include.nome"
                type="text"
                placeholder="Nome do Produto"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Marca</div>
            <div class="include">
              <input
                v-model="include.marca"
                type="text"
                placeholder="Marca do Produto"
              />
            </div>
          </div>
          <div v-if="include.categoria == 'sementes'" class="scopo">
            <div class="titulo">CULTIVAR</div>
            <div class="include">
              <select v-model="include.cultivar">
                <option value="selecione">Selecione</option>
                <option
                  v-for="(item, index) in cultivar"
                  :key="index"
                  :value="item.chave"
                >
                  {{ item.dados.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Código do Produto</div>
            <div class="include">
              <input
                v-model="include.codigo"
                type="number"
                placeholder="Código do Produto"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Unidade de Medida</div>
            <div class="include">
              <select v-model="include.unidade" type="text">
                <option value="KG">KG - Quilograma</option>
                <option value="T">T - Tonelada</option>
                <option value="UND">UND - Unidade</option>
                <option value="LT">LT - Litro</option>
                <option value="SACA">SACA</option>
              </select>
            </div>
          </div>
        </div>
        <div class="actions">
          <v-btn
            name="CADASTRAR"
            :icon="require('@/assets/icons/sinais/adicionar-white.png')"
            @handle="enviar()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Estoque } from "@/database.js";
import vbtn from "@/components/dash/btnIconMini";

export default {
  components: {
    "v-btn": vbtn
  },
  data() {
    return {
      itsOk: false,
      //remaker 20/03
      include: {
        idProduto: "",
        quantidade: 0,
        fornecedor: "",
        valorUnitario: 0,
        modulo: "insumos",
        categoria: "sementes",
        unidade: "UND",
        codigo: null,
        cultivar: "selecione",
        nome: null,
        marca: null,
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  computed: {
    cultivar() {
      return this.$store.getters["fazenda/GET_CULTIVARES"];
    }
  },
  methods: {
    clear() {
      this.include.codigo = null;
      this.include.nome = null;
      this.include.marca = null;
      this.include.categoria = "sementes";
      this.include.cultivar = "selecione";
      this.include.modulo = "insumos";
      this.include.unidade = "UND";
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
      let includeName = this.include.nome;
      let includeMarca = this.include.marca;
      if (this.include.categoria !== "sementes") {
        this.include.cultivar = null;
      }
      if (this.include.categoria == "sementes") {
        if (this.include.cultivar == "selecione") {
          window.alert("Selecione o Cultivar cadastrado");
          return false;
        }
      }
      if (includeName == null || includeName.length < 4) {
        window.alert("Nome Inválido, está menor que 4 digitos");
        return false;
      }
      if (includeMarca == null || includeMarca.length < 4) {
        window.alert("Marca Inválido, está menor que 4 digitos");
        return false;
      }
      if (this.include.codigo == null || this.include.codigo == "") {
        window.alert("Código Inválido");
        return false;
      }
      // 20/03
      let _CHAVE = Estoque.push().key;
      this.include.idProduto = _CHAVE;
      Estoque.child(_CHAVE).update(this.include, this.process);
    }
  }
};
</script>

<style lang="scss" scoped>
.actions {
  text-align: center;
}
@import "@/style/dash/formInclude.scss";
</style>
