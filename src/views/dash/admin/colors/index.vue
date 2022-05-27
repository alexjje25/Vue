<template>
  <div>
    <div class="contain">
      <h2>NOVA COR</h2>
      <div class="includeForm">
        <div class="scope">
          <select v-model="include.type" class="forceINP">
            <option value="selecione">selecione</option>
            <option value="marks">Marks</option>
            <option value="UI">User Interface</option>
          </select>
        </div>
        <div class="scope">
          COR: <input v-model="include.cor" type="color" />
          <div class="colorExpo" :style="{ backgroundColor: include.cor }">
            {{ include.cor }}
          </div>
        </div>
        <div class="scope">
          Comentário: <i>Para fins de não se perder, não obrigatório</i><br />
          <textarea
            v-model="include.comment"
            type="text"
            placeholder="botao tal, point perigoso, etc.."
          ></textarea>
        </div>
        <button @click="SEND_COLOR()">ENVIAR</button>
      </div>
      <h2>LISTA CORES</h2>
      <div class="listaCores">
        <div class="header padraoGrid">
          <div>COLOR</div>
          <div>TYPE</div>
          <div>COMMENT</div>
          <div>CHAVE</div>
        </div>
        <div
          v-for="(cor, index) in colors"
          :key="index"
          class="item padraoGrid"
        >
          <div :style="{ backgroundColor: cor.dados.cor }">
            {{ cor.dados.cor }}
          </div>
          <div>{{ cor.dados.type }}</div>
          <div>{{ cor.dados.comment }}</div>
          <div>{{ cor.dados.chave }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servColors } from "@/database.js";
export default {
  data() {
    return {
      include: {
        cor: null,
        chave: null,
        type: "selecione",
        comment: ""
      }
    };
  },
  computed: {
    colors() {
      return this.$store.getters["admin/GET_COLORS"];
    }
  },
  methods: {
    SEND_COLOR() {
      let self = this;
      this.include.chave = servColors.push().key;
      if (
        this.include.type == "selecione" ||
        this.include.cor == null ||
        this.include.chave == null
      ) {
        window.alert("faltou alguma coisa.. verifica os campos...");
      } else {
        servColors.child(self.include.chave).update(this.include);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.listaCores {
  .padraoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .header {
    background-color: silver;
    border-bottom: 1px solid rgba(50, 50, 50, 0.5);
    color: black;
    padding: 4px;
  }
  .item {
    font-size: 12px;
    & > div {
      padding: 4px;
      &:nth-child(1) {
        &:hover {
          color: white;
        }
      }
    }
  }
}
.includeForm {
  padding: 10px;
  .scope {
    padding: 10px;
  }
  .colorExpo {
    padding: 10px;
    margin-left: 10px;
    color: white;
    display: inline-block;
  }
  input,
  select,
  .forceINP {
    padding: 4px 10px;
    background-color: white;
    border: 1px solid silver;
  }
  textarea {
    width: 200px;
    height: 100px;
    font-family: sans-serif;
    font-size: 12px;
  }
}
</style>
