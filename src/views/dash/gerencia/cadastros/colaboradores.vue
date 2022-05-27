<template>
  <div>
    <div v-show="preview == false" class="boxPadrao">
      <div class="form">
        <div class="scopo">
          <div class="titulo">Foto de Perfil:</div>
          <div class="include">
            <input type="file" @change="selectCandidateImage($event)" />
          </div>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nome</div>
            <div class="include">
              <input
                v-model="include.name"
                type="text"
                placeholder="Nome do Funcionário"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Rurall Card</div>
            <div class="include">
              <input
                v-model="include.codigo"
                type="text"
                maxlength="6"
                minlength="6"
              />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
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
          </div>
          <div class="scopo">
            <div class="titulo">Função</div>
            <div class="include">
              <input v-model="include.funcao" type="text" />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Telefone</div>
            <div class="include">
              <input v-model="include.telefone" type="text" />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">E-mail</div>
            <div class="include">
              <input v-model="include.email" type="text" />
            </div>
          </div>
        </div>

        <div class="scopo">
          <h4>Administrativo</h4>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Data de Entrada</div>
            <div class="include">
              <input
                v-model="include.dataEntrada"
                type="text"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Mês de Férias</div>
            <div class="include">
              <input
                v-model="include.mesFerias"
                type="text"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">RG</div>
            <div class="include">
              <input v-model="include.rg" type="text" />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">CPF</div>
            <div class="include">
              <input
                v-model="include.cpf"
                type="text"
                placeholder="12345678900"
              />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">PIS</div>
            <div class="include">
              <input v-model="include.pis" type="text" />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Nº do Registro Técnico</div>
            <div class="include">
              <input v-model="include.registroTecnico" type="text" />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nacionalidade</div>
            <div class="include">
              <input v-model="include.nacionalidade" type="text" />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Naturalidade</div>
            <div class="include">
              <input v-model="include.naturalidade" type="text" />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Endereço</div>
            <div class="include">
              <input v-model="include.endereco" type="text" />
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">CEP</div>
            <div class="include">
              <input v-model="include.cep" type="text" />
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">SENHA</div>
            <div class="include">
              <input
                v-model="include.password"
                type="text"
                maxlength="4"
                placeholder="4 digitos"
              />
            </div>
          </div>
          <div class="scopo">
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-if="PERMISSAO >= 40"></div>
        <p>
          <vBtn
            :icon="require('@/assets/icons/sinais/adicionar-white.png')"
            texto="Cadastrar"
            @handleClick="setNewUser()"
          />
        </p>
      </div>
    </div>
    <div v-show="preview == true" class="boxPadrao">
      <div class="form">
        <div class="scopo">
          <div class="titulo">Foto de Perfil:</div>
          <div class="include">
            <input type="file" @change="selectCandidateImage($event)" />
          </div>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nome</div>
            <div class="include">
              {{ include.name }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Rurall Card</div>
            <div class="include">
              {{ include.codigo }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Setor</div>
            <div class="include">
              {{ include.setor }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Função</div>
            <div class="include">
              {{ include.funcao }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Telefone</div>
            <div class="include">
              {{ include.telefone }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">E-mail</div>
            <div class="include">
              {{ include.email }}
            </div>
          </div>
        </div>

        <div class="scopo">
          <h4>Administrativo</h4>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Data de Entrada</div>
            <div class="include">
              {{ include.dataEntrada }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Mês de Férias</div>
            <div class="include">
              {{ include.mesFerias }}
            </div>
          </div>
        </div>
        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">RG</div>
            <div class="include">
              {{ include.rg }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">CPF</div>
            <div class="include">
              {{ include.cpf }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">PIS</div>
            <div class="include">
              {{ include.pis }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Nº do Registro Técnico</div>
            <div class="include">
              {{ include.registroTecnico }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Nacionalidade</div>
            <div class="include">
              {{ include.nacionalidade }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">Naturalidade</div>
            <div class="include">
              {{ include.naturalidade }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">Endereço</div>
            <div class="include">
              {{ include.endereco }}
            </div>
          </div>
          <div class="scopo">
            <div class="titulo">CEP</div>
            <div class="include">
              {{ include.cep }}
            </div>
          </div>
        </div>

        <div class="grid g2">
          <div class="scopo">
            <div class="titulo">SENHA</div>
            <div class="include">
              {{ include.password }}
            </div>
          </div>
          <div class="scopo">
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-if="PERMISSAO >= 40"></div>
        <p>
          <vBtn
            :icon="require('@/assets/icons/sinais/adicionar-white.png')"
            texto="Cadastrar"
            @handleClick="setNewUser()"
          />
        </p>
      </div>
    </div>
    <v-box-upload
      v-if="inUpload"
      :total="progress.total"
      :atual="progress.atual"
      :porcente="progress.porcente"
    ></v-box-upload>
  </div>
</template>

<script>
import vBoxUpload from "../global/box-await-upload";
import { servColaboradores, firebase } from "@/database.js";
import vBtn from "@/components/dash/btnIcon";

export default {
  components: {
    "v-box-upload": vBoxUpload,
    vBtn
  },
  data() {
    return {
      itsOk: false,
      inUpload: false,
      include: {
        codigo: "",
        password: "",
        name: "",
        funcao: "",
        setor: "selecione",
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        telefone: "",
        email: "",
        dataEntrada: "",
        mesFerias: "",
        rg: "",
        cpf: "",
        pis: "",
        registroTecnico: "",
        nacionalidade: "",
        naturalidade: "",
        endereco: "",
        cep: "",
        imagemURL: ""
      },
      progress: {
        total: null,
        atual: null,
        porcente: null
      },
      toUpload: {
        file: null,
        uploaded: false
      },
      preview: false
    };
  },
  computed: {
    setores() {
      return this.$store.getters["fazenda/GET_SETOR"];
    },
    PERMISSAO() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    }
  },
  methods: {
    previewDados() {
      let resposta = this.filtrarForms();
      if (resposta) {
        this.preview = true;
      } else {
        return false;
      }
    },
    confirmaOsDados() {
      this.setNewUser();
    },
    selectCandidateImage(event) {
      window.console.log(event);
      this.toUpload.file = event.target.files[0];
    },
    uploadCompleto() {
      let self = this;
      servColaboradores
        .child(self.include.codigo)
        .update(self.include, function() {
          self.$store.commit("resource/SET_NOTIFY", {
            status: true,
            mensagem: "Cadastro efetuado com sucesso!",
            type: "sucess"
          });
        });
    },
    uploadImagem(card) {
      var self = this;
      const file = self.toUpload.file;
      const localImage = `colaborador/${card}/perfil`;
      const metadata = {
        cacheControl: "public,max-age=300"
      };
      const storageRef = firebase.storage().ref(localImage);
      const uploadTask = storageRef.put(file, metadata);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          self.inUpload = true;
          self.progress.total = snapshot.bytesTransferred;
          self.progress.atual = snapshot.totalBytes;
          self.progress.porcente =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              window.console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              window.console.log("Upload is running");
              break;
          }
        },
        function(error) {
          self.inUpload = false;
          window.console.log(error);
          window.alert(error.code);
        },
        function() {
          self.inUpload = false;
          self.include.imagemURL = localImage;
          self.uploadCompleto();
        }
      );
      /*
      const storageLocal = `gs://rurall.appspot.com/colaborador/${card}/perfil.jpg`;
      Storage.child(`colaborador/${card}/perfil.jpg`)
        .put(self.toUpload.file)
        .then(function(snapshot) {
          self.sendPrioritaryImage(snapshot, card, storageLocal);
        });
      */
    },
    enviar() {
      let self = this;
      window.console.log("enviar imagem....");
      this.uploadImagem(self.include.codigo);
    },
    filtrarForms() {
      let self = this;
      var codigo = String(self.include.codigo);
      var senha = String(self.include.password);
      var erros = [];
      if (this.include.setor == "selecione") {
        erros.push({ msg: "Não foi selecionado setor", name: "SETOR" });
      }
      if (codigo.length < 6 || codigo.length > 6) {
        erros.push({
          msg: "A quantidade de numeros está incorreta, deve contar 6 digitos",
          name: "CARD RURALL"
        });
      }
      if (senha.length < 4 || senha.length > 4) {
        erros.push({
          msg:
            "A quantidade de numeros está incorreta na sua senha, deve contar 4 digitos",
          name: "SENHA DE ACESSO"
        });
      }

      if (codigo) {
        servColaboradores.child(codigo).once("value", function(snapshot) {
          if (snapshot.exists()) {
            erros.push({
              msg:
                "Código do cartão de usuário já existe no sistema, não é possivel duplicar.",
              name: "CARD RURALL"
            });
          }
        });
      }

      if (!codigo) {
        erros.push({
          msg: "Código do cartão de usuário inválido",
          name: "CARD RURALL"
        });
      }

      if (erros.length > 0) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "Erros encontrados",
          type: "danger",
          lista: erros
        });
        return false;
      }
    },
    setNewUser() {
      let self = this;
      var codigo = String(self.include.codigo);
      var senha = String(self.include.password);
      if (this.include.setor == "selecione") {
        window.alert("Erro você não selecionou o setor");
        return false;
      }
      if (codigo.length < 6 || codigo.length > 6) {
        window.alert(
          "A quantidade de numeros está incorreta no seu id, deve contar 6 digitos"
        );
        return false;
      }
      if (senha.length < 4 || senha.length > 4) {
        window.alert(
          "A quantidade de numeros está incorreta na sua senha, deve contar 4 digitos"
        );
        return false;
      }
      servColaboradores.child(codigo).once("value", function(snapshot) {
        if (snapshot.exists()) {
          window.console.log("Já existe funcionário com esse UID!");
        } else {
          window.console.log("Enviando...");
          self.enviar();
        }
      });
      try {
        window.console.log("ok?");
      } catch (error) {
        window.console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
