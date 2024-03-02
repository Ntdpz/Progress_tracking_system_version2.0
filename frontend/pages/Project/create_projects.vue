<template>
  <div class="center">
    <h1 class="bold-text">Create/Edit Project</h1>
    <v-form @submit.prevent="submitForm">
      <!-- Project ID -->
      <v-row>
        <v-col cols="4" sm="6" md="4" class="text-right">
          <h2>Project ID</h2>
        </v-col>
        <v-col cols="8" sm="6" md="4">
          <v-text-field
            v-model="project_id"
            label="Project ID"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Project Name -->
      <v-row>
        <v-col cols="4" sm="6" md="4" class="text-right">
          <h2>Project Name</h2>
        </v-col>
        <v-col cols="8" sm="6" md="4">
          <v-text-field
            v-model="project_name_TH"
            label="Project Name (TH)"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Project Name (English) -->
      <v-row>
        <v-col cols="4" sm="6" md="4" class="text-right">
          <h2>Project Name (English)</h2>
        </v-col>
        <v-col cols="8" sm="6" md="4">
          <v-text-field
            v-model="project_name_ENG"
            label="Project Name (English)"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-form>
      <!-- Personnel -->
      <div class="personnel">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
              outlined
              prepend-inner-icon="mdi-magnify"
              rounded
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn @click="openAddPersonnelDialog">Add Personnel</v-btn>
          </v-card-title>
          <!-- Personnel table -->
          <v-data-table
            :headers="headers"
            :items="personnel"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <!-- Confirm and Cancel buttons -->
      <v-row class="d-flex justify-center mt-6">
        <v-col cols="6" sm="6" md="4">
          <v-btn color="primary" @click="submitForm">Confirm</v-btn>
        </v-col>
        <v-col cols="6" sm="6" md="4">
          <v-btn color="error" @click="cancelForm">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      project_id: "",
      project_name_TH: "",
      project_name_ENG: "",
      search: "",
      selected: [],
      singleSelect: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      personnel: [
        { id: 1, name: "test", role: "Developer" },
        { id: 2, name: "Jane", role: "Tester" },
      ],
      dialog: false,
      newPerson: {
        name: "",
        role: "",
      },
    };
  },
  methods: {
    deleteItem(item) {
      this.personnel = this.personnel.filter((person) => person.id !== item.id);
    },
    openAddPersonnelDialog() {
      this.dialog = true;
    },
    cancelAddPersonnel() {
      this.dialog = false;
      this.clearNewPerson();
    },
    saveNewPersonnel() {
      this.personnel.push({
        id: this.personnel.length + 1,
        name: this.newPerson.name,
        role: this.newPerson.role,
      });
      this.dialog = false;
      this.clearNewPerson();
    },
    clearNewPerson() {
      this.newPerson = {
        name: "",
        role: "",
      };
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    save() {
      console.log("Saved:", this.editedItem);
      this.close();
    },
    async submitForm() {
      if (!this.project_id || !this.project_name_TH || !this.project_name_ENG) {
        alert("Please fill in all required fields.");
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
              project_id: this.project_id,
              project_name_TH: this.project_name_TH,
              project_name_ENG: this.project_name_ENG,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create project");
        }

        const data = await response.json();
        console.log("New project successfully created:", data.message);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        }).then(() => {
          // Redirect to manageProject page
          this.$router.push("/manageProject");
        });

        // Clear form fields or perform any additional actions upon successful project creation
        this.project_id = "";
        this.project_name_TH = "";
        this.project_name_ENG = "";
        this.personnel = []; // Clear personnel list if needed
      } catch (error) {
        console.error("Error creating project:", error);
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create project. Please try again later.",
        });
      }
    },
    cancelForm() {
      // Handle cancellation logic here, if needed
    },
  },
};
</script>


<style scoped>
/* Add your custom styles here */
.bold-text {
  font-weight: bold;
}

h1,
v-form {
  margin-bottom: 30px;
}

.center {
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}

.personnel {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
