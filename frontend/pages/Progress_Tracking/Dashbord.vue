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
            v-for="project in projectsWithTasks"
            :key="project.id"
            cols="12"
            class="full-width-card"
          >
            <v-card class="full-card">
              <task_project_table :projectId="project.id" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Greeting from "../../components/Progress_tracking/Dashbord/Greeting.vue";
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
      isLoading: true,
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      projects: [],
    };
  },
  computed: {
    projectsWithTasks() {
      return this.projects.filter((project) => project.hasTasks !== false);
    },
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const { data: projectIds } = await this.$axios.get(
          `/user_projects/get_project_by_userid/${this.user.id}`
        );

        const projectsPromises = projectIds.map((id) =>
          this.$axios.get(`/projects/getOne/${id}`)
        );
        const projectsResponses = await Promise.all(projectsPromises);

        this.projects = projectsResponses.map((response) => ({
          ...response.data,
          hasTasks: true, // กำหนดค่าเริ่มต้นว่ามี tasks
        }));
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
