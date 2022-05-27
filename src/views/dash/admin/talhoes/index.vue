<template>
  <div>
    <h1 class="tituloContent">CADASTRO DE TALHÃO</h1>

    <div class="formulario">
      <div class="grid2">
        <!-- FAZENDA  -->
        <div class="sect">
          <div class="label">Selecione a Fazenda:</div>
          <div class="insert">
            <select v-model="include.idFazenda">
              <option selected value="selecione">selecione</option>
              <option
                v-for="(list, index) in FAZENDAS"
                :key="index"
                :value="list.chave"
              >
                {{ list.dados.nomeFazenda }}
              </option>
            </select>
          </div>
        </div>

        <!-- TALHÃO  -->
        <div class="sect">
          <div class="label">Talhão:</div>
          <div class="insert">
            <select v-model="include.idTalhao">
              <option selected value="selecione">selecione</option>
              <option
                v-for="(list, index) in TALHOES"
                :key="index"
                :value="list.chave"
              >
                {{ list.dados.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="cadastroArea">
        <hr />
        <h2>AREA</h2>
        <select v-model="selectedMode">
          <option value="json">json</option>
        </select>
        <div class="inputType">
          <b> JSON: </b> <br /><br />
          <textarea v-model="json" />
          <br /><br />
          <button @click="includeForJson()">Convert em Area</button>
        </div>
        <div v-if="selectedMode == 'json'">
          <code>
            {{ include.area }}
          </code>
        </div>
        <div v-if="selectedMode == 'manual'" class="listaArea">
          <div
            v-for="(item, index) in include.area"
            :key="index"
            class="fragmentArea"
          >
            <span> x: {{ item[0] }} </span>
            <span> y: {{ item[1] }} </span>
            <button @click="removeArea(index)">remove</button>
          </div>
        </div>
      </div>
      <button class="btn" @click="cadastrarTalhao()">CADASTRAR</button>
    </div>
  </div>
</template>

<script>
// COORDANADA INVERTIDA PARA AREA !

import { servTalhoes } from "@/database.js";
export default {
  data() {
    return {
      selectedMode: "json",
      digA: 0,
      digB: 0,
      json: [],
      include: {
        area: [], // push MOD
        idTalhao: "",
        idFazenda: ""
      }
    };
  },
  computed: {
    FAZENDAS() {
      return this.$store.getters["admin/GET_FAZENDAS"];
    },
    TALHOES() {
      return this.$store.getters["admin/GET_TALHOES"].filter(item => {
        if (item.dados.idFazenda == this.include.idFazenda) {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  methods: {
    removeArea(index) {
      this.include.area.splice(index, 1);
    },
    includeArea() {
      let rest = [Number(this.digB), Number(this.digA)];
      this.include.area.push(rest);
    },
    /*replaceAll(str, atual, definitivo) {
      var pos = str.indexOf(atual);
      while (pos > -1) {
        str = str.replace(atual, definitivo);
        pos = str.indexOf(atual);
      }
      return str;
    },*/
    includeForJson() {
      let json = this.json;
      let stringToJson = JSON.parse(json);
      window.console.log(stringToJson);
      this.include.area = stringToJson;
    },
    /*sim BackupincludeForJson() {
      let json = this.json;
      let treat1 = this.replaceAll(json, ",0]", ""); //resultado pode ser funcao
      let treat2 = this.replaceAll(treat1, ",[", "/");
      let treat3 = this.replaceAll(treat2, "[", "");
      let treat4 = treat3.split("/");
      let receive = [];
      treat4.forEach(element => {
        let response = element.split(",");
        let prop1 = Number(response[0]);
        let prop2 = Number(response[1]);
        let obj = [prop1, prop2];
        window.console.log(prop1, prop2, obj);
        receive.push(obj);
      });
      this.include.area = receive;
    },*/
    handle(err) {
      if (err) {
        window.alert("ERRO!");
        window.console.log(err);
      } else {
        window.alert("cadastrado com sucesso!");
      }
    },
    cadastrarTalhao() {
      let self = this;
      let conf = window.confirm("Todos os dados estão conformes?");
      if (conf == false) {
        return false;
      }
      let referencia = this.include.idTalhao;
      servTalhoes.child(referencia).update(self.include, self.handle());
    }
  }
};
</script>

<style lang="scss" scoped>
.fragmentArea {
  span {
    padding: 5px;
    display: inline-block;
    background-color: rgba(175, 175, 0, 0.5);
  }
}
.btn {
  margin: 10px;
  padding: 6px;
  background-color: white;
  border: 1px solid black;
  color: black;
  font-weight: 900;
  &:hover {
    cursor: pointer;
  }
}
</style>
