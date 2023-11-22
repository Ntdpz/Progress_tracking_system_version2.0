<template>
  <v-container>
    <div>
      <v-alert
        border="left"
        colored-border
        color="deep-purple accent-4"
        elevation="2"
      >
        Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut
        velit. Nulla facilisi.. Morbi mollis tellus ac sapien. Fusce vel dui.
        Praesent ut ligula non mi varius sagittis. Vivamus consectetuer
        hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a,
        condimentum nec, nisi.
      </v-alert>

      <v-alert border="top" colored-border type="info" elevation="2">
        Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut
        varius tincidunt libero. Curabitur ligula sapien, tincidunt non, euismod
        vitae, posuere imperdiet, leo. Morbi nec metus.
      </v-alert>

      <DialogFail />
      <br />
      <dialog-success />
    </div>
  </v-container>
</template>

<script>
import DialogFail from "~/components/DialogFail.vue";
import DialogSuccess from "../components/DialogSuccess.vue";

export default { components: { DialogFail, DialogSuccess } };
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
</style>