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
        <h1 class="text-01">{{ greeting }}, Bee</h1>
        <p class="text-01">{{ currentDateTime }}</p>
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

    <!-- Project data table -->
    <v-data-table :headers="headers" :items="filteredProjects" :sort-by="[{ key: 'project_id', order: 'asc' }]">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Project Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="goToCreateProject">New Project</v-btn>
          <v-btn color="primary" dark @click="goToHistoryProject" style="margin-left: 10px;">Show History
            Project</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="20" px @click="openEditDialog(item)">
          mdi-pencil-circle
        </v-icon>
        <v-icon size="20" px @click="softDeleteProject(item)">
          mdi-delete-empty
        </v-icon>
        <v-btn size="30" px @click="viewProjectDetails(item)" style="margin-left: 10px;">
          Project Details
        </v-btn>
      </template>
    </v-data-table>
    <!-- Create Project Dialog -->
    <v-dialog v-model="createProjectDialog" max-width="600" ref="createProjectDialog">
      <v-card>
        <v-card-title>Create New Project</v-card-title>
        <v-card-text>
          <!-- Form to create new project -->
          <v-form>
            <v-text-field v-model="newProject.project_id" label="Project ID"></v-text-field>
            <v-text-field v-model="newProject.project_name_TH" label="Project Name (TH)"></v-text-field>
            <v-text-field v-model="newProject.project_name_ENG" label="Project Name (EN)"></v-text-field>

            <!-- New fields for SA, DEV, IMP selection -->
            <v-select v-model="selectedSA" :items="formatTeamMembers(teamMembersSA)" label="Select SA" multiple>
              <template v-slot:prepend-item>
                <v-list-item @click="selectAllSA">
                  <v-list-item-content>Select All</v-list-item-content>
                </v-list-item>
              </template>
            </v-select>

            <v-select v-model="selectedDEV" :items="formatTeamMembers(teamMembersDEV)" label="Select DEV" multiple>
              <template v-slot:prepend-item>
                <v-list-item @click="selectAllDEV">
                  <v-list-item-content>Select All</v-list-item-content>
                </v-list-item>
              </template>
            </v-select>

            <v-select v-model="selectedIMP" :items="formatTeamMembers(teamMembersIMP)" label="Select IMP" multiple>
              <template v-slot:prepend-item>
                <v-list-item @click="selectAllIMP">
                  <v-list-item-content>Select All</v-list-item-content>
                </v-list-item>
              </template>
            </v-select>

            <!-- Button to submit -->
            <v-btn type="submit" @click="
                createProjectDialog = false;
                createProject();
              ">
              Create
            </v-btn>

            <v-btn @click="createProjectDialog = false">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Edit Project Form Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit Project</v-card-title>
        <v-card-text>
          <!-- Form to edit project details -->
          <v-form @submit.prevent="saveEditedProject">
            <!-- Include form fields for editing project details -->
            <v-text-field v-model="editedProject.project_id" label="Project ID"></v-text-field>
            <v-text-field v-model="editedProject.project_name_TH" label="Project Name (TH)"></v-text-field>
            <v-text-field v-model="editedProject.project_name_ENG" label="Project Name (ENG)"></v-text-field>
            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Project Details Dialog -->
    <v-dialog v-model="editProjectDialog" max-width="600" ref="editProjectDialog">
      <v-card>
        <v-card-title>Edit Project</v-card-title>
        <v-card-text>
          <!-- Form to edit system -->
          <v-form @submit.prevent="updateProject">
            <v-text-field v-model="editProject.project_id" label="Project ID" readonly></v-text-field>
            <v-text-field v-model="editProject.project_name_TH" label="Project Name (TH)"></v-text-field>
            <v-text-field v-model="editProject.project_name_ENG" label="Project Name (EN)"></v-text-field>
            <!-- Add more fields as needed -->
            <!-- You can also add selection fields for system analyst and member -->
            <!-- Add buttons to submit and cancel -->
            <v-btn type="submit">Update</v-btn>
            <v-btn @click="editProjectDialog = false">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProjectManagement",
  layout: "admin",
  data() {
    return {
      teamMembersSA: [],
      teamMembersDEV: [],
      teamMembersIMP: [],
      newProject: {
        project_id: "",
        project_name_TH: "",
        project_name_ENG: "",
      },
      // Define variables to store selected team members
      selectedSA: [],
      selectedDEV: [],
      selectedIMP: [],
      // Sample team members data
      teamMembers: ["SA1", "SA2", "DEV1", "DEV2", "IMP1", "IMP2"],
      detailsDialog: false,
      createProjectDialog: false,
      editProjectDialog: false,
      selectedProject: null,
      greeting: "",
      currentDateTime: "",
      editDialog: false,
      editedProject: { project_name_TH: "", project_name_ENG: "" },
      projects: [],
      searchQuery: "",
      editProject: {
        project_id: "",
        project_name_TH: "",
        project_name_ENG: "",
      },
      headers: [
        { text: "Project Code", value: "project_id" },
        { text: "Project Name (ENG)", value: "project_name_ENG" },
        { text: "Project Name (TH)", value: "project_name_TH" },
        { text: "Progress (%)", value: "project_progress" },
        { text: "Planned Start", value: "project_plan_start" },
        { text: "Planned End", value: "project_plan_end" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      defaultProject: {
        project_name_TH: "",
        project_name_ENG: "",
      },
    };
  },
  methods: {
    async fetchTeamMembers() {
      try {
        const responseSA = await fetch(
          "http://localhost:7777/users/getUserByPosition?user_position=System Analyst"
        );
        const responseDEV = await fetch(
          "http://localhost:7777/users/getUserByPosition?user_position=Developer"
        );
        const responseIMP = await fetch(
          "http://localhost:7777/users/getUserByPosition?user_position=Implementer"
        );

        if (!responseSA.ok || !responseDEV.ok || !responseIMP.ok) {
          throw new Error("Failed to fetch team members");
        }

        // Fetch team members data
        const teamMembersSA = await responseSA.json();
        const teamMembersDEV = await responseDEV.json();
        const teamMembersIMP = await responseIMP.json();

        // Assign to data properties with user_id included
        this.teamMembersSA = teamMembersSA.map((user) => ({
          user_id: user.id, // Include user_id here
          user_firstname: user.user_firstname,
          user_position: user.user_position,
          user_role: user.user_role,
        }));
        this.teamMembersDEV = teamMembersDEV.map((user) => ({
          user_id: user.id, // Include user_id here
          user_firstname: user.user_firstname,
          user_position: user.user_position,
          user_role: user.user_role,
        }));
        this.teamMembersIMP = teamMembersIMP.map((user) => ({
          user_id: user.id, // Include user_id here
          user_firstname: user.user_firstname,
          user_position: user.user_position,
          user_role: user.user_role,
        }));
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    },

    selectAllSA() {
      if (this.selectedSA.length === this.teamMembersSA.length) {
        this.selectedSA = [];
      } else {
        this.selectedSA = [...this.teamMembersSA];
      }
    },
    selectAllDEV() {
      if (this.selectedDEV.length === this.teamMembersDEV.length) {
        this.selectedDEV = [];
      } else {
        this.selectedDEV = [...this.teamMembersDEV];
      }
    },
    selectAllIMP() {
      if (this.selectedIMP.length === this.teamMembersIMP.length) {
        this.selectedIMP = [];
      } else {
        this.selectedIMP = [...this.teamMembersIMP];
      }
    },

    formatTeamMembers(teamMembers) {
      return teamMembers.map((member) => ({
        text: `${member.user_position}: ${member.user_firstname} ${member.user_lastname}`,
        value: member,
      }));
    },
    async createProject() {
      if (
        !this.newProject.project_id ||
        !this.newProject.project_name_TH ||
        !this.newProject.project_name_ENG
      ) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all required fields.",
        });
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:7777/projects/createProject",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              project_id: this.newProject.project_id,
              project_name_TH: this.newProject.project_name_TH,
              project_name_ENG: this.newProject.project_name_ENG,
              selectedSA: this.selectedSA.map((member) => member.user_id),
              selectedDEV: this.selectedDEV.map((member) => member.user_id),
              selectedIMP: this.selectedIMP.map((member) => member.user_id),
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to create Project");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message || "New Project created successfully",
        });
        this.createProjectDialog = false;
        this.fetchProjects();
      } catch (error) {
        console.error("Error creating Project:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to create Project",
        });
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
    async updateProject() {
      try {
        const response = await fetch(
          `http://localhost:7777/projects/updateProject/${this.editedProject.project_id}`,
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
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project updated successfully",
        });
        this.editProjectDialog = false;
        this.fetchProjects();
      } catch (error) {
        console.error("Error updating project:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update project",
        });
      }
    },
    viewProjectDetails(project) {
      this.$router.push({
        path: `/Project/${project.id}`,
        params: { selectedProject: project },
      });
    },
    goToHistoryProject() {
      this.$router.push("/Project/HistoryProject");
    },
    openEditDialog(project) {
      this.editProject = { ...project };
      this.editProjectDialog = true;
    },
    async softDeleteProject(project) {
      try {
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
          const response = await fetch(
            `http://localhost:7777/projects/delete/${project.id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete project");
          }

          console.log("Project deleted successfully");

          await Swal.fire(
            "Success",
            "Project deleted successfully.",
            "success"
          );

          this.fetchProjects();
        }
      } catch (error) {
        console.error("Error deleting project:", error);

        await Swal.fire(
          "Error",
          "An error occurred during the project deletion process.",
          "error"
        );
      }
    },
    async goToCreateProject() {
      this.createProjectDialog = true;
    },
    async saveEditedProject() {
      try {
        const response = await fetch(
          `http://localhost:7777/projects/updateProject/${this.editedProject.project_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              project_name_TH: this.editedProject.project_name_TH,
              project_name_ENG: this.editedProject.project_name_ENG,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update project");
        }

        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project updated successfully",
        });

        this.$router.go();
      } catch (error) {
        console.error("Error updating project:", error);

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update project",
        });
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
    filteredProjects() {
      return this.projects
        .map((project) => ({
          ...project,
          project_progress: project.project_progress || 0,
          project_plan_start: project.project_plan_start || "Not determined",
          project_plan_end: project.project_plan_end || "Not determined",
        }))
        .filter((project) => {
          const searchText = this.searchQuery.toLowerCase();
          return (
            (project.project_id &&
              project.project_id.toLowerCase().includes(searchText)) ||
            (project.project_name_ENG &&
              project.project_name_ENG.toLowerCase().includes(searchText)) ||
            (project.project_name_TH &&
              project.project_name_TH.toLowerCase().includes(searchText))
          );
        });
    },
  },
  mounted() {
    this.fetchTeamMembers();
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