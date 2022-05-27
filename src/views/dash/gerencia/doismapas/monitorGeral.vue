<template>
  <div class="monitorGeral">
    <div>
      <div><monitorItem tipo="0" :item="GET_LISTA" /></div>
      <div class="titulo">TOTAL</div>
    </div>
    <div>
      <div><monitorItem tipo="1" :item="LISTA_ESTAGIO_1" /></div>
      <div class="titulo">INÍCIAL</div>
    </div>
    <div>
      <div><monitorItem tipo="2" :item="LISTA_ESTAGIO_2" /></div>
      <div class="titulo">MODERADO</div>
    </div>
    <div>
      <div><monitorItem tipo="3" :item="LISTA_ESTAGIO_3" /></div>
      <div class="titulo">MÉDIO</div>
    </div>
    <div>
      <div><monitorItem tipo="4" :item="LISTA_ESTAGIO_4" /></div>
      <div class="titulo">GRAVE</div>
    </div>
  </div>
</template>

<script>
import monitorItem from "./monitorItem";

export default {
  components: {
    monitorItem
  },
  props: {
    lista: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    GET_LISTA() {
      return this.lista;
      
    },
    LISTA_ESTAGIO_1() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywDC3Z-N0lzov-Hv3"
      );
      return lista;
    },
    LISTA_ESTAGIO_2() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywJPvIIG9z15CdJ9c"
      );
      return lista;
    },
    LISTA_ESTAGIO_3() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywUCZgfTSvbQyATlu"
      );
      return lista;
    },
    LISTA_ESTAGIO_4() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywYNuar3FQhjVJee7"
      );
      return lista;
    }
  }
};
</script>
<style lang="scss" scoped>
$cols: repeat(5, 100px);
.monitorGeral {
  display: grid;
  grid-template-columns: $cols;
  grid-gap: 10px;
  .titulo {
    color: rgb(50, 30, 50);
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
