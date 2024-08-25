<template>
  <div>
    <!-- ตารางสำหรับแสดง Tasks -->
    <v-card-title>
      All your tasks in Project : Today's Date:
      {{ today }}
    </v-card-title>

    <v-data-table
      v-if="tasks.length > 0"
      :headers="headers"
      :items="tasks"
      class="elevation-1"
      item-key="task_id"
    >
      <!-- คุณสามารถเพิ่มการปรับแต่งเพิ่มเติมได้ใน slot item -->
      <template v-slot:item.task_plan_start="{ item }">
        {{ formatDate(item.task_plan_start) }}
      </template>

      <template v-slot:item.task_plan_end="{ item }">
        {{ formatDate(item.task_plan_end) }}
      </template>
    </v-data-table>

    <!-- กรณีไม่มี Tasks -->
    <p v-else>No tasks found for this project.</p>
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      tasks: [],
      today: this.formatDate(new Date()), // เก็บข้อมูล Tasks ที่ดึงมาจาก API
      headers: [
        { text: "System", value: "system_nameEN" },
        { text: "Screen", value: "screen_name" },
        { text: "Task Name", value: "task_name" },
        { text: "Progress", value: "task_progress" },
        { text: "Plan Start Date", value: "task_plan_start" },
        { text: "Plan End Date", value: "task_plan_end" },
        { text: "Action" },
      ], // กำหนดส่วนหัวของตาราง
    };
  },
  computed: {
    taskCount() {
      // นับจำนวน tasks ที่มีอยู่ในตาราง
      return this.tasks.length;
    },
  },
  mounted() {
    this.fetchTasks(); // เรียกใช้ method เมื่อ component ถูก mounted
  },
  methods: {
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async fetchTasks() {
      try {
        // เรียก API เพื่อดึง Tasks ตาม projectId
        const response = await this.$axios.get(
          `/tasks/searchByProjectId/${this.projectId}`
        );
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
  },
};
</script>
