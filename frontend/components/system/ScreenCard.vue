<template>
  <div class="card-wrapper">
    <!-- click -->
    <v-card class="customer-card" @click="$emit('click')">
      <v-img class="white--text" :src="getBase64Image(ImageSrc)" height="200px" width="400px">
        <v-row class="align-center justify-space-between">
          <!-- Left Side: ID Chip -->
          <v-col cols="auto">
            <v-chip class="ma-2" color="blue" text-color="white">
              {{ screenCode }}
            </v-chip>
          </v-col>

          <!-- Right Side: Status and Progress Chips -->
          <v-col cols="auto">
            <!-- Replaced chip with circular progress -->
            <v-progress-circular class="circular-progress" :value="screenProgress || 0"
              :color="getColorClass(screenProgress)" size="60" width="4">
              <strong>
                {{ Math.round(screenProgress || 0) }}%
              </strong>
            </v-progress-circular>
          </v-col>
        </v-row>
      </v-img>
      <v-card>
        <v-card-title>
          Name: {{ screenName }}
        </v-card-title>
        <v-card-subtitle>
          <strong>Plan:</strong> {{ screenPlanStartDate || 'not determined' }} <strong>to</strong> {{ screenPlanEndDate
          || 'not determined' }} <br>
          <strong>Actual:</strong> {{ screenActualStartDate || 'not determined' }} <strong>to</strong> {{
          screenActualEndDate || 'not determined' }}<br>
          <strong>Design:</strong>
          <span :class="getColorClassText(designProgress)">
            {{ Math.round(designProgress || 0) }}%
          </span>
          {{ truncateName(getUserNamesByPosition('System Analyst')) || 'No assignee' }}
          <span>&nbsp;</span>
          <br>
          <strong>Dev:</strong>
          <span :class="getColorClassText(devProgress)">
            {{ Math.round(devProgress || 0) }}%
          </span>
          {{ truncateName(getUserNamesByPosition('Developer')) || 'No assignee' }}
          <span>&nbsp;</span>
          <br>
          <strong>Implementer:</strong>
          {{ truncateName(getUserNamesByPosition('Implementer')) || 'No assignee' }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" icon @click.stop="openEditDialog"> <v-icon>mdi-pencil</v-icon> </v-btn>
          <v-btn color="primary" icon @click.stop="editScreenUserDialog = true"> <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="800px">
      <!-- editForm -->
      <editForm @closeDialog="handleCloseDialog" @deleteScreen="deleteScreen">
      </editForm>
    </v-dialog>
    <!-- Edit user dialog -->
    <v-dialog v-model="editScreenUserDialog" max-width="800px">
      <v-card>
        <!-- Current User Title -->
        <v-card-title color="black">Current Users</v-card-title>
        <v-card-text>
          <!-- Current User Table -->
          <v-data-table :headers="headers" :items="users" class="elevation-1 mt-4 mb-3">
            <template v-slot:item.user_position="{ item }">
              <v-chip :style="{ width: '120px', display: 'flex', justifyContent: 'center' }"
                :color="getColor(item.user_position)" dark>
                {{ item.user_position }}
              </v-chip>
            </template>
            <template v-slot:item.user_name="{ item }">
              {{ item.user_firstname }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="deleteUser(item)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <!-- action -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openAssignUserDialog">Assign User</v-btn>
          <v-btn color="secondary" @click="editScreenUserDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Assign User Dialog -->
    <v-dialog v-model="assignUserDialog" max-width="800px">
      <v-card>
        <v-card-title color="black">Assign User</v-card-title>
        <v-card-text>
          <!-- Select System Analyst -->
          <v-select v-model="selectedSystemAnalysts" :items="userSystems.filter(
            (user) => user.user_position === 'System Analyst'
          )" label="Select System Analyst" item-text="user_firstname" item-value="id" multiple>
            <template v-slot:prepend-item>
              <v-list-item @click="selectAllSystemAnalystAF">
                <v-list-item-content>Select All</v-list-item-content>
              </v-list-item>
            </template>
          </v-select>

          <!-- Select Developer -->
          <v-select v-model="selectedDevelopers" :items="userSystems.filter(
            (user) => user.user_position === 'Developer'
          )" label="Select Developer" item-text="user_firstname" item-value="id" multiple>
            <template v-slot:prepend-item>
              <v-list-item @click="selectAllDevelopersAF">
                <v-list-item-content>Select All</v-list-item-content>
              </v-list-item>
            </template>
          </v-select>

          <!-- Select Implementer -->
          <v-select v-model="selectedImplementers" :items="userSystems.filter(
            (user) => user.user_position === 'Implementer'
          )" label="Select Implementer" item-text="user_firstname" item-value="id" multiple>
            <template v-slot:prepend-item>
              <v-list-item @click="selectAllImplementersAF">
                <v-list-item-content>Select All</v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="assignUser">Assign</v-btn>
          <v-btn color="secondary" @click="assignUserDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import editForm from './editForm.vue';
import axios from 'axios';
import Swal from 'sweetalert2'; // Make sure to import SweetAlert for notifications

export default {
  components: {
    editForm,
  },
  props: {
    userSystems: {
      type: Array,
      required: false,
      default: () => [],
    },
    screenProjectId:{
      type: Number,
      required: true,
    },
    screenSystemId: {
      type: Number,
      required: true,
    },
    screenCode: {
      type: String,
      required: true,
    },
    screenId: {
      type: Number,
      required: true,
    },
    screenName: {
      type: String,
      required: true,
    },
    screenPlanStartDate: {
      type: String,
      required: false,
    },
    screenPlanEndDate: {
      type: String,
      required: false,
    },
    screenActualStartDate: {
      type: String,
      required: false,
    },
    screenActualEndDate: {
      type: String,
      required: false,
    },
    screenStatus: {
      type: String,
      required: true,
    },
    screenProgress: {
      type: String,
      required: false,
    },
    ImageSrc: {
      type: String,
      required: false,
    },
    designProgress: {
      type: Number,
      required: false,
    },
    devProgress: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      users: [], // Holds the current users assigned to the screen
      editDialog: false,
      assignUserDialog: false,
      editScreenName: this.screenName,
      editScreenUserDialog: false,
      selectedSystemAnalysts: [], // Selected system analysts
      selectedDevelopers: [], // Selected developers
      selectedImplementers: [], // Selected implementers
      headers: [
        { text: 'User Position', value: 'user_position' },
        { text: 'User Name', value: 'user_name' },
        { text: 'Action', value: 'action', sortable: false },
      ],

    };
  },
  methods: {
    // Fetch the currently assigned users for the screen
    async fetchScreenUsers() {
      try {
        const response = await axios.get(`http://localhost:7777/user_screens/getOneScreenID/${this.screenId}`);
        this.users = response.data;
        console.log("Fetched users:", this.users); // Debugging log
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    // Convert Base64 image string to a usable image URL
    getBase64Image(base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    },
    // Assign users to the screen
    async assignUser() {
      try {
        const selectedUsers = [
          ...this.selectedSystemAnalysts,
          ...this.selectedDevelopers,
          ...this.selectedImplementers,
        ];

        // Send POST request to assign users
        const response = await axios.post('http://localhost:7777/user_screens/createUser_screen', {
          user_id: selectedUsers,
          screen_id: this.screenId,
          system_id: this.screenSystemId, // Ensure system ID is passed if needed
          project_id: this.screenProjectId, // Ensure project ID is passed if needed
        });
        console.log(response.data.message);

        // Close the dialog and show success message
        this.assignUserDialog = false;
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Users assigned successfully",
          confirmButtonColor: "#009933",
        });

        // Fetch the updated users
        await this.fetchScreenUsers();
      } catch (error) {
        console.error("Error assigning users:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to assign users",
        });
      }
    },
    // Delete a user from the screen
    // Delete a user from the screen
    async deleteUser(user) {
      try {
        // Ensure user_id is correctly accessed
        console.log("Deleting user:", user); // Log the user object to verify it
        const response = await axios.delete(
          `http://localhost:7777/user_screens/deleteUserScreen/${this.screenSystemId}/${this.screenProjectId}/${this.screenId}/${user.id}` // Ensure the correct property name here
        );
        console.log(response.data.message);

        // Fetch the updated users and show success message
        await this.fetchScreenUsers();
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "User deleted successfully",

        });
      } catch (error) {
        console.error("Error deleting user:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user",
        });
      }
    },
    // Dialog handling methods
    openAssignUserDialog() {
      this.assignUserDialog = true;
    },
    closeAssignUserDialog() {
      this.assignUserDialog = false;
    },
    openEditDialog() {
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    saveEdit() {
      this.$emit('update', {
        screenId: this.screenId,
        screenName: this.editScreenName,
      });
      this.closeEditDialog();
    },
    deleteScreen() {
      this.$emit('delete', this.screenId);
      this.closeEditDialog();
    },
    // Utility methods for UI
    getColorClass(progress) {
      if (progress === 100) return 'green';
      if (progress >= 75) return 'blue';
      if (progress >= 50) return 'yellow';
      return 'orange';
    },
    truncateName(name, maxLength = 20) {
      if (!name) return '';
      return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
    },
    getColorClassText(progress) {
      if (progress === 100) return 'green--text';
      if (progress >= 75) return 'blue--text';
      if (progress >= 50) return 'yellow--text';
      return 'orange--text';
    },
    getColor(position) {
      switch (position) {
        case 'System Analyst':
          return '#864F80';
        case 'Developer':
          return '#374AAB';
        case 'Tester':
          return '#359C73';
        default:
          return 'grey';
      }
    },
    // Get user names based on position (System Analyst, Developer, etc.)
    getUserNamesByPosition(position) {
      const usersByPosition = this.users
        .filter(user => user.user_position.toLowerCase() === position.toLowerCase())
        .map(user => `${user.user_firstname}`)
        .join(', ');
      return usersByPosition;
    },
  },
  mounted() {
    this.fetchScreenUsers(); // Load users when the component is mounted
  }
}
</script>


<style scoped>
.card-wrapper {
  position: relative;
  display: inline-block;
  max-width: 320px;
}

.customer-card {
  cursor: pointer;
  width: 100%;
}

.circular-progress {
  background-color: white;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 5px;
}
</style>