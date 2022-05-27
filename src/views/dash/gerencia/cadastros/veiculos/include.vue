<template>
  <div>
    <div class="boxPadrao">
      <div class="form">
        <div class="tituloContent">CADASTRO DE VEICULOS</div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Identificador</div>
            <div class="include">
              <input
                v-model="include.nome"
                type="text"
                placeholder="VEÍCULO 01 (EXEMPLO)"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Placa</div>
            <div class="include">
              <input
                v-model="include.placa"
                type="text"
                placeholder="ABC-1234 (EXEMPLO)"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Modelo</div>
            <div class="include">
              <input
                v-model="include.modelo"
                type="text"
                placeholder="VEÍCULO MODELO (EXEMPLO)"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Combustivel Utilizado</div>
            <div class="include">
              <!-- SELECT COMBUSTIVEL -->
              <select v-model="include.combustivel">
                <option value="selecione">selecione</option>
                <option
                  v-for="(item, index) in GET_COMBUSTIVEL"
                  :key="index"
                  :value="item.chave"
                >
                  {{ item.dados.nome }}
                </option>
                <!--
                <option value="diesel">Diesel</option>
                <option value="gasolina">Gasolina</option>
                <option value="etanol">Etanol</option>
                <option value="gasNatualVeicular">Gás Natural Veicular</option>
                <option value="oleoLubrificante">Óleo Lubrificante </option>
                <option value="queroseneAviao">Querosene de Aviação </option>
                <option value="gasolinaAviao">Gasolina de Aviação </option>
                <option value="etanalAviao">Etanol de Aviação </option>
                <option value="biocombustivel">Biocombustível</option>
                <option value="outros">Outros</option>
                -->
              </select>
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">SETOR DE UTILIZAÇÃO</div>
            <div class="include">
              <select v-model="include.setor">
                <option value="selecione">selecione</option>
                <option
                  v-for="(item, index) in SETORES"
                  :key="index"
                  :value="item.chave"
                >
                  {{ item.dados.titulo }}
                </option>
              </select>
            </div>
          </div>
          <!--
        <div class="scopo">
          <div class="titulo">DOCUMENTACAO FRENTE</div>
          <div class="include">
            <input
              type="file"
              v-bind="d"
              @change="SET_CANDIDATE_DOCUMENT($event, 'frente')"
            />
          </div>
          <div class="titulo">DOCUMENTACAO VERSO</div>
          <div class="include">
            <input
              type="file"
              @change="SET_CANDIDATE_DOCUMENT($event, 'verso')"
            />
          </div>
        </div>
        --></div>
        <p>
          <vBtn
            :icon="require('@/assets/icons/sinais/adicionar-white.png')"
            texto="CADASTRAR"
            @handleClick="enviar()"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { servVeiculos, firebase } from "@/database.js";
import vBtn from "@/components/dash/btnIcon";

export default {
  components: { vBtn },
  data() {
    return {
      d: null,
      include: {
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        combustivel: "selecione",
        placa: "",
        documentoFrente: null, // implementar
        documentoVerso: null, // implementar
        modelo: "",
        setor: "selecione",
        chave: null,
        nome: ""
      },
      candidateUpload: {
        documentoFrente: null,
        documentoVerso: null
      }
    };
  },
  computed: {
    SETORES() {
      return this.$store.getters["fazenda/GET_SETORES"];
    },
    GET_COMBUSTIVEL() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].filter(item => {
        if (item.dados.modulo == "combustivel") {
          return true;
        }
      });
    }
  },
  methods: {
    SET_CANDIDATE_DOCUMENT(event, conditional) {
      //this.documentoUpload = event.target.files[0];
      window.console.log("candidate Upload " + conditional);
      if (conditional == "frente") {
        this.candidateUpload.documentoFrente = event.target.files[0];
      } else if (conditional == "verso") {
        this.candidateUpload.documentoVerso = event.target.files[0];
      } else {
        alert("Erro condicional");
        return false;
      }
    },
    uploadDocuments() {},
    uploadImagem(chaveRef) {
      var self = this;
      const file = self.documentoUpload;
      const fazendaUID = this.$store.getters["auth/GET_FAZENDA"];
      const tipoDoc = "documento1";
      const localImage = `fazenda/${fazendaUID}/veiculos/${chaveRef}/${tipoDoc}`;
      const metadata = {
        cacheControl: "public,max-age=300"
      };
      const storageRef = firebase.storage().ref(localImage);
      const uploadTask = storageRef.put(file, metadata);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          self.inUpload = true;
          self.progress.total = snapshot.bytesTransferred;
          self.progress.atual = snapshot.totalBytes;
          self.progress.porcente =
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
          self.inUpload = false;
          window.console.log(error);
          window.alert(error.code);
        },
        function() {
          self.inUpload = false;
          servVeiculos.child(`${chaveRef}`).update({ imagemURL: localImage });
        }
      );
    },
    enviar() {
      let chave = servVeiculos.push().key;
      this.include.chave = chave;
      const response = this.include;
      servVeiculos
        .child(chave)
        .update(response)
        .then(() => {
          window.alert("Enviado com Sucesso");
          this.cleanForm();
        });
    },
    cleanForm() {
      this.include.combustivel = "selecione";
      this.include.placa = "";
      this.include.documento = "";
      this.include.modelo = "";
      this.include.chave = "";
      this.include.setor = "selecione";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
