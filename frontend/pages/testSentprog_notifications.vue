<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Send Notification</h1>
        <v-form v-model="formValid">
          <!-- ผู้รับ -->
          <v-select
            v-model="notificationData.id"
            :items="users"
            item-text="name"
            item-value="id"
            label="Select User to Notify"
            required
          >
            <template v-slot:selection="data">
              {{ data.item.id }} - {{ data.item.name }}
            </template>
            <template v-slot:item="data">
              {{ data.item.name }} ({{ data.item.user_position }})
            </template>
          </v-select>

          <!-- ข้อความแจ้งเตือน -->
          <v-textarea
            v-model="notificationData.message"
            label="Notification Message"
            rows="4"
            required
          ></v-textarea>

          <!-- ปุ่มส่งการแจ้งเตือน -->
          <v-btn
            :disabled="!formValid"
            color="primary"
            @click="sendNotification"
          >
            Send Notification
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formValid: false,
      users: [], // รายชื่อผู้ใช้ที่สามารถรับการแจ้งเตือนได้
      notificationData: {
        recipientId: null,
        message: "",
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // ฟังก์ชันดึงรายชื่อผู้ใช้จาก API
    async fetchUsers() {
      try {
        const { data } = await this.$axios.get("/users/getAll");
        this.users = data.map((user) => ({
          id: user.id,
          name: user.user_firstname,
          user_position: user.user_position,
        }));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    // ฟังก์ชันส่งการแจ้งเตือน
    async sendNotification() {
      try {
        const payload = {
          recipientId: this.notificationData.id,
          message: this.notificationData.message,
          senderId: this.$auth.user.id,
        };

        console.log("Payload:", payload); // ตรวจสอบค่า payload ในคอนโซล

        const response = await this.$axios.post(
          "/prog_notifications/send",
          payload
        );
        console.log("Response:", response); // ตรวจสอบค่า response ในคอนโซล

        this.$toast.success("Notification sent successfully");
        this.clearForm();
      } catch (error) {
        // ตรวจสอบว่าข้อผิดพลาดมีค่าและจัดการกับมัน
        const errorMessage =
          error.response?.data?.message || "Failed to send notification";
        this.$toast.error(errorMessage);
        console.error("Failed to send notification:", error);
      }
    },
    // ล้างฟอร์มหลังจากส่ง
    clearForm() {
      this.notificationData = {
        recipientId: null,
        message: "",
      };
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
