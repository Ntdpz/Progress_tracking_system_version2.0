<template>
  <div class="content mx-auto">
    <!-- *Search bar -->
    <searchbar title="Home" />
    <v-divider></v-divider>
    <!-- *Profile bar -->
    <v-row class="mb-6" no-gutters justify-start>
      <v-col class="mr-10" style="flex-grow: 0 !important">
        <v-avatar class="ml-6 mt-4" style="width: 100px; height: 100px">
          <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
          <img v-if="user_pic" :src="getImageUrl(user_pic)" />
          <img v-else :src="getdefaultImageUrl(defaultImage)" />
        </v-avatar>
      </v-col>
      <v-col class="mt-4 align-self-center" style="flex-grow: 0 !important">
        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important"
          ><v-text style="font-size: 20px; color: grey">{{
            this.user_id
          }}</v-text></v-col
        >
        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important">
          <v-text style="font-size: 20px">{{
            this.user_firstname
          }}</v-text></v-col
        >
        <v-col class="pa-0 ma-0" style="width: 200px; margin: 0 !important">
          <v-icon class="mb-1" color="success" style="font-size: small"
            >mdi-circle</v-icon
          >
          <v-text style="font-size: 20px">{{ this.user_status }}</v-text></v-col
        >
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
            <v-text class="font-weight-bold" style="font-size: 24px"
              >Your Project</v-text
            >
          </v-col>
          <v-col col="6" sm="6" md="6" lg="6" style="text-align: right">
            <!-- <v-btn color="primary" @click="dialog = true">Open Dialog</v-btn>
            <dialog-create-project :dialog.sync="dialog" /> -->
            <!-- <v-btn
              @click="dialog_newproject = true"
              class="mr-2"
              elevation="2"
              color="primary"
              right
              style="color: white; border-radius: 10px"
            >
              <v-icon left> mdi-plus-circle-outline </v-icon>New Project
            </v-btn> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="index in 1" :key="index" col="3" sm="3" md="3" lg="2">
            <template>
              <v-card
                to="issueList"
                width="280px"
                height="145px"
                outlined
                absolute
                color="primary"
              >
                <v-card-subtitle
                  class="mb-1"
                  style="font-size: 18px; color: white"
                >
                  Stock Product
                </v-card-subtitle>
              </v-card>
            </template>
          </v-col>
          <v-col v-for="index in 1" :key="index" col="3" sm="3" md="3" lg="2">
            <template>
              <v-card
                to="issueList"
                width="280px"
                height="145px"
                outlined
                absolute
                color="orange"
              >
                <v-card-subtitle
                  class="mb-1"
                  style="font-size: 18px; color: white"
                >
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
              <v-col cols="12">
                <v-row>
                  <h5>Create Project</h5>
                </v-row>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="ตัวย่อ"
                      placeholder="ตัวย่อ"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      label="Project Name"
                      placeholder="Project Name"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Agency"
                      placeholder="Agency"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Period"
                      placeholder="Period"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog_newproject = false">
                <h5>Close</h5>
              </v-btn>
              <v-btn color="primary" dark @click="dialog_newproject = false">
                <h5>Create</h5>
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
import DialogCreateProject from "../components/DialogCreateProject.vue";
import Searchbar from "../components/Searchbar.vue";
export default {
  components: { Searchbar, DialogCreateProject },
  layout: "admin",
  data() {
    return {
      dialog: false,
      dialog_newproject: false,
      query: "",
      user_id: "",
      user_firstname: "",
      user_lastname: "",
      user_status: "",
      user_pic: null,
      defaultImage: "Avatar.jpg",
    };
  },
  created() {
    this.getUser();
  },
  mounted() {
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
          this.user_pic = res.data[0].user_pic;
        });
    },
    getImageUrl(fileName) {
      return require(`@/uploads/${fileName}`);
    },
    getdefaultImageUrl(fileName) {
      return require(`@/defaultimage/${fileName}`);
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
