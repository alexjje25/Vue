<template>
  <div>
    <div v-if="mounted == false" class="menu">
      <button @click="mount('tipo')">TIPO</button>
      <button @click="mount('especie')">ESPECIE</button>
      <button @click="mount('estagio')">ESTAGIO</button>
    </div>
    <div v-else class="form">
      <button @click="menu()">return</button>

      <div v-if="rota == 'tipo'">
        <h4>TIPO DE DANINHA</h4>
        <div class="grid g2">
          <div class="scope">
            <div class="titulo">Nome</div>
            <div class="include">
              <input v-model="includeTipo.name" type="text" />
            </div>
          </div>
        </div>
        <button @click="createTipo()">add tipo</button>
      </div>

      <div v-if="rota == 'especie'">
        <!-- coleta imagem -->
        <br />
        <input type="file" @change="selectCandidateImage($event)" />
        {{ includeEspecie.imagemURL }}
        <h4>especie</h4>
        SELECIONE O TIPO (PAI)<br />
        <select v-model="includeEspecie.tipo">
          <option value="selecione">selecione</option>
          <option
            v-for="(item, index) in listaTipo"
            :key="index"
            :value="item.chave"
            >{{ item.dados.name }}</option
          > </select
        ><br />
        Nome: <br /><input
          v-model="includeEspecie.name"
          type="text"
        /><br /><br />
        <button @click="createEspecie()">add tipo</button>
      </div>

      <div v-if="rota == 'estagio'" class="listaEstagio">
        <h4>estagio</h4>
        <div class="scope">
          <div class="titulo">SELECIONE A ESPECIE (PAI)</div>
          <div class="include">
            <select v-model="includeEstagio.especie">
              <option value="selecione">selecione</option>
              <option
                v-for="(item, index) in listaEspecie"
                :key="index"
                :value="item.chave"
                >{{ item.dados.name }}</option
              >
            </select>
          </div>
          <div class="scope">
            color:
            <select v-model="includeEstagio.cor">
              <option
                v-for="(cor, index) in cores"
                :key="index"
                :value="cor.chave"
              >
                {{ cor.dados.comment }}</option
              >
            </select>
            <br /><br />
            <div v-for="(cor, index) in buscaCor" :key="index">
              <div
                class="inlineColor"
                style="color:white"
                :style="{ backgroundColor: cor.dados.cor }"
              >
                {{ cor.dados.cor }} - {{ cor.dados.comment }}
              </div>
            </div>
          </div>
        </div>
        <div class="scope">
          <div>NOME DO ESTÁGIO</div>
          <div>
            <input v-model="includeEstagio.name" type="text" />
          </div>
        </div>
        <div class="scope">
          <div class="titulo"></div>
          <div class="include">
            <button @click="createEstagio()">add Estagio</button>
          </div>
        </div>
        <div class="scope">
          <div>
            <div
              v-if="
                listaEstagio.filter(
                  item => includeEstagio.especie == item.dados.especie
                ).length > 0
              "
            >
              Já existe:
            </div>
            <div v-else>Não contém nada criado</div>
          </div>
          <div
            v-for="(estagio, index) in listaEstagio.filter(
              item => includeEstagio.especie == item.dados.especie
            )"
            :key="index"
            class="item"
          >
            <div class="inlineItem g2">
              <div>{{ estagio.dados.name }}</div>
              <div>
                <div
                  v-for="(cor, index) in cores.filter(
                    cor0 => cor0.chave == estagio.dados.cor
                  )"
                  :key="index"
                >
                  <div
                    class="inlineColor"
                    :style="{ backgroundColor: cor.dados.cor }"
                  >
                    {{ cor.dados.cor }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  servDoencasTipo,
  servDoencasEspecie,
  servDoencasEstagio,
  Storage
} from "@/database";
export default {
  data() {
    return {
      selectedTipo: null,
      selectedEspecie: null,
      rota: "tipo",
      mounted: false,
      includeTipo: {
        chave: null,
        name: null
      },
      includeEspecie: {
        chave: null,
        tipo: "selecione",
        name: null,
        imagemURL: null
      },
      includeEstagio: {
        chave: null,
        cor: "selecione",
        especie: "selecione",
        name: null
      },
      progress: {
        total: null,
        quantidade: null
      },
      toUpload: {
        file: null,
        uploaded: false
      }
    };
  },
  computed: {
    buscaCor() {
      return this.$store.getters["admin/GET_COLORS"].filter(
        item => item.chave == this.includeEstagio.cor
      );
    },
    cores() {
      return this.$store.getters["admin/GET_COLORS"].filter(item => {
        if (item.dados.type == "marks") {
          return true;
        } else {
          return false;
        }
      });
    },
    listaTipo() {
      return this.$store.getters["admin/GET_DOENCAS_TIPO"];
    },
    listaEspecie() {
      return this.$store.getters["admin/GET_DOENCAS_ESPECIE"];
    },
    listaEstagio() {
      return this.$store.getters["admin/GET_DOENCAS_ESTAGIO"];
    }
  },
  methods: {
    selectCandidateImage(event) {
      //window.console.log(event);
      this.toUpload.file = event.target.files[0];
    },
    sendPrioritaryImage(referenciaURL, chave) {
      servDoencasEspecie.child(chave).update({ imagemURL: referenciaURL });
    },
    uploadImagem() {
      const self = this;
      const chave = this.includeEspecie.chave;
      Storage.child(`doencas/${chave}/doencas.jpg`)
        .put(self.toUpload.file)
        .then(function(snapshot) {
          self.sendPrioritaryImage(snapshot.downloadURL, chave);
        });
    },
    handle(err) {
      if (err) {
        window.console.log(err);
        window.alert("ERROR!");
      } else {
        window.alert("ENVIADO COM SUCESSO");
      }
    },
    createTipo() {
      this.includeTipo.chave = servDoencasTipo.push().key;
      servDoencasTipo
        .child(this.includeTipo.chave)
        .update(this.includeTipo, this.handle);
    },
    createEspecie() {
      if (this.includeEspecie.tipo == "selecione") return false;
      this.includeEspecie.chave = servDoencasEspecie.push().key;
      servDoencasEspecie
        .child(this.includeEspecie.chave)
        .update(this.includeEspecie, this.handle);
    },
    createEstagio() {
      if (this.includeEstagio.especie == "selecione") return false;
      if (this.includeEstagio.cor == "selecione") return false;
      this.includeEstagio.chave = servDoencasEstagio.push().key;
      servDoencasEstagio
        .child(this.includeEstagio.chave)
        .update(this.includeEstagio, this.handle);
    },
    mount(value) {
      this.mounted = true;
      this.rota = value;
    },
    menu() {
      this.mounted = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
.inlineColor {
  display: inline-block;
  padding: 10px;
  color: white;
}
.inlineItem {
  display: grid;
  & > div {
    text-align: center;
    align-content: center;
    align-items: center;
    align-self: center;
  }
  &.g2 {
    grid-template-columns: 1fr 1fr;
  }
}
.scope {
  padding: 10px;
}
</style>
