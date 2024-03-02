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
        <h1 class="text-01">{{ greeting }}, Bee</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>

      <!-- Buttons for creating a project  -->
      <v-col cols="6" class="text-right">
        <v-btn @click="handleIconClick" color="#9747FF">
<<<<<<< HEAD
          <router-link to="./projectCreateUpdate" style="color: #9747ff">
=======
          <router-link to="/projectCreateUpdate" style="color: #9747ff">
>>>>>>> 8bf95189c78adf7c571ddf464a0c379eb156a675
            <span style="margin: 0; color: #ffffff"> + Create Project</span>
          </router-link>
        </v-btn>
        <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
            >
              New Item
            </v-btn>
          </template>
      </v-col>
    </v-row>

    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input
          type="text"
          v-model="searchQuery"
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

    <!-- Project data table -->
    <v-data-table
  :headers="headers"
  :items="filteredProjects"
  :search="searchQuery"
>
  <template v-slot:item.actions="{ item }">
    <v-icon
      size="small"
      class="me-2"
      @click="editProject(item)"
    >
      mdi-pencil
    </v-icon>
    <v-icon
      size="small"
      @click="deleteProject(item)"
    >
      mdi-delete
    </v-icon>
  </template>

  <template v-slot:item="{ item }">
    <tr>
      <td>
        <!-- Project name -->
        {{ item.project_name_ENG }}
      </td>
      <td>{{ item.project_name_TH }}</td>
      <td>{{ item.project_progress }}%</td>
      <td>{{ item.project_plan_start }}</td>
      <td>{{ item.project_plan_end }}</td>
    </tr>
  </template>
</v-data-table>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProjectManagement",
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
        { text: "Project Name (ENG)", value: "project_name_ENG" },
        { text: "Project Name (TH)", value: "project_name_TH" },
        { text: "Progress (%)", value: "project_progress" },
        { text: "Planned Start", value: "project_plan_start" },
        { text: "Planned End", value: "project_plan_end" },
        { text: "Actions", key: "actions", sortable: false },
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

.router-link-underline {
  text-decoration: none;
  /* นำเส้นใต้ออก */
}

.router-link-underline:hover {
  text-decoration: underline;
  /* นำเส้นใต้กลับมาเมื่อเมาส์ไปวางทับ */
}

</style>
