<template>
  <!-- Dashboard container -->
  <div
    class="dashboard"
    style="
      background-color: #ffffff;
      padding: 10px 70px;
      border-radius: 0;
      margin-right: 30px;
    "
  >
    <!-- Greeting and current date/time -->
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1 class="text-01">{{ greeting }}, {{ userfirstname }}</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>

      <!-- Buttons for creating a project and showing all projects -->
      <v-col cols="6" class="text-right">
        <v-btn @click="handleIconClick" color="#9747FF">
          <router-link to="./projectCreateUpdate" style="color: #9747ff">
            <span style="margin: 0; color: #ffffff"> + Create Project</span>
          </router-link>
        </v-btn>
        <v-btn
          class="work-item"
          color="#9747FF"
          @click="t"
          style="padding: 5px; margin-left: 10px"
        >
          <p style="margin: 0; color: white">All Projects</p>
        </v-btn>
      </v-col>
    </v-row>

    <!-- show project -->
    <p style="color: #b6b5b5; font-size: 16px" class="">
      มี {{ this.projectList.length }} โครงการ
    </p>

    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input
          type="text"
          v-model="t"
          placeholder="Search..."
          style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          "
        />
      </v-col>
    </v-row>
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
    const currentDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);

    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      dateStart: currentDate,
      dateEnd: currentDate,
      dateS: currentDate,
      dateE: currentDate,
      menuDateStart: false,
      menuDateEnd: false,
      menuDateStartEdit: false,
      dateStartEdit: currentDate,
      menuDateEndEdit: false,
      dateEndEdit: currentDate,
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
      return this.projectListAdmin.filter((project) => {
        return project.project_name
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });
    },
    filteredProjectsDev() {
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
    this.dateS = this.formatDate(this.dateStart);
    this.dateE = this.formatDate(this.dateEnd);
    this.dateStartEdit = this.formatDate(this.editedItem.formattedDateStart);
    this.dateEndEdit = this.formatDate(this.editedItem.formattedDateEnd);
  },
  mounted() {
    this.getSystemsOwner();
  },
  methods: {
    initialize() {
      this.projectList = [];
      this.projectListAdmin = [];
    },
    async getUser() {
      try {
        const res = await this.$axios.get(
          "/users/getOne/" + this.$auth.user.id
        );
        const userData = res.data[0];
        this.userid = userData.user_id;
        this.userfirstname = userData.user_firstname;
        this.userlastname = userData.user_lastname;
        this.userposition = userData.user_position;
        this.userrole = userData.user_role;
      } catch (error) {
        console.log(error);
      }
    },
    async CreateAllSystem() {
      try {
        if (this.validateSystemFields()) {
          await this.createSystem();
          await this.getsystemID();
          await this.getProjectId();
          await this.addUser_project(this.projectIds);
          await this.addUser_system(this.systemId);
        } else {
          this.dialogValidate = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getsystemID() {
      try {
        const data = await this.$axios.get(
          "/systems/getAll?system_id=" + this.system.system_id
        );
        this.systemId = data.data[0].id;
      } catch (error) {
        console.log(error);
      }
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
        this.clearSubsystem();
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
    clearSubsystem() {
      this.system = {
        project_id: "",
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
        system_analyst: "",
        system_member: "",
      };
      this.choose_user_id = [];
    },
    async getProjectId() {
      try {
        const data = await this.$axios.get(
          "/projects/getAll?project_id=" + this.editedItem.project_id
        );
        this.projectIds = data.data[0].id;
      } catch (error) {
        console.log(error);
      }
    },
    async getPosition_Developer() {
      try {
        const data = await this.$axios.get(
          "/users/getAll?user_position=Developer"
        );
        this.data_position_Developer = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPosition_Implementer() {
      try {
        const data = await this.$axios.get(
          "/users/getAll?user_position=Implementer"
        );
        this.data_position_Implementer = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPosition_Sa() {
      try {
        const data = await this.$axios.get(
          "/users/getAll?user_position=System%20Analyst"
        );
        this.data_position_Sa = data.data;
      } catch (error) {
        console.log(error);
      }
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
      try {
        const res = await this.$axios.get("/projects/getAll");
        this.projectList = res.data;
        this.formatProjectDates(this.projectList);
      } catch (error) {
        console.log(error);
      }
    },
    async getProject2() {
      try {
        const data = await this.$axios.get("/projects/getAll");
        this.projectListAdmin = data.data;
        this.formatProjectDates(this.projectListAdmin);
      } catch (error) {
        console.log(error);
      }
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
            this.refreshData();
            this.dialog = false;
            this.clearCreateProject();
            this.dialogSuccess = true;
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
            this.refreshData();
            this.dialog = false;
            this.clearCreateProject();
            this.dialogSuccess = true;
          } catch (error) {
            console.error(error);
            alert("Error submitting form");
          }
        }
      }
    },
    clearCreateProject() {
      this.editedItem = {
        project_shortname: "",
        project_name: "",
        project_id: "",
        project_agency: "",
        project_start: "",
        project_end: "",
      };
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
      this.refreshData();
    },
    async deleteProject() {
      try {
        await this.$axios.delete("/projects/delete/" + this.editedItem.id);
      } catch (error) {
        console.error(error);
        alert("Error delete form");
      }
    },
    async deleteUser_screens() {
      try {
        await this.$axios.delete(
          "/user_screens/deleteProjectID/" + this.editedItem.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUserProject() {
      try {
        await this.$axios.delete(
          "/user_projects/deleteProjectID/" + this.editedItem.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUserSystem() {
      try {
        await this.$axios.delete(
          "/user_systems/deleteProjectID/" + this.editedItem.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSystem() {
      try {
        await this.$axios.delete(
          "/systems/deleteProjectId/" + this.editedItem.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteScreenByIdProject() {
      try {
        await this.$axios.delete(
          "/screens/deleteScreenProjectId/" + this.editedItem.id
        );
      } catch (error) {
        console.log(error);
      }
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
      try {
        const data = await this.$axios.get(
          "/user_systems/getOneUserID/" + this.$auth.user.id
        );
        this.systemOwner = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getSystems() {
      try {
        const res = await this.$axios.get("/systems/getAll");
        this.assignSystemsToProjects(this.projectList, res.data);
        this.assignSystemsToProjects(this.projectListAdmin, res.data);
      } catch (error) {
        console.log(error);
      }
    },
    assignSystemsToProjects(projects, systems) {
      projects.forEach((project) => {
        Vue.set(
          project,
          "systems",
          systems.filter((system) => system.project_id === project.id)
        );
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
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
      }
    },
    formatDate(date) {
      return moment(date).add(543, "years").format("DD-MM-YYYY");
    },
    validateSystemFields() {
      const { system } = this;
      return (
        system.system_id.trim() !== "" &&
        system.system_nameTH.trim() !== "" &&
        system.system_nameEN.trim() !== "" &&
        system.system_shortname.trim() !== ""
      );
    },
    formatProjectDates(projects) {
      projects.forEach((project) => {
        project.formattedDateStart = this.formatDate(project.project_start);
        project.formattedDateEnd = this.formatDate(project.project_end);
      });
    },
    async refreshData() {
      await this.getUser();
      await this.getProject();
      await this.getProject2();
      await this.getSystems();
      await this.getPosition_Developer();
      await this.getPosition_Implementer();
      await this.getSystemOwner();
      await this.getSystemsOwner();
    },
  },
};
</script>

<style scoped>
.text-01 {
  color: black !important;
}

.project-manager {
  color: #3f51b5;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.project-code {
  text-transform: uppercase;
  font-weight: bold;
  color: #6c757d;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.tracking-work-card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 253, 253, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: #9747ff;
}

.tracking-work-card:hover {
  transform: translateY(-5px);
}

.tracking-work-card h2 {
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.work-item p {
  margin-bottom: 5px;
}

.work-item p:last-child {
  margin-bottom: 0;
}

.v-card-actions {
  padding: 10px;
  justify-content: space-between;
}

.project-button {
  color: #9747ff !important;
  background-color: #ffffff !important;
  font-weight: bold;
}

.project-title {
  display: flex;
  flex-direction: column;
}

.project-title h2 {
  margin-bottom: 5px;
  /* ปรับขนาดของระยะห่างระหว่างข้อมูล */
}

.router-link-underline {
  text-decoration: none;
  /* นำเส้นใต้ออก */
}

.router-link-underline:hover {
  text-decoration: underline;
  /* นำเส้นใต้กลับมาเมื่อเมาส์ไปวางทับ */
}
.tracking-work-card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: #ffffff; /* สีพื้นหลังของ Card */
  margin-bottom: 20px; /* ระยะห่างระหว่าง Card */
}

.tracking-work-card:hover {
  transform: translateY(-5px);
}

.tracking-work-card h2 {
  color: #333333; /* สีของข้อความชื่อโครงการ */
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.tracking-work-card p {
  margin-bottom: 5px;
}
</style>
