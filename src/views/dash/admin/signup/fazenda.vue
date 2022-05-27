<template>
  <div>
    <h1 class="tituloContent">CADASTRO DE FAZENDA</h1>

    <div class="formulario">
      <div class="grid2">
        <div class="sect">
          <div class="label">Selecione o cliente:</div>
          <div class="insert">
            <select v-model="include.idProprietario">
              <option selected value="selecione">selecione</option>
              <option
                v-for="(list, index) in clientes"
                :key="index"
                :value="list.chave"
              >
                {{ list.dados.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="sect">
          <div class="label">Latitude</div>
          <div class="insert">
            <input v-model="include.coord.x" type="number" />
          </div>
        </div>

        <div class="sect">
          <div class="label">Nome da Fazenda:</div>
          <div class="insert">
            <input v-model="include.nomeFazenda" type="text" />
          </div>
        </div>

        <div class="sect">
          <div class="label">Longitude</div>
          <div class="insert">
            <input v-model="include.coord.y" type="number" />
          </div>
        </div>

        <div class="sect">
          <div class="label">Hectares:</div>
          <div class="insert">
            <input v-model="include.hectares" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Endereco completo:</div>
          <div class="insert">
            <input v-model="include.endereco" type="text" />
          </div>
        </div>
      </div>
      <div class="cadastroArea">
        <hr />
        <h2>AREA</h2>
        <div class="inputType">
          Latitude: <input v-model="digA" type="number" /> / Longitude:
          <input v-model="digB" type="number" />
          <button @click="includeArea">+</button>
        </div>
        <div class="listaArea">
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
      <button @click="cadastrarFazenda()">CADASTRAR</button>
    </div>
  </div>
</template>

<script>
// COORDANADA INVERTIDA PARA AREA !
import { servFazendas, servClientes, servUsers } from "@/database.js";
export default {
  data() {
    return {
      digA: 0,
      digB: 0,
      include: {
        area: [], // push MOD
        coord: {
          //lat x, long y
          x: 0,
          y: 0
        },
        coordenada: "",
        hectares: 1,
        endereco: "",
        idFazenda: "",
        idProprietario: "",
        nomeFazenda: ""
      }
    };
  },
  computed: {
    clientes() {
      return this.$store.getters["admin/GET_CLIENTES"];
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
    handle(err) {
      if (err) {
        window.alert("ERRO!");
        window.console.log(err);
      } else {
        window.alert("cadastrado com sucesso!");
      }
    },
    cadastrarFazenda() {
      let self = this;
      let conf = window.confirm("Todos os dados estão conformes?");
      if (conf == false) {
        return false;
      }
      let chaveTemp = servFazendas.push().key;
      this.include.coordenada = `"${Number(this.include.coord.x)}, ${Number(
        this.include.coord.y
      )}"`;
      this.include.idFazenda = chaveTemp;
      servFazendas.child(chaveTemp).update(self.include, self._add());
    },
    _add() {
      let self = this;
      servClientes.child(self.include.idProprietario).update(
        {
          idFazenda: self.include.idFazenda
        },
        function() {
          servUsers.child(self.include.idProprietario).update(
            {
              idFazenda: self.include.idFazenda
            },
            self.handle()
          );
        }
      );
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
</style>
