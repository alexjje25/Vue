<template>
  <div>
    <h2>Criação de usuarios Administrativo</h2>
    <div v-if="awaitProcess">
      <h2>Aguardando resposta do Cloud Function...</h2>
    </div>
    <div v-else class="formulario">
      <div class="group2">
        <div>Usuario Administrativo:</div>
        <div><input type="checkbox" v-model="includeIsAdmin" /></div>
      </div>
      <div class="group2">
        <div>Tipo de Usuario</div>
        <div>
          <select v-model="include.type">
            <option value="gerencia">Gestão de Fazenda</option>
            <option value="admin">Administrativo</option>
          </select>
        </div>
      </div>
      <div class="group2">
        <div>Nome:</div>
        <div><input type="text" v-model="include.name" /></div>
      </div>
      <div class="group2">
        <div>EMAIL DE ACESSO:</div>
        <div><input type="text" v-model="include.email" /></div>
      </div>
      <div class="group2">
        <div>SENHA DE ACESSO</div>
        <div><input type="text" v-model="includePass" /></div>
      </div>
      <div class="group2">
        <div>Telefone:</div>
        <div><input type="text" v-model="include.telefone" /></div>
      </div>
      <div class="group2">
        <div>Fazenda Existente</div>
        <div>
          <select v-model="include.idFazenda">
            <option
              :key="index"
              :value="item.chave"
              v-for="(item, index) in getFazendas"
            >
              {{ item.dados.nomeFazenda }}
            </option>
          </select>
        </div>
        <div>ID REFERENTE</div>
        <div>{{ include.idFazenda }}</div>
      </div>
      <div>
        <button @click="createNewStaffUser()">CADASTRAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, servUsers, includeStaffUser } from "@/database";

export default {
  data() {
    return {
      cloudfunction: {
        key: false,
        process: false,
        update: false,
        status: ""
      },
      includeIsAdmin: true,
      includePass: "",
      include: {
        telefone: "",
        name: "",
        idFazenda: "NULO",
        email: "",
        nivel: 99, // adm
        type: "admin"
      }
    };
  },
  computed: {
    getFazendas() {
      let receiver = [...this.$store.getters["admin/GET_FAZENDAS"]];
      receiver.push({
        dados: { nomeFazenda: "SEM FAZENDA" },
        chave: "NULO"
      });
      return receiver;
    }
  },
  methods: {
    handleValueFire() {
      let self = this;
      includeStaffUser.child(self.cloudfunction.key).on("value", snap => {
        window.console.log(snap.val(), snap);
      });
    },
    /*
    processaDados(response) {
      let include = this.include;
      let chave = response.user.uid;
      servUsers
        .child(chave)
        .update(include)
        .then(() => {
          window.console.log("Writed User Success");
        });
    },*/
    createNewStaffUser() {
      var self = this;
      if (this.includeIsAdmin == true) {
        this.include.nivel = 99;
      }
      var include = self.include;
      //var mail = self.include.email;
      //var pass = self.includePass;
      self.cloudfunction.key = includeStaffUser.push().key;
      includeStaffUser
        .child(self.cloudfunction.key)
        .update({
          name: self.include.name,
          phone: self.include.telefone,
          idFazenda: self.include.idFazenda,
          email: self.include.email,
          nivel: self.include.nivel,
          type: self.include.type,
          password: self.includePass
        })
        .then(() => {
          self.cloudfunction.process = true;
          self.handleValueFire();
        })
        .catch(() => {});

      /*
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(response => {
          let chave = response.user.uid;
          this.processaDados(response);
        })
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          window.console.error(errorCode, errorMessage);
        });

      */
    }
  }
};
</script>

<style lang="scss" scoped>
.formulario {
  padding: 20px;
  label {
    padding: 10px;
    //display: block;
  }
}
</style>
