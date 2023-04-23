<template>
  <v-form ref="form">
    <v-text-field
      v-model="user_id"
      label="User ID"
      :rules="rules"
    ></v-text-field>
    <v-text-field
      v-model="user_password"
      label="Password"
      :rules="rules"
      type="password"
    ></v-text-field>
    <v-checkbox v-model="checkbox" label="Remember me"></v-checkbox>
    <v-btn @click="handleLogin">Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      user_id: "",
      user_password: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 6) || "Min 6 characters",
      ],
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.form.validate();
        const response = await this.$axios.post("/auth/api/login", {
          username: this.user_id,
          password: this.user_password,
        });
        // Handle response
      } catch (error) {
        console.error(error);
        this.error = "An error occurred";
      }
    },
  },
};
</script>