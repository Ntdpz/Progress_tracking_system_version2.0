<template>
  <div>
    <div>
      <Loader v-if="$store.getters.isLoading" />
      <v-card class="dead-section">
        <v-row>
          <!-- System Detail -->
          <!-- 1/4 of the row -->
          <v-col cols="12" md="6">
            <v-card-title>
              <!-- icon human which open system member -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="openUserSystem"
                    color="primary"
                    class="large-icon"
                  >
                    mdi-account-multiple
                  </v-icon>
                </template>
                <span>User system</span>
              </v-tooltip>
              <v-dialog v-model="userSystemDialog" max-width="800px">
                <user-system
                  :systemData="systemData"
                  :userSystems="userSystems"
                ></user-system>
              </v-dialog>

              <strong>System:</strong
              >{{ systemData.system_nameEN || "Wait for name" }}
            </v-card-title>
            <v-card-subtitle>
              ระบบ: {{ systemData.system_nameTH || "รอการตั้งชื่อ" }}<br />
              Total Screen: {{ systemData.screen_count || 0 }} screens<br />
              Plan:
              {{ formatDate(systemData.system_plan_start) || "Not determined" }}
              To {{ formatDate(systemData.system_plan_end) || "Not determined"
              }}<br />
              Manday:
              {{
                systemData.system_manday !== null &&
                !isNaN(systemData.system_manday)
                  ? Math.round(systemData.system_manday)
                  : 0
              }}
              <br />
            </v-card-subtitle>
          </v-col>
          <!-- Progress detail -->
          <!-- 3/4 of the row -->
          <v-col cols="12" md="6" class="circular-progress-right">
            <div class="progress">
              <!-- Progress Total -->
              <circular-progress
                style="margin-top: 20px"
                :value="parseInt(systemData.system_progress)"
                label="System"
              />
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
          <v-text-field
            v-model="search"
            label="Search"
            append-icon="mdi-magnify"
            @input="searchScreen"
            outlined
            placeholder="search by name"
            clearable
            dense
          ></v-text-field>
        </v-col>
        <!-- 4/12 is add and history button -->
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="6">
              <v-btn color="primary" block @click="openAddScreenDialog"
                >Add screen</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn color="error" @click="openHistoryDialog" block>
                <v-icon class="white--text">mdi-history</v-icon>
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
        <v-col
          cols="12"
          md="4"
          v-for="screen in paginatedScreens"
          :key="screen.id"
        >
          <!-- *TOCHANGE change desing to design-->
          <ScreenCard
            :userSystems="userSystems"
            :screenProjectId="systemData.project_id"
            :screenSystemId="systemData.id"
            :screenId="screen.id"
            :screenCode="screen.screen_code"
            :screenName="screen.screen_name"
            :screenLevel="screen.screen_level"
            :screenStatus="screen.screen_status"
            :screenProgress="screen.screen_progress"
            :screenPlanStartDate="screen.screen_plan_start"
            :screenPlanEndDate="screen.screen_plan_end"
            :screenActualStartDate="screen.screen_actual_start"
            :screenActualEndDate="screen.screen_actual_end"
            :ImageSrc="screen.screen_pic"
            :design-progress="screen.screen_progress_status_design"
            :dev-progress="screen.screen_progress_status_dev"
            @click="navigateToScreen(screen.id)"
            @update="handleUpdate"
            @delete="handleDeleteScreen"
            @submit-edit="handleSubmitEdit"
          />
        </v-col>
      </v-row>
    </div>
    <!-- Pagination -->
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="5"
      class="pagination"
    ></v-pagination>
    <!-- dialog -->
    <!-- Add Screen-->
    <v-dialog v-model="addScreenDialog" max-width="800px">
      <add-form
        :users="userSystems"
        :systemId="systemid"
        :projectId="systemData.project_id"
        @closeDialog="handleCloseDialog"
        @reload="reloadPage"
      >
      </add-form>
    </v-dialog>
    <v-dialog v-model="historyDialog" max-width="800px">
      {{ systemid }}
      <srceenHistory
        :systemId="systemid"
        @close-dialog="closeHistoryDialog"
      ></srceenHistory>
    </v-dialog>
  </div>
</template>


<script>
import Swal from "sweetalert2";
import axios from "axios";
import CircularProgress from "~/components/Progress_tracking/systems/circularProgress.vue";
import userSystem from "~/components/Progress_tracking/systems/userSystem.vue";
import ScreenCard from "~/components/Progress_tracking/systems/ScreenCard.vue";
import AddForm from "~/components/Progress_tracking/systems/addForm.vue";
import srceenHistory from "~/components/Progress_tracking/systems/srceenHistory.vue";
import { decodeId } from "@/utils/crypto";
import { encodeId } from "@/utils/crypto";

export default {
  head() {
    return {
      title: "ManageScreen",
    };
  },
  components: {
    CircularProgress,
    ScreenCard,
    AddForm,
    srceenHistory,
    userSystem,
  },
  layout: "admin", // Apply layout if needed
  middleware: "auth", // Apply middleware if needed
  data() {
    return {
      systemid: null,
      projectId: null,
      system: null,
      allScreens: [], // store all screens initially
      screens: [], // store filtered or paginated screens
      users: [],
      userSystems: [],
      search: "",

      // Pagination
      page: 1,
      itemsPerPage: 12, // max 15 screens per page
      totalPages: 0,
      addScreenDialog: false,
      historyDialog: false,
      userSystemDialog: false,
      systemData: "",
    };
  },
  computed: {
    filteredScreens() {
      // Filter screens by search query
      if (!this.search) {
        return this.allScreens;
      }
    },
    paginatedScreens() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.screens.slice(start, end);
    },
  },
  async asyncData({ params, $axios, error }) {
    // แปลงค่า encodedId จาก params.id
    const encodedId = params.id;
    const decodedId = decodeId(encodedId);

    // ตรวจสอบว่าการแปลง decodedId สำเร็จหรือไม่
    if (!decodedId) {
      return error({ statusCode: 400, message: "Invalid Project ID" });
    }

    // แปลง decodedId เป็น Number
    const systemId = parseInt(decodedId, 10);

    try {
      // ดึงข้อมูล system จาก API โดยใช้ systemId
      const systemResponse = await $axios.$get(`/systems/getOne/${systemId}`);
      const systemData = systemResponse;

      // ดึง screens ที่เกี่ยวข้องกับ system
      const screensResponse = await $axios.$get(`/screens/getAll`, {
        params: { system_id: systemId },
      });
      const allScreens = screensResponse;
      const screens = screensResponse;

      // ดึง user_systems ที่เกี่ยวข้องกับ system
      const userSystemsResponse = await $axios.$get(
        `/user_systems/getAllSystemId/${systemId}`
      );
      const userSystems = userSystemsResponse;

      // ส่งค่าไปให้ใช้งานใน template หรือ data()
      return {
        systemData,
        screens,
        systemid: systemId, // ใช้ systemId ที่เป็น Number
        userSystems,
        allScreens,
      };
    } catch (err) {
      return error({ statusCode: 404, message: "Data not found" });
    }
  },
  watch: {
    screens(newScreens) {
      this.totalPages = Math.ceil(newScreens.length / this.itemsPerPage);
    },
  },
  // mount
  mounted() {
    // Debugging log
    console.log("Mounted user systems:", this.userSystems);
  },
  methods: {
    searchScreen() {
      const searchTerm = this.search.toLowerCase();
      // Filter screens based on the search term
      this.screens = this.allScreens.filter(
        (screen) =>
          (screen.screen_name &&
            screen.screen_name &&
            screen.screen_name.toLowerCase().includes(searchTerm)) ||
          (screen.screen_code &&
            screen.screen_code.toLowerCase().includes(searchTerm))
      );
      // Reset to page 1 when search is performed
      this.page = 1;
      // Update total pages based on the new filtered results
      this.totalPages = Math.ceil(this.screens.length / this.itemsPerPage);
    },
    // format
    formatDate(dateString) {
      if (!dateString) return null;
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    openAddScreenDialog() {
      this.addScreenDialog = true;
    },
    openHistoryDialog() {
      this.historyDialog = true;
    },
    openUserSystem() {
      this.userSystemDialog = true;
    },
    closeUserSystem() {
      this.userSystemDialog = false;
    },
    navigateToScreen(screenId) {
      const encodedScreenId = encodeURIComponent(encodeId(screenId)); // เข้ารหัส screenId
      this.$router.push(
        `/Progress_Tracking/manageTasks_Progress_Tracking/${encodedScreenId}`
      );
    },
    handleUpdate() {
      console.log("update"); // add later
    },
    handleCloseDialog() {
      this.addScreenDialog = false;
    },
    closeHistoryDialog() {
      this.historyDialog = false;
      this.$router.go();
    },
    reloadPage() {
      this.$router.go();
    },
    getUserNamesByPosition(position) {
      return this.users
        .filter((user) => user.user_position === position)
        .map((user) => `${user.user_firstname} ${user.user_lastname}`)
        .join(", ");
    },
    // Delete screen
    // Delete screen
    async handleDeleteScreen(screenId) {
      try {
        await this.$axios.delete(`/screens/delete/${screenId}`);
        this.screens = this.screens.filter((screen) => screen.id !== screenId);
        this.allScreens = this.allScreens.filter(
          (screen) => screen.id !== screenId
        );
      } catch (error) {
        console.error("Failed to delete screen:", error);
      }
    },

    // edit screen
    async handleSubmitEdit(updatedScreen) {
      const screenId = updatedScreen.screenId;
      const screenData = {
        screen_code: updatedScreen.screenCode,
        screen_name: updatedScreen.screenName,
        screen_status: updatedScreen.screenStatus,
        screen_level: updatedScreen.screenLevel,
        screen_pic: updatedScreen.imageFile, // Base64 image string
        project_id: updatedScreen.projectId,
        is_deleted: updatedScreen.isDeleted,
      };

      try {
        const response = await this.$axios.put(
          `/screens/updateScreen/${screenId}`,
          screenData
        );

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Screen updated successfully",
            confirmButtonColor: "#009933",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update the screen",
            confirmButtonColor: "#009933",
          });
        }
      } catch (error) {
        console.error("An error occurred while updating the screen:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred",
          confirmButtonColor: "#009933",
        });
      } finally {
        this.reloadPage();
      }
    },
  },
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
.circular-progress-right {
  display: flex;
  justify-content: flex-end;
}
.large-icon {
  font-size: 40px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>