
<template>
  <div>
    <Loader v-if="isLoading" />
    <!-- <h1>{{ user.id }}</h1>
    <h1>{{ user.user_role }}</h1>
    <h1>{{ user.user_position }}</h1> -->
    <h1 class="centered-heading">Dashbord</h1>
    <v-spacer></v-spacer>
    <div>
      <Greeting />
      <result_projects :userId="user.id" />
    </div>
  </div>
</template>

<script>
import Greeting from "../../components/project/Greeting.vue";
import Loader from "../../components/Loader.vue";
import result_projects from "../../components/Progress_tracking/Dashbord/result_projects.vue";
import "./Dashbord.css";
export default {
  components: { Greeting, Loader, result_projects },
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      isLoading: true,
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
</style>