<template>
  <v-card>
    <v-list>
      <v-list-item v-for="notification in notifications" :key="notification.id">
        <v-list-item-avatar>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on">
                <img
                  :src="getSenderPic(notification.sender_id)"
                  alt="User Pic"
                />
              </v-avatar>
            </template>
            <span>{{ getTooltipText(notification.sender_id) }}</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-content>
          <!-- <v-list-item-title>
                Topic: {{ notification.topic }}
              </v-list-item-title> -->
          <v-list-item-title>
            Message : {{ notification.message }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ formatDate(notification.created_at) }}
          </v-list-item-subtitle>
          <!-- <v-list-item-subtitle>
                From {{ getSenderName(notification.sender_id) }}
              </v-list-item-subtitle> -->
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                color="primary"
                @click="markAsRead(notification.id)"
                v-if="!notification.is_read"
              >
                mdi-check-circle
              </v-icon>
            </template>
            <span>Acknowledge</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      user: this.$auth.user,
      notifications: [],
      users: {}, // เก็บข้อมูลผู้ใช้
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

        const userIds = [
          ...new Set(data.map((notification) => notification.sender_id)),
        ];
        await Promise.all(
          userIds.map(async (id) => {
            const response = await this.$axios.get(`/users/getOne/${id}`);
            this.$set(this.users, id, response.data[0]); // เก็บข้อมูลผู้ใช้
          })
        );
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
      const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formattedDate = new Date(date).toLocaleDateString(
        "en-GB",
        optionsDate
      );
      const formattedTime = new Date(date).toLocaleTimeString(
        "en-GB",
        optionsTime
      );

      return `Date : ${formattedDate} , Time : ${formattedTime}`;
    },
    getSenderName(id) {
      const user = this.users[id];
      return user ? `${user.user_firstname} ${user.user_lastname}` : "Unknown"; // เปลี่ยน 'Unknown' เป็นค่าเริ่มต้นที่คุณต้องการ
    },
    getSenderPic(id) {
      const user = this.users[id];
      return user && user.user_pic ? this.getBase64Image(user.user_pic) : ""; // เรียกใช้ฟังก์ชันเพื่อแปลง base64 string
    },
    getBase64Image(base64String) {
      if (!base64String) {
        return "";
      }
      if (base64String.startsWith("data:image/jpeg;base64,")) {
        return base64String;
      } else {
        return `data:image/jpeg;base64,${base64String}`;
      }
    },
    getTooltipText(id) {
      const user = this.users[id];
      return user
        ? `${user.user_position} : ${user.user_firstname} ${user.user_lastname}  `
        : "Unknown User";
    },
  },
};
</script>


<style scoped>
.v-card {
  box-shadow: none !important;
  /* เอาเงาออกจาก v-card */
  border: none !important;
  /* เอาเส้นขอบออกจาก v-card */
}
</style>
