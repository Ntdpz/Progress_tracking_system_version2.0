
<template>
  <div>
    <h1>{{ user.id }}</h1>
    <h1>{{ user.user_role }}</h1>
    <h1>{{ user.user_position }}</h1>
    <h1>HEllo dev</h1>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      items: ["aaaaa 1", "bbbbb 2", "cccccc 3", "ddddd 4"],
      selectedItem: null,
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      screenId: "",
      screen: "",
      userdata: [],
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
</style>