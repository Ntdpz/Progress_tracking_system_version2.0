
<template>
  <div>
    <h1>Test 8 components notification_button</h1>
    <notification_button />
  </div>
</template>

<script>
import notification_button from "@/components/Progress_tracking/์์์Notification/notification_button.vue";
export default {
  middleware: "auth",
  layout: "admin",
  components: {
    notification_button,
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      await this.$axios
        .get("/users/getOne/" + this.$auth.user.id)
        .then((res) => {
          this.id = res.data[0].id;
          this.userdata = res.data[0];
        });
    },
  },
};
</script>

<style>
</style>