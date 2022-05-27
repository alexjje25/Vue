<template>
  <div class="cadastroMD">
    <div v-if="card.toggle == true" class="card">
      {{ card.msg }}
    </div>
    <div class="scope">
      <div class="logo">
        <img src="@/assets/icons/logo.png" />
      </div>
    </div>
      <div class="videoScope ">
        <div class="video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/lp4sCQXm-Z4"
            frameborder="0"
            controls="0"
            autoplay="1"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        <div class="texto">
          <p>
            Teste de uso da plataforma Rurall Strong 7.0 por 30 dias gratuitos
            com treinamento certificado incluso. Contrato e condições apenas
            diretamente com representante oficial.<br />
            <br />
            Entre em contato com nossa equipe:<br />
            <br />
            <a
              target="_wht"
              href="https://wa.me/556692925258"
              style="color:white;display:grid;grid-template-columns: 1fr auto;color: rgb(50,50,50);text-decoration:none;background-color:white;padding:10px; border-radius: 5px;"
              class="centralizaTudo"
            >
              <div class="centralizaTudo" style="font-size:1.5em">
                FALE CONOSCO
              </div>
              <img src="@/assets/icons/whatsapp.png" width="50"/></a
            ><br /><br />
            <br />
            O agro não para!<br />
            Feito na terra, criado no sol aprimorado no campo. Rurall Strong
            entende o produtor.<br />
          </p>
        </div>
      </div>
    </div>

    <div class="scope scopeWhite">
      <div class="headerForm">
        <div class="col1">
          <img src="@/assets/icons/cadastro-cliente.png" />
        </div>
        <div class="col2">Seus dados</div>
      </div>
      <div class="form md1">
        <div class="g g1">
          <input
            type="text"
            :value="include.codigoRepresentante"
            placeholder="Códico do Representante"
            @input="include.codigoRepresentante = $event.target.value"
          />
        </div>
        <div class="g g2">
          <input
            type="text"
            :value="include.nome"
            placeholder="Nome"
            @input="include.nome = $event.target.value"
          />
         <input
            type="text"
            :value="include.sobrenome"
            placeholder="Sobrenome"
            @input="include.sobrenome = $event.target.value"
          />       
          <input
            type="number"
            :value="include.telefone1"
            placeholder="Telefone 1"
            @input="include.telefone1 = $event.target.value"
          />
          <input
            type="number"
            :value="include.telefone2"
            placeholder="Telefone 2"
            @input="include.telefone2 = $event.target.value"
          />
          <input
            type="date"
            :value="include.dataNascimento"
            placeholder="Data Nascimento"
            @input="include.dataNascimento = $event.target.value"
          />
          <input
            placeholder="Observação"
            :value="include.observacao"
            type="text"
            @input="include.observacao = $event.target.value"
          />
          <div>
            <select
              class="blueForm"
              type="text"
              :value="include.docType"
              @input="include.docType = $event.target.value"
            >
              <option value="nif">NIF</option>
            </select>
          </div>
          <input
            v-if="include.docType == 'nif'"
            class="blueForm"
            type="number"
            placeholder="NIF"
            :value="include.documentoNIF"
            @input="include.documentoNIF = $event.target.value"
          />
          <input
            v-if="include.docType == 'cnpj'"
            class="blueForm"
            type="text"
            placeholder="CNPJ"
            :value="include.documentoCNPJ"
            @input="include.documentoCNPJ = $event.target.value"
          />
        </div>
        <h3>Endereço Pessoal</h3>
        <div class="g g2">
          <input
            type="text"
            :value="include.endereco.provincia"
            placeholder="Provincia"
            @input="include.endereco.provincia = $event.target.value"
          />
          <input
            type="text"
            :value="include.endereco.municipio"
            placeholder="Municipio"
            @input="include.endereco.municipio= $event.target.value"
          />
          <input
            type="text"
            :value="include.endereco.bairro"
            placeholder="Bairro"
            @input="include.endereco.bairro = $event.target.value"
          />
          <input
            type="text"
            :value="include.endereco.rua"
            placeholder="Rua"
            @input="include.endereco.rua = $event.target.value"
          />
        </div>
        <h3>Dados para Acesso</h3>
        <div class="g g2">
          <input
            type="text"
            :value="include.acesso.email"
            placeholder="Email"
            @input="include.acesso.email = $event.target.value"
          />
          <input
            type="text"
            :value="include.acesso.senha"
            placeholder="Senha (mínimo 6 digitos)"
            @input="include.acesso.senha = $event.target.value"
          />
        </div>
      </div>
    </div>
    <div class="scope scopeWhite">
      <div class="headerForm">
        <div class="col1"><img src="@/assets/icons/fazendas.png" /></div>
        <div class="col2">Informações da Fazenda</div>
      </div>
      <div class="form md2">
        <div class="g g2">
          <input
            type="text"
            :value="include.fazenda.nomeFazenda"
            placeholder="Nome da Fazenda"
            @input="include.fazenda.nomeFazenda = $event.target.value"
          />
          <input
            type="number"
            :value="include.fazenda.hectares"
            placeholder="Hectares"
            @input="include.fazenda.hectares = $event.target.value"
          />
          <input
            type="text"
            :value="include.fazenda.endereco"
            placeholder="Endereço"
            @input="include.fazenda.endereco = $event.target.value"
          />
          <input
            type="number"
            :value="include.fazenda.coord.x"
            placeholder="Latitude"
            @input="include.fazenda.coord.x = $event.target.value"
          />
          <input
            type="number"
            :value="include.fazenda.coord.y"
            placeholder="Longitude"
            @input="include.fazenda.coord.y = $event.target.value"
          />
        </div>
      </div>
    </div>
    <div class="scope scopeWhite" style="text-align:center;">
      <button
        :disabled="processando == true"
        class="btnCadastrar"
        @click="CADASTROANGOLA()"
      >
        <span v-if="processando == false">
          CADASTRAR
        </span>
        <span v-if="processando == true">
          CARREGANDO ...
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { servUsersAngolas, firebase, servClientesAngolas, servFazendasAngolas } from "@/database.js";
export default {
  data() {
    return {
      processando: false,
      card: {
        toggle: false,
        msg: ""
      },
      include: {
        docType: "nif",
        documentoNIF: "", //re-testar
        documentoCNPJ: "", //re-testar
        observacao: "",
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        chave: null,
        telefone1: "", // re-testar
        telefone2: "", // re-testar
        endereco: {
          provincia: "",
          municipio: "",
          bairro: "",
          rua: "",
        },
        fazenda: {
          nomeFazenda: "",
          endereco: "",
          hectares: null,
          idProprietario: "",
          idFazenda: "",
          coordenada: "",
          coord: {
            x: null,
            y: null
          }
        },
        acesso: {
          //faltou no cliente
          email: "",
          senha: ""
        }
      }
    };
  },
  watch: {
    "include.fazenda.coord.x": {
      deep: true,
      handler: function(val, oldVal) {
        this.include.fazenda.coordenada =
          "" +
          this.include.fazenda.coord.x +
          ", " +
          this.include.fazenda.coord.y;
        window.console.log("coord x update");
      }
    },
    "include.fazenda.coord.y": {
      deep: true,
      handler: function(val, oldVal) {
        this.include.fazenda.coordenada =
          "" +
          this.include.fazenda.coord.x +
          ", " +
          this.include.fazenda.coord.y;
        window.console.log("coord y update");
      }
    }
  },
  methods: {
    /*SendTaskList() {
      const user = {
        users: {
          email: self.include.acesso.email,
          name: self.include.nome,
          nivel: 50,
          type: "gerencia",
          idFazenda: self.include.fazenda.idFazenda,
          telefone: self.include.telefone1 // apenas o principal, pos já existe a referencia no cliente de todos os dados
        }
      };
      const cliente = {
        docType: self.include.docType,
        documentoCPF: self.include.documentoCPF,
        documentoCNPJ: self.include.documentoCNPJ,
        telefone1: self.include.telefone1,
        telefone2: self.include.telefone2,
        pacote: self.include.pacote,
        observacao: self.include.observacao,
        nome: self.include.nome,
        dataNascimento: self.include.dataNascimento,
        chave: self.include.chave,
        endereco: self.include.endereco,
        acesso: self.include.acesso
      };
      const fazenda = {};
    },*/
    CADASTROANGOLA() {
      window.console.log("iniciou");
      let Mail = this.include.acesso.email;
      let status = Mail.match("@");
      let pass = this.include.acesso.senha;
      if (Mail.length < 5 && status) {
        window.alert("Email incorreto");
        window.console.log("Email incorreto.");
        return false;
      }
      if (pass.length < 6) {
        window.alert("A Senha deve conter 6 digitos ou mais");
        window.console.log("A Senha deve conter 6 digitos ou mais");
        return false;
      }
      this.processando = true;
      // Inicia Processo de dados
      // Isso deverá ser usando para o Cliente e para a Fazenda
      this.include.fazenda.idFazenda = servFazendasAngolas.push().key;
      // Registros
      this.CADASTRO_ACESSO();
    },
    CADASTRO_FAZENDA() {
      //require idProprietario
      let self = this;
      //JÁ NO WATCH
      //this.include.fazenda.coordenada = `"${Number(this.include.fazenda.coord.x)},${Number(this.include.fazenda.coord.y)}"`;
      let referencia = this.include.fazenda.idFazenda;
      this.include.fazenda.coord.x = Number(self.include.fazenda.coord.x);
      this.include.fazenda.coord.y = Number(self.include.fazenda.coord.y);
      //controle perpetuo.
      servFazendasAngolas.child(referencia).update(self.include.fazenda, function() {
        self.processando = false;
        window.alert("cadastrado com sucesso !");
      });
    },
    FINALIZA_ACESSO(uid) {
      //users include
      this.include.chave = uid; // definido para users
      this.include.fazenda.idProprietario = uid; // geral

      let self = this;
      servUsersAngolas.child(uid).update(
        {
          email: self.include.acesso.email,
          name: self.include.nome,
          sobrenome: self.include.sobrenome,
          nivel: 50,
          type: "gerencia",
          idFazenda: self.include.fazenda.idFazenda,
          telefone: self.include.telefone1 // apenas o principal, pos já existe a referencia no cliente de todos os dados
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
          window.console.log(error.code);
          self.processando = false;
          return false;
        });
    },
    CADASTRAR_CLIENTE() {
      //SERVER CLIENTE - DADOS PESSOAIS OU EMPRESARIAIS
      let self = this;
      let rest = window.confirm("Todos os dados estão conforme ?");
      if (rest == false) return false;
      let payload = {
        docType: self.include.docType,
        documentoNIF: self.include.documentoNIF,
        telefone1: self.include.telefone1,
        telefone2: self.include.telefone2,
        observacao: self.include.observacao,
        nome: self.include.nome,
        sobrenome: self.include.sobrenome,
        dataNascimento: self.include.dataNascimento,
        chave: self.include.chave,
        endereco: self.include.endereco,
        acesso: self.include.acesso
      };

      servClientesAngolas.child(self.include.chave).update(payload, function() {
        self.CADASTRO_FAZENDA();
      });
    },
    enviar() {
      if (this.include.docType == "nif") {
        // case for CPF o cnpj zera
        this.include.cnpj = "";
      }
      if (this.include.docType == "cnpj") {
        // case for CPF o cpf zera
        this.include.cpf = "";
      }
    },
    validarCNPJ() {
      let cnpj = this.include.cnpj;
      cnpj = cnpj.replace(/[^\d]+/g, "");

      if (cnpj == "") return false;

      if (cnpj.length != 14) return false;

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return false;

      // Valida DVs
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }

      let resultado2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado2 != digitos.charAt(1)) return false;
      return true;
    },
    validador() {
      let statusCNPJ = this.validarCNPJ();
      if (statusCNPJ == false) return false;
    }
  }
};
</script>

<style lang="scss" scoped>
input,
select {
  font-family: "Roboto";
  border: none;
  border-left: 5px solid rgba(20, 120, 50, 1);
  background-color: rgba(20, 120, 50, 0.08);
  //border-bottom
  padding: 10px 16px;
  font-weight: 600;
  color: rgba(20, 120, 50, 1);
  &::-webkit-input-placeholder {
    color: rgba(70, 70, 70, 1);
    font-weight: 100;
  }
}
.blueForm {
  border-color: rgb(40, 70, 177);
  color: rgb(40, 70, 177);
}
.btnCadastrar {
  padding: 15px 40px;
  background-color: rgba(20, 120, 50, 1);
  font-weight: 600;
  border: none;
  color: white;
  &:disabled {
    opacity: 0.5;
  }
}
.cadastroMD {
  h3 {
    color: rgb(50, 50, 50);
    text-transform: uppercase;
    border-bottom: 1px solid silver;
    padding: 10px;
    font-weight: 400;
  }
  .scopeWhite {
    margin: 20px;
    .form {
      padding: 10px;
      margin: 0 auto;
      width: 80%;
      max-width: 600px;
      border-radius: 5px;
      .g {
        display: grid;
        grid-gap: 10px;
        margin: 10px;
        &.g1 {
          grid-template-columns: 1fr;
        }
        &.g2 {
          grid-template-columns: 1fr 1fr;
          @media screen and (max-width: 600px) {
            grid-template-columns: 1fr;
          }
        }
      }
    }
    div.headerForm {
      text-align: center;
      color: #9a999e;
      padding: 20px;
      margin: 0px;
      font-weight: 100;
      font-size: 25px;
      align-content: center;
      align-items: center;
      align-self: center;
      display: grid;
      margin: 0 auto;
      grid-template-columns: 0.5fr 1fr;
      grid-gap: 20px;
      .col1 {
        text-align: right;
      }
      .col2 {
        text-align: left;
      }
    }
    img {
      width: 50px;
    }
  }
  .logo {
    padding: 40px 0px;
    text-align: center;
    img {
      width: 280px;
    }
  }
  .videoScope {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .video {
      padding: 20px;
      text-align: right;
      .videoSRC {
        width: 100%;
        max-width: 600px;
      }
    }
    .texto {
      padding: 16px;
      color: white;
      font-size: 15px;
      font-weight: 100;
      align-content: center;
      align-items: center;
      align-self: center;
      text-align: left;
      letter-spacing: 1px;
    }
  }
  .scope {
    padding-left: 15%;
    padding-right: 15%;
    &.fundoVideo {
      background-color: #4e854a;
    }
    @media screen and (max-width: 900px) {
      padding-left: 0px;
      padding-right: 0px;
      .videoScope {
        grid-template-columns: 1fr;

        text-align: center;
        .video {
          padding: 0px;
        }
        .videoSRC {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }
}
.centralizaTudo {
  text-align: center;
  vertical-align: middle;
  align-self: center;
  align-items: center;
  align-content: center;
}
</style>
