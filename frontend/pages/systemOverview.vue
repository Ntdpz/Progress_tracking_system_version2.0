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
        <h1 class="text-01">
          <v-btn icon @click="handleIconClick" color="#9747FF">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          Project Name
        </h1>
      </v-col>

      <!-- Buttons for creating a system and showing all system -->
      <v-col cols="6" class="text-right">
        <v-btn @click="handleIconClick" color="#9747FF">
          <router-link to="/system/createSystem" style="color: #9747ff">
            <span style="margin: 0; color: #ffffff"> + Create System</span>
          </router-link>
        </v-btn>
        <v-btn class="work-item" color="#9747FF" @click="handleButtonClick" style="padding: 5px; margin-left: 10px">
          <p style="margin: 0; color: white">All Systems</p>
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

    <!-- System data table -->
    <v-data-table :headers="headers" :items="filteredSystems" :search="searchQuery">
      <template v-slot:items="props">
        <td>{{ props.item.system_code }}</td>
        <td>{{ props.item.system_name_ENG }}</td>
        <td>{{ props.item.system_name_TH }}</td>
        <td>{{ props.item.system_progress }}%</td>
        <td>{{ props.item.system_plan_start }}</td>
        <td>{{ props.item.system_plan_end }}</td>
        <td>
          <!-- Buttons for editing, deleting, and showing System details -->
          <v-btn @click="editSystem(props.item)">Edit</v-btn>
          <v-btn @click="deleteSystem(props.item)">Delete</v-btn>
          <v-btn @click="showSystemDetails(props.item)">Details</v-btn>
          <!-- เพิ่มปุ่มสำหรับแสดงรายละเอียด -->
        </td>
      </template>
    </v-data-table>

    <!-- Edit System Form Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit System</v-card-title>
        <v-card-text>
          <!-- Form to edit System details -->
          <v-form @submit.prevent="saveEditedSystem">
            <!-- Include form fields for editing system details -->
            <v-text-field v-model="editedSystem.system_name_TH" label="System Name (TH)"></v-text-field>
            <v-text-field v-model="editedSystem.system_name_ENG" label="System Name (ENG)"></v-text-field>
            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- System Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="600">
      <v-card v-if="selectedSystem">
        <v-card-title>System Details</v-card-title>
        <v-card-text>
          <!-- Include System details here -->
          <ul>
            <li>System Name (TH): {{ selectedSystem.system_name_TH }}</li>
            <li>System Name (ENG): {{ selectedSystem.system_name_ENG }}</li>
            <!-- Add more details as needed -->
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "SystemManagement",
  layout: 'admin',
  data() {
    return {
      detailsDialog: false,
      selectedSystem: null,
      greeting: "",
      currentDateTime: "",
      editDialog: false,
      editedSystem: { system_name_TH: "", system_name_ENG: "" },
      systems: [], // โครงการทั้งหมด
      searchQuery: "", // Search query
      headers: [
        { text: "System Code", value: "system_code" },
        { text: "System Name (ENG)", value: "system_name_ENG" },
        { text: "System Name (TH)", value: "system_name_TH" },
        { text: "Progress (%)", value: "system_progress" },
        { text: "Planned Start", value: "system_plan_start" },
        { text: "Planned End", value: "system_plan_end" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    showSystemDetails(system) {
      this.selectedSystem = system;
      this.detailsDialog = true;
    },
    handleIconClick() {
      // Add your logic for icon click
    },
    handleButtonClick() {
      // Add your logic for button click
    },
    editSystem(system) {
      this.editedSystem = { ...system };
      this.editDialog = true;
    },

    async saveEditedSystem() {
      try {
        const response = await fetch(
          `http://localhost:7777/systems/createSystem/${this.editedSystem.system_id}`,
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

        // Handle success
        console.log("System updated successfully");

        // Show success message using SweetAlert2
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System updated successfully",
        });

        // Redirect back to the previous page
        this.$router.go(); // Go back to the previous page
      } catch (error) {
        console.error("Error updating System:", error);
        // Handle error
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update system",
        });
      }
    },

    async deleteSystem(system) {
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
            `http://localhost:7777/systems/delete/${system.system_id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete system");
          }

          console.log("System deleted successfully");

          // Display Sweet Alert for successful system deletion
          await Swal.fire(
            "Success",
            "System deleted successfully.",
            "success"
          );

          // Fetch updated system list
          this.fetchSystems();
        }
      } catch (error) {
        console.error("Error deleting system:", error);

        // Display Sweet Alert for error during system deletion
        await Swal.fire(
          "Error",
          "An error occurred during the system deletion process.",
          "error"
        );
      }
    },

    async fetchSystems() {
      try {
        const response = await fetch("http://localhost:7777/systems/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch systems");
        }
        const data = await response.json();
        this.systems = data;
      } catch (error) {
        console.error("Error fetching systems:", error);
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
    // Filtered system based on search query
    filteredSystems() {
      return this.systems.filter(
        (system) =>
          (system.system_name_TH &&
            system.system_name_TH
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (system.system_name_ENG &&
            system.system_name_ENG
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (system.system_id &&
            system.system_id
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
      );
    },
  },

  mounted() {
    this.updateDateTime();
    this.fetchSystems();
    setInterval(this.updateDateTime, 1000);
  },
};
</script>

<style scoped>
.text-01 {
  color: black !important;
}

.system-manager {
  color: #3f51b5;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.system-code {
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

.system-button {
  color: #9747ff !important;
  background-color: #ffffff !important;
  font-weight: bold;
}

.system-title {
  display: flex;
  flex-direction: column;
}

.system-title h2 {
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
