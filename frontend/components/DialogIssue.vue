<template>
  <v-layout row justify-center>
    <v-form ref="form">
      <v-dialog v-model="dialog" persistent max-width="750">
        <v-card>
          <v-card-title class="pt-3 mb-2" style="background-color: #883cfe">
            <h5 style="color: white">
              สร้างปัญหาใหม่ | {{ projectName }}&nbsp;{{ systemName }}
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="เลขที่ปัญหา"
                    placeholder="เลขที่ปัญหา"
                    disabled
                    outlined
                    dense
                    v-model="form.issue_id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    label="ชื่อปัญหา"
                    placeholder="ชื่อปัญหา"
                    outlined
                    dense
                    :rules="rules"
                    @change="getScreenDefault()"
                    v-model="form.issue_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="type_select"
                    label="PNI/PNC/New Req"
                    dense
                    outlined
                    :rules="rules"
                    v-model="form.issue_type"
                    @change="selectedType()"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="8">
                  <v-select
                    @mousemove="getScreenDefault()"
                    @change="getUserSystems(selectedScreen.id)"
                    :items="screen_selectDefault"
                    label="เลขที่หน้าจอ : ชื่อหน้าจอ"
                    dense
                    outlined
                    v-model="selectedScreen"
                    item-text="screen_name"
                    item-value="screen_name"
                    return-object="false"
                    :rules="rules"
                  >
                    <template #selection="{ item }">
                      {{ item.screen_id }}: {{ item.screen_name }}
                    </template>
                    <template v-slot:item="{ item }">
                      {{ item.screen_id }} : {{ item.screen_name }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ผู้แจ้งปัญหา"
                    placeholder="ผู้แจ้งปัญหา"
                    outlined
                    dense
                    v-model="form.issue_informer"
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="priotity_select"
                    label="ความสำคัญของปัญหา"
                    dense
                    outlined
                    prepend-icon="mdi-flag-outline"
                    v-model="form.issue_priority"
                    :rules="rules"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="issue_status_default"
                    label="สถานะ"
                    placeholder="สถานะ"
                    dense
                    outlined
                    disabled
                    v-model="form.issue_status"
                    :rules="rules"
                  ></v-select>
                </v-col>
                <!-- date start -->
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    ref="menuDateStart"
                    v-model="menuStart"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    disabled
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateStart"
                        label="วันที่สร้าง"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="pt-0"
                        disabled
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStart" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuStart = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateStart.save(dateStart)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <!-- date end -->
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formattedDateEnd"
                        label="วันกำหนดส่ง"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        class="pt-0"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                      :min="dateToday"
                      @change="formattedDate()"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                  <p
                    v-show="selectedScreen == null"
                    style="color: red"
                    class="ma-0"
                  >
                    โปรดเลือกหน้าจอก่อน
                  </p>
                  <v-select
                    :items="position_Developers"
                    label="ผู้พัฒนา"
                    dense
                    outlined
                    item-text="user_firstname"
                    v-model="form.issue_assign"
                    return-object="false"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                  <p
                    v-show="selectedScreen == null"
                    style="color: red"
                    class="ma-0"
                  >
                    โปรดเลือกหน้าจอก่อน
                  </p>
                  <v-select
                    :items="position_Implementer"
                    label="ผู้ตรวจสอบ"
                    dense
                    outlined
                    item-text="user_firstname"
                    v-model="form.issue_qc"
                    return-object="false"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4" v-show="PNC">
                  <v-text-field
                    label="เลขที่เอกสาร"
                    placeholder="เลขที่เอกสาร"
                    outlined
                    dense
                    v-model="form.issue_doc_id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8" v-show="PNC">
                  <v-text-field
                    label="ชื่อลูกค้า"
                    placeholder="ชื่อลูกค้า"
                    outlined
                    dense
                    v-model="form.issue_customer"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="Newreq">
                  <v-container fluid class="ma-0 pa-0">
                    <!-- <p>Type Issue {{ selected }}</p> -->
                    <p>ประเทภของปัญหา</p>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="UI"
                            value="UI"
                          ></v-checkbox>
                        </v-row>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="Business"
                            value="Business"
                          ></v-checkbox>
                        </v-row>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="Data"
                            value="Data"
                          ></v-checkbox
                        ></v-row>
                      </v-col>
                      <v-col>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="Servies"
                            value="Servies"
                          ></v-checkbox>
                        </v-row>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="Report"
                            value="Report"
                          ></v-checkbox>
                        </v-row>
                        <v-row>
                          <v-checkbox
                            v-model="form.issue_type_sa"
                            label="Training"
                            value="Training"
                          ></v-checkbox>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="Newreq">
                  <p>คำอธิบายถึง SA</p>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="คำอธิบายถึง SA"
                    v-model="form.issue_des_sa"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="mt-0">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="คำอธิบายปัญหา"
                    v-model="form.issue_des"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="form.issue_filename"
                    ref="fileInput"
                    @change="uploadFile()"
                    label="อัปโหลดไฟล์"
                    outlined
                    dense
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.native="close"> <h4>ปิด</h4> </v-btn>
            <v-btn color="primary" dark @click="saveIssue()">
              <h4>สร้างปัญหาใหม่</h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  props: {
    projectName: String,
    systemName: String,
    projectId: String,
    projectids: String,
    systemId: String,
    systemids: String,
    userFirstname: String,
    userLastname: String,
    userId: String,
    mode: String,
    runningNumber: String,
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      dateToday: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      PNC: false,
      Newreq: false,
      priotity_select: [],
      type_select: [],
      screen_select: [],
      selected: ["UI"],
      default: [],
      screen_selectDefault: [],
      selectedScreen: null,
      form: {
        screen_id: "",
        system_id: "",
        project_id: "",
        issue_name: "",
        issue_id: this.runningNumber,
        issue_type: "",
        issue_informer: this.userFirstname,
        issue_priority: "",
        issue_end: "",
        issue_assign: "",
        issue_qc: "",
        issue_des: "",
        issue_des_sa: "",
        issue_type_sa: "",
        issue_doc_id: "",
        issue_customer: "",
        issue_filename: "",
        issue_des_dev: "",
        issue_des_implementer: "",
        issue_start: "",
        issue_expected: "",
        issue_status: "รอแก้ไข",
        issue_accepting: "",
        issue_manday: "",
        issue_complete: "",
      },
      dataDefault: [],
      manday: null,
      position_Developers: [],
      position_Implementer: [],
      issue_status_default: [],
      rules: [(value) => !!value || "Required."],
      formattedDateEnd: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
    };
  },
  created() {
    this.dateStart = moment().add(543, "years").format("DD-MM-YYYY");
    this.formattedDateEnd = moment().add(543, "years").format("DD-MM-YYYY");
  },
  async mounted() {
    await this.getDefault();
  },
  methods: {
    formattedDate() {
      const formattedDateTwo = moment(this.date)
        .add(543, "years")
        .format("DD-MM-YYYY");
      this.formattedDateEnd = formattedDateTwo;
    },
    selectedType() {
      if (this.form.issue_type == "PNC") {
        this.PNC = true;
        this.Newreq = false;
      } else if (this.form.issue_type == "PNI") {
        this.PNC = false;
        this.Newreq = false;
      } else if (this.form.issue_type == "New Req") {
        this.Newreq = true;
        this.PNC = false;
      } else {
        this.PNC = false;
        this.Newreq = false;
      }
    },
    uploadFile() {
      let formData = new FormData();
      if (this.form.issue_filename) {
        formData.append("file", this.form.issue_filename);
      } else {
        console.log("No file");
      }
    },
    resetForm() {
      this.projectName = "";
      this.systemName = "";
      this.projectId = "";
      this.systemId = "";
      this.userFirstname = "";
      this.userLastname = "";
      this.userId = "";
      this.mode = "";
      this.runningNumber = "";
      this.form.screen_id = "";
      this.form.system_id = "";
      this.form.project_id = "";
      this.form.issue_name = "";
      this.form.issue_type = "";
      this.form.issue_priority = "";
      this.form.issue_end = "";
      this.form.issue_assign = "";
      this.form.issue_qc = "";
      this.form.issue_des = "";
      this.form.issue_des_sa = "";
      this.form.issue_type_sa = "";
      this.form.issue_doc_id = "";
      this.form.issue_customer = "";
      this.form.issue_filename = "";
      this.form.issue_des_dev = "";
      this.form.issue_des_implementer = "";
      this.form.issue_start = "";
      this.form.issue_expected = "";
      this.form.issue_status = "รอแก้ไข";
      this.form.issue_accepting = "";
      this.form.issue_manday = "";
      this.form.issue_complete = "";
      this.selectedScreen = null;
    },
    async close() {
      this.$refs.form.resetValidation();
      this.$emit("button-clicked");
      await this.resetForm();
      this.$emit("update:dialog", false);
    },
    async getUserSystems(selectedScreenID) {
      await this.$axios
        .get("/user_screens/getOneScreenID/" + selectedScreenID)
        .then((data) => {
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );
          this.position_Implementer = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
        });
    },
    async saveIssue() {
      await this.$refs.form.validate();
      if (
        this.mode == "create" &&
        this.form.issue_name !== "" &&
        this.form.issue_type !== "" &&
        this.form.issue_priority !== ""
      ) {
        this.form.issue_end = this.date;
        const selectedScreenId = this.selectedScreen
          ? this.selectedScreen.id
          : null;

        const data = {
          screen_id: selectedScreenId,
          system_id: this.systemId,
          project_id: this.projectId,
          user_assign_id: this.form.issue_assign.id,
          user_qc_id: this.form.issue_qc.id,
          issue_name: this.form.issue_name,
          issue_id: this.form.issue_id,
          issue_type: this.form.issue_type,
          issue_informer: this.form.issue_informer,
          issue_priority: this.form.issue_priority,
          issue_end: this.form.issue_end,
          issue_assign: this.form.issue_assign.user_firstname,
          issue_qc: this.form.issue_qc.user_firstname,
          issue_des: this.form.issue_des,
          issue_des_sa: this.form.issue_des_sa,
          issue_type_sa: this.form.issue_type_sa,
          issue_doc_id: this.form.issue_doc_id,
          issue_customer: this.form.issue_customer,
          issue_filename: this.form.issue_filename,
          issue_des_dev: this.form.issue_des_dev,
          issue_des_implementer: this.form.issue_des_implementer,
          issue_start: null,
          issue_expected: null,
          issue_status: "รอแก้ไข",
          issue_accepting: null,
          issue_manday: null,
          issue_complete: null,
          issue_status_developer: "รอแก้ไข",
          issue_status_implement: null,
          issue_round: 0,
        };
        try {
          await this.$axios.post("/issues/createIssue", data);
          this.close();
          const promise = new Promise((resolve, reject) => {
            resolve();
            this.form.screen_id = "";
            this.form.system_id = "";
            this.form.project_id = "";
            this.form.issue_name = "";
            this.form.issue_id = "";
            this.form.issue_type = "";
            this.form.issue_informer = "";
            this.form.issue_priority = "";
            this.form.issue_end = "";
            this.form.issue_assign = "";
            this.form.issue_qc = "";
            this.form.issue_des = "";
            this.selectedScreen = null;
            this.form.issue_des_sa = "";
            this.form.issue_type_sa = "";
            this.form.issue_doc_id = "";
            this.form.issue_customer = "";
            this.form.issue_filename = "";
            this.form.issue_des_dev = "";
            this.form.issue_des_implementer = "";
            this.form.issue_start = "";
            this.form.issue_expected = "";
            this.form.issue_status = "รอแก้ไข";
            this.form.issue_accepting = "";
            this.form.issue_manday = "";
            this.form.issue_complete = "";
          });
          promise.then(() => {
            setTimeout(() => {
              alert("success");
            }, 2000);
          });
        } catch (error) {
          console.error(error);
          alert("Error submitting form");
        }
      }
    },
    async getDefault() {
      try {
        const res = await this.$axios.get("/default_settings/getAll");
        this.default = res.data;
        this.default.forEach((item) => {
          if (item.issue_type) {
            this.type_select.push(item.issue_type);
          }
          if (item.issue_priority) {
            this.priotity_select.push(item.issue_priority);
          }
          if (item.issue_status) {
            this.issue_status_default.push(item.issue_status);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getScreenDefault() {
      try {
        await this.$axios
          .get(
            "/screens/getAll?project_id=" +
              this.projectId +
              "&&system_id=" +
              this.systemId
          )
          .then((data) => {
            this.screen_selectDefault = data.data;
          });
      } catch (error) {
        console.error(error);
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