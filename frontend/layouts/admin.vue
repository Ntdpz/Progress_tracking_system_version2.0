<template>
  <v-app dark>
    <!-- Navigation drawer -->
    <v-navigation-drawer persistent app>
      <!-- Logo -->
      <v-list-item class="pt-1 pb-5">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-layout align-center justify-center>
              <!-- Main logo -->
              <nuxt-link to="/">
                <v-img
                  lazy-src="/mainlogo.png"
                  max-height="150"
                  max-width="100"
                  src="/mainlogo.png"
                ></v-img>
              </nuxt-link>
            </v-layout>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Home button -->
      <v-list class="pt-0" dense rounded>
        <v-list-item @click="navigateTo('/')">
          <v-list-item-action>
            <v-icon color="black">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Admin menu items -->
      <v-list class="pa-0" v-show="user_role == 'Admin'" dense rounded>
        <!-- ติดตามงาน Menu -->
        <v-list-group
          v-model="reportActiveworktracking"
          :prepend-icon="'mdi-pencil'"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>TrackProgress</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            @click="navigateTo('/Progress_Tracking/Dashbord_Progress_Tracking')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-table-edit</v-icon>
                Dashbord
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="
              navigateTo('/Progress_Tracking/manageProject_Progress_Tracking')
            "
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-puzzle</v-icon>
                Project
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- รายงานปัญหา Menu -->
        <v-list-group
          v-model="reportIssueGroupActive"
          :prepend-icon="'mdi-alert-circle'"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>ReportIssue</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item @click="navigateTo('/custom/reportList')">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2"
                  >mdi-format-list-bulleted</v-icon
                >
                แสดงรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="navigateTo('/custom/reportCreate')">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-pencil</v-icon>
                แจ้งรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="navigateTo('/Note_Management/dashboard_Note_Management')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-table</v-icon>
                Dashbord
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="navigateTo('/Note_Management/schedule_Note_Management')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-calendar-month</v-icon>
                ตารางงาน
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="navigateTo('/Note_Management/dashboard_Note_Management')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-view-dashboard</v-icon>
                แดชบอร์ดรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- รายงานปัญหาเก่า -->
        <v-list-group
          v-for="(project, index) in project_issues"
          :key="index"
          :prepend-icon="project.action"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>รายงานปัญหาเก่า</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in project.projectList"
            :key="child.id"
            :to="`/Note_Management/issueList/${child?.id}`"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2"
                  >mdi-format-list-bulleted</v-icon
                >
                {{ child.project_name_ENG }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- ManageUsers button -->
        <v-list class="pt-0" dense rounded>
          <v-list-item @click="navigateTo('/manageUser')">
            <v-list-item-action>
              <v-icon color="black">mdi-account</v-icon>
              <!-- ใส่ไอคอนที่ต้องการ -->
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title color="red">ManageUsers</v-list-item-title>
              <!-- ข้อความที่ต้องการ -->
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>

      <!-- UserDev menu items -->
      <v-list
        class="pa-0"
        v-show="user_position == 'Developer' && user_role !== 'Admin'"
        dense
        rounded
      >
        <!-- ติดตามงาน Menu -->
        <v-list-group
          v-model="reportActiveworktracking"
          :prepend-icon="'mdi-pencil'"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>ProgressTrack</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            @click="
              navigateTo('/Progress_Tracking/manageProject_Progress_Tracking')
            "
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-puzzle</v-icon>
                Project
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- UserImp menu items -->
      <v-list
        class="pa-0"
        v-show="user_position == 'Implementer' && user_role !== 'Admin'"
        dense
        rounded
      >
        <!-- รายงานปัญหา Menu -->
        <v-list-group
          v-model="reportIssueGroupActive"
          :prepend-icon="'mdi-alert-circle'"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>ReportIssue</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item @click="navigateTo('/custom/reportList')">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2"
                  >mdi-format-list-bulleted</v-icon
                >
                แสดงรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="navigateTo('/custom/reportCreate')">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-pencil</v-icon>
                แจ้งรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="navigateTo('/Note_Management/schedule_Note_Management')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-calendar-month</v-icon>
                ตารางงาน
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="navigateTo('/Note_Management/dashboard_Note_Management')"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2">mdi-view-dashboard</v-icon>
                แดชบอร์ดรายงานปัญหา
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- รายงานปัญหาเก่า -->
        <v-list-group
          v-for="(project, index) in project_issues"
          :key="index"
          :prepend-icon="project.action"
          no-action
          class="pl-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>รายงานปัญหาเก่า</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in project.projectList"
            :key="child.id"
            :to="`/Note_Management/issueList/${child?.id}`"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="primary" class="mr-2"
                  >mdi-format-list-bulleted</v-icon
                >
                {{ child.project_name_ENG }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- Logout button -->
      <v-list class="pt-0" dense rounded>
        <v-list-item @click="handleLogout()">
          <v-list-item-action>
            <v-icon color="red">mdi-logout</v-icon>
            <!-- ใส่ไอคอนที่ต้องการ -->
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title color="red">Log out</v-list-item-title>
            <!-- ข้อความที่ต้องการ -->
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- User information -->
      <template v-slot:append>
        <div class="pa-5">
          <v-card elevation="0">
            <v-row align="center">
              <v-col cols="2">
                <!-- User avatar -->
                <v-avatar size="40">
                  <img :src="user_pic" alt="User Avatar" />
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <v-col>
                  <v-row>
                    <p class="ml-2 mb-0" style="font-size: 15px">
                      {{ user?.user_firstname }}
                    </p>
                  </v-row>
                  <v-row>
                    <p class="ml-2 mb-0" style="font-size: 15px">
                      {{ user?.user_role }}
                    </p>
                  </v-row>
                </v-col>
              </v-col>
              <v-col cols="2" class="pa-0">
                <!-- Edit profile button -->
                <v-btn icon to="/profile"
                  ><v-icon small color="primary">mdi-pencil</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App bar -->
    <v-app-bar
      :clipped-left="clipped"
      app
      style="height: 49px"
      class="app-bar"
      color="blacl"
      elevation="1"
      outlined
    >
      <!-- Back button -->
      <v-btn icon class="mb-3" color="primary" @click="goBack">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- Forward button -->
      <v-btn icon class="mb-3" color="primary" @click="goForward">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <!-- App title -->
      <v-toolbar-title class="app-title mb-3">
        <h4>Progress Tracking</h4>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        icon
        class="app-title mb-3"
        color="primary"
        @click="openNotifications"
      >
        <template v-if="notificationCount > 0">
          <v-badge color="red" :content="notificationCount" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </template>
        <template v-else>
          <v-icon>mdi-bell</v-icon>
        </template>
      </v-btn>

      <v-dialog
        v-model="dialogNotifications"
        max-width="750px"
        max-hight="750px"
        scrollable
      >
        <v-card>
          <notification_button />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog" color="error">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import notification_button from "./../components/Progress_tracking/Notification/DialogDeteailNotificatiomn.vue";
export default {
  middleware: "auth",
  components: {
    notification_button,
  },
  data() {
    return {
      dialogNotifications: false,
      notificationCount: 0,
      reportActiveworktracking: false,
      reportIssueGroupActive: false,

      project_name_ENG: "",
      // Auth
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      clipped: false,

      user_role: "",
      user_position: "",
      ownProject: [],
      projectIds: [],
      projectDetails: [
        // Existing items
        {
          action: "mdi-alert-circle",
          active: false,
          title: "รายงานปัญหา",
          projectList: [
            {
              id: 1,
              project_name_ENG: "แสดงรายงานปัญหา",
              path: "/custom/reportList",
            },
            {
              id: 2,
              project_name_ENG: "แจ้งรายงานปัญหา",
              path: "/custom/reportCreate",
            },
          ],
        },
      ],

      logout: [
        {
          icon: "mdi-logout",
          title: "ออกจากระบบ",
        },
      ],

      project_issues: [
        {
          action: "mdi-alert-circle",
          active: false,
          title: "รายงานปัญหา",
        },
      ],

      menuOption: [],
      right: true,
      rightDrawer: false,
      title: "Note Management",
      user_pic: "",
    };
  },
  async mounted() {
    await this.fetchNotifications();
    this.startPolling();
    this.$store.dispatch("setDrawer", true);

    await this.$axios.get("/projects/getAll").then((res) => {
      res.data.forEach((project) => {
        project.active = false; // Initialize active property to false
      });
      this.project_issues[0].projectList = res.data;
    });
    await this.getUser();
  },
  async beforeDestroy() {
    this.$store.dispatch("setDrawer", false);
  },
  async created() {
    await this.getUser();
  },
  computed: {},
  methods: {
    openNotifications() {
      this.dialogNotifications = true; // Open the dialog
    },
    closeDialog() {
      this.dialogNotifications = false; // Close the dialog
    },
    async fetchNotifications() {
      try {
        const { data } = await this.$axios.get(
          `/prog_notifications/getNotifications/${this.user.id}`
        );
        this.notifications = data;

        // คำนวณจำนวนการแจ้งเตือนที่ยังไม่อ่าน
        const unreadNotifications = data.filter(
          (notification) => notification.is_read === 0
        );
        this.notificationCount = unreadNotifications.length;

        // ตรวจสอบค่าเริ่มต้นของ previousNotifications
        this.previousNotifications = this.previousNotifications || [];

        // เปรียบเทียบข้อมูลการแจ้งเตือนใหม่กับข้อมูลเดิม
        const previousUnreadNotifications = this.previousNotifications.filter(
          (notification) => notification.is_read === 0
        );
        if (previousUnreadNotifications.length < unreadNotifications.length) {
          this.showNewNotificationSnackbar = true;
          setTimeout(() => {
            this.showNewNotificationSnackbar = false;
          }, 5000);
        }

        // อัปเดตข้อมูลการแจ้งเตือนก่อนหน้า
        this.previousNotifications = data;
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    },
    startPolling() {
      // รีเฟรชข้อมูลทุก ๆ 15 วินาที
      this.pollingInterval = setInterval(() => {
        this.fetchNotifications();
      }, 50000);
    },
    goBack() {
      this.$router.back();
    },
    goForward() {
      this.$router.forward();
    },
    navigateTo(path) {
      window.location.href = path;
    },
    goBack() {
      this.$router.back();
    },
    // Function to go forward
    goForward() {
      this.$router.forward();
    },

    async getUser() {
      await this.$axios
        .get("/users/getOne/" + this.$auth.user.id)
        .then((res) => {
          this.user_role = res.data[0]?.user_role;
          this.user_pic = res.data[0]?.user_pic;
          this.user_position = res.data[0]?.user_position;
        });
    },
    async handleLogout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.v-list-group >>> i {
  color: black;
}
.app-title {
  margin: left;
}
</style>
