<template>
  <div>
    <h1>Home Page</h1>
    <v-btn color="primary" @click="dialog = true">Open Dialog</v-btn>
    <!-- <my-dialog :dialog.sync="dialog" /> -->
    <dialog-create-project :dialog.sync="dialog" />
  </div>
</template>

<script>
import DialogCreateProject from "../components/DialogCreateProject.vue";

export default {
  components: {
    DialogCreateProject,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
