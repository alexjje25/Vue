<template>
  <div>
    <h1>
      AREA PERIGOSA !
    </h1>
    <fieldset>
      <select v-model="fazendaID">
        <option value="">SELECIONE COM CUIDADO!</option>
        <option value=""></option>
      </select>
    </fieldset>
    {{ GET_FAZENDAS }}
    <button></button>
  </div>
</template>

<script>
import {
  servMonitorPragas,
  servMonitorDoencas,
  servMonitorArmadilhas,
  servReviewArmadilhas
} from "@/database.js";

export default {
  data() {
    return {
      fazendaID: ""
    };
  },
  computed: {
    GET_FAZENDAS() {
      return this.$store.getters["admin/GET_FAZENDAS"];
    }
  },
  methods: {
    forceDelAllPragas() {
      //servMonitorPragas.
    },
    forceDelPraga(chave) {
      //pela chave
    }
  }
};
</script>

<style></style>
