m<template>
  <div>
    <v-impress v-if="IMPRESS == true" />
    <div v-show="IMPRESS == false">
      <vRootDev v-if="GET_NIVEL_AUTH == 99" :token-key="tokenUser"></vRootDev>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { servAuth, servUsers } from "@/database.js";
import vRootDev from "@/components/rootDeveloper.vue";
import vImpress from "@/views/dash/impress/index";
export default {
  components: {
    vRootDev,
    "v-impress": vImpress
  },
  computed: {
    GET_NIVEL_AUTH() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    },
    tokenUser() {
      return this.$store.getters["auth/TOKEN"];
    },
    IMPRESS() {
      return this.$store.getters["GET_IMPRESS"];
    }
  },
  mounted() {
    const self = this;
    this.placego();
    servAuth.onAuthStateChanged(function(user) {
      if (user) {
        self.$store.commit("auth/ADD_USER", {
          email: user.email,
          token: user.uid
        });
        self.payloadUser(user.uid);
      } else {
        self.$router.push("/dash/login");
      }
    });
  },
  methods: {
    placego() {},
    ancoragem(modulo) {
      if (modulo == "admin") {
        this.$router.push("/dash/admin");
      } else if (modulo == "gerencia") {
        this.$router.push("/dash/gerencia");
      } else if (modulo == "representante") {
        this.$router.push("/dash/representante");
      } else {
        window.alert("houve algum erro de referencia", modulo);
        //this.$router.push("/dash/login");
      }
    },
    async payloadUser(chave) {
      //DEFINIR TIPO DE USUARIO
      const self = this;
      const queryTypeUser = servUsers.child(chave);

      queryTypeUser.on("value", snaps => {
        const snap = snaps.val();
        const chave = snaps.key;
        const payload = {
          email: snap.email,
          idFazenda: snap.idFazenda,
          name: snap.name,
          nivel: snap.nivel,
          type: snap.type,
          telefone: snap.telefone,
          chave: chave
        };
        self.$store.commit("auth/UPDATE_USER", payload);
        self.carregando == true;
        setTimeout(() => {
          self.carregando == false;
          self.ancoragem(snap.type);
        }, 1000);
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/dash/global.scss";
</style>
