<template>
  <!-- Systems Data Table container -->
  <div class="systems-data-table">
    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="filteredSystems"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Systems Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="goToCreateSystem"
            >New System</v-btn
          >
          <v-btn color="primary" dark @click="goToHistorySystems"
            >ShowHistorySystem</v-btn
          >
        </v-toolbar>

        <!-- Create System Dialog -->
        <v-dialog v-model="createSystemDialog" max-width="600">
          <v-card>
            <v-card-title>Create New System</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="createSystem">
                <!-- System ID -->
                <v-row>
                  <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>System ID</h2>
                  </v-col>
                  <v-col cols="8" sm="6" md="4">
                    <v-text-field
                      v-model="newSystem.system_id"
                      label="System ID"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- System Name (TH) -->
                <v-row>
                  <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>System Name (TH)</h2>
                  </v-col>
                  <v-col cols="8" sm="6" md="4">
                    <v-text-field
                      v-model="newSystem.system_nameTH"
                      label="System Name (TH)"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- System Name (EN) -->
                <v-row>
                  <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>System Name (EN)</h2>
                  </v-col>
                  <v-col cols="8" sm="6" md="4">
                    <v-text-field
                      v-model="newSystem.system_nameEN"
                      label="System Name (EN)"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Short Name -->
                <v-row>
                  <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Short Name</h2>
                  </v-col>
                  <v-col cols="8" sm="6" md="4">
                    <v-text-field
                      v-model="newSystem.system_shortname"
                      label="Short Name"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Buttons -->
                <v-row class="d-flex justify-center mt-6">
                  <v-col cols="6" sm="6" md="4">
                    <v-btn color="primary" type="submit">Create</v-btn>
                  </v-col>
                  <v-col cols="6" sm="6" md="4">
                    <v-btn @click="createSystemDialog = false">Cancel</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Edit System Dialog -->
        <v-dialog
          v-model="editSystemDialog"
          max-width="600"
          ref="editSystemDialog"
        >
          <v-card>
            <v-card-title>Edit System</v-card-title>
            <v-card-text>
              <!-- Form to edit system -->
              <v-form @submit.prevent="updateSystem">
                <v-text-field
                  v-model="editedSystem.system_id"
                  label="System ID"
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_nameTH"
                  label="System Name (TH)"
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_nameEN"
                  label="System Name (EN)"
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_shortname"
                  label="Short Name"
                ></v-text-field>
                <!-- Add more fields as needed -->
                <!-- You can also add selection fields for system analyst and member -->
                <!-- Add buttons to submit and cancel -->
                <v-btn type="submit">Update</v-btn>
                <v-btn @click="editSystemDialog = false">Cancel</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="openEditDialog(item)"
          >mdi-pencil</v-icon
        >
        <v-icon size="small" @click="confirmDeleteSystem(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "SystemsDataTable",
  layout: "admin",
  data() {
    return {
      createSystemDialog: false,
      editSystemDialog: false,
      newSystem: {
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
      },
      editedSystem: {
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
      },
      systems: [],
      searchQuery: "",
      headers: [
        { text: "System ID", value: "system_id" },
        { text: "System Name (TH)", value: "system_nameTH" },
        { text: "System Name (EN)", value: "system_nameEN" },
        { text: "Short Name", value: "system_shortname" },
        { text: "Screen Count", value: "screen_count" },
        { text: "System Progress (%)", value: "system_progress" },
        { text: "Planned Start", value: "system_plan_start" },
        { text: "Planned End", value: "system_plan_end" },
        { text: "Manday", value: "system_manday" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    goToHistorySystems() {
      this.$router.push("/systems/HistorySystems");
    },
    async createSystem() {
      const projectId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/createSystem`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              project_id: projectId,
              ...this.newSystem,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create system");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "New system created successfully",
        });
        this.createSystemDialog = false;
        this.fetchSystems();
      } catch (error) {
        console.error("Error creating system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create system",
        });
      }
    },

    async updateSystem() {
      try {
        const response = await fetch(
          `http://localhost:7777/systems/updateSystem/${this.editedSystem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedSystem),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update system");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System updated successfully",
        });
        this.editSystemDialog = false;
        this.fetchSystems();
      } catch (error) {
        console.error("Error updating system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update system",
        });
      }
    },

    async deleteSystem(system) {
      const systemId = system.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/delete/${systemId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete system");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System deleted successfully",
        });
        this.fetchSystems();
      } catch (error) {
        console.error("Error deleting system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete system",
        });
      }
    },

    async confirmDeleteSystem(system) {
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
          await this.deleteSystem(system);
        }
      } catch (error) {
        console.error("Error confirming delete system:", error);
      }
    },

    async fetchSystems() {
      const projectId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/getAll/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch systems");
        }
        const data = await response.json();
        this.systems = data;
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    },

    async goToCreateSystem() {
      // Open the create system dialog first
      this.createSystemDialog = true;
    },

    openEditDialog(system) {
      this.editedSystem = { ...system };
      this.editSystemDialog = true;
    },
  },

  computed: {
    filteredSystems() {
      return this.systems.filter((system) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          system.system_id.toLowerCase().includes(searchText) ||
          system.system_nameTH.toLowerCase().includes(searchText) ||
          system.system_nameEN.toLowerCase().includes(searchText) ||
          system.system_shortname.toLowerCase().includes(searchText)
        );
      });
    },
  },

  mounted() {
    this.fetchSystems();
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
