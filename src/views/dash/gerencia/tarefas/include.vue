<template>
  <div>
    <div class="form boxPadrao centralizaTudo">
      <div class="tituloContent">CADASTRO DE TAREFA</div>
      <div class="grid g2">
        <div class="scopo">
          <div class="titulo">Titulo</div>
          <div class="include">
            <input
              v-model="include.titulo"
              type="text"
              placeholder="Titulo da tarefa"
            />
          </div>
          <div class="titulo">Data para Tarefa</div>
          <div class="include">
            <input type="date" v-model="include.dataParaTarefa" />
          </div>
          <div class="titulo">URGENTE ?</div>
          <div class="include">
            <select v-model="include.urgente">
              <option value="false">NÃO</option>
              <option value="true">SIM</option>
            </select>
          </div>
          <div class="titulo">Descrição</div>
          <div class="include">
            <textarea v-model="include.descricao" type="text" />
          </div>
        </div>

        <div class="scopo">
          <!-- COL 2 -->
          <div class="titulo">Talhão</div>
          <div class="include">
            <select
              v-model="include.talhao"
              :class="{ requiredValid: producoes.length == 0 }"
            >
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in talhoes"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.name }}
              </option>
            </select>
          </div>
          <div class="titulo">Produção</div>
          <div class="include">
            <select
              v-model="include.idProducao"
              :class="{ dangerValid: producoes.length == 0 }"
            >
              <option v-if="producoes.length == 0" value="selecione"
                >Não cadastros</option
              >
              <option v-else value="selecione">Selecione</option>
              <option
                v-for="(item, index) in producoes"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.name }}
              </option>
            </select>
          </div>
          <div class="titulo">Setor</div>
          <div class="include">
            <select v-model="include.setor">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in setores"
                :key="index"
                :value="item.dados.titulo"
              >
                {{ item.dados.titulo }}
              </option>
            </select>
          </div>
          <div class="titulo">
            Colaborador
          </div>
          <div class="include">
            <select v-model="include.idColaborador">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in colaboradores"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.name }}
              </option>
            </select>
          </div>
          <div class="titulo">PERIODO</div>
          <div class="include">
            <select v-model="include.periodo">
              <option value="selecione">Selecione</option>
              <option value="matutino">MATUTINO</option>
              <option value="vespertino">VESPERTINO</option>
            </select>
          </div>
        </div>
      </div>
      <div class="centralizarTudo">
        <v-btn
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          type="padrao"
          name="CADASTRO"
          @handle="enviar()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { servTarefas } from "@/database.js";
import vBtn from "@/components/dash/btnIconMini";
import { reportarBug } from "@/service/bugReport.js";
export default {
  components: {
    vBtn
  },
  data() {
    return {
      include: {
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        titulo: null,
        descricao: null,
        status: 0,
        talhao: "selecione",
        idProducao: "selecione",
        setor: "selecione",
        chave: null,
        urgente: false,
        idColaborador: "selecione",
        periodo: "selecione",
        createdTime: null,
        dataParaTarefa: ""
      },
      handleErros: []
    };
  },
  computed: {
    setores() {
      return this.$store.getters["fazenda/GET_SETOR"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    talhoes() {
      return this.$store.getters["fazenda/GET_TALHOES"];
    },
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"].filter(item => {
        if (
          item.dados.talhao == this.include.talhao ||
          this.include.talhao == "selecione"
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  methods: {
    formVerify(contain) {
      if (!contain) return false;
      else if (contain.length < 1) return false;
      else if (contain == "selecione") return false;
      else return true;
    },
    formVerification(contain, name) {
      let resultado = this.formVerify(contain);
      let status;
      if (resultado == false) {
        this.handleErros.push({ name: name, msg: "Inválido" });
        status = false;
      } else {
        status = true;
      }
      return status;
    },
    handle(err) {
      if (err) {
        this.$store.commit("resource/SET_NOTIFY", {
          mensagem:
            "Ocorreu um erro inesperado, não se preocupe já notificamos o erro",
          type: "danger",
          status: true
        });

        reportarBug(err);
      } else {
        this.$store.commit("resource/SET_NOTIFY", {
          mensagem: "Enviado com sucesso",
          type: "sucess",
          status: true
        });
      }
    },
    enviar() {
      this.handleErros = [];

      let f1 = this.formVerification(this.include.idColaborador, "Colaborador");
      let f2 = this.formVerification(this.include.setor, "Setor");
      let f3 = this.formVerification(this.include.talhao, "Talhão");
      let f4 = this.formVerification(this.include.idProducao, "Produção");
      let f5 = this.formVerification(this.include.periodo, "Periodo");
      let f6 = this.formVerification(
        this.include.dataParaTarefa,
        "dataParaTarefa"
      );

      if (this.handleErros.length > 0) {
        this.$store.commit("resource/SET_NOTIFY", {
          mensagem: `Você se esqueceu dos seguintes itens:`,
          lista: this.handleErros,
          type: "warning",
          status: true
        });
        return false;
      }
      if (
        f1 == true &&
        f2 == true &&
        f3 == true &&
        f4 == true &&
        f5 == true &&
        f6 == true
      ) {
        if (this.include.titulo.length < 3) {
          this.$store.commit("resource/SET_NOTIFY", {
            mensagem: "O titulo está muito curto ... ",
            type: "danger",
            status: true
          });
          return false;
        }
        this.include.chave = servTarefas.push().key;
        this.include.status = String(this.include.status);
        this.include.createdTime = new Date().getTime();
        this.include.urgente = String(this.include.urgente); // formato atual
        const response = this.include;
        servTarefas.child(this.include.chave).update(response, this.handle());
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
