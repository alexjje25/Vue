<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title v-if="titulo.length > 1" class="headline">{{
          titulo
        }}</v-card-title>

        <v-card-text v-if="mensagem.length > 1">
          {{ mensagem }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      default: false,
      type: Boolean
    },
    titulo: {
      default: "",
      type: String
    },
    mensagem: {
      default: "",
      type: String
    }
  }
};
</script>
