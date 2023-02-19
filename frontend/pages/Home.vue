<template>
  <div class="content mx-auto">
    <!-- *Search bar -->
    <v-row class="mb-3 ml-4">
      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Home
      </v-text-title>
      <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <template>
        <v-banner class="mt-0 ml-4" style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 30px;
                      border-radius: 30px;
                      padding: 0 0px;
                    " outlined elevation="2">
          <form class="center" @submit.prevent="search">
            <v-icon color="primary">mdi-magnify</v-icon>
            <input style="width: 200px;" class="mr-3" type="text" v-model="query" placeholder="Search Some Project" />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>
    <!-- *Profile bar -->
    <v-row class="mb-6" no-gutters justify-start>
      <v-col class="mr-10" style="flex-grow: 0 !important">
        <v-avatar class="ml-6 mt-4" style="width: 100px; height: 100px">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col class="mt-4 align-self-center" style="flex-grow: 0 !important">
        <!-- <v-text style="font-size: 20px; color: grey">AM00000001</v-text>
          <v-text style="font-size: 20px">Mr. Admin 1</v-text>
          <v-icon class="mb-1" color="success" style="font-size: small"
            >mdi-circle</v-icon
          >
          <v-text style="font-size: 20px">Active</v-text> -->

        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important"><v-text
            style="font-size: 20px; color: grey">{{
              this.user_id
            }}</v-text></v-col>
        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important">
          <v-text style="font-size: 20px">{{
            this.user_firstname
          }}</v-text></v-col>
        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important">
          <v-icon class="mb-1" color="success" style="font-size: small">mdi-circle</v-icon>
          <v-text style="font-size: 20px">{{ this.user_status }}</v-text></v-col>
      </v-col>
      <v-col class="mt-6 align-self-center" col="7" sm="5" md="7">
        <v-btn icon to="/profile">
          <v-icon class="mb-1" color="black" size="25px">mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-container fluid class="mt-1" height="100%">
      <v-card class="pa-2" tile outlined style="border: none; height: 100%">
        <v-row class="mb-0">
          <v-col col="6" sm="6" md="6" lg="6">
            <v-text class="font-weight-bold" style="font-size: 24px">Your Project</v-text>
          </v-col>
          <v-col col="6" sm="6" md="6" lg="6" style="text-align: right">
            <v-btn @click="dialog_newproject = true" class="mr-2" elevation="2" color="primary" right
              style="color: white; border-radius: 10px">
              <v-icon left> mdi-plus-circle-outline </v-icon>New Project
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="index in 1" :key="index" col="3" sm="3" md="3" lg="2">
            <template>
              <v-card to="issueList" width="280px" height="145px" outlined absolute color="primary">
                <v-card-subtitle class="mb-1" style="font-size: 18px; color: white">
                  Stock Product
                </v-card-subtitle>
              </v-card>
            </template>
          </v-col>
          <v-col v-for="index in 1" :key="index" col="3" sm="3" md="3" lg="2">
            <template>
              <v-card to="issueList" width="280px" height="145px" outlined absolute color="orange">
                <v-card-subtitle class="mb-1" style="font-size: 18px; color: white">
                  Market System
                </v-card-subtitle>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <!-- persistent คือ การที่คลิกนอก dialog แล้ว dialog จะไม่ปิด -->
        <v-dialog v-model="dialog_newproject" max-width="700px">
          <!--  -->
          <v-card>
            <v-card-title>
              <span class="text-h5">Create Project</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                
                  <!-- <v-row>  </v-row> -->
                <v-row>
                  <v-col  sm="9" md="9" style="place-self: center;">
                    <h5>Project Name</h5>
                  </v-col>
                  <v-col  sm="3" md="3" style="place-self: center;">
                    <h5>ตัวย่อ</h5>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col  sm="9" md="9">
                    <v-text-field required hide-details="auto" dense outlined></v-text-field>
                  </v-col>
                  <v-col  sm="3" md="3">
                    <v-text-field required hide-details="auto" dense outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col  sm="12" md="12" style="place-self: center;">
                    <h5>Agency</h5>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col  sm="12" md="12">
                    <v-text-field required hide-details="auto" dense outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col  sm="12" md="12" style="place-self: center;">
                    <h5>Period</h5>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" md="12">
                    <v-text-field required hide-details="auto" dense outlined></v-text-field>
                  </v-col>
                </v-row>
                
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mb-4" color="primary" style="color: white; border-radius: 10px" @click="dialog_newproject = false">
                Create Project
              </v-btn>
            </v-card-actions>
          </v-card>
          <!--  -->
        </v-dialog>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      dialog_newproject: false,
      query: "",
      user_id: "",
      user_firstname: "",
      user_lastname: "",
      user_status: "",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      await this.$axios
        .get("/users/getAll?user_id=" + this.$store.state.user_id)
        .then((res) => {
          console.log(res.data);
          this.user_id = res.data[0].user_id;
          this.user_firstname = res.data[0].user_firstname;
          this.user_lastname = res.data[0].user_lastname;
          this.user_status = res.data[0].user_status;
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

@media (max-width: 599px) {
  .mx-4 {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
