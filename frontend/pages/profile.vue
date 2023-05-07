<template>
  <div class="mx-auto">
    <v-row class="mb-6" no-gutters>
      <v-col class="col-12" col="12" xs="12" sm="12" md="3">
        <!-- เอาเส้นออกใส่ border: none; -->
        <v-card
          class="pa-2 mx-auto"
          tile
          outlined
          style="
            border: none;
            height: 200px;
            display: flex;
            justify-content: center;
          "
        >
          <div>
            <v-avatar class="mt-6 mx-auto" style="width: 150px; height: 150px">
              <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
              <img v-if="avatar != null" :src="avatar" />
              <img v-else-if="user_pic" :src="getImageUrl(user_pic)" />
              <img v-else :src="getdefaultImageUrl(defaultImage)" />
            </v-avatar>
            <v-btn
              color="white"
              icon
              style="
                background-color: #883cfe;
                float: right;
                margin-left: -42px;
                margin-top: 131px;
                position: absolute;
              "
            >
              <v-icon @click="$refs.fileInput.click()">mdi-pencil</v-icon>
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                @change="uploadFile"
              />
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col col="12" xs="12" sm="12" md="9">
        <!-- เอาเส้นออกใส่ border: none; -->
        <v-card class="pa-2" tile outlined style="border: none; height: 600px">
          <div class="mt-6 ml-2">
            <!-- form -->

            <v-row
              class="mr-2"
              style="margin-bottom: -2%; font-weight: bold; color: black"
            >
              <v-col class="hidden-xs-only" cols="2" xs="2" sm="2" md="2">
                คำนำหน้าชื่อ
              </v-col>
              <v-col class="hidden-xs-only" cols="5" xs="5" sm="5" md="5">
                ชื่อจริง
              </v-col>
              <v-col
                class="hidden-xs-only"
                cols="5"
                xs="5"
                sm="5"
                md="5"
                style="margin-right: -1%; padding-right: 0%"
              >
                นามสกุล
              </v-col>
            </v-row>

            <v-row
              class="mr-2"
              style="margin-bottom: -4%; font-weight: bold; color: black"
            >
              <!-- <v-col class="" cols="2" sm="2" style="margin-right:-1%; padding-right:0%;">
                                        <v-select class="" v-model="name" :items="items" label="Mr/Miss" solo></v-select>
                                    </v-col> -->
              <v-col
                class=""
                cols="2"
                sm="2"
                style="margin-right: -1%; padding-right: 0%"
              >
                <v-select
                  v-model="name"
                  :items="dataDefault_nametitle"
                  label="Mr/Miss"
                  solo
                  item-text="text"
                  item-value="value"
                >
                  <template #item="{ item, on }">
                    <v-list-item :value="item.value" v-on="on">
                      <v-list-item-content>
                        <v-list-item-title class="my-bold-item">{{
                          item
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
              <v-col class="" cols="5" sm="5">
                <v-text-field
                  v-model="firstname"
                  label="First Name"
                  solo
                ></v-text-field>
              </v-col>
              <v-col class="" cols="5" sm="5">
                <v-text-field
                  v-model="user_lastname"
                  label="Last Name"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -2%; font-weight: bold; color: black"
            >
              <v-col class="hidden-xs-only" cols="4" sm="4">
                รหัสพนักงาน
              </v-col>
              <v-col class="hidden-xs-only" cols="4" sm="4"> ตำแหน่ง </v-col>
              <v-col class="hidden-xs-only" cols="4" sm="4"> แผนก </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -4%; font-weight: bold; color: black"
            >
              <v-col cols="4" sm="4">
                <v-text-field
                  v-model="user_id"
                  label="Code"
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="4">
                <v-text-field
                  v-model="user_position"
                  label="Position"
                  solo
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4" sm="4">
                <v-text-field
                  v-model="user_department"
                  label="Department"
                  solo
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -2%; font-weight: bold; color: black"
            >
              <v-col class="hidden-xs-only" cols="12" sm="12"> อีเมลล์ </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -4%; font-weight: bold; color: black"
            >
              <v-col class="" cols="12" sm="12">
                <v-text-field
                  v-model="user_email"
                  label="E-mail"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -2%; font-weight: bold; color: black"
            >
              <v-col class="hidden-xs-only" cols="12" sm="12"> รหัสผ่าน </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -4%; font-weight: bold; color: black"
            >
              <v-col cols="12" sm="12">
                <v-text-field
                  :append-icon="show3 ? 'mdi-pencil' : 'mdi-pencil'"
                  :type="show3 ? 'Password' : 'Password'"
                  @click:append="show3 = !show3"
                  v-model="user_password"
                  label="Password"
                  solo
                  readonly
                ></v-text-field>
                <!-- Icon -->
              </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -2%; font-weight: bold; color: black"
            >
              <v-col class="hidden-xs-only" cols="6" sm="6"> สถานะ </v-col>
              <v-col class="hidden-xs-only" cols="6" sm="6"> บทบาท </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0"
              style="margin-bottom: -4%; font-weight: bold; color: black"
            >
              <v-col class="" cols="6" sm="6">
                <v-text-field
                  v-model="user_status"
                  label="Status"
                  solo
                  readonly
                >
                  <template v-slot:prepend-inner>
                    <v-icon v-if="online === true" color="green"
                      >mdi-circle</v-icon
                    >
                    <v-icon v-else color="red">mdi-circle</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col class="" cols="6" sm="6">
                <v-text-field
                  v-model="user_role"
                  label="Role"
                  solo
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              class="mr-2 mt-0 mt-lg-6"
              style="justify-content: right; font-weight: bold; color: black"
            >
              <v-btn
                class="mr-2"
                elevation="2"
                color="primary"
                @click="updateUser()"
                style="color: white; border-radius: 10px"
                >อัปเดต
              </v-btn>
            </v-row>
            <!--  -->
          </div>
          <!-- dialog password persistent -->
          <v-dialog v-model="show3" max-width="500px" persistent>
            <v-card width="100%" height="100%">
              <v-card-title>
                <span class="text-h5" style="font-weight: bold; color: black"
                  >เปลี่ยนรหัสผ่าน</span
                >
              </v-card-title>
              <v-container>
                <v-col
                  class="mr-2 mt-0 hidden-xs-only"
                  cols="12"
                  sm="12"
                  style="margin-bottom: -2%; font-weight: bold; font-size: 16px"
                >
                  รหัสผ่านปัจจุบัน
                </v-col>
                <v-col class="mt-0 mb-0 pb-0" cols="12">
                  <v-text-field
                    v-model="o_password"
                    solo
                    label="รหัสผ่านปัจจุบัน"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="mr-2 mt-0 pt-0 hidden-xs-only"
                  cols="12"
                  sm="12"
                  style="margin-bottom: -2%; font-weight: bold"
                >
                  รหัสผ่านใหม่
                </v-col>
                <v-col class="mt-0 mb-0 pb-0" cols="12">
                  <v-text-field
                    v-model="n_password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    solo
                    label="รหัสผ่านใหม่"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="mr-2 mt-0 pt-0 hidden-xs-only"
                  cols="12"
                  sm="12"
                  style="margin-bottom: -2%; font-weight: bold"
                >
                  ยืนยันรหัสผ่านใหม่
                </v-col>
                <v-col class="mt-0 mb-0 pb-0" cols="12">
                  <v-text-field
                    v-model="cf_password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    solo
                    label="ยืนยันรหัสผ่านใหม่"
                  ></v-text-field>
                </v-col>
                <!--  -->
                <v-row
                  class="mr-2 mt-0 mb-4 pt-0"
                  style="
                    justify-content: right;
                    font-weight: bold;
                    color: black;
                  "
                >
                  <v-btn
                    class="mr-2"
                    elevation="2"
                    color="error"
                    @click="(show3 = false), clearChangePassword()"
                    style="color: white; border-radius: 10px"
                    >ยกเลิก
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    elevation="2"
                    color="primary"
                    @click="checkPassword()"
                    style="color: white; border-radius: 10px"
                    >ยืนยัน
                  </v-btn>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      o_password: "",
      n_password: "",
      cf_password: "",
      id: "",
      user_id: "",
      user_firstname: "",
      user_lastname: "",
      user_status: "",
      user_role: "",
      user_position: "",
      user_password: "",
      user_email: "",
      user_department: "",
      online: "true",
      name: "",
      firstname: "",
      online: true,
      user_pic: null,
      imageUpload: null,
      avatar: null,
      dataDefault: [],
      dataDefault_role_user: [],
      dataDefault_nametitle: [],
      dataDefault_position: [],
      dataDefault_department: [],
      dataDefault_status_user: [],
      dataDefault_issue_type: [],
      dataDefault_issue_priotity: [],
    };
  },
  mounted() {
    this.titleName();
  },
  created() {
    this.getUser();
    this.getAllDefault();
  },
  computed: {
    userId() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("userId");
      }
      return null; // or some default value if localStorage is not available
    },
  },
  methods: {
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
        this.id = res.data[0].id;
        this.user_id = res.data[0].user_id;
        this.user_firstname = res.data[0].user_firstname;
        this.user_lastname = res.data[0].user_lastname;
        this.user_status = res.data[0].user_status;
        this.user_role = res.data[0].user_role;
        this.user_position = res.data[0].user_position;
        this.user_password = res.data[0].user_password;
        this.user_email = res.data[0].user_email;
        this.user_department = res.data[0].user_department;
        this.user_pic = res.data[0].user_pic;
        this.titleName();
      });
    },
    titleName() {
      const regex = /^(Mr\.|Miss\.|นาย|นาง|นางสาว)\s+(.*)$/; // Regular expression to match title and name
      const matches = this.user_firstname.match(regex);
      if (matches) {
        this.name = matches[1];
        this.firstname = matches[2].trim();
      }
    },
    clearChangePassword() {
      this.o_password = "";
      this.n_password = "";
      this.cf_password = "";
    },
    getImageUrl(fileName) {
      return require(`@/static/uploads/${fileName}`);
    },
    getdefaultImageUrl(fileName) {
      return require(`@/static/defaultimage/${fileName}`);
    },
    uploadFile() {
      const input = this.$refs.fileInput;
      this.imageUpload = input.files[0];
      try {
        // editedItem.photo
        this.avatar = URL.createObjectURL(this.imageUpload);
        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error);
        // this.avatar = null;
      }
    },

    checkPassword() {
      // Check old password
      if (
        this.o_password != "" ||
        this.n_password != "" ||
        this.cf_password != ""
      ) {
        if (this.o_password == this.user_password) {
          if (this.n_password == this.cf_password) {
            this.user_password = this.cf_password;
            alert("Change password successfully!");
            this.clearChangePassword();
            this.show3 = false;
          } else {
            alert("New Password and confirm password are not the same");
          }
        } else {
          alert("Old password is wrong");
        }
      } else {
        alert("Password must not be null.");
      }
    },

    async updateUser() {
      try {
        if (this.userId != undefined) {
          const formData = new FormData();
          formData.append("image", this.imageUpload);
          formData.append("user_firstname", this.name + " " + this.firstname);
          formData.append("user_lastname", this.user_lastname);
          formData.append("user_id", this.user_id);
          formData.append("user_position", this.user_position);
          formData.append("user_department", this.user_department);
          formData.append("user_email", this.user_email);
          formData.append("user_password", this.user_password);
          formData.append("user_status", this.user_status);
          formData.append("user_role", this.user_role);

          await this.$axios
            .put("/users/updateUsers/" + this.id + "/image", formData)
            .then((response) => {
              // console.log(response);
              alert("Update success");
              // ดัก error รูปภาพโหลดไม่ทัน
              const promise = new Promise((resolve, reject) => {
                this.getUser();
                resolve();
              });
              promise.then(() => {
                setTimeout(() => {
                  this.$router.push({ name: "index" });
                }, 2000);
              });
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            });
        } else {
          alert("Update failure: this.userId = undefined");
        }
      } catch (error) {
        alert(error);
      }
    },
    getdefaultImageUrl(fileName) {
      return require(`@/static/defaultimage/${fileName}`);
    },
    async getAllDefault() {
      await this.$axios.get("/default_settings/getAll").then((data) => {
        this.dataDefault = data.data;
        // console.clear();
        this.dataDefault.forEach((item) => {
          if (item.role_user) {
            this.dataDefault_role_user.push(item.role_user);
          }
          if (item.nametitle) {
            this.dataDefault_nametitle.push(item.nametitle);
          }
          if (item.position) {
            this.dataDefault_position.push(item.position);
          }
          if (item.department) {
            this.dataDefault_department.push(item.department);
          }
          if (item.status_user) {
            this.dataDefault_status_user.push(item.status_user);
          }
          if (item.issue_type) {
            this.dataDefault_issue_type.push(item.issue_type);
          }
          if (item.issue_priotity) {
            this.dataDefault_issue_priotity.push(item.issue_priotity);
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

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-bold-item {
  font-weight: bold;
}
</style>
