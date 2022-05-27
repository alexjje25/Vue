<template>
  <div>
    <div class="boxPadrao">
      <div class="tip centralizaTudo">
        ATENÇÃO! Ao modificar, você poderá afetar toda estrutura. Contacte nossa
        equipe de apoio caso não tenha certeza.
      </div>
      <div class="form" style="padding:20px">
        <div class="grid g2">
          <div class="scope">
            <div class="titulo">NOME DO TALHÃO</div>
            <div class="include"><input type="text" v-model="name" /></div>
          </div>
          <div class="scope">
            <div class="titulo">HECTARES</div>
            <div class="include"><input type="text" v-model="size" /></div>
          </div>
          <div class="scope">
            <div class="include">
              <vBtn @handleClick="modificar()" texto="SALVAR" valor="salver" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btn";
import { servTalhoes } from "@/database";
export default {
  components: { vBtn },
  props: ["chave"],
  methods: {
    modificar() {
      let self = this;

      servTalhoes.child(self.chave).update(
        {
          name: self.name,
          size: self.size
        },
        function() {
          self.$store.commit("resource/SET_NOTIFY", {
            status: true,
            mensagem: "Modificado com Sucesso",
            type: "sucess"
          });
          self.$emit("handle", true);
        }
      );
    }
  },
  data() {
    return {
      name: "",
      size: ""
    };
  },
  computed: {
    GET_TALHAO() {
      let lista = this.$store.getters["fazenda/GET_TALHOES"].find(item => {
        if (item.chave == this.chave) {
          return true;
        }
      });
      return lista;
    }
  },
  mounted() {
    let bin = this.$store.getters["fazenda/GET_TALHOES"].find(item => {
      if (item.chave == this.chave) {
        return true;
      }
    });
    this.size = bin.dados.size;
    this.name = bin.dados.name;
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
.scope {
  padding: 10px;
}
</style>
