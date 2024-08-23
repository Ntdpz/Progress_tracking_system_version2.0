<template>
  <div>
    <Loader v-if="isLoading" />
    <h1 class="centered-heading">Dashboard</h1>
    <v-spacer></v-spacer>
    <div>
      <Greeting />
      <result_projects :userId="user.id" />
      <v-spacer></v-spacer>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="project in projects"
            :key="project.id"
            cols="12"
            class="full-width-card"
          >
            <v-card class="full-card">
              <!-- <v-card-title> {{ project.id }}</v-card-title> -->
              <v-card-title>
                All your task in Project :
                {{ project.project_name_ENG }} Today's Date:
                {{ today }}</v-card-title
              >

              <task_project_table />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Greeting from "../../components/project/Greeting.vue";
import Loader from "../../components/Loader.vue";
import result_projects from "../../components/Progress_tracking/Dashbord/result_projects.vue";
import task_project_table from "../../components/Progress_tracking/Dashbord/task_project_table.vue";
import "./Dashbord.css";

export default {
  components: { Greeting, Loader, result_projects, task_project_table },
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      today: this.formatDate(new Date()),
      isLoading: true,
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      projects: [],
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0"); // แสดงวันที่ในรูปแบบ DD
      const month = String(date.getMonth() + 1).padStart(2, "0"); // แสดงเดือนในรูปแบบ MM
      const year = date.getFullYear(); // แสดงปีในรูปแบบ YYYY

      return `${day}/${month}/${year}`; // รวมวันที่, เดือน, และปี
    },
    async fetchProjects() {
      try {
        // ดึง project_ids โดยใช้ user.id
        const { data: projectIds } = await this.$axios.get(
          `/user_projects/get_project_by_userid/${this.user.id}`
        );

        // ดึงรายละเอียดโปรเจคทั้งหมดโดยใช้ project_ids
        const projectsPromises = projectIds.map((id) =>
          this.$axios.get(`/projects/getOne/${id}`)
        );
        const projectsResponses = await Promise.all(projectsPromises);

        this.projects = projectsResponses.map((response) => response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
/* เพิ่มสไตล์เพิ่มเติมถ้าต้องการ */
</style>
