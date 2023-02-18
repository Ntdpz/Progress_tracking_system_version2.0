<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label for="user_id">User ID:</label>
      <input type="text" v-model="user_id" id="user_id" />

      <label for="user_password">Password:</label>
      <input type="password" v-model="user_password" id="user_password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      user_id: "",
      user_password: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post("/users/login", {
          user_id: this.user_id,
          user_password: this.user_password,
        });

        if (response.data.authenticated) {
          // Login successful, redirect to dashboard page
          this.$router.push("/");
        } else {
          // Show error message
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    },
  },
};
</script>