<template >
  <div>
    <v-dialog v-model="dialog" persistent max-width="400px" max-height="100%">
      <v-card
        max-width="400px"
        max-height="100%"
        elevation="8"
        style="border-radius: 40px"
      >
        <v-row class="ma-0 pa-0 pt-3" style="place-content: center">
          <v-card-title>
            <v-icon size="100px" color="success">mdi-check-all</v-icon>
          </v-card-title>
        </v-row>
        <v-row class="ma-0 pa-0" style="place-content: center">
          <v-card-title class="text-h5 pa-0">
            <span>{{ title }}</span>
          </v-card-title>
        </v-row>
        <v-card-actions style="place-content: center">
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            class="mb-10 mt-5"
            color="success"
            dark
            @click="closeDialog"
            rounded
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    title: String,
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
  },
};
</script> 

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 36px;
  min-width: 147px;
  /* padding: 0 16px; */
}
</style>