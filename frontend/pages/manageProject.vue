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
          <router-link to="/project/createProject" style="color: #9747ff">
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
<<<<<<< HEAD
    </v-row>  
    
    <!-- Project Cards --> 
      <template v-slot:items="props">
        <td>{{ props.item.project_code }}</td>
        <td>{{ props.item.project_name_ENG }}</td>
        <td>{{ props.item.project_name_TH }}</td>
        <td>{{ props.item.project_progress }}%</td>
        <td>{{ props.item.project_plan_start }}</td>
        <td>{{ props.item.project_plan_end }}</td>
        <td>
          <!-- Buttons for editing, deleting, and showing project details -->
          <v-btn @click="editProject(props.item)">Edit</v-btn>
          <v-btn @click="deleteProject(props.item)">Delete</v-btn>
          <v-btn @click="showProjectDetails(props.item)">Details</v-btn>
          <!-- เพิ่มปุ่มสำหรับแสดงรายละเอียด -->
        </td>
      </template>
    </v-data-table>

    <!-- Edit Project Form Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit Project</v-card-title>
        <v-card-text>
          <!-- Form to edit project details -->
          <v-form @submit.prevent="saveEditedProject">
            <!-- Include form fields for editing project details -->
            <v-text-field v-model="editedProject.project_name_TH" label="Project Name (TH)"></v-text-field>
            <v-text-field v-model="editedProject.project_name_ENG" label="Project Name (ENG)"></v-text-field>
            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Project Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="600">
      <v-card v-if="selectedProject">
        <v-card-title>Project Details</v-card-title>
        <v-card-text>
          <!-- Include project details here -->
          <ul>
            <li>Project Name (TH): {{ selectedProject.project_name_TH }}</li>
            <li>Project Name (ENG): {{ selectedProject.project_name_ENG }}</li>
            <!-- Add more details as needed -->
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
>>>>>>> 74546ea64bef9c5af6fd4499fed3b54f10dd6348
  </div>
  
</template>
<script>
import Swal from "sweetalert2";

export default {
  layout: "admin",

  data() {
    return {
      detailsDialog: false,
      selectedProject: null,
      greeting: "",
      currentDateTime: "",
      editDialog: false,
      editedProject: { project_name_TH: "", project_name_ENG: "" },
      projects: [], // โครงการทั้งหมด
      searchQuery: "", // Search query
      headers: [
        { text: "Project Code", value: "project_code" },
        { text: "Project Name (ENG)", value: "project_name_ENG" },
        { text: "Project Name (TH)", value: "project_name_TH" },
        { text: "Progress (%)", value: "project_progress" },
        { text: "Planned Start", value: "project_plan_start" },
        { text: "Planned End", value: "project_plan_end" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    showProjectDetails(project) {
      this.selectedProject = project;
      this.detailsDialog = true;
    },
    handleIconClick() {
      // Add your logic for icon click
    },
    handleButtonClick() {
      // Add your logic for button click
    },
    editProject(project) {
      this.editedProject = { ...project };
      this.editDialog = true;
    },

    async saveEditedProject() {
      try {
        const response = await fetch(
          `http://localhost:7777/projects/createProject/${this.editedProject.project_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedProject),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update project");
        }

        // Handle success
        console.log("Project updated successfully");

        // Show success message using SweetAlert2
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project updated successfully",
        });

        // Redirect back to the previous page
        this.$router.go(); // Go back to the previous page
      } catch (error) {
        console.error("Error updating project:", error);
        // Handle error
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update project",
        });
      }
    },

    async deleteProject(project) {
      try {
        // Display a confirmation SweetAlert before proceeding with deletion
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (confirmResult.isConfirmed) {
          // User confirmed, proceed with deletion
          const response = await fetch(
            `http://localhost:7777/projects/delete/${project.project_id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete project");
          }

          console.log("Project deleted successfully");

          // Display Sweet Alert for successful project deletion
          await Swal.fire(
            "Success",
            "Project deleted successfully.",
            "success"
          );

          // Fetch updated project list
          this.fetchProjects();
        }
      } catch (error) {
        console.error("Error deleting project:", error);

        // Display Sweet Alert for error during project deletion
        await Swal.fire(
          "Error",
          "An error occurred during the project deletion process.",
          "error"
        );
      }
    },

    async fetchProjects() {
      try {
        const response = await fetch("http://localhost:7777/projects/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        this.projects = data;
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
    filteredProjects() {
      return this.projects.filter(
        (project) =>
          (project.project_name_TH &&
            project.project_name_TH
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (project.project_name_ENG &&
            project.project_name_ENG
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (project.project_id &&
            project.project_id
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
      );
    },
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
