<template>
  <v-app>
    <v-main style="background: gray">
      <v-container fluid fill-height style="background-color: #f1f1f1">
        <v-layout align-center justify-center>
          <v-flex style="text-align: -webkit-center">
            <v-card class="elevation-12" height="420px" width="400px">
              <v-toolbar style="display: initial">
                <v-toolbar-title
                  class="font-weight-bold ml-2 mt-3"
                  style="font-size: 30px"
                  >Login</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    :rules="rules"
                    label="Employee ID."
                    placeholder="Enter your employee ID."
                    type="text"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    label="Password"
                    placeholder="Enter 6 charactor or more"
                    type="password"
                    outlined
                  ></v-text-field>
                </v-form>

                <v-checkbox
                  v-model="checkbox"
                  class="mt-0"
                  :label="`Remember Me`"
                ></v-checkbox>
              </v-card-text>
              <v-btn
                style="color: white; font-weight: bold; height: 43px"
                color="#883CFE"
                width="90%"
                @click="checkcountlogin()"
                >Login</v-btn
              >
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
                      font-weigth: bold;
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
      checkbox: false,
      dialog: false,
      countlogin: 0,

      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 6) || "Min 6 characters",
      ],
    };
  },
  updated() {},
  methods: {
    checkcountlogin() {
      this.countlogin = this.countlogin + 1;
      console.log(this.countlogin);
      if (this.countlogin == 3) {
        this.dialog = true;
      } else if (this.countlogin > 3) {
        this.$router.push("/Home");
      }
    },
  },
};
</script>

<style scoped>
</style>