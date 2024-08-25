<template>
  <div>
    <!-- ตารางสำหรับแสดง Tasks -->
    <v-card-title>
      All your tasks in Project : Today's Date: {{ today }}
    </v-card-title>

    <!-- แสดงจำนวน tasks ที่กรองแล้ว และจำนวนที่เสร็จสมบูรณ์ -->
    <v-card-subtitle>
      Number of tasks displayed: {{ filteredTaskCount }} (Completed:
      {{ completedTaskCount }} / {{ filteredTaskCount }})
    </v-card-subtitle>

    <v-data-table
      v-if="tasks.length > 0"
      :headers="headers"
      :items="tasks"
      class="elevation-1"
      item-key="task_id"
      @click:row="handleRowClick"
    >
      <!-- แสดงวันที่เริ่มต้น -->
      <template v-slot:item.task_plan_start="{ item }">
        {{ formatDate(item.task_plan_start) }}
      </template>

      <!-- แสดงวันที่สิ้นสุด -->
      <template v-slot:item.task_plan_end="{ item }">
        {{ formatDate(item.task_plan_end) }}
      </template>

      <!-- แสดงไอคอนในคอลัมน์ Action -->
      <template v-slot:item.action="{ item }">
        <v-icon @click="viewTask(item)" color="primary">mdi-eye</v-icon>
        <v-icon @click="editTask(item)" color="warning">mdi-pencil</v-icon>
        <v-icon @click="deleteTask(item)" color="red">mdi-delete</v-icon>
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
      filteredTaskCount: 0,
      completedTaskCount: 0,
      tasks: [],
      today: this.formatDate(new Date()), // เก็บข้อมูล Tasks ที่ดึงมาจาก API

      headers: [
        { text: "System", value: "system_nameEN" },
        { text: "Screen", value: "screen_name" },
        { text: "Task Name", value: "task_name" },
        { text: "Progress", value: "task_progress" },
        { text: "Plan Start Date", value: "task_plan_start" },
        { text: "Plan End Date", value: "task_plan_end" },
        { text: "Action", value: "action" },
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
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },

    async fetchTasks() {
      try {
        // เรียก API เพื่อดึง Tasks ตาม projectId
        const response = await this.$axios.get(
          `/tasks/searchByProjectId/${this.projectId}`
        );

        // กรอง tasks ที่อยู่ระหว่างวันที่ task_plan_start และ task_plan_end เทียบกับวันนี้
        const today = new Date();
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const endOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ); // ใช้วันที่ถัดไปเพื่อรวมทั้งวัน

        const filteredTasks = response.data.filter((task) => {
          const startDate = new Date(task.task_plan_start);
          const endDate = new Date(task.task_plan_end);

          return startDate <= endOfToday && endDate >= startOfToday;
        });

        // คำนวณจำนวน tasks ที่เสร็จสมบูรณ์
        const completedTasks = filteredTasks.filter(
          (task) => task.task_progress == 100
        );

        this.tasks = filteredTasks;
        this.filteredTaskCount = filteredTasks.length; // อัปเดตจำนวน tasks ที่กรองแล้ว
        this.completedTaskCount = completedTasks.length; // อัปเดตจำนวน tasks ที่เสร็จสมบูรณ์
      } catch (error) {
        console.error("Error fetching tasks:");
      }
    },

    handleRowClick(item) {
      // แสดง screen_id ของแถวที่ถูกคลิก
      console.log("Clicked row screen_id:", item.screen_id);
    },

    // ฟังก์ชันที่เรียกใช้เมื่อคลิกไอคอน View
    viewTask(task) {
      console.log("Viewing task:", task);
      // เพิ่มโค้ดเพื่อแสดงรายละเอียด task
    },

    // ฟังก์ชันที่เรียกใช้เมื่อคลิกไอคอน Edit
    editTask(task) {
      console.log("Editing task:", task);
      // เพิ่มโค้ดเพื่อแก้ไข task
    },

    // ฟังก์ชันที่เรียกใช้เมื่อคลิกไอคอน Delete
    deleteTask(task) {
      console.log("Deleting task:", task);
      // เพิ่มโค้ดเพื่อทำการลบ task
    },
  },
};
</script>
