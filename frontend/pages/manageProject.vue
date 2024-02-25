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
        <h1 class="text-01">{{ greeting }}, test</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>

      <!-- Buttons for creating a project and showing all projects -->
      <v-col cols="6" class="text-right">
        <v-btn @click="handleIconClick" color="#9747FF">
          <router-link to="./projectCreateUpdate" style="color: #9747FF">
            <span style="margin: 0; color: #ffffff"> + Create Project</span>
          </router-link>
        </v-btn>
        <v-btn class="work-item" color="#9747FF" @click="t" style="padding: 5px; margin-left: 10px">
          <p style="margin: 0; color: white">All Projects</p>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input type="text" v-model="searchQuery" placeholder="Search..." style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          " />
      </v-col>
    </v-row>  
    
    <!-- Project Cards --> 
    <v-row>
      <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" md="4" lg="3">
        <!-- Card direct to manageSystem -->
        <div>
          <router-link :to="{ name: 'ProjectDetails', params: { projectId: project.id }}" >
         <v-card>
          <h2>{{ project.name }}</h2>
          <p>{{ project.code }}</p>
          <p>{{ project.system }}</p>
          <p>{{ project.description }}</p>
          <!-- Add more details or actions if needed -->
          <v-btn color="primary" @click="editProject(project)">Edit</v-btn>
        </v-card>
        </router-link>
      </div>
      </v-col>
    </v-row> 
  </div>
  
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "admin",

  data() {
    return {
      greeting: "",
      currentDateTime: "",
      searchQuery: "",  // Search query
      projects: [  // Example data for projects
        { name: "Project A", code:"PJ01",system:"2 System",description: "Description of Project A" },
        { name: "Project B", code:"PJ02",system:"4 System",description: "Description of Project B" },
    ]
    };
  },
  methods: {
    handleIconClick() {
      // Add your logic for icon click
    },
    handleButtonClick() {
      // Add your logic for button click
    },
    editProject(project) {
      // Add your logic to handle editing the project
      console.log("Editing project:", project);
    },
   
    async fetchProjects() {
      try {
        const response = await this.$axios.get(
          ""
        );
        this.projects = response.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
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
  },
  computed: {
    // Filtered projects based on search query
    // filteredProjects() {
    //   return this.projects.filter(
    //     (project) =>
    //       project.project_name_TH
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       project.project_name_ENG
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       project.project_id
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase())
    //   );
    // },
  },

  mounted() {
    this.updateDateTime();
    this.fetchProjects();
    setInterval(this.updateDateTime, 1000);
  },
};
</script>

<style scoped>
.text-01 {
  color: black !important;
}

.project-card {
  background-color: #f0f0f0;
  padding: 60px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.project-card h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.project-card p {
  font-size: 14px;
  color: #666;
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
