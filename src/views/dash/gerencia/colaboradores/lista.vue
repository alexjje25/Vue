<template>
  <div>
    <v-detalhes
      v-if="selectedUser"
      :id-colaborador="selectedUser"
      @close="CLEAN_USER"
    />
    <div v-else>
      <div class="tituloContent">Colaboradores</div>
      <div class="miniMenu">
        <div class="searchUI">
          <input
            v-model="filtro"
            class="search"
            type="text"
            placeholder="Buscar Funcionário (Nº cartão ou  nome)"
          />
        </div>
      </div>
      <div class="lista">
        <div
          v-for="(item, index) in Colaboradores"
          :key="index"
          class="item"
          :class="{ marcado: selectedUser == item.chave }"
        >
          <div class="photo">
            <v-colaborador-perfil
              :imagem-u-r-l="item.dados.imagemURL"
              class="imagemPerfil"
            />
          </div>
          <div class="dados">
            <div class="nome">{{ item.dados.name }}</div>
            <p>Card Rurall: {{ item.dados.codigo }}</p>
            <p>Senha de Acesso: {{ item.dados.password }}</p>
            <div class="painel">
              <button
                class="detail"
                @click="VER_DETALHES(item.chave, item.dados)"
              >
                DETALHES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servColaboradores, servColaboradoresArquivados } from "@/database.js";
import vColabPerfil from "../global/colaboradorRenderImage";
import vDetalhes from "./detalhes";

export default {
  components: {
    "v-colaborador-perfil": vColabPerfil,
    "v-detalhes": vDetalhes
  },
  filters: {},
  data() {
    return {
      selectedUser: null,
      filtro: "",
      detail: false
    };
  },
  computed: {
    Colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"].filter(item => {
        let param1 = String(item.dados.name).toUpperCase();
        let query1 = String(this.filtro).toUpperCase();
        let param2 = String(item.dados.codigo);
        let query2 = String(this.filtro);
        return param1.match(query1) || param2.match(query2);
      });
    }
  },
  methods: {
    CLEAN_USER() {
      this.selectedUser = null;
    },
    VER_DETALHES(chave) {
      this.selectedUser = chave;
    },
    REMOVER_USUARIO(chave, item) {
      this.selectedUser = chave;
      setTimeout(() => {
        const decisao = window.confirm("DESEJA APAGAR ESSE USUARIO?");
        if (decisao == true) {
          window.console.log(item);
          servColaboradoresArquivados.child(chave).update(item);
          setTimeout(() => {
            servColaboradores.child(chave).remove();
          }, 500);

          this.selectedUser = null;
        } else {
          this.selectedUser = null;
          return false;
        }
      }, 150);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/minimenu.scss";
.lista {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "photo dados";
    padding: 10px;
    letter-spacing: 1px;
    background-color: rgba(235, 235, 235, 0.5);
    .imagemPerfil {
      grid-area: photo;
    }
    .dados {
      grid-area: dados;
      .nome {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .painel {
      grid-area: painel;
    }
    &.marcado {
      background-color: rgba(210, 210, 50, 0.7);
    }
    &:nth-child(2n) {
      background-color: rgba(200, 200, 200, 0.3);
    }
  }
  .icone {
    display: inline-block;
  }
  button {
    &.detail {
      padding: 8px 10px;
      border: none;
      font-weight: 900;
      border-radius: 2px;
      color: white;
      background-color: rgb(40, 100, 10);
      box-shadow: 1px 1px 1px silver;
      cursor: pointer;
    }
  }
}
</style>
