<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height style="background-color: #f1f1f1">
        <v-layout align-center justify-center>
          <v-flex style="text-align: -webkit-center">
            <v-card class="elevation-12" height="100%" width="400px">
              <v-toolbar style="display: initial">
                <v-toolbar-title class="font-weight-bold ml-2 mt-3" style="font-size: 30px">Login</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-row>
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle style="text-align: left; font-weight: bold; color: black;">Employee ID</v-card-subtitle>
                  </v-col>
                </v-row>
                <v-form @submit.prevent="handleLogin">
                  <!-- :rules="rules" -->
                  <v-text-field class="mb-2"  placeholder="Enter your employee ID." v-model="user_id" type="text"
                    outlined hide-details="auto" style="border-radius: 15px;">
                  </v-text-field>
                  <v-row>
                    <v-col class="ma-0 pa-0">
                      <v-card-subtitle style="text-align: left;font-weight: bold; color: black;">Password</v-card-subtitle>
                    </v-col>
                  </v-row>
                  <v-text-field class="mb-2"  placeholder="Enter 6 charactor or more"
                    v-model="user_password" type="password" outlined hide-details="auto"
                    style="border-radius: 15px;">
                  </v-text-field>
                  <v-checkbox v-model="checkbox" class="mt-0" :label="`Remember Me`"></v-checkbox>
                  <v-btn class="mb-8" style="color: white; font-weight: bold; height: 43px" color="#883CFE" width="90%"
                    type="submit">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- dialog -->
            <div height="600px">
              <v-dialog v-model="dialog" persistent max-width="400px" max-height="600px">
                <v-card class="pt-4 pb-4">
                  <v-card-title class="pt-4 pb-4" style="
                        place-content: center;
                        font-size: 24px;
                        font-weigth: bold;
                      ">
                    บัญชีของคุณถูกล็อก
                  </v-card-title>
                  <div style="text-align-last: center">
                    <v-icon class="pb-8" style="color: red; font-size: 700%">mdi-alert-circle
                    </v-icon>
                  </div>
                  <v-card-text>
                    เนื่องจากการกรอกข้อมูลผิดมากกว่า 3 ครั้ง บัญชีจึงล็อก
                    กรุณาติดต่อแอดมินเพื่อทำการเปลี่ยนข้อมูล</v-card-text>
                  <v-card-actions class="pb-4">
                    <v-btn style="place-content: center; color: white" color="red" @click="dialog = false" width="100%">
                      ติดต่อแอดมิน
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user_id: "",
      user_password: "",
      checkbox: false,
      dialog: false,
      countlogin: 0,

      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 6) || "Min 6 characters",
      ],
    };
  },
  updated() { },
  created() {
    // this.getUser();
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post("/users/login", {
          user_id: this.user_id,
          user_password: this.user_password,
        });
        if (response.data.authenticated) {
          // Login successful
          this.$store.commit("setState", { user_id: this.user_id });
          console.log("response", response);
          this.$router.push("/");
        } else {
          // Show error message
          this.countlogin = this.countlogin + 1;
          if (this.countlogin >= 3) {
            this.dialog = true;
          }
          // console.log(this.countlogin);
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
        this.countlogin = this.countlogin + 1;
        if (this.countlogin >= 3) {
          this.dialog = true;
        }
        // console.log(this.countlogin);
        alert("Server error");
      }
    },
  },
  updated() { },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
