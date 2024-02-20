<template>
  <div class="body">
    <!-- <searchbar title="จัดการโครงการ" /> -->
    <v-row class="mb-3">
      <v-text-title
        class="center ml-4 mr-4 mt-3 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        Manage Project
      </v-text-title>
      <v-divider
        class="mt-3 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <v-card class="card ml-5 mt-2" style="height: 40px; border-radius: 60px">
        <v-card-text class="pa-0">
          <v-text-field
            v-if="userrole === 'Admin' || userposition === 'Implementer'"
            v-model="searchKeyword"
            prepend-inner-icon="mdi-magnify"
            rounded
            color="primary"
            placeholder="search"
          ></v-text-field>
          <v-text-field
            v-else-if="userrole !== 'Admin' && userposition !== 'Implementer'"
            v-model="searchKeywordDev"
            prepend-inner-icon="mdi-magnify"
            rounded
            color="primary"
            placeholder="search"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-row>

    <v-divider></v-divider>
    <v-row class="mt-4 ml-1 mb-2" no-gutters>
      <v-col cols="3">
        <h4>Project</h4>
        <p style="color: #b6b5b5; font-size: 16px" class="">
          {{ this.projectList.length }} Project
        </p>
      </v-col>

      <!-- <v-col cols="2">
        <h4>รหัสโครงการ</h4>
      </v-col>
      <v-col cols="2">
        <h4 style="margin-left: -7%">เริ่มโครงการ</h4>
      </v-col>
      <v-col cols="2">
        <h4 style="margin-left: -16%">จบโครงการ</h4>
      </v-col>
      <v-col cols="3">
        <h4 style="margin-left: -16%">หน่วยงาน</h4>
      </v-col> -->
      <!-- <v-col cols="1"></v-col> -->
      <!-- <v-col cols="1"></v-col> -->
    </v-row>

    <v-btn
      v-if="userposition != 'Developer' || userrole == 'Admin'"
      class="new-btn ma-2 text-left"
      color="primary"
      dark
      block
      large
      @click="openDialog('create')"
    >
      <span
        class="mdi mdi-plus-circle-outline"
        style="font-size: 25px; color: white"
      ></span>
      <h4 style="color: white">&nbsp;&nbsp; Create Project</h4>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
      <v-card>
        <v-card-title class="pt-3" style="background-color: #5c3efe">
          <h5 style="color: white">
            {{ mode === "create" ? "สร้างโครงการใหม่" : "แก้ไขโครงการ" }}
          </h5>
        </v-card-title>
        <v-form ref="form" @submit.prevent="saveProject">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    label="ชื่อโครงการ"
                    placeholder="ชื่อโครงการ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_name"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0 pt-0" cols="12">
                  <v-text-field
                    label="ตัวย่อ"
                    placeholder="ตัวย่อ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_shortname"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0 pt-0" cols="12">
                  <v-text-field
                    label="รหัสโครงการ"
                    placeholder="รหัสโครงการ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0 pt-0">
                  <v-text-field
                    label="หน่วยงาน"
                    placeholder="หน่วยงาน"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_agency"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                  <v-menu
                    ref="menuDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateS"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateStart = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateStart.save(dateStart)"
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                  <v-menu
                    ref="menuDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateE"
                        label="วันจบโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateEnd"
                      no-title
                      scrollable
                      :min="dateStart"
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateEnd = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateEnd.save(dateEnd)"
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                  <v-menu
                    ref="menuDateStartEdit"
                    v-model="menuDateStartEdit"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateStartEdit"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.formattedDateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuDateStartEdit = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateStartEdit.save(
                            editedItem.formattedDateStart
                          )
                        "
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                  <v-menu
                    ref="menuDateEndEdit"
                    v-model="menuDateEndEdit"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateEndEdit"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.formattedDateEnd"
                      :min="editedItem.formattedDateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuDateEndEdit = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateEndEdit.save(
                            editedItem.formattedDateEnd
                          )
                        "
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="error"
              dark
              @click="DeleteAllProject(), clearCreateProject()"
              v-show="mode == 'edit'"
            >
              <h4>ลบโครงการ</h4>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="clearCreateProject">
              <h4>ปิด</h4>
            </v-btn>
            <v-btn color="primary" dark type="submit">
              <h4>{{ mode === "create" ? "สร้างโครงการ" : "อัปเดต" }}</h4>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <br />

    <!-- Admin -->
    <div v-if="userrole === 'Admin' || userposition === 'Implementer'">
      <v-row class="project-row" align="stretch" justify="start">
        <v-col
          cols="6"
          sm="6"
          md="6"
          lg="6"
          v-for="(project, index) in filteredProjects"
          :key="index"
        >
          <!-- Card content -->
          <v-card class="project-card" style="width: 800px; height: 250px">
            <v-card-title style="background-color: #735bff">
              <h3 class="white--text">{{ project.project_name }}</h3>
              <p class="mt-1 white--text" style="font-size: 15px">
                <span style="margin-left: 20px"></span>
                {{ getSystemCount(project) }} System
              </p>
            </v-card-title>
            <!-- Card details -->
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="3">
                  <strong>Project ID:</strong><br />{{ project.project_id }}
                </v-col>
                <v-col cols="2">
                  <strong>Date Start:</strong><br />{{ project.showdatestart }}
                </v-col>
                <v-col cols="2">
                  <strong>Date End:</strong><br />{{ project.showdateend }}
                </v-col>
                <v-col cols="2">
                  <strong>Agency:</strong><br />{{ project.project_agency }}
                </v-col>
                <v-col cols="1" class="text-right">
                  <v-btn
                    color="primary"
                    icon
                    @click="openDialog('edit', projectList[index])"
                  >
                    <v-icon class="pa-0" size="25" color="black"
                      >mdi mdi-square-edit-outline</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <!-- Table -->
         <!-- <v-card-text>
          <v-data-table
            :headers="headers"
            :items="project.systems"
            sort-by="calories"
            class="v-data-table elevation-1 mb-2 mt-5"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ item.system_nameTH }}</td>
                <td>{{ item.system_id }}</td>
                <td>{{ item.system_shortname }}</td>
                <td>
                  <v-btn color="primary" style="color: white; border-radius: 20px" small :to="`/systemdetail/${item.id}`">
                    จัดการ
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>  -->
            <!-- Button to view system details -->
            <v-card-actions>
          <v-btn
            color="primary"
            @click="$router.push(`/systemdetail/${project.systems[0].id}`)"
          >
            View System Detail
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Develop -->
    <div v-else-if="userrole !== 'Admin' && userposition !== 'Implementer'">
      <v-row class="project-row" align="stretch" justify="start">
        <v-col
          cols="6"
          sm="6"
          md="6"
          lg="6"
          v-for="(project, index) in filteredProjects"
          :key="index"
        >
          <!-- Card content -->
          <v-card class="project-card" style="width: 800px; height: 250px">
            <v-card-title style="background-color: #735bff">
              <h3 class="white--text">{{ project.project_name }}</h3>
              <p class="mt-1 white--text" style="font-size: 15px">
                <span style="margin-left: 20px"></span>
                {{ getSystemCount(project) }} System
              </p>
            </v-card-title>
            <!-- Card details -->
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="3">
                  <strong>Project ID:</strong><br />{{ project.project_id }}
                </v-col>
                <v-col cols="2">
                  <strong>Date Start:</strong><br />{{ project.showdatestart }}
                </v-col>
                <v-col cols="2">
                  <strong>Date End:</strong><br />{{ project.showdateend }}
                </v-col>
                <v-col cols="2">
                  <strong>Agency:</strong><br />{{ project.project_agency }}
                </v-col>
                <!-- <v-col cols="1" class="text-right">
              <v-btn color="primary" icon @click="openDialog('edit', projectList[index])">
                <v-icon class="pa-0" size="25" color="black">mdi mdi-square-edit-outline</v-icon>
              </v-btn>
            </v-col> -->
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <!-- developer -->
            <!-- <v-data-table
              :headers="headers"
              :items="project.systems"
              sort-by="calories"
              class="v-data-table elevation-1 mb-2 mt-5"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>
                    {{ item.system_nameTH }}
                  </td>
                  <td>
                    {{ item.system_id }}
                  </td>
                  <td>
                    {{ item.system_shortname }}
                  </td>
                  <td>
                    <v-btn
                      color="primary"
                      icon
                      :to="`/systemdetail/${item.id}`"
                    >
                      <v-icon class="mr-2 ml-2" size="20" color="primary">
                        mdi mdi-chevron-right-circle-outline
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table> -->
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else-if="loading === true" style="text-align: center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <dialog-success
      :dialog.sync="dialogSuccess"
      title="บันทึกข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-success
      :dialog.sync="dialogDeleteSuccess"
      title="ลบข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-fail
      :dialog.sync="dialogValidate"
      title="กรุณาใส่ข้อมูลให้ครบถ้วน"
    />
  </div>
</template>

<script>
import { create } from "domain";
import moment from "moment";
import Vue from "vue";
import DialogSuccess from "../components/DialogSuccess.vue";
import Searchbar from "../components/Searchbar.vue";
export default {
  components: { DialogSuccess, Searchbar },
  layout: "admin",
  data() {
    return {
      //auth
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      // new Date().toISOString().substr(0, 10)
      dateStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateEnd: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateS: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateE: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menuDateStart: false,
      menuDateEnd: false,
      menuDateStartEdit: false,
      dateStartEdit: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menuDateEndEdit: false,
      dateEndEdit: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateStartShow: null,
      dateEndShow: null,
      dateStartDataShow: [],
      dateEndDataShow: [],
      dialog: false,
      mode: "create",
      dialogSubsystem: false,
      dialogSuccess: false,
      dialogDeleteSuccess: false,
      dialogValidate: false,
      headers: [
        {
          text: "ชื่อระบบ",
          align: "start",
          sortable: false,
          value: "name",
          style: "color: white;",
        },
        { text: "รหัสของระบบ", value: "id_system", sortable: false },
        { text: "ชื่อย่อระบบ", value: "short_name", sortable: false },
        // { text: "สมาชิก", value: "member" },
        { text: "จัดการ", value: "actions", sortable: false },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      system: {
        project_id: "",
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
        system_analyst: "",
        system_member: "",
      },
      projectList: [],
      member_select: ["Dev1"],
      member: "",
      editedIndex: -1,
      editedItem: {
        project_shortname: "",
        project_name: "",
        project_id: "",
        project_agency: "",
        project_start: "",
        project_end: "",
      },
      data_position_Developer: [],
      data_position_Implementer: [],
      data_position_Sa: [],
      choose_user_id: [],
      systemId: null,
      projectIds: null,
      //
      userid: "",
      userfirstname: "",
      userlastname: "",
      userposition: "",
      userrole: "",
      systemOwner: [],
      projectOwner: [],
      projectListAdmin: [],
      loading: false,
      rules: [(value) => !!value || "*กรุณาใส่ข้อมูลให้ถูกต้อง*"],
      searchKeyword: "",
      searchKeywordDev: "",
    };
  },
  computed: {
    filteredProjects() {
      // กรองข้อมูลโปรเจคที่ตรงกับคำค้นหา
      return this.projectListAdmin.filter((project) => {
        return project.project_name
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });
    },
    filteredProjectsDev() {
      // กรองข้อมูลโปรเจคที่ตรงกับคำค้นหา
      return this.projectList.filter((project) => {
        return project.project_name
          .toLowerCase()
          .includes(this.searchKeywordDev.toLowerCase());
      });
    },
  },
  async created() {
    await this.getUser();
    await this.initialize();
    await this.getProject();
    await this.getProject2();
    await this.getSystems();
    await this.getPosition_Developer();
    await this.getPosition_Implementer();
    await this.getPosition_Sa();
    await this.getSystemOwner();
    await this.getSystemsOwner();
    this.dateS = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateE = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateStartEdit = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateEndEdit = moment().add(543, "years").format("DD-MM-YYYY");
  },
  updated() {
    const dateS = moment(this.dateStart).add(543, "years").format("DD-MM-YYYY");
    this.dateS = dateS;

    const dateE = moment(this.dateEnd).add(543, "years").format("DD-MM-YYYY");
    this.dateE = dateE;

    const dateStartEdit = moment(this.editedItem.formattedDateStart)
      .add(543, "years")
      .format("DD-MM-YYYY");
    this.dateStartEdit = dateStartEdit;

    const dateEndEdit = moment(this.editedItem.formattedDateEnd)
      .add(543, "years")
      .format("DD-MM-YYYY");
    this.dateEndEdit = dateEndEdit;
  },
  mounted() {
    this.getSystemsOwner();
  },
  methods: {

   redirectToSystemDetail(systemId) {
       this.$router.push(`/systemdetail/${projectId}/${systemId}`);
  },
    initialize() {
      this.projectList = [];
      this.projectListAdmin = [];
    },
    async getUser() {
      await this.$axios
        .get("/users/getOne/" + this.$auth.user.id)
        .then((res) => {
          this.userid = res.data[0].user_id;
          this.userfirstname = res.data[0].user_firstname;
          this.userlastname = res.data[0].user_lastname;
          this.userposition = res.data[0].user_position;
          this.userrole = res.data[0].user_role;
        });
    },
    ClearSystemField() {},
    async CreateAllSystem() {
      try {
        if (
          this.system.system_id.trim() == "" ||
          this.system.system_nameTH.trim() == "" ||
          this.system.system_nameEN.trim() == "" ||
          this.system.system_shortname.trim() == ""
        ) {
          this.dialogValidate = true;
        } else {
          await this.createSystem();
          await this.getsystemID();
          await this.getProjectId();
          await this.addUser_project(this.projectIds);
          await this.addUser_system(this.systemId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getsystemID() {
      await this.$axios
        .get("/systems/getAll?system_id=" + this.system.system_id)
        .then((data) => {
          this.systemId = data.data[0].id;
          console.log(this.systemId);
        });
    },
    async addUser_system(systemID) {
      try {
        await this.$axios.post("/user_systems/createUser_system", {
          user_id: this.choose_user_id,
          system_id: systemID,
          project_id: this.projectIds,
        });
        await this.getProject();
        await this.getSystems();
        this.dialogSuccess = true;
        this.dialogSubsystem = false;
        this.ClearSubsystem();
      } catch (error) {
        console.log(error);
        alert("user_system: " + error);
      }
    },
    async addUser_project(projectId) {
      try {
        await this.$axios.post("/user_projects/createUser_project", {
          user_id: this.choose_user_id,
          project_id: projectId,
        });
      } catch (error) {
        console.log(error);
      }
    },
    ClearSubsystem() {
      this.system.project_id = "";
      this.system.system_id = "";
      this.system.system_nameTH = "";
      this.system.system_nameEN = "";
      this.system.system_shortname = "";
      this.system.system_analyst = "";
      this.choose_user_id = [];
    },
    async getProjectId() {
      await this.$axios
        .get("/projects/getAll?project_id=" + this.editedItem.project_id)
        .then((data) => {
          this.projectIds = data.data[0].id;
        });
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.data_position_Developer = data.data;
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.data_position_Implementer = data.data;
        });
    },
    async getPosition_Sa() {
      await this.$axios
        .get("/users/getAll?user_position=System%20Analyst")
        .then((data) => {
          this.data_position_Sa = data.data;
        });
    },

    async getSystemsOwner() {
      try {
        this.loading = true;
        this.projectOwner = [];
        this.projectList.forEach((project, i) => {
          this.projectList[i].systems.splice(
            0,
            this.projectList[i].systems.length
          );
        });
        this.projectListAdmin.forEach((project, i) => {
          project.systems.forEach((system, s) => {
            this.systemOwner.forEach((owner, num) => {
              if (project.systems[s].id === owner.system_id) {
                this.projectList[i].systems.push({
                  ...this.projectListAdmin[i].systems[s],
                });
              } else {
                // console.log("System not push");
              }
            });
          });
        });
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.projectList = res.data;

        this.projectList.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          project.showdatestart = moment(date)
            .add(543, "years")
            .format("DD-MM-YYYY");
          // this.dateStartShow  = moment(date).add(543, "years").format("DD-MM-YYYY");

          // this.dateStartDataShow.push(this.dateStartShow);
          // this.dateStartEdit = date.format("YYYY-MM-DD");

          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          project.showdateend = moment(dateEnd)
            .add(543, "years")
            .format("DD-MM-YYYY");
          // this.dateEndEdit = dateEnd.format("YYYY-MM-DD");
        });
      });
    },
    async getProject2() {
      await this.$axios.get("/projects/getAll").then((data) => {
        this.projectListAdmin = data.data;

        this.projectListAdmin.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          project.showdatestart = moment(date)
            .add(543, "years")
            .format("DD-MM-YYYY");

          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          project.showdateend = moment(dateEnd)
            .add(543, "years")
            .format("DD-MM-YYYY");
        });
      });
    },
    async saveProject() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
      } else {
        if (this.mode == "edit") {
          this.editedItem.project_start = this.editedItem.formattedDateStart;
          this.editedItem.project_end = this.editedItem.formattedDateEnd;
          try {
            await this.$refs.form.validate();
            await this.$axios.put(
              `/projects/updateProject/${this.editedItem.id}`,
              this.editedItem
            );
            const promise = new Promise((resolve, reject) => {
              resolve();
              this.getUser();
              this.initialize();
              this.getProject();
              this.getProject2();
              this.getSystems();
              this.getPosition_Developer();
              this.getPosition_Implementer();
              this.getSystemOwner();
              this.getSystemsOwner();
              this.dialog = false;
              this.clearCreateProject();
            });
            promise.then(() => {
              setTimeout(() => {
                // alert("success");
                this.dialogSuccess = true;
              }, 2000);
            });
          } catch (error) {
            console.error(error);
            alert("Error submitting form");
          }
        } else if (this.mode === "create") {
          this.editedItem.project_start = this.dateStart;
          this.editedItem.project_end = this.dateEnd;
          try {
            await this.$refs.form.validate();

            await this.$axios.post("/projects/createProject", this.editedItem);

            const promise = new Promise((resolve, reject) => {
              resolve();
              this.dialog = false;
              this.getUser();
              this.initialize();
              this.getProject();
              this.getProject2();
              this.getSystems();
              this.getPosition_Developer();
              this.getPosition_Implementer();
              this.getSystemOwner();
              this.getSystemsOwner();
            });
            promise.then(() => {
              setTimeout(() => {
                // alert("success");
                this.dialogSuccess = true;
                this.clearCreateProject();
              }, 2000);
            });
          } catch (error) {
            console.error(error);
            alert("Error submitting form");
          }
        }
      }
    },
    clearCreateProject() {
      // this.$refs.form.reset();
      this.editedItem.project_shortname = "";
      this.editedItem.project_name = "";
      this.editedItem.project_id = "";
      this.editedItem.project_agency = "";
      this.dialog = false;
    },
    async DeleteAllProject() {
      await this.deleteUser_screens();
      await this.deleteUserSystem();
      await this.deleteUserProject();
      await this.deleteScreenByIdProject();
      await this.deleteSystem();
      await this.deleteProject();

      this.dialogDeleteSuccess = true;
      this.dialog = false;
      this.clearCreateProject();
      const promise = new Promise((resolve, reject) => {
        resolve();
        this.loading = true;
        this.getUser();
        this.initialize();
        this.getProject();
        this.getProject2();
        this.getSystems();
        this.getPosition_Developer();
        this.getPosition_Implementer();
        this.getSystemOwner();
        this.getSystemsOwner();
      });
      promise.then(() => {
        setTimeout(() => {
          // alert("success");
          this.loading = false;
        }, 2000);
      });
      // this.loading = false;
    },
    async deleteProject() {
      try {
        await this.$axios.delete("/projects/delete/" + this.editedItem.id);
        // console.log("delete success");
      } catch (error) {
        console.error(error);
        alert("Error delete form");
      }
    },
    async deleteUser_screens() {
      try {
        const response = await this.$axios.delete(
          "/user_screens/deleteProjectID/" + this.editedItem.id
        );
        // console.log("delete success");
        if (response.status === 200 || response.status === 404) {
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log(err.response);
        }
        console.log(err);
      }
    },
    async deleteUserProject() {
      try {
        const response = await this.$axios.delete(
          "/user_projects/deleteProjectID/" + this.editedItem.id
        );
        if (response.status === 200) {
        } else if (response.status === 404) {
          const responseData = response.data;
          if (responseData) {
            // alert("user_system no have data");
          } else if (responseData.error && response.status != 404) {
            // alert(responseData.error);
            console.log(responseData.error);
          }
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUserSystem() {
      try {
        const response = await this.$axios.delete(
          "/user_systems/deleteProjectID/" + this.editedItem.id
        );
        if (response.status === 200) {
        } else if (response.status === 404) {
          const responseData = response.data;
          if (responseData) {
            // alert("user_system no have data");
          } else if (responseData.error && response.status != 404) {
            // alert(responseData.error);
          }
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteSystem() {
      await this.$axios
        .delete("/systems/deleteProjectId/" + this.editedItem.id)
        .then((res) => {
          // alert("Detete system Success!");
          // this.$router.push("/manageProject");
        })
        .then((response) => {
          console.log(response);
          // console.log("Update success");
        })
        .catch((err) => {
          console.log(err);
          // alert(err);
        });
    },
    async deleteScreenByIdProject() {
      await this.$axios
        .delete("/screens/deleteScreenProjectId/" + this.editedItem.id)
        .then((res) => {
          // alert("Delete Screen Success!");
          // this.deleteSystem();
        })
        .then((response) => {})
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // do nothing when 404 error occurs
          } else {
            console.log(err);
            // alert(err);
          }
        });
    },
    openDialog(mode, projectList) {
      this.mode = mode;
      this.dialog = true;
      if (mode === "edit") {
        this.editedIndex = this.projectList.indexOf(projectList);
        this.editedItem = Object.assign({}, projectList);
        this.dialog = true;
      } else if (mode === "create") {
        this.dialog = true;
      }
    },
    async getSystemOwner() {
      await this.$axios
        .get("/user_systems/getOneUserID/" + this.$auth.user.id)
        .then((data) => {
          this.systemOwner = data.data;
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // do nothing when 404 error occurs
          } else {
            console.log(err);
            // alert(err);
          }
        });
    },
    async getSystems() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projectList.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });

        this.projectListAdmin.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });
      });
    },
    getSystemCount(project) {
      return project.systems ? project.systems.length : 0;
    },
    async dialogSystem(projectList) {
      this.editedIndex = this.projectList.indexOf(projectList);
      this.editedItem = Object.assign({}, projectList);
      this.system.project_id = projectList.id;
    },
    async createSystem() {
      try {
        await this.$axios.post("/systems/createSystem", this.system);
        const promise = new Promise((resolve, reject) => {
          resolve();
          this.dialog = false;
          this.system.project_id == "";
          this.system.system_nameTH == "";
          this.system.system_nameEN == "";
          this.system.system_shortname == "";
          this.system.system_analyst == "";
          this.system.system_member == "";
        });
        promise.then(() => {
          setTimeout(() => {
            // alert("success");
          }, 2000);
        });
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.new-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
}

::v-deep .v-data-table-header {
  background-color: #5c5c5c;
  color: white;
}

::v-deep .v-data-table-header span {
  color: white;
  font-size: 14px;
}

.row-even {
  background-color: rgba(200, 200, 200, 0.788);
  color: black;
}

.row-odd {
  background-color: rgba(255, 255, 255, 0.788);
  color: black;
}

.card >>> .v-input {
  padding-top: 0% !important;
}
.project-row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px; /* Adjust as needed */
  margin-right: -10px; /* Adjust as needed */
}

.project-card {
}
</style>