<template>
  <div
    v-if="response.status == true"
    class="notify"
    :class="{
      closed: closed == true,
      sucess: response.type == 'sucess',
      danger: response.type == 'danger',
      warning: response.type == 'warning',
      info: response.type == 'info'
    }"
  >
    <div v-show="false" class="type">
      <b>{{ response.type }}</b>
    </div>
    <div class="mensagem">
      {{ response.mensagem }}<br />
      <ul v-if="response.lista.length > 0" class="isList">
        <li v-for="(item, index) in response.lista" :key="index">
          {{ item.name }} - {{ item.msg }}
        </li>
      </ul>
    </div>
    <button class="close" @click="close">FECHAR</button>
  </div>
</template>

<script>
export default {
  filters: {
    nomeTipo: function(val) {
      if (val == "sucess") {
      }
    }
  },
  data() {
    return {
      closed: false
    };
  },
  computed: {
    response() {
      return this.$store.getters["resource/GET_NOTIFY"];
    }
  },
  methods: {
    close(n) {
      if (n == "toggle") {
        this.$store.commit("resource/SET_NOTIFY", {
          status: false,
          mensagem: ""
        });
        this.closed = false;
      } else {
        this.maxEffect();
      }
    },
    maxEffect() {
      this.closed = true;
      setTimeout(() => {
        this.close("toggle");
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
$card-warning1: #ba6c06;
$card-warning2: #db8f1b;
$card-sucess1: #009030;
$card-sucess2: #00d341;
$card-danger1: #a01127;
$card-danger2: #ff0000;
$card-info1: #727176;
$card-info2: #aeadb3;
$colorText: white;
$border-radius: 12px;
.notify {
  &.closed {
    right: -100px;
    opacity: 0;
  }
  position: fixed;
  transition: 0.5s all;
  top: 200px;
  right: 20px;
  padding: 0px;
  background-color: white;
  border-radius: $border-radius;
  box-shadow: 1px 1px 4px rgba(50, 50, 50, 0.5);
  z-index: 10000;
  .close {
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    padding: 10px;
    color: $colorText;
    border: none;
    display: block;
    width: 100%;
    font-weight: 800;
    &:hover {
      cursor: pointer;
    }
  }
  .mensagem {
    padding: 15px;
    font-size: 14px;
    max-width: 300px;
    min-width: 200px;
    min-height: 50px;
    text-align: center;
    align-content: center;
    align-items: center;
    align-self: center;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    color: $colorText;
  }
  &.sucess {
    .mensagem {
      background-color: $card-sucess1;
    }
    .close {
      background-color: $card-sucess2;
    }
  }
  &.warning {
    .mensagem {
      background-color: $card-warning1;
    }
    .close {
      background-color: $card-warning2;
    }
  }
  &.danger {
    .mensagem {
      background-color: $card-danger1;
    }
    .close {
      background-color: $card-danger2;
    }
  }
  &.info {
    .mensagem {
      background-color: $card-info1;
    }
    .close {
      background-color: $card-info2;
    }
  }
}
</style>
