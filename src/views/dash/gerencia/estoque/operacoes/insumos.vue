<template>
  <div class="insumoTransacoes">
    <div class="formularios">
      <div class="caixaBox">
        <div class="label">TIPO DE OPERAÇÃO</div>
        <div class="imagemBox g2">
          <div>
            <img
              v-show="include.tipoOperacao == 'entrada'"
              src="@/assets/icons/ico-entrada.png"
              title="entrada"
            />
            <img
              v-show="include.tipoOperacao !== 'entrada'"
              src="@/assets/icons/ico-entrada-s.png"
              title="entrada"
              @click="include.tipoOperacao = 'entrada'"
            />
            <div class="texto">ENTRADA</div>
          </div>
          <div>
            <img
              v-show="include.tipoOperacao == 'saida'"
              src="@/assets/icons/ico-saida.png"
              title="saída"
            />
            <img
              v-show="include.tipoOperacao !== 'saida'"
              src="@/assets/icons/ico-saida-s.png"
              title="saída"
              @click="include.tipoOperacao = 'saida'"
            />
            <div class="texto">SAÍDA</div>
          </div>
        </div>
      </div>

      <div class="caixaBox">
        <div class="label">TIPO DE INSUMO</div>
        <div class="imagemBox g4">
          <div>
            <img
              v-show="include.categoria !== 'sementes'"
              title="Sementes"
              src="@/assets/icons/ico-sementes-w.png"
              @click="include.categoria = 'sementes'"
            />
            <img
              v-show="include.categoria == 'sementes'"
              title="Sementes"
              src="@/assets/icons/ico-sementes.png"
            />
            <div class="texto">sementes</div>
          </div>
          <div>
            <img
              v-show="include.categoria !== 'adubos'"
              title="Adubos"
              src="@/assets/icons/ico-adubo-w.png"
              @click="include.categoria = 'adubos'"
            />
            <img
              v-show="include.categoria == 'adubos'"
              title="Adubos"
              src="@/assets/icons/ico-adubo.png"
            />
            <div class="texto">adubos</div>
          </div>
          <div>
            <img
              v-show="include.categoria !== 'fertilizantes'"
              title="Fertilizantes"
              src="@/assets/icons/ico-fertilizante-w.png"
              @click="include.categoria = 'fertilizantes'"
            />
            <img
              v-show="include.categoria == 'fertilizantes'"
              title="Fertilizantes"
              src="@/assets/icons/ico-fertilizante.png"
            />
            <div class="texto">fertilizantes</div>
          </div>
          <div>
            <img
              v-show="include.categoria !== 'defensivos'"
              title="Defensivos"
              src="@/assets/icons/ico-defensivos-w.png"
              @click="include.categoria = 'defensivos'"
            />
            <img
              v-show="include.categoria == 'defensivos'"
              title="Defensivos"
              src="@/assets/icons/ico-defensivos.png"
            />
            <div class="texto">defensivos</div>
          </div>
        </div>
      </div>

      <div class="caixaBox">
        <div class="label">
          Produto
          <span v-if="include.tipoOperacao == 'entrada'">/ Fornecedor</span>
        </div>
        <div
          class="imagemBox"
          :class="{ g2: include.tipoOperacao == 'entrada' }"
        >
          <div v-if="include.tipoOperacao == 'entrada'">
            <div class="titulo">
              <h4>FORNECEDOR:</h4>
            </div>
            <div class="include">
              <select v-model="include.fornecedor">
                <option value="selecione">Selecione</option>
                <option
                  v-for="(item, index) in GET_FORNECEDORES"
                  :key="index"
                  :value="item.chave"
                  >{{ item.dados.nome }}</option
                >
              </select>
            </div>
          </div>
          <div>
            <div class="titulo">
              <h4>PRODUTO:</h4>
            </div>
            <div class="include">
              <select v-model="include.idProduto">
                <option value="selecione">Selecione</option>
                <option
                  v-for="(item, index) in GET_ESTOQUE"
                  :key="index"
                  :value="item.chave"
                  >{{ item.dados.nome }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="caixaBox">
        <div class="label">
          DADOS IMPORTANTE
        </div>
        <div class="formContainImage">
          <div class="imagem">
            <img src="@/assets/icons/tarefas.png" />
          </div>
          <div class="formulario">
            <div>
              <div class="titulo">Colaborador</div>
              <div class="include">
                <select v-model="include.colaborador">
                  <option value="selecione">selecione</option>
                  <option
                    v-for="(item, index) in GET_COLABORADORES"
                    :key="index"
                    :value="item.chave"
                  >
                    {{ item.dados.name }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="include.tipoOperacao == 'entrada'">
              <div class="titulo">Número da Nota Fiscal</div>
              <div class="include">
                <input
                  v-model="include.notafiscal"
                  type="text"
                  placeholder="Nome do Produto"
                />
              </div>
            </div>
            <div>
              <div class="titulo">Quantidade</div>
              <div class="include">
                <input
                  v-model="include.quantidade"
                  type="number"
                  placeholder="Quantidade da compra"
                />
              </div>
            </div>
            <div v-if="include.tipoOperacao == 'entrada'">
              <div class="titulo">Valor Unitário</div>
              <div class="include">
                <input
                  v-model="include.valorUnitario"
                  type="number"
                  placeholder="Valor Unitário"
                />
              </div>
            </div>
            <div v-if="include.tipoOperacao == 'entrada'">
              <div class="titulo">Valor Total</div>
              <div class="include">
                <input
                  v-model="include.valorTotal"
                  type="number"
                  placeholder="Valor Total"
                />
              </div>
            </div>
            <div v-if="include.tipoOperacao == 'entrada'" class="scopo">
              <div class="titulo">Anexo</div>
              <div class="include">
                <input
                  type="file"
                  placeholder="Valor Total"
                  @change="handleFile($event)"
                />
              </div>
            </div>
            <div v-if="include.tipoOperacao == 'entrada'" class="scopo">
              <div class="titulo">Previsão de Entrega</div>
              <div class="include">
                <input
                  v-model="include.dataEntrega"
                  type="date"
                  placeholder="Previsão de Entrega"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="caixaBox" style="text-align:center">
        <v-btn
          name="CADASTRAR"
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          @handle="enviar()"
        />
      </div>
    </div>
    <v-box-upload
      v-if="processDOC.inProcess"
      :total="processDOC.total"
      :atual="processDOC.atual"
      :porcente="processDOC.porcente"
    ></v-box-upload>
  </div>
</template>

<script>
import { EstoqueLog, Storage, firebase } from "@/database.js";
import vBtn from "@/components/dash/btnIconMini";
import vBoxUpload from "@/views/dash/gerencia/global/box-await-upload";

export default {
  components: {
    vBtn,
    vBoxUpload
  },
  data() {
    return {
      itsOk: false,
      include: {
        dataEntrega: "",
        chave: "",
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        idProduto: "selecione",
        fornecedor: "selecione",
        modulo: "insumos",
        categoria: "sementes",
        quantidade: 1,
        valorUnitario: 1,
        valorTotal: 0,
        notafiscal: 0,
        anexos: null,
        tipoOperacao: "entrada",
        colaborador: "selecione"
      },
      processDOC: {
        file: "",
        status: false,
        total: null,
        atual: null,
        porcente: null,
        inProcess: false
      }
    };
  },
  computed: {
    GET_FORNECEDORES() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    },
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_ESTOQUE() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].filter(item => {
        if (item.dados.modulo == "insumos") {
          if (item.dados.categoria == this.include.categoria) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "include.categoria": function() {
      this.include.idProduto = "selecione";
    },
    "include.quantidade": function() {
      this.include.valorTotal = (
        this.include.valorUnitario * this.include.quantidade
      ).toFixed(2);
    },
    "include.valorUnitario": function(unitVal) {
      //
      window.console.log(unitVal);
      let bench = Number(unitVal);
      this.include.valorTotal = (
        this.include.valorUnitario * this.include.quantidade
      ).toFixed(2);
      return bench.toFixed(2);
    }
  },
  methods: {
    filtrosBeforeSend() {
      if (this.include.quantidade <= 0) {
        this.notify("Quantidade invalida, o valor deve ser Positivo");
      }
    },
    notify(param) {
      if (param) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: param
        });
      } else {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Enviada com sucesso!"
        });
      }
    },
    handleFile(event) {
      window.console.log(event);
      this.processDOC.file = event.target.files[0];
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
      let postKEY = EstoqueLog.push().key;
      this.include.chave = postKEY;
      if (this.include.colaborador == "selecione") {
        return false;
      }
      if (this.include.quantidade <= 0) {
        this.notify("O valor não pode ser negativo");
        this.include.quantidade = 0;
        return false;
      }
      if (this.include.chave == null) {
        return false;
      }
      if (this.include.tipoOperacao == "saida") {
        this.enviarSaida();
      }
      if (this.include.tipoOperacao == "entrada") {
        this.enviarImagem();
      }
    },
    enviarSaida() {
      let payload = {
        quantidade: Number(this.include.quantidade),
        colaborador: this.include.colaborador,
        idFazenda: this.include.idFazenda,
        chave: this.include.chave,
        tipoOperacao: this.include.tipoOperacao,
        idProduto: this.include.idProduto,
        categoria: this.include.categoria,
        modulo: this.include.modulo
      };
      let self = this;
      EstoqueLog.child(payload.chave).update(payload, () => {
        self.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Enviado com sucesso"
        });
      });
    },
    enviaDados() {
      //dados firebase realtime
      let payload = this.include;
      let self = this;
      payload.quantidade = Number(payload.quantidade);
      payload.valorUnitario = Number(payload.valorUnitario);
      payload.valorTotal = Number(payload.valorTotal);
      //sending.
      EstoqueLog.child(payload.chave).update(payload, () => {
        self.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Enviado com sucesso"
        });
      });
    },
    enviarImagem() {
      //dados firebase Storage
      const self = this;
      const file = self.processDOC.file;
      const localImage = `notasfiscais/${this.include.idFazenda}/${this.include.chave}`;
      const metadata = {
        cacheControl: "public,max-age=300"
      };
      const storageRef = Storage.child(localImage);
      const uploadTask = storageRef.put(file, metadata);
      //process
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          self.processDOC.inProcess = true;
          self.processDOC.total = snapshot.bytesTransferred;
          self.processDOC.atual = snapshot.totalBytes;
          self.processDOC.porcente =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              window.console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              window.console.log("Upload is running");
              break;
          }
        },
        function(error) {
          self.processDOC.inProcess = false;
          window.console.log(error);
          window.alert(error.code);
        },
        function() {
          self.processDOC.inProcess = false;
          self.include.anexos = localImage;
          self.enviaDados();
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.insumoTransacoes {
  background-color: #eef2f7;
  padding-top: 10px;
}
h3 {
  padding: 20px;
  margin: 2px;
  background-color: rgba(200, 200, 200, 0.2);
}
.formularios {
  margin: 20px 5%;
  margin-bottom: 0px;
  padding-bottom: 20px;
  input,
  select {
    padding: 10px;
  }
}
.caixaBox {
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  margin: 50px auto;
  margin-bottom: 80px;
  background: white;
  .formContainImage {
    display: grid;
    grid-template-columns: 200px 1fr;
    padding: 10px;
    .formulario {
      & > div {
        padding: 10px;
        .titulo {
          padding: 5px 0px;
        }
      }
    }
    .imagem {
      text-align: center;
      align-content: center;
      align-items: center;
      align-self: center;
      img {
        width: 180px;
        opacity: 0.8;
        margin: 0 auto;
      }
    }
  }
  .label {
    position: absolute;
    margin-top: -45px;
    padding: 10px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(50, 50, 50, 0.3),
      0px 4px 6px rgba(50, 50, 50, 0.3);
    border-radius: 8px;
    font-weight: 900;
  }
  .imagemBox {
    display: grid;
    text-align: center;
    align-content: center;
    align-items: center;
    align-self: center;
    img {
      cursor: pointer;
    }
    &.g2 {
      grid-template-columns: 1fr 1fr;
    }
    &.g3 {
      grid-template-columns: 1fr 1fr 1fr;
    }
    &.g4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    img {
      width: 100px;
    }
  }
}
@import "@/style/dash/formInclude.scss";
@import "../template.scss";
</style>
