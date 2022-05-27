<template>
  <div>
    <div class="form">
      <div class="boxPadrao">
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nome</div>
            <div class="include">
              <input
                v-model="include.nome"
                type="text"
                placeholder="Nome da peça"
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
          <div class="scopo">
            <div class="titulo">
              Veículo
            </div>
            <div class="include">
              <select
                v-model="include.veiculo"
                type="text"
                placeholder="Marca do Produto"
              >
                <option value="selecione">selecione</option>
                <option
                  v-for="(item, index) in GET_VEICULOS"
                  :key="index"
                  :value="item.chave"
                  >{{ item.dados.nome }} - {{ item.dados.placa }}</option
                >
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
            <div class="titulo">Código do Paralelo</div>
            <div class="include">
              <input
                v-model="include.codigoParalelo"
                type="number"
                placeholder="Código do Produto"
              />
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
        modulo: "pecas",
        categoria: "veiculos",
        unidade: "UND",
        codigo: "",
        codigoParalelo: "",
        veiculo: "selecione",
        nome: "",
        marca: "",
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  computed: {
    GET_VEICULOS() {
      return this.$store.getters["fazenda/GET_VEICULOS"];
    }
  },
  methods: {
    clear() {
      this.include.codigo = "";
      this.include.codigoParalelo = "";
      this.include.nome = "";
      this.include.marca = "";
      this.include.categoria = "sementes";
      this.include.veiculo = "selecione";
      this.include.modulo = "insumos";
      this.include.unidade = "UND";
    },
    process(cond) {
      if (cond) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: `Ocorreu um erro inesperado, ${cond}`,
          type: "danger"
        });
        window.console.log("erro", cond);
        return false;
      } else {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Cadastrado com sucesso!",
          type: "sucess"
        });
        this.clear();
      }
    },
    enviar() {
      let includeName = this.include.nome;
      let includeMarca = this.include.marca;
      if (includeName == "" || includeName.length < 4) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Nome Inválido, está menor que 4 digitos",
          type: "warning"
        });
        return false;
      }
      if (includeMarca == "" || includeMarca.length < 4) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Marca Inválido, está menor que 4 digitos",
          type: "warning"
        });
        return false;
      }
      if (this.include.codigo == null || this.include.codigo == "") {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: `Código Inválido`,
          type: "warning"
        });
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
