<template>
  <div>
    <v-btn @click="getdata()">GET</v-btn>
    <h1>{{ this.testdata }}</h1>
  </div>
</template>
<script>
export default {
  data: () => ({
    testdata: "",
  }),
  methods: {
    getdata() {
      this.$axios.get("/users/getAll").then((res) => {
        this.testdata = res.data;
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>