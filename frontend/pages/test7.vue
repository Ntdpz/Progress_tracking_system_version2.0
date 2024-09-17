<template>
  <v-container>
    <v-form @submit.prevent="sendNotification">
      <v-text-field
        v-model="recipientId"
        label="Recipient ID"
        type="number"
        required
      ></v-text-field>

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
      recipientId: "",
      alertMessage: "",
      alertType: "",
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async sendNotification() {
      try {
        const response = await this.$axios.post("/prog_notifications/send", {
          topic: "Your Default Topic",
          message: `สวัสดีฉันคือ ${this.user.user_firstname} กำลังส่งถึง ${this.recipientId}`,
          senderId: this.user.id, // ใส่ ID ของผู้ส่งที่คุณต้องการ
          recipientId: this.recipientId,
        });

        this.alertMessage = response.data.message;
        this.alertType = "success";
      } catch (error) {
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
