<template>
  <div>
    <div class="tituloContent">Cadastro de Combustível</div>
    <div class="form">
      <h4>Dados Importante</h4>
      <div class="grid g2">
        <div class="scopo">
          <div class="titulo">Tipo de Combustível</div>
          <div class="include">
            <select v-model="include.type">
              <option value="selecione">selecione</option>
              <option value="gasolina">Gasolina</option>
              <option value="etanal">Etanal</option>
              <option value="gasNatualVeicular">Gás Natural Veicular</option>
              <option value="oleoLubrificante">Óleo Lubrificante </option>
              <option value="queroseneAviao">Querosene de Aviação </option>
              <option value="gasolinaAviao">Gasolina de Aviação </option>
              <option value="etanalAviao">Etanol de Aviação </option>
              <option value="biocombustivel">Biocombustível</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Fornecedor</div>
          <div class="include">
            <select v-model="include.fornecedor">
              <option value="selecione">selecione</option>
              <option
                v-for="(item, index) in fornecedores"
                :key="index"
                :value="item.chave"
                >{{ item.dados.nome }}</option
              >
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Número da Nota Fiscal:
          </div>
          <div class="include">
            <input v-model="include.notaFiscal" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Anexo <small style="color:red;"><i>Nao implementado</i></small>
          </div>
          <div class="include">
            <input
              type="file"
              accept="application/pdf, image/*"
              @change="processDOC($event)"
            />
            <br />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Valor de compra por litro:
          </div>
          <div class="include">
            <input v-model="include.valorLitro" type="number" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Valor total:
          </div>
          <div class="include">
            <input v-model="include.valorTotal" type="number" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Quantidade:
          </div>
          <div class="include">
            <input v-model="include.quantidade" type="number" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            Observação:
          </div>
          <div class="include">
            <textarea v-model="include.observacao" type="text" />
          </div>
        </div>
        <div>
          <v-btn texto="ENVIAR" @handleClick="enviar()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servCombustiveis } from "@/database.js";
//import { timelocal } from "@/service/time.js";
import vbtn from "@/components/dash/btn";
export default {
  components: {
    "v-btn": vbtn
  },
  data() {
    return {
      chavePush: null,
      include: {
        type: "selecione",
        fornecedor: "selecione",
        notaFiscal: null,
        valorLitro: null,
        valorTotal: null,
        quantidade: null,
        anexoURL: "nao implementado",
        obs: null,
        data: null,
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  computed: {
    fornecedores() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    }
  },
  methods: {
    handle(ERROR) {
      if (ERROR) {
        window.console.log(ERROR);
        return false;
      } else {
        window.alert("CADASTRADO COM SUCESSO!");
        this.clear();
      }
    },
    processDOC(event) {
      window.console.log(event);
      /*this.chavePush = servCombustiveis.push().key;
      const file = event.target.files[0];
      const self = this;
      var metadata = {
        contentType: file.type
      };

      Storage.child("notafiscal/" + self.chavePush + "/" + file.name)
        .put(file, metadata)
        .then(function(snapshot) {
          window.console.log("Uploaded", snapshot.totalBytes, "bytes.");
          window.console.log("File metadata:", snapshot.metadata);
          snapshot.ref.getDownloadURL().then(function(url) {
            window.console.log("File available at", url);
            self.anexoURL = url;
          });
        })
        .catch(function(error) {
          // [START onfailure]
          window.console.error("Upload failed:", error);
          // [END onfailure]
        });
      // [END oncomplete]*/
    },
    clear() {
      this.include.type = "selecione";
      this.include.fornecedor = "selecione";
      this.include.notaFiscal = null;
      this.include.valorLitro = null;
      this.include.valorTotal = null;
      this.include.quantidade = null;
      this.include.anexoURL = "nao implementado";
      this.include.obs = null;
    },
    filtraForm() {
      //implementar !
    },
    enviar() {
      if (this.include.fornecedor == "selecione") {
        return false;
      }
      if (this.include.type == "selecione") {
        return false;
      }
      const key = servCombustiveis.push().key;
      const response = this.include;
      servCombustiveis.child(key).update(response, this.handle());
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
