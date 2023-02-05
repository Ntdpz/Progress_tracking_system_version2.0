<template>
  <div>
    <v-row class="mb-3 ml-4">
      <v-text-title
        class="center ml-4 mr-4 mt-0 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        Notifications
      </v-text-title>
      <v-divider
        class="mt-0 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <div>
        <v-text-field class="ml-3 mb-5 ml-2" style="height: 20px;" rounded dense outlined label="Search some project"
          prepend-inner-icon="mdi-magnify"></v-text-field>
      </div>
    </v-row>
    <v-divider></v-divider>
    <div>
      <v-card v-for="n in 1" :key="n" class="mt-10 mb-10" elevation="8">
        <v-card-title>Stock Product {{ n }}</v-card-title>
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
        <v-card-title>Reset Password {{ n }}</v-card-title>
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
export default {
  
  layout: "Nav",
  data() {
    return {
      query: "",
    };
  },
  methods: {
   
  },
};
</script>

<style scoped>
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
