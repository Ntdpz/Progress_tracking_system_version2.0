<template>
  <div>
    <v-toolbar elevation="1" outlined>
      <v-toolbar-title>System List | </v-toolbar-title>
      <div>
        <v-text-field
          class="search-field mb-5 ml-2"
          style="height: 20px;"
          rounded
          dense
          outlined
          label="Search some issue"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-toolbar>
  </div>
</template>

<script>
export default {
  layout: "Nav",
  data() {
    return {};
  },
};
</script>

<style scoped>
.search-field {
    color: blue !important;
}
</style>