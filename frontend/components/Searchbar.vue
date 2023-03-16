<template>
  <v-row class="mb-3">
    <v-text-title
      class="center ml-4 mr-4 mt-3 mb-1"
      style="font-weight: bold; font-size: 20px"
    >
      {{ title }}
    </v-text-title>
    <v-divider
      class="mt-3 mb-1"
      inset
      vertical
      style="background-color: black"
    ></v-divider>
    <v-card class="card ml-5 mt-2" style="height: 40px; border-radius: 60px">
      <v-card-text class="pa-0">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          rounded
          color="primary"
          placeholder="Search"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.card >>> .v-input {
  padding-top: 0% !important;
}
</style>