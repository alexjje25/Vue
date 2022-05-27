<template>
  <div class="login">
    <div class="hero">
      <div class="texto"></div>
    </div>
    <div class="paper">
      <div class="space"></div>
      <div class="loginSection">
        <div class="logo">
          <a href="http://rurall.agr.br/" target="_rurallwebsite">
            <img src="@/assets/icons/logo.png" />
          </a>
        </div>
        <div class="brand">DASHBOARD</div>
        <div class="formLogin">
          <div class="sect">
            <div class="titulo">EMAIL</div>
            <input v-model="email" type="text" autocomplete="off" />
          </div>

          <div class="sect">
            <div class="titulo">SENHA</div>
            <input v-model="pass" type="password" autocomplete="off" />
          </div>
          <div class="actions one">
            <div><button @click="entrar()">ENTRAR</button></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="g2">
          <div
            class="act"
            @mouseover="keep('ead')"
            @mouseleave="keep('')"
            @click="redirectME('/site/rurallschool')"
          >
            <router-link to="">
              <img
                v-if="ativo == 'ead'"
                src="@/assets/icons/ead-green.svg"
                alt=""
              />
              <img v-else src="@/assets/icons/ead.svg" alt="" />
              <div>EAD Rurall Strong</div>
            </router-link>
          </div>
          <div
            class="act"
            @mouseover="keep('cadastro')"
            @mouseleave="keep('')"
            @click="redirectME('/site/cadastro')"
          >
            <router-link to="">
              <img
                v-if="ativo == 'cadastro'"
                src="@/assets/icons/cadastro-green.svg"
                alt=""
              />
              <img v-else src="@/assets/icons/cadastro.svg" alt="" />
              <div>Cadastrar Cliente</div>
            </router-link>
          </div>
        </div>
        <div class="one">
          <img src="@/assets/icons/rodape-prancheta.png" alt="RECURSOS" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servAuth } from "@/database.js";
export default {
  data() {
    return {
      email: null,
      pass: null,
      ativo: ""
    };
  },
  methods: {
    redirectME(rota) {
      this.$router.push(rota);
    },
    keep(param) {
      this.ativo = param;
    },
    entrar() {
      servAuth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(function() {
          this.$store.commit("resource/SET_NOTIFY", {
            status: true,
            mensagem: `Autenticado com sucesso`,
            type: "sucess"
          });
        })
        .catch(function(error) {
          this.$store.commit("resource/SET_NOTIFY", {
            status: true,
            mensagem: `Erro de Autenticação`,
            type: "danger"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.Camada_1 {
  fill: #3dce00;
}
.space {
  padding: 5px;
}

.login {
  display: grid;
  //grid-template-columns: 1fr minmax(0, 560px);
  grid-template-columns: 55% 45%;
  grid-template-rows: 1fr;
  text-align: center;
  padding-top: 0px;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  .hero {
    background-size: cover;
    background-position: center center;
    background-image: url("../../assets/image/screen-login.jpg");
  }
  .paper {
    min-height: 100vh;
    font-size: 18px;
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    align-content: center;
    align-items: center;
    align-self: center;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background-color: white;
    .brand {
      font-weight: 100;
      font-size: 20px;
      margin: 20px;
      margin-top: 5px;
      color: rgb(80, 80, 80);
    }
    .loginSection {
      margin: 0 auto;
      margin-top: -30px;
      background-color: white;
      text-align: center;
      align-items: center;
      padding: 20px 50px;
      box-sizing: content-box;
      box-shadow: 0px 0px 20px rgba(50, 50, 50, 0.2);
      border-radius: 30px;
      .logo {
        img {
          margin: 20px;
          width: 250px;
        }
      }
      .formLogin {
        .sect {
          padding: 10px;
          display: grid;
          grid-template-columns: minmax(auto, 100px) 2fr;
          grid-template-rows: auto;
          input {
            padding: 10px;
            border: none;
            color: white;
            background-color: #163800;
            min-width: 200px;
            border-radius: 0px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .titulo {
            color: #3dce00;
            display: inline-block;
            padding: 10px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background-color: #163800;
            align-content: center;
            align-items: center;
            align-self: center;
          }
        }
        .actions {
          /*display: grid;
          margin-top: 20px;
          &.one {
            grid-template-columns: 1fr;
          }*/
          padding: 10px;
          text-align: center;
          button {
            padding: 20px 80px;
            //min-width: 200px;
            background-color: #163800;
            color: white;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            display: inline-block;
            position: absolute;
            margin-left: -100px;
            &:hover {
              cursor: pointer;
              background-color: #3dce00;
            }
          }
        }
      }
    }
    .expose {
      margin-top: 20px;
      font-weight: 900;
      font-size: 12px;
      a {
        text-decoration: none;
        padding: 0px;
        color: rgb(50, 50, 50);
        border-bottom: 1px solid rgba(50, 50, 50, 0);
        transition: 0.4s all;
        &:hover {
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(50, 50, 50, 0.5);
        }
      }
    }
  }
}
.footer {
  padding-top: 20px;
  .g2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    //text-align: center;
    color: #afafaf;
    font-weight: 900;
    .act {
      transition: 1s all;
      opacity: 0.5;
      color: #afafaf;
      &:hover {
        opacity: 1;
        cursor: pointer;
        a {
          color: #008d36;
        }
      }
    }
    a {
      color: #afafaf;
      text-decoration: none;
      text-align: center;
      padding: 10px;
      margin: 10px;
      border: 2px solid rgba(0, 0, 0, 0);
      &:hover {
        cursor: pointer;
        color: #008d36;
      }
    }
    &div:nth-child(1) {
      text-align: left;
    }
    &div:nth-child(2) {
      text-align: right;
    }
    img {
      width: 70px;
    }
  }
  .one {
    text-align: center;
    img {
      width: 80%;
    }
  }
}
</style>
