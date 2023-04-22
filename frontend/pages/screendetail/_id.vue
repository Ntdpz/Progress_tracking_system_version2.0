<template>
  <div>
    <!-- title -->
    <v-row class="mb-3">
      <b
        class="center ml-4 mr-4 mt-0 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        Screen {{ screensID.screen_name }}
      </b>
      <v-divider
        class="mt-0 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <template>
        <v-banner
          class="mt-0 ml-4"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            border-radius: 30px;
            padding: 0 0px;
          "
          outlined
          elevation="2"
        >
          <form class="center">
            <v-icon color="purple">mdi-magnify</v-icon>
            <input
              class="mr-3"
              type="text"
              v-model="query"
              placeholder="Search some screen"
            />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>
    <!-- Screen detail -->
    <v-container>
      <!-- title -->
      <v-row no-gutters>
        <v-col col="12" sm="12" md="12">
          <v-card
            class="mt-0"
            outlined
            tile
            style="box-shadow: none; border: none"
          >
            <v-card-title>
              <v-btn
                icon
                :to="`/systemdetail/${screensID.system_id}`"
                class="mr-4"
                color="primary"
                size="35px"
                left
              >
                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
              </v-btn>
              Screen {{ screensID.screen_name }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <!-- รูป กับรายลละเอียด -->
      <v-row no-gutters>
        <v-col col="6" sm="6" md="6">
          <!-- height="100%" -->
          <v-card class="ma-1 mt-0" tile height="100%">
            <div v-if="loading">
              <v-progress-circular
                class="center"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </div>
            <v-img
              v-else-if="selectedImage"
              :src="selectedImage"
              max-height="450px"
              aspect-ratio="1"
              contain
            ></v-img>
            <v-img
              v-else-if="screensID"
              :src="getImageUrl(screensID.screen_pic)"
              max-hight="450px"
              aspect-ratio="1"
              contain
            ></v-img>
          </v-card>
          <v-btn
            class=""
            elevation="2"
            color="primary"
            style="color: white; border-radius: 10px"
            @click="selectImage"
            >Change Image...</v-btn
          >
        </v-col>

        <v-col col="6" sm="6" md="6">
          <v-card outlined tile height="100%">
            <v-container fluid>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Screen ID</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Screen ID</h4>
                </v-col>

                <v-col class="col-12" sm="8" md="8">
                  <v-text-field
                    style="text-align-last: left"
                    v-model="screensID.screen_id"
                    hide-details="auto"
                    dense
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Screen Name</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Screen Name</h4>
                </v-col>
                <v-col class="col-12" sm="8" md="8">
                  <v-text-field
                    style="text-align-last: left"
                    v-model="screenname"
                    hide-details="auto"
                    dense
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Developer</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Developer</h4>
                </v-col>
                <v-col class="col-12" sm="8" md="8">
                  <v-select
                    style="text-align-last: left"
                    v-model="developer"
                    item-text="user_firstname"
                    item-value="id"
                    :items="position_Developers"
                    hide-details="auto"
                    dense
                    outlined
                    chips
                    multiple
                    :disabled="disabled"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.user_firstname }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Implementer</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Implementer</h4>
                </v-col>
                <v-col class="col-12" sm="8" md="8">
                  <v-select
                    class="select-with-margin"
                    style="text-align-last: left"
                    v-model="implementer"
                    item-text="user_firstname"
                    item-value="id"
                    :items="position_Implementers"
                    hide-details="auto"
                    dense
                    outlined
                    chips
                    multiple
                    :disabled="disabled"
                    ><template v-slot:item="{ item }">
                      {{ item.user_firstname }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Status</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Status</h4>
                </v-col>
                <v-col sm="8" md="8">
                  <template>
                    <span>
                      <v-icon :color="status === 'Complete' ? 'green' : 'red'"
                        >mdi-circle</v-icon
                      >
                      {{ screensID.screen_status }}
                    </span>
                  </template>
                </v-col>
              </v-row>
              <v-row>
                  <v-col
                    class="mb-0 pb-0 hidden-sm-and-up"
                    style="place-self: center"
                  >
                    <h4 class="">Level</h4>
                  </v-col>
                </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Level</h4>
                </v-col>
                <v-col class="" sm="8" md="8">
                  <v-select
                    style="text-align-last: left"
                    v-model="screensID.screen_level"
                    :items="selectlevel"
                    hide-details="auto"
                    dense
                    outlined
                    :disabled="disabled"
                  ></v-select>
                </v-col>
              </v-row>
              <!--  -->
              <v-row>
                  <v-col
                    class="mb-0 pb-0 hidden-sm-and-up"
                    style="place-self: center"
                  >
                    <h4 class="">Screen Type</h4>
                  </v-col>
                </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Screen Type</h4>
                </v-col>
                <v-col class="" sm="8" md="8">
                  <v-select
                    style="text-align-last: left"
                    v-model="screensID.screen_type"
                    :items="SelectScreenType"
                    hide-details="auto"
                    dense
                    outlined
                    :disabled="disabled"
                  ></v-select>
                </v-col>
              </v-row>
              <!--  -->
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Start-End</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  sm="4"
                  md="4"
                  style="place-self: center"
                >
                  <h4 class="">Start-End</h4>
                </v-col>
                <!-- ปุ่มเลือกวันที่-->
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    ref="menuDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    :disabled="disabled"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="screensID.screen_start"
                        label="Start"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="screensID.screen_start"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateStart = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateStart.save(screensID.screen_start)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    ref="menuDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    :disabled="disabled"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="screensID.screen_end"
                        label="End"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="screensID.screen_end"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateEnd = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateEnd.save(screensID.screen_end)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!--  -->
              </v-row>
              <v-row>
                <v-col
                  class="mb-0 pb-0 hidden-sm-and-up"
                  style="place-self: center"
                >
                  <h4 class="">Manday</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="hidden-xs-only"
                  cols="4"
                  style="place-self: center"
                >
                  <h4 class="">Manday</h4>
                </v-col>
                <v-col class="col-10" sm="6" md="6">
                  <!-- <h4 class="">
                    {{ screensID.screen_manday }}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Day
                  </h4> -->
                  <v-text-field v-model="screensID.screen_manday"
                                  style="text-align-last: left"
                                  hide-details="auto"
                                  type="number"
                                  dense
                                  outlined>
                  </v-text-field>      
                </v-col>
                <v-col style="place-self: center">
                          <h4 class="">Days</h4>
                </v-col>
                <!-- <v-col style="place-self: center">
                  <h4 class="">Days</h4>
                </v-col> -->
              </v-row>
              <!--  -->
              <v-row justify="space-between">
                <v-col xs="12" sm="6" md="3">
                  <v-btn
                    class="mr-0"
                    elevation="2"
                    color="error"
                    style="color: white; border-radius: 10px"
                    @click="deleteScreenAndUserScreen()"
                    :disabled="disabled"
                  >
                    Delete
                  </v-btn>
                </v-col>
                <v-col xs="12" sm="6" md="9" class="d-flex justify-end">
                  <v-btn
                    @click="dialog_canEdit = true"
                    class="mr-2"
                    elevation="2"
                    color="primary"
                    style="color: white; border-radius: 10px"
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    elevation="2"
                    color="primary"
                    style="color: white; border-radius: 10px"
                    @click="update()"
                    :disabled="disabled"
                  >
                    Update
                  </v-btn>
                </v-col>
                <!--  -->
                <v-dialog v-model="dialog_canEdit" max-width="450px">
                  <v-card>
                    <v-card-title>
                      Now, you can edit and delete screen detail
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="(dialog_canEdit = false), (disabled = false)"
                      >
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <!--  -->
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
export default {
  layout: "admin",
  data() {
    return {
      query: "",
      showIcon: true,
      screencode: "A001",
      screenname: "",
      developer: "Developer 1",
      implementer: "Implements 1",
      status: "Not Complete",
      level: 100,
      manday: 365,
      id: this.$route.params.id,
      screensID: [],
      loading: true,
      imageChange: "",
      selectedImage: null,
      today: new Date(),
      dateEnd: new Date(),
      disabled: true,
      dialog_canEdit: false,
      menuDateStart: false,
      menuDateEnd: false,
      SelectScreenType: [],
      selectlevel: [],
      userScreens: [],
      developer: [],
      implementer: [],
      data_position_Developer: [],
      data_position_Implementer: [],
      user_id: [],
      position_Implementers: [],
      position_Developers: [],
      dataDefault: [],
    };
  },
  created() {
    this.getAllDefault();
    this.getScreenID();
    this.getUser_screen();
    this.getPosition_Developer();
    this.getPosition_Implementer();
  },
  updated() {
    // this.getScreenID();
    // this.calculateManDay();
    this.user_id = this.developer.concat(this.implementer);
    console.log(this.user_id);
  },
  methods: {
    async getScreenID() {
      await this.$axios.get("/screens/getOne/" + this.id).then((data) => {
        this.screensID = data.data[0];
        this.screenname = data.data[0].screen_name;
        this.IDdelete = this.screensID.system_id;
        console.log(this.screensID);
        this.getUserSystems();
        const date = moment(
          this.screensID.screen_start,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        );
        this.screensID.screen_start = date.format("YYYY-MM-DD");
        // console.log(project.formattedDateStart);
        const dateEnd = moment(
          this.screensID.screen_end,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        );
        this.screensID.screen_end = dateEnd.format("YYYY-MM-DD");
        // console.log(project.formattedDateEnd);
        this.loading = false;
      });
    },
    async getUser_screen() {
      await this.$axios
        .get("/user_screens/getOneScreenID/" + this.id)
        .then((data) => {
          this.userScreens = data.data;
          console.log("this.userScreens");
          console.log(this.userScreens);
          // Filter users based on user_position
          this.developer = this.userScreens
            .filter((user) => user.user_position === "Developer")
            .map((user) => user.id);
          this.implementer = this.userScreens
            .filter((user) => user.user_position === "Implementer")
            .map((user) => user.id);

          console.log(this.developer);
          console.log(this.implementer);
        });
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.data_position_Developer = data.data;
          console.log(data.data);
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.data_position_Implementer = data.data;
          console.log(this.name_Implementer);
        });
    },
    async getUserSystems() {
      await this.$axios
        .get("/user_systems/getOneScreenID/" + this.screensID.system_id)
        .then((data) => {
          // this.data_position_Implementer = data.data
          //   .filter((item) => item.user_position === "Implementer")
          //   .map((user) => user.id);
          // this.data_position_Developer = data.data
          //   .filter((item) => item.user_position === "Developer")
          //   .map((user) => user.id);
          this.position_Implementers = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );

          this.user_developer = this.data_position_Developer;
          this.user_implementer = this.data_position_Implementer;
        });
    },
    // calculateManDay() {
    //   const dateStart = new Date(this.screensID.screen_start);
    //   const dateEnd = new Date(this.screensID.screen_end);
    //   const timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
    //   this.screensID.screen_manday = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert to days and round up
    //   console.log(
    //     `The difference between ${this.screensID.screen_start} and ${this.screensID.screen_end} is ${this.screensID.screen_manday} days`
    //   );
    //   return;
    // },
    resetday() {
      this.today = new Date();
      this.dateEnd = new Date();
      return;
    },
    async update() {
      // this.calculateManDay();
      await this.deleteUser_screens();
      await this.addUser_Screen();
      await this.updateScreen();
    },
    async deleteScreenAndUserScreen() {
      await this.deleteUser_screens();
      await this.deleteScreen();
    },
    async updateScreen() {
      const formData = new FormData();
      formData.append("image", this.imageChange);
      formData.append("system_id", this.screensID.system_id);
      formData.append("project_id", this.screensID.project_id);
      formData.append("screen_id", this.screensID.screen_id);
      formData.append("screen_name", this.screenname);
      formData.append("screen_developer", this.screensID.screen_developer);
      formData.append("screen_implementer", this.screensID.screen_implementer);
      formData.append("screen_status", this.screensID.screen_status);
      formData.append("screen_level", this.screensID.screen_level);
      formData.append("screen_type", this.screensID.screen_type);
      formData.append("screen_start", this.screensID.screen_start);
      formData.append("screen_end", this.screensID.screen_end);
      formData.append("screen_manday", this.screensID.screen_manday);

      await this.$axios
        .put("/screens/updateScreen/" + this.id + "/image", formData)
        .then((response) => {
          // window.location.reload();
          const promise = new Promise((resolve, reject) => {
            resolve();
          });
          promise.then(() => {
            setTimeout(() => {
              alert("update success");
              this.$router.push("/systemdetail/" + this.screensID.system_id);
            }, 2000);
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          // window.location.reload();
        });
    },
    async deleteUser_screens() {
      try {
        await this.$axios
          .delete("/user_screens/deleteScreenID/" + this.id)
          .then((res) => {
            console.log("delete success");
            alert("delete user_screen success");
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    async addUser_Screen() {
      try {
        await this.$axios
          .post("/user_screens/createUser_screen", {
            user_id: this.user_id,
            screen_id: this.$route.params.id,
            system_id: this.screensID.system_id,
            project_id: this.screensID.project_id,
          })
          .then((res) => {
            console.log("POST success for user ID: " + this.$route.params.id);
            alert("addUser_Screen Success!!");
          });
      } catch (error) {
        console.log(error);
        alert("user_screen: " + error);
      }
    },

    getImageUrl(fileName) {
      return require(`@/screenImages/${fileName}`);
    },
    selectImage() {
      // Create a file input element
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.addEventListener("change", (event) => {
        // Get the selected file เอาไว้ Post
        this.imageChange = event.target.files[0];
        // เอาไว้โชว์
        this.selectedImage = URL.createObjectURL(this.imageChange);
        console.log(this.imageChange);
      });
      input.click();
    },
    async deleteScreen() {
      await this.$axios
        .delete("/screens/delete/" + this.id)
        .then((res) => {
          alert("Delete success");
          this.$router.push("/systemdetail/" + this.screensID.system_id);
          // this.IDdelete
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    async getAllDefault() {
      await this.$axios.get("/default_settings/getAll").then((data) => {
        this.dataDefault = data.data;
        console.clear();
        console.log(this.dataDefault);
        this.dataDefault.forEach((item) => {
          if (item.level) {
            this.selectlevel.push(item.level);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-progress-circular {
  margin: 1rem;
}

.select-with-margin .v-chip {
  margin-bottom: 5px;
}
span {
  border: none;
  outline: none;
}
.no-border .v-input--is-disabled .v-text-field__slot::before {
  border: none !important;
}
</style>