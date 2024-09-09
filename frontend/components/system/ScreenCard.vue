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
          <strong>Design:</strong><span :class="getColorClassText(designProgress)">
            {{ Math.round(designProgress || 0) }}%
          </span> {{ getUserNamesByPosition('System Analyst') || 'No assignee' }}<span>&nbsp;</span>
          <br>
          <strong>Dev:</strong> <span :class="getColorClassText(devProgress)">
            {{ Math.round(devProgress || 0) }}%
          </span> {{ getUserNamesByPosition('Developer') || 'No assignee' }} <span>&nbsp;</span>

          <br>
          <strong>Implementer:</strong> {{ getUserNamesByPosition('Implementer') || 'No assignee' }}
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
         <!-- space -->
          <v-spacer></v-spacer>
          <v-btn color="primary">Assign User</v-btn>
          <v-btn color="secondary" @click="editScreenUserDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- assign user dialog -->
    <v-dialog v-model="assignUserDialog" max-width="800px">
      <v-card>
        <v-card-title color="black">Assign User</v-card-title>
        <v-card-text>
 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Assign</v-btn>
          <v-btn color="secondary" @click="assignUserDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import editForm from './editForm.vue';
import axios from 'axios';

export default {
  components: {
    editForm
  },
  props: {
    // system user
    userSystems: {
      type: Array,
      required: false,
      default: () => []
    },
    screenCode: {
      type: String,
      required: true
    },
    screenId: {
      type: Number,
      required: true
    },
    screenName: {
      type: String,
      required: true
    },
    screenPlanStartDate: {
      type: String,
      required: false
    },
    screenPlanEndDate: {
      type: String,
      required: false
    },
    screenActualStartDate: {
      type: String,
      required: false
    },
    screenActualEndDate: {
      type: String,
      required: false
    },
    screenStatus: {
      type: String,
      required: true
    },
    screenProgress: {
      type: String,
      required: false
    },
    ImageSrc: {
      type: String,
      required: false
    },
    designProgress: {
      type: Number,
      required: false
    },
    devProgress: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      users: [],
      editDialog: false,
      assignUserDialog: false,
      editScreenName: this.screenName,
      editScreenUserDialog: false,
      headers: [
        { text: 'User Position', value: 'user_position' },
        { text: 'User Name', value: 'user_name' },
        { text: 'Action', value: 'action', sortable: false }
      ],
    };
  },
  methods: {
    async fetchScreenUsers() {
      try {
        const response = await axios.get(`http://localhost:7777/user_screens/getOneScreenID/${this.screenId}`);
        this.users = response.data;
        console.log("Fetched users:", this.users); // Debugging log
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    getBase64Image(base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    },
    // Edit user dialog
    openEditUserDialog() {
      this.editScreenUserDialog = true;
    },
    closeEditUserDialog() {
      this.editScreenUserDialog = false;
    },
    // Assign user Dialog
    openAssignUserDialog() {
      this.assignUserDialog = true;
    },
    closeAssignUserDialog() {
      this.assignUserDialog = false;
    },
    // Edit Dialog
    openEditDialog() {
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    saveEdit() {
      // Emit the updated data to the parent component
      this.$emit('update', {
        screenId: this.screenId,
        screenName: this.editScreenName
      });
      this.closeEditDialog();
    },
    deleteScreen() {
      // Emit the screen ID to the parent component
      this.$emit('delete', this.screenId);
      this.closeEditDialog();
    },
    getColorClass(progress) {
      if (progress == 100) return 'green';
      if (progress >= 75) return 'blue';
      if (progress >= 50) return 'yellow';
      return 'orange';
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
    getUserNamesByPosition(position) {
      const usersByPosition = this.users
        .filter(user => user.user_position.toLowerCase() === position.toLowerCase())
        .map(user => `${user.user_firstname} `)
        .join(', ');
      return usersByPosition;
    },
    deleteUser(user) {
      // Implement delete user logic here
      console.log("Deleting user:", user);
    },
    handleCloseDialog() {
      this.editDialog = false;
    }
  },
  mounted() {
    this.fetchScreenUsers();
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