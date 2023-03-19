<template>
  <div>
    <v-btn color="primary" dark @click="dialog = true">Open Dialog</v-btn>
    <dialog-issue :dialog.sync="dialog" />
  </div>
</template>

<script>
import DialogIssue from "../components/DialogIssue.vue";
export default {
  components: {
    DialogIssue,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>