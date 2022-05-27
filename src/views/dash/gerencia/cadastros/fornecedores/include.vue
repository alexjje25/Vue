<template>
  <div class="boxPadrao">
    <div class="tituloContent">CADASTRO DE FORNECEDOR</div>
    <div class="form">
      <div class="grid g2">
        <div class="scopo">
          <div class="titulo">Nome da empresa</div>
          <div class="include">
            <input v-model="include.nome" type="text" placeholder="Nome" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">CNPJ</div>
          <div class="include">
            <input
              v-model="include.cnpj"
              type="text"
              maxlength="18"
              placeholder="XX.XXX.XXX/XXXX-XX"
            />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Razão Social</div>
          <div class="include">
            <input v-model="include.razaoSocial" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">E-mail</div>
          <div class="include">
            <input v-model="include.email" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">INSC. ESTADUAL</div>
          <div class="include">
            <input
              v-model="include.inscEstadual"
              type="text"
              maxlength="14"
              placeholder="XXX.XXX.XXX-XX"
            />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Telefone</div>
          <div class="include">
            <input v-model="include.telefone" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Endereço</div>
          <div class="include">
            <input v-model="include.endereco" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">celular</div>
          <div class="include">
            <input v-model="include.celular" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Observação</div>
          <div class="include">
            <input v-model="include.obs" type="text" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">CEP</div>
          <div class="include">
            <input v-model="include.cep" type="text" />
          </div>
        </div>
      </div>

      <p>
        <vBtn
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          texto="CADASTRAR"
          @handleClick="enviar()"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { servFornecedores } from "@/database.js";
import vBtn from "@/components/dash/btnIcon";
export default {
  components: {
    vBtn
  },
  data() {
    return {
      itsOk: false,
      include: {
        email: null,
        cnpj: null,
        nome: null,
        razaoSocial: null,
        obs: null,
        telefone: null,
        inscEstadual: null,
        celular: null,
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  methods: {
    clear() {
      this.include.email = null;
      this.include.cnpj = null;
      this.include.nome = null;
      this.include.razaoSocial = null;
      this.include.obs = null;
      this.include.telefone = null;
      this.include.inscEstadual = null;
      this.include.celular = null;
    },
    process(cond) {
      if (cond) {
        window.alert("Erro consulte um suporte");
        window.console.log("erro", cond);
        return false;
      } else {
        window.alert("Enviado com sucesso");
      }
    },
    filtro(info, min) {
      if (info.length < min) {
        return false;
      } else if (info == null) {
        return false;
      } else {
        return true;
      }
    },
    enviar() {
      let include = this.include;
      if (this.filtro(include.cnpj, 6) == false) {
        this.$store.commit("SET_NOTIFY", {
          type: "danger",
          mensagem: "CNPJ INVÁLIDO",
          status: true
        });
        return false;
      }
      if (this.filtro(include.email, 5) == false) {
        this.$store.commit("SET_NOTIFY", {
          type: "danger",
          mensagem: "Email inválido",
          status: true
        });
        return false;
      }
      if (this.filtro(include.nome, 3) == false) {
        this.$store.commit("SET_NOTIFY", {
          type: "danger",
          mensagem: "Nome da empresa inválida",
          status: true
        });
        return false;
      }
      if (this.filtro(include.telefone, 8) == false) {
        this.$store.commit("SET_NOTIFY", {
          type: "danger",
          mensagem: "Telefone inválido",
          status: true
        });
        return false;
      }
      const chave = servFornecedores.push().key;
      servFornecedores.child(chave).update(this.include, this.process);
      this.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
