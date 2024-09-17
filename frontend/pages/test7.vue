<template>
  <v-container>
    <v-form @submit.prevent="sendNotification">
      <v-select
        v-model="recipientId"
        :items="users"
        item-text="user_firstname"
        item-value="id"
        label="Select Recipients"
        multiple
        required
      ></v-select>

      <v-btn @click="sendNotification" color="primary">Send Notification</v-btn>

      <v-alert v-if="alertMessage" :type="alertType" dismissible>
        {{ alertMessage }}
      </v-alert>
    </v-form>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      recipientId: [],
      recipientNames: [],
      users: [],
      alertMessage: "",
      alertType: "",
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  watch: {
    recipientId(newIds) {
      // เมื่อ recipientId เปลี่ยน จะอัปเดต recipientNames
      this.updateRecipientNames(newIds);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get("/users/getAll");
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    },
    updateRecipientNames(newIds) {
      // อัปเดตชื่อของผู้ใช้ที่ถูกเลือก (firstname + lastname)
      this.recipientNames = this.users
        .filter((user) => newIds.includes(user.id))
        .map((user) => `${user.user_firstname} ${user.user_lastname}`);
    },
    async sendNotification() {
      try {
        const senderName = `${this.user.user_firstname} ${this.user.user_lastname}`;

        // ลูปผ่านรายชื่อและ ID ของผู้รับแต่ละคน
        for (let i = 0; i < this.recipientNames.length; i++) {
          const recipientName = this.recipientNames[i]; // ชื่อผู้รับปัจจุบัน
          const recipientId = this.recipientId[i]; // ID ผู้รับปัจจุบัน

          // สร้างข้อความแยกกันสำหรับแต่ละผู้รับ
          const message = `สวัสดีฉันคือ ${senderName} กำลังส่งถึงผู้ใช้ ${recipientName}`;

          // ส่งการแจ้งเตือนสำหรับผู้รับแต่ละคน
          const response = await this.$axios.post("/prog_notifications/send", {
            topic: "Your Default Topic",
            message: message,
            senderId: this.user.id, // ID ของผู้ส่ง
            recipientIds: [recipientId], // ส่ง ID ของผู้รับเป็นอาเรย์
          });

          // อัปเดตข้อความแจ้งเตือนเมื่อสำเร็จ
          this.alertMessage = response.data.message;
          this.alertType = "success";
        }
      } catch (error) {
        console.error(
          "Error sending notification:",
          error.response ? error.response.data : error.message
        );
        this.alertMessage = "Failed to send notification";
        this.alertType = "error";
      }
    },
  },
};
</script>

<style scoped>
/* สไตล์สำหรับฟอร์มและปุ่มสามารถปรับได้ที่นี่ */
</style>
