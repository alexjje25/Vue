<template>
  <div>
    <div class="blackboxEscola">
      <img
        src="@/assets/icons/logo.png"
        style=""
      />
      <div class="UXform">
        <div class="textoExclusivo">
          <b
            >INVISTA E LUCRE COM O AGRO</b
          >
          <br />
          <p> FRANQUIA REGIONAL</p>
          <ul>
            <li>RETORNO FINANCEIRO RÁPIDO</li>
            <li>SUPORTE TÉCNICO ESPECIALIZADO</li>
            <li>TENDÊNCIA DE MERCADO</li>
            <li>MULTIPRODUTOS E SERVIÇOS</li>
            <li>ACOMPANHAMENTO DE MARKETING</li>
            <li>TREINAMENTO DE VENDAS</li>
            <li>MAPEAMENTO DE CLIENTES COM POTENCIAL</li>
          </ul>
          <div>
            Perfil de investidores <br /><br />
            Requisitos: <br />
            <ul>
              <li>Agrônomos ou Gerente de fazenda</li>
              <li>Cursando agronomia ou técnico Agrícola.</li>
              <li>Experiência com vendas de produtos e serviços Agro</li>
            </ul>
          </div>
        </div>

        <div class="containForm">
          <div v-if="sucess == true" class="form sucess">
            Seu cadastro foi efetuado com sucesso.
          </div>
          <div v-if="sucess == false" class="form">
            <div class="compact">
              <div>Nome completo</div>
              <input id="tutorialName" type="text" />
            </div>
            <div class="compact">
              <div>E-mail</div>
              <input id="tutorialEmail" type="text" />
            </div>
            <div class="compact">
              <div>WhatsApp</div>
              <input id="tutorialWhatsapp" type="text" />
            </div>
            <div class="compact">
              <div>Cidade + Estado</div>
              <input id="tutorialCidade" type="text" />
            </div>
            <div class="compact">
              <div>Atualmente está em alguma atividade?</div>
              <input id="tutorialEmpresa" type="text" />
            </div>
            <div class="compact">
              <div>Cargo atual ou empresa</div>
              <input id="tutorialCargoAtual" type="text" />
            </div>
            <div class="compact">
              <div>Já investiu no Agro?</div>
              <input id="tutorialEscolaridade" type="text" />
            </div>
            <div style="text-align: center">
              <button @click="cadastrar()">CADASTRO</button>
            </div>
            <div style="text-align: center">
              Cadastre todos os dados corretos e entraremos em contato.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servPreFranquia } from "@/database.js";

export default {
  data() {
    return {
      sucess: false
    };
  },
  methods: {
    handle(err) {
      if (err) {
        window.alert("Ocorreu um erro incomum: " + err);
      } else {
        document.querySelector("#tutorialName").value = "";
        document.querySelector("#tutorialEmail").value = "";
        document.querySelector("#tutorialWhatsapp").value = "";
        document.querySelector("#tutorialCidade").value = "";
        document.querySelector("#tutorialEmpresa").value = "";
        document.querySelector("#tutorialCargoAtual").value = "";
        document.querySelector("#tutorialEscolaridade").value = "";
        this.sucess = true;
      }
    },
    cadastrar() {
      let referencia = servPreFranquia.push().key;
      let toRest = {
        nome: document.querySelector("#tutorialName").value,
        email: document.querySelector("#tutorialEmail").value,
        whatsapp: document.querySelector("#tutorialWhatsapp").value,
        cidade: document.querySelector("#tutorialCidade").value,
        empresa: document.querySelector("#tutorialEmpresa").value,
        cargo: document.querySelector("#tutorialCargoAtual").value,
        escolaridade: document.querySelector("#tutorialEscolaridade").value
      };
      servPreFranquia.child(referencia).update(toRest, this.handle);
    }
  }
};
</script>

<style lang="scss" scoped>
.UXform {
  display: grid;
  grid-template-columns: 400px 1fr;
  max-width: 1000px;
  margin: 0 auto;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    .textoExclusivo {
      margin: 0 auto;
    }
  }
}
.textoExclusivo {
  color: white;
  font-size: 15px;
  padding: 10px;
  margin-top: -20px;
  text-align: left;
  width: 400px;
}
.blackboxEscola {
  padding: 0px;
  background-color: black;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  background-color: black;
  text-align: center;
  img {
    width: 300px;
  }
}
button {
  padding: 12px 26px;
  background-color: rgb(30,81,0);
  color: white;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-weight: bolder;
  width: 50%;
  margin-left: 50px;
  transition: 0.5s all;
  &:hover {
    background-color: rgba(35, 127, 67, 1);
  }
}
.containForm {
  padding-bottom: 50px;
  .form {
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    input {
      border: none;
      padding: 6px;
      background-color: rgba(255, 255, 255, 0.1);
      border-left: 6px solid white;
      color: white;
    }
    &.sucess {
      background-color: white;
      color: rgb(50, 50, 50);
      padding: 10px;
    }
    .compact {
      display: grid;
      margin: 5px;
      grid-template-columns: 1fr 1fr;
      div {
        color: white;
        padding: 10px;
        text-align: right;
        text-transform: uppercase;
      }
    }
  }
}
</style>