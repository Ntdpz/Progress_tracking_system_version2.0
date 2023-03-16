<template>
  <div>
    <searchbar title="Notifications" />
    <v-divider></v-divider>
    <div>
      <v-card v-for="n in 1" :key="n" class="mt-10 mb-10" elevation="8">
        <v-card-title>Stock Product</v-card-title>
        <v-row class="ml-0 pl-3">
          <v-icon color="green">mdi-circle</v-icon>
          <v-card-subtitle style="font-size: 19px; color: black"
            >Screen 1</v-card-subtitle
          >
        </v-row>
        <v-row class="ml-12 mt-0 mb-0 mr-0">
          <v-icon color="black">mdi-account-circle</v-icon>
          <v-card-subtitle style="font-size: 19px; color: black"
            >Dev 1 Status: Complete</v-card-subtitle
          >
        </v-row>
      </v-card>

      <v-card v-for="n in 1" :key="n" class="mt-10 mb-10" elevation="8">
        <v-card-title>Reset Password</v-card-title>
        <v-row class="ml-0 pl-3">
          <v-icon color="red">mdi-circle</v-icon>
          <v-card-subtitle style="font-size: 19px; color: black"
            >Reset Password</v-card-subtitle
          >
        </v-row>
        <v-row class="ml-12 mt-0 mb-0 mr-0">
          <v-icon color="black">mdi-account-circle</v-icon>
          <v-card-subtitle style="font-size: 19px; color: black"
            >Dev 2 Need reset Password</v-card-subtitle
          >
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import Searchbar from "../components/Searchbar.vue";
export default {
  components: { Searchbar },

  layout: "admin",
  data() {
    return {
      query: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}
</style>
