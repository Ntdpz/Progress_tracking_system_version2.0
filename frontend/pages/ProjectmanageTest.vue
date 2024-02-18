<template>
  <!-- Dashboard container -->
  <div class="dashboard" style="
      background-color: #ffffff;
      padding: 10px 70px;
      border-radius: 0;
      margin-right: 30px;
    ">
    <!-- Greeting and current date/time -->
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1 class="text-01">{{ greeting }}, {{ user.user_position }}</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>
    </v-row>

    <!-- Search bar -->
    <v-col col="6" sm="6" md="6" lg="6" class="pb-0">
      <v-text-field
        v-model="searchText"
        placeholder="Search"
        filled
        rounded
        dense
        style="width: 60%"
      ></v-text-field>
    </v-col>

    <!-- Display project cards -->
    <v-row>
      <v-col v-for="(project, index) in filteredProjects" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card class="tracking-work-card">
          <v-card-title>{{ project.project_name_TH }}</v-card-title>
          <v-card-text>
            <p class="project-manager">Manager: {{ project.manager }}</p>
            <p class="project-code">Code: {{ project.project_code }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Back button -->
    <v-btn @click="handleButtonClick"> 
      <router-link to="./">
        <span style="margin: 0;">Back</span>
      </router-link>
    </v-btn>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Searchbar from "../components/Searchbar.vue";
import moment from "moment";

export default {
  components: { Searchbar },
  layout: "admin",
  middleware: "auth",
  name: "ProjectManagement",
  data() {
    return {
      //auth
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      dialog: false,
      dialog_newproject: false,
      query: "",
      ownProject: [],
      projectIds: [],
      projectDetails: [],
      searchText: "",
      //test
      projects: [],
      //time
      greeting: "",
      currentDateTime: "",
      editDialog: false,
    };
  },
  created() {
    this.getOwnProject();
    this.getProject();
    this.getOwnIssue();
  },
  methods: {
    async getOwnProject() {
      await this.$axios
        .get("/user_projects/getOneUserID/" + this.$auth.user.id)
        .then((res) => {
          this.ownProject = res.data;

          // Extract the project IDs from the userProjects array
          this.projectIds = this.ownProject.map(
            (project) => project.project_id
          );

          // Fetch project details for each project ID
          const requests = this.projectIds.map((projectId) => {
            return this.$axios.get("/projects/getOne/" + projectId);
          });
          Promise.all(requests).then((responses) => {
            this.projectDetails = responses.map((res) => res.data);
          });
        });
    },
    async getOwnIssue() {
      if (this.$auth.user.user_position == "Developer") {
        await this.$axios
          .get("/issues/getOwnIssue/" + this.$auth.user.id)
          .then((res) => {
            this.issues = res.data;
            console.log("log", this.issues);

            // Loop through each issue and add the dateEnd property
            this.issues = this.issues.map((issue) => {
              const dateEnd = moment(issue.issue_end)
                .add(543, "years")
                .format("DD-MM-YYYY");
              return {
                ...issue,
                dateEnd: dateEnd,
              };
            });
            console.log("log2", this.issues);
          });
      } else if (this.$auth.user.user_position == "Implementer") {
        await this.$axios
          .get("/issues/getOwnIssueQC/" + this.$auth.user.id)
          .then((res) => {
            this.issues = res.data;
            console.log("log", this.issues);

            // Loop through each issue and add the dateEnd property
            this.issues = this.issues.map((issue) => {
              const dateEnd = moment(issue.issue_end)
                .add(543, "years")
                .format("DD-MM-YYYY");
              return {
                ...issue,
                dateEnd: dateEnd,
              };
            });
            console.log("log2", this.issues);
          });
      }
    },
    async getProject() {
       await this.$axios.get("/projects/getAll").then((res) => {
        this.projects = res.data;
      });
    },
  },
    updateDateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      this.greeting = this.getGreeting(now);
      this.currentDateTime = now.toLocaleDateString("en-US", options);
    },
    getGreeting(date) {
      const hour = date.getHours();

      if (hour >= 0 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
      handleButtonClick() {
      // Add your logic for button click
    },

  computed: {
    // Filtered projects based on search query
    filteredProjects() {
      return this.projects.filter(
        (project) =>
          project.project_name_TH
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          project.project_name_ENG
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          project.project_id.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  mounted() {
    this.updateDateTime();
    this.fetchProjects(); // You need to define this method if it's supposed to be called here
    setInterval(this.updateDateTime, 1000);
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
</style>
