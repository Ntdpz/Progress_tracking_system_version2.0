<template>
  <div class="card-wrapper">
    <!-- click -->
    <v-card class="customer-card" @click="$emit('click')">
      <v-img class="white--text" :src="getBase64Image(ImageSrc)" height="200px" width="400px">
        <v-row class="align-center justify-space-between">
          <!-- Left Side: ID Chip -->
          <v-col cols="auto">
            <v-chip class="ma-2" color="blue" text-color="white">
              ID: {{ screenCode }}
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
          <strong>Design:</strong> {{ getUserNamesByPosition('System Analyst') || 'No assignee' }}<span>&nbsp;</span>
          <span :class="getColorClassText(designProgress)">
            {{ Math.round(designProgress || 0) }}%
          </span> <br>
          <strong>Dev:</strong> {{ getUserNamesByPosition('Developer') || 'No assignee' }} <span>&nbsp;</span>
          <span :class="getColorClassText(devProgress)">
            {{ Math.round(devProgress || 0) }}%
          </span>
          <br>
          <strong>Implementer:</strong> {{ getUserNamesByPosition('Implementer') || 'No assignee' }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" icon @click.stop="openEditDialog"> <v-icon>mdi-pencil</v-icon> </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="800px">
      <!-- editForm -->
      <editForm :userScreens="users" :userSytems="userSystems" @closeDialog="handleCloseDialog"
        @deleteScreen="deleteScreen">
      </editForm>
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
    //user system prop
    userSystems: {
      type: Array,
      required: false
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
      editScreenName: this.screenName,
      editScreenAssignee: this.screenAssignee
    };
  },
  methods: {
    async fetchUsers() {
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
        screenName: this.editScreenName,
        screenAssignee: this.editScreenAssignee
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
    getUserNamesByPosition(position) {
      const usersByPosition = this.users
        .filter(user => user.user_position.toLowerCase() === position.toLowerCase())
        .map(user => `${user.user_firstname} ${user.user_lastname}`)
        .join(', ');
      return usersByPosition;
    },
    handleCloseDialog() {
      this.editDialog = false;
    }
  },
  mounted() {
    this.fetchUsers();
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