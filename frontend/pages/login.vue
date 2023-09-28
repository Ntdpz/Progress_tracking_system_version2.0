<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height style="background-color: #f1f1f1">
        <v-layout align-center justify-center>
          <v-flex style="text-align: -webkit-center">
            <v-card class="elevation-12" height="100%" width="400px">
              <v-toolbar style="display: initial">
                <v-toolbar-title
                  class="font-weight-bold ml-2 mt-3"
                  style="font-size: 30px"
                  >เข้าสู่ระบบ</v-toolbar-title
                >
              </v-toolbar>

              <v-card-text>
                <v-row>
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle
                      style="text-align: left; font-weight: bold; color: black"
                      >รหัสพนักงาน</v-card-subtitle
                    >
                  </v-col>
                </v-row>
                <v-form @submit.prevent="handleLogin" ref="form">
                  <v-text-field
                    class="mb-2"
                    placeholder="กรุณาใส่รหัสพนักงานของคุณ"
                    v-model="user_id"
                    type="text"
                    outlined
                    hide-details="auto"
                    :rules="rules"
                    style="border-radius: 15px"
                  >
                  </v-text-field>
                  <v-row>
                    <v-col class="ma-0 pa-0">
                      <v-card-subtitle
                        style="
                          text-align: left;
                          font-weight: bold;
                          color: black;
                        "
                        >รหัสผ่าน</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                  <v-text-field
                    class="mb-2"
                    placeholder="กรุณาใส่รหัสผ่านให้ถูกต้อง"
                    v-model="user_password"
                    type="password"
                    outlined
                    hide-details="auto"
                    :rules="rules"
                    style="border-radius: 15px"
                  >
                  </v-text-field>
                  <br />
                  <!-- <v-checkbox
                    v-model="checkbox"
                    class="mt-0"
                    :label="`Remember Me`"
                  ></v-checkbox> -->
                  <v-btn
                    class="mb-8"
                    style="color: white; font-weight: bold; height: 43px"
                    color="#5c3efe"
                    width="90%"
                    type="submit"
                    >เข้าสู่ระบบ</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>

            <!-- dialog -->
            <div height="600px">
              <v-dialog
                v-model="dialog"
                persistent
                max-width="400px"
                max-height="600px"
              >
                <v-card class="pt-4 pb-4">
                  <v-card-title
                    class="pt-4 pb-4"
                    style="
                      place-content: center;
                      font-size: 24px;
                      font-weight: bold;
                    "
                  >
                    บัญชีของคุณถูกล็อก
                  </v-card-title>
                  <div style="text-align-last: center">
                    <v-icon class="pb-8" style="color: red; font-size: 700%"
                      >mdi-alert-circle
                    </v-icon>
                  </div>
                  <v-card-text>
                    เนื่องจากการกรอกข้อมูลผิดมากกว่า 3 ครั้ง บัญชีจึงล็อก
                    กรุณาติดต่อแอดมินเพื่อทำการเปลี่ยนข้อมูล</v-card-text
                  >
                  <v-card-actions class="pb-4">
                    <v-btn
                      style="place-content: center; color: white"
                      color="red"
                      @click="dialog = false"
                      width="100%"
                    >
                      ติดต่อแอดมิน
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div height="600px">
              <v-dialog
                v-model="dialogWrong"
                persistent
                max-width="400px"
                max-height="600px"
              >
                <v-card class="pt-4 pb-4">
                  <v-card-title
                    class="pt-4 pb-4"
                    style="
                      place-content: center;
                      font-size: 24px;
                      font-weight: bold;
                    "
                  >
                    <h4>
                      คุณกรอกข้อมูลไม่ถูกต้อง <br />
                      กรุณากรอกใหม่อีกครั้ง
                    </h4>
                  </v-card-title>
                  <div style="text-align-last: center">
                    <v-icon class="pb-8" style="color: red; font-size: 700%"
                      >mdi-alert-circle
                    </v-icon>
                  </div>
                  <!-- <v-card-text>
                    เนื่องจากการกรอกข้อมูลผิดมากกว่า 3 ครั้ง บัญชีจึงล็อก
                    กรุณาติดต่อแอดมินเพื่อทำการเปลี่ยนข้อมูล</v-card-text
                  > -->
                  <v-card-actions class="pb-4">
                    <v-btn
                      style="place-content: center; color: white"
                      color="red"
                      @click="dialogWrong = false"
                      width="100%"
                    >
                      ตกลง
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
      dialogWrong: false,
      countLogin: 0,

      rules: [(value) => !!value || "กรุณากรอกข้อมูลให้ครบถ้วน."],
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
        console.log(response.data.user);
        if (response.status === 200) {
          this.$store.commit("setState", {
            user_id: response.data.user.id,
          });
          localStorage.setItem("userId", response.data.user.id);
          this.$router.push("/");
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        this.countLogin = this.countLogin + 1;
        console.error(error);
        console.error(this.countLogin);
        this.error = "An error occurred";
        if (this.countLogin > 3) {
          this.dialog = true;
        } else {
          this.dialogWrong = true;
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
