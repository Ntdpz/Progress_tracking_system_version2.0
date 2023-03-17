<template>
  <div>
    <h1>Home Page</h1>
    <v-btn color="primary" @click="dialog = true">Open Dialog</v-btn>
    <v-btn color="primary" @click="dialogIssue = true">Open Dialog Issue</v-btn>
    <!-- <my-dialog :dialog.sync="dialog" /> -->
    <dialog-create-project :dialog.sync="dialog" />
    <dialog-issue :dialog.sync="dialogIssue" />
  </div>
</template>

<script>
import DialogIssue from "~/components/DialogIssue.vue";
import DialogCreateProject from "../components/DialogCreateProject.vue";

export default {
  components: {
    DialogCreateProject,
    DialogIssue,
  },
  data() {
    return {
      dialog: false,
      dialogIssue: false,
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
