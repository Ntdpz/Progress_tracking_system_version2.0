<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Notifications for {{ user.user_role }}</h1>
        <v-list>
          <v-list-item
            v-for="notification in notifications"
            :key="notification.id"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="notification.message"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="formatDate(notification.created_at)"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="primary"
                @click="markAsRead(notification.id)"
                v-if="!notification.is_read"
              >
                Mark as Read
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      user: this.$auth.user,
      notifications: [],
    };
  },
  created() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      try {
        const { data } = await this.$axios.get(
          `/prog_notifications/getNotifications/${this.user.id}`
        );
        this.notifications = data;
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    },
    async markAsRead(notificationId) {
      try {
        await this.$axios.put(
          `/prog_notifications/markAsRead/${notificationId}`
        );
        this.fetchNotifications(); // Reload notifications after marking as read
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
