<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Responsible Screen Dashboard</v-toolbar-title>
        </v-toolbar>
      </template>

      <!-- กำหนด columns ที่ต้องการแสดงในตาราง -->
      <template v-slot:item.screen_id="{ item }">
        <td>{{ item.screen_id }}</td>
      </template>
      <template v-slot:item.screen_name="{ item }">
        <td>{{ item.screen_name }}</td>
      </template>
      <template v-slot:item.screen_status="{ item }">
        <td>{{ item.screen_status }}</td>
      </template>
      <template v-slot:item.screen_level="{ item }">
        <td>{{ item.screen_level }}</td>
      </template>
      <template v-slot:item.screen_manday="{ item }">
        <td>{{ item.screen_manday }}</td>
      </template>
      <template v-slot:item.screen_pic="{ item }">
        <td>
          <img
            :src="getImageSrc(item.screen_pic)"
            alt="Screen Picture"
            width="100"
          />
        </td>
      </template>
      <template v-slot:item.screen_type="{ item }">
        <td>{{ item.screen_type }}</td>
      </template>
      <template v-slot:item.screen_progress="{ item }">
        <td>{{ item.screen_progress }}</td>
      </template>
      <template v-slot:item.screen_progress_status_design="{ item }">
        <td>{{ item.screen_progress_status_design }}</td>
      </template>
      <template v-slot:item.screen_progress_status_dev="{ item }">
        <td>{{ item.screen_progress_status_dev }}</td>
      </template>
      <template v-slot:item.screen_progress_status_testing="{ item }">
        <td>{{ item.screen_progress_status_testing }}</td>
      </template>
      <template v-slot:item.task_count="{ item }">
        <td>{{ item.task_count }}</td>
      </template>
      <template v-slot:item.screen_plan_start="{ item }">
        <td>{{ new Date(item.screen_plan_start).toLocaleDateString() }}</td>
      </template>
      <template v-slot:item.screen_plan_end="{ item }">
        <td>{{ new Date(item.screen_plan_end).toLocaleDateString() }}</td>
      </template>
      <template v-slot:item.is_deleted="{ item }">
        <td>{{ item.is_deleted ? "Yes" : "No" }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  middleware: "auth", // ใช้ middleware auth เพื่อให้แน่ใจว่าผู้ใช้ได้รับการตรวจสอบสิทธิ์แล้ว
  data() {
    return {
      items: [], // ข้อมูลที่จะแสดงในตาราง
      headers: [
        { text: "Screen ID", value: "screen_id" },
        { text: "Screen Name", value: "screen_name" },
        { text: "Status", value: "screen_status" },
        { text: "Level", value: "screen_level" },
        { text: "Manday", value: "screen_manday" },
        { text: "Picture", value: "screen_pic" },
        { text: "Type", value: "screen_type" },
        { text: "Progress", value: "screen_progress" },
        { text: "Design Status", value: "screen_progress_status_design" },
        { text: "Development Status", value: "screen_progress_status_dev" },
        { text: "Testing Status", value: "screen_progress_status_testing" },
        { text: "Task Count", value: "task_count" },
        { text: "Plan Start", value: "screen_plan_start" },
        { text: "Plan End", value: "screen_plan_end" },
        { text: "Deleted", value: "is_deleted" },
      ],
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const userId = this.$auth.user.id; // ดึง user ID จาก $auth.user
        const response = await this.$axios.$get(
          `/dashbord/user-screens/${userId}`
        ); // ใช้ axios เพื่อเรียกข้อมูลจาก API
        this.items = response; // สมมติว่า response เป็นอาร์เรย์ของข้อมูล
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getImageSrc(base64) {
      return `data:image/jpeg;base64,${base64}`; // ปรับชนิดของภาพตามที่ API ส่งมา เช่น 'image/png', 'image/jpeg'
    },
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์ของ Component ที่นี่ */
</style>
