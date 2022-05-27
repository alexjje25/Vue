<template>
  <div>
    <h1 class="tituloContent">CADASTRO DE CLIENTE</h1>
    <div class="formulario">
      <h2>Dados Gerais</h2>
      <div class="grid2">
        <div class="sect">
          <div class="label">Nome:</div>
          <div class="insert"><input v-model="include.nome" type="text" /></div>
        </div>
        <div class="sect">
          <div class="label">CPF:</div>
          <div class="insert">
            <input v-model="include.documentoCPF" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Pacote:</div>
          <div class="insert">
            <input v-model="include.pacote" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Telefone 1:</div>
          <div class="insert">
            <input v-model="include.telefone1" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Telefone 2:</div>
          <div class="insert">
            <input v-model="include.telefone2" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Data de Nascimento:</div>
          <div class="insert">
            <input v-model="include.dataNascimento" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">OBSERVAÇÕES:</div>
          <div class="insert">
            <input v-model="include.observacoes" type="text" />
          </div>
        </div>
      </div>
      <h2>Endereço do cliente</h2>
      <div class="grid2">
        <div class="sect">
          <div class="label">Município:</div>
          <div class="insert">
            <input v-model="include.endereco.municipio" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Bairro:</div>
          <div class="insert">
            <input v-model="include.endereco.bairro" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Rua:</div>
          <div class="insert">
            <input v-model="include.endereco.rua" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">CEP:</div>
          <div class="insert">
            <input v-model="include.endereco.cep" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">Complemento:</div>
          <div class="insert">
            <input v-model="include.endereco.complemento" type="text" />
          </div>
        </div>
      </div>
      <h2>CADASTRO DE ACESSO</h2>
      <div class="grid2">
        <div class="sect">
          <div class="label">EMAIL:</div>
          <div class="insert">
            <input v-model="include.acesso.email" type="text" />
          </div>
        </div>
        <div class="sect">
          <div class="label">SENHA</div>
          <div class="insert">
            <input v-model="include.acesso.senha" type="text" />
          </div>
        </div>
      </div>
    </div>
    <button @click="PROCESSAMENTO_CADASTRO()">CADASTRAR</button>
  </div>
</template>

<script>
import { servClientes, firebase, servUsers } from "@/database.js";
//import { commonCreateUser } from "@/axios.js"; // DESCONTINUADO

export default {
  data() {
    return {
      user: {},
      include: {
        chave: "",
        nome: "",
        documentoCPF: "",
        endereco: {
          bairro: "",
          municipio: "",
          cep: "",
          rua: "",
          complemento: ""
        },
        pacote: "",
        telefone: "",
        dataNascimento: "",
        observacoes: "",
        acesso: {
          email: "",
          senha: ""
        }
      }
    };
  },
  methods: {
    handleOk() {
      window.alert("Enviado com sucesso");
      //chamar limpeza...
      this.CLEAR_FORM();
    },
    CLEAR_FORM() {
      this.include = {
        chave: "",
        nome: "",
        documentoCPF: "",
        endereco: {
          bairro: "",
          municipio: "",
          cep: "",
          rua: "",
          complemento: ""
        },
        pacote: "",
        telefone: "",
        dataNascimento: "",
        observacoes: "",
        acesso: {
          email: "",
          senha: ""
        }
      };
    },
    handleSIGN(chave) {
      const payload = {
        type: "gerencia",
        nivel: 50,
        name: this.include.nome,
        telefone: [this.include.telefone1, this.include.telefone2],
        email: this.include.email,
        idFazenda: ""
      };
      window.console.log(payload, chave);
    },
    FINALIZA_ACESSO(uid) {
      this.include.chave = uid;
      let self = this;
      servUsers.child(uid).update(
        {
          email: self.include.acesso.email,
          name: self.include.nome,
          nivel: 50,
          type: "gerencia",
          idFazenda: "",
          telefone: this.include.telefone1
        },
        function() {
          self.CADASTRAR_CLIENTE();
        }
      );
    },
    CADASTRO_ACESSO() {
      let email = this.include.acesso.email;
      let senha = this.include.acesso.senha;
      let self = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(function(response) {
          self.FINALIZA_ACESSO(response.user.uid);
        })
        .catch(function(error) {
          window.alert("ERRO:" + error.code);
          return false;
        });
    },
    CADASTRAR_CLIENTE() {
      let self = this;
      let rest = window.confirm("Todos os dados estão conforme ?");
      if (rest == false) return false;
      servClientes.child(self.include.chave).update(self.include, function() {
        window.alert("Cadastro finalizado com sucesso!");
      });
    },
    PROCESSAMENTO_CADASTRO() {
      this.CADASTRO_ACESSO();
    }
  }
};
</script>

<style lang="scss" scoped>
.formulario {
  .grid2 {
    max-width: 800px;
  }
  .sect {
    padding: 10px;
  }
  h2 {
    font-weight: 100;
    text-transform: uppercase;
    font-size: 25px;
    border-bottom: 2px solid rgba(50, 50, 50, 0.1);
  }
  button {
    padding: 10px;
    background-color: rgb(50, 50, 50);
    color: white;
  }
}
</style>
