<template>
  <v-container>
    <v-btn fab color="primary" dark @click="onClick" class="floating-button">
      <v-badge :content="notificationCount" color="red" overlap class="badge">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>

    <!-- Snackbar สำหรับการแจ้งเตือนใหม่ -->
    <v-snackbar
      v-model="showNewNotificationSnackbar"
      timeout="5000"
      bottom
      right
    >
      <span>มีการแจ้งเตือนใหม่</span>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      notifications: [],
      previousNotifications: [],
      notificationCount: 0,
      formValid: false,
      showNewNotificationSnackbar: false,
    };
  },

  async mounted() {
    await this.fetchNotifications();
    this.startPolling();
  },
  beforeDestroy() {
    clearInterval(this.pollingInterval);
  },
  methods: {
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
      }, 1000);
    },
  },
};
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.badge {
  position: absolute;
  top: -13px;
  right: 16px;
}

.v-snackbar__content {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
