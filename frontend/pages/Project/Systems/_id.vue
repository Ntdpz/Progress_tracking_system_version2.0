<template>
  <div>
    <div>
      <v-card class="dead-section">
        <v-row>
          <!-- System Detail -->
          <!-- 1/4 of the row -->
          <v-col cols="12" md="6">
            <v-card-title>
              <!-- icon human which open system member -->
              <strong>System Name:</strong>{{ system.system_nameEN || 'Wait for name' }}
            </v-card-title>
            <v-card-subtitle>
              Total Screen: {{ system.screen_count || 0 }}<br>
              Progress: {{ (system.system_progress && !isNaN(system.system_progress)) ?
                Math.round(parseFloat(system.system_progress)) : 0 }}<br>
              Plan: {{ system.system_plan_start || 'Not determined' }} To {{ system.system_plan_end || 'Not determined'
              }}<br>
              Manday: {{ (system.system_manday !== null && !isNaN(system.system_manday)) ?
                Math.round(system.system_manday) : 0 }} <br>
            </v-card-subtitle>
          </v-col>
          <!-- Progress detail -->
          <!-- 3/4 of the row -->
          <v-col cols="12" md="6" class="circular-progress-right">
            <div class="progress">
              <!-- Progress Total -->
              <circular-progress style="margin-top:20px" :value="Math.round(system.systemProgress)" label="System" />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <!-- Search bar search by system name -->
    <div class="search-section">
      <v-row>
        <!-- search bar -->
        <!-- 8/12 is search bar -->
        <v-col cols="12" md="8">
          <v-text-field v-model="search" label="Search" append-icon="mdi-magnify" @input="searchScreen" outlined
            placeholder="search by name" clearable dense></v-text-field>
        </v-col>
        <!-- 4/12 is add and history button -->
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="6">
              <v-btn color="primary" block @click="openAddScreenDialog">Add screen</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="primary" block>
                <v-icon>mdi-history</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <!-- Screen Cards -->
    <div class="screen-cards">
      <v-row>
        <!-- display screens in system filter by system_id -->
        <v-col cols="12" md="4" v-for="screen in paginatedScreens" :key="screen.id" class="ma-0">
          <!-- *TOCHANGE change desing to design-->
          <ScreenCard :userSystems="users" :screenId="screen.id" :screenCode="screen.screen_id"
            :screenName="screen.screen_name" :screenStatus="screen.screen_status"
            :screenProgress="screen.screen_progress" :screenPlanStartDate="screen.screen_plan_start"
            :screenPlanEndDate="screen.screen_plan_end" :screenActualStartDate="screen.screen_actual_start"
            :screenActualEndDate="screen.screen_actual_end" :ImageSrc="screen.screen_pic"
            :design-progress="screen.screen_progress_status_design" :dev-progress="screen.screen_progress_status_dev"
            @click="navigateToScreen(screen.id)" @update="handleUpdate" @delete="handleDeleteScreen" />
        </v-col>
      </v-row>
    </div>
    <!-- Pagination -->
    <v-pagination v-model="page" :length="totalPages" :total-visible="5" class="pagination"></v-pagination>
    <!-- dialog -->
    <!-- Add Screen-->
    <v-dialog v-model="addScreenDialog" max-width="800px">
      <add-form :users="users" :systemId="systemId" :projectId="system.project_id" @closeDialog="handleCloseDialog">
      </add-form>
    </v-dialog>
  </div>
</template>


<script>
import axios from 'axios';
import CircularProgress from '~/components/system/circularProgress.vue';
import ScreenCard from '~/components/system/ScreenCard.vue';
import AddForm from '~/components/system/addForm.vue';
import { encodeId, decodeId } from "../../utils/crypto";

export default {
  components: {
    CircularProgress,
    ScreenCard,
    AddForm,
  },
  layout: 'admin', // Apply layout if needed
  middleware: 'auth', // Apply middleware if needed
  data() {
    return {
      systemId: null,
      projectId: null,
      system: null,
      allScreens: [],  // store all screens initially
      screens: [],      // store filtered or paginated screens
      users: [],
      search: '',
      // Pagination
      page: 1,
      itemsPerPage: 15,  // max 15 screens per page
      totalPages: 0,
      addScreenDialog: false,
    };
  },
  computed: {
    paginatedScreens() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.screens.slice(start, end);
    }
  },
  async asyncData({ params, $axios, error }) {
    const encodedId = params.id;
    const decodedId = decodeId(encodedId); // Assuming decodeId is defined

    if (!decodedId) {
      return error({ statusCode: 400, message: "Invalid System ID" });
    }
    console.log('decodedId:', decodedId);
    try {
      // Fetch system details with decodedId
      const systemResponse = await axios.get(`http://localhost:7777/systems/getOne/${decodedId}`);
      const system = systemResponse.data;
      const projectId = system.project_id;

      // Fetch screens related to the system
      const screensResponse = await axios.get(`http://localhost:7777/screens/getAll`, {
        params: { system_id: decodedId }
      });
      const screens = screensResponse.data;

      // Fetch user_systems related to the system
      const user_systemsResponse = await axios.get(`http://localhost:7777/user_systems/getAll`, {
        params: { system_id: decodedId }
      });
      const user_systems = user_systemsResponse.data;
      // Fetch all users
      const usersResponse = await axios.get(`http://localhost:7777/users/getAll`);
      const allUsers = usersResponse.data;

      // Filter users based on user_systems
      const filteredUsers = allUsers.filter(user =>
        user_systems.some(user_system => user_system.user_id === user.id)
      );

      filteredUsers.forEach(user => {
        const userSystem = user_systems.find(user_system => user_system.user_id === user.id);
        if (userSystem) {
          user.project_id = userSystem.project_id;
          user.system_id = userSystem.system_id;
        }
      });

      return { system, screens, users: filteredUsers, projectId, systemId: decodedId };
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return {
        system: null,
        screens: [],
        users: [],
        user_systems: [],
        projectId: null,
        systemId: null
      };
    }
  },
  watch: {
    screens(newScreens) {
      this.totalPages = Math.ceil(newScreens.length / this.itemsPerPage);
    }
  },
  methods: {
    searchScreen() {
      const searchTerm = this.search.toLowerCase();
      // Filter screens based on the search term
      this.screens = this.allScreens.filter(screen =>
        screen.screen_name && screen.screen_name.toLowerCase().includes(searchTerm)
      );
      // Reset to page 1 when search is performed
      this.page = 1;
      // Update total pages based on the new filtered results
      this.totalPages = Math.ceil(this.screens.length / this.itemsPerPage);
    },
    openAddScreenDialog() {
      this.addScreenDialog = true;
    },
    navigateToScreen(screenId) {
      this.$router.push(`/Project/Systems/screens/${screenId}`);
    },
    handleUpdate() {
      console.log('update'); // add later
    },
    handleCloseDialog() {
      this.addScreenDialog = false;
    },
    getUserNamesByPosition(position) {
      return this.users
        .filter(user => user.user_position === position)
        .map(user => `${user.user_firstname} ${user.user_lastname}`)
        .join(', ');
    },
    // Delete screen
    async handleDeleteScreen(screenId) {
      try {
        await axios.delete(`http://localhost:7777/screens/delete/${screenId}`);
        this.screens = this.screens.filter(screen => screen.id !== screenId);
        this.allScreens = this.allScreens.filter(screen => screen.id !== screenId);
      } catch (error) {
        console.error('Failed to delete screen:', error);
      }
    }
  }
};
</script>


<style scoped>
.circular .custom-card {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  height: auto;
  display: flex;
  align-items: center;
}

.custom-height {
  height: 30px;
}

.custom-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-section {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>