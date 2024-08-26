<template>
  <div>
    <p>task name : {{ task.task_name }}</p>

    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="task.task_detail"
            name="Remark"
            label="Task Detail"
            placeholder="Enter task details"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="taskData.task_progress"
            label="Task Progress (%)"
            type="number"
            min="0"
            max="100"
            required
            @input="calculateTaskStatus"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-slider
            v-model="taskData.task_progress"
            min="0"
            max="100"
            step="1"
            thumb-label="always"
            required
          ></v-slider>
        </v-col>
      </v-row>

      <v-row>
        <!-- Task Plan Start -->
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu.task_plan_start"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="taskData.task_plan_start"
                label="Task Plan Start"
                type="date"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="taskData.task_plan_start"
              :max="taskData.task_plan_end || undefined"
              @input="updatePlanDates('start')"
            />
          </v-menu>
        </v-col>

        <!-- Task Plan End -->
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu.task_plan_end"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="taskData.task_plan_end"
                label="Task Plan End"
                type="date"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="taskData.task_plan_end"
              :min="taskData.task_plan_start || undefined"
              @input="updatePlanDates('end')"
            />
          </v-menu>
        </v-col>

        <!-- Plan Manday -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="taskData.plan_manday"
            label="Plan Manday"
            type="number"
            min="0"
            disabled
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- Task Actual Start -->
        <v-col cols="12" sm="4">
          <v-menu
            v-model="menu.task_actual_start"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="taskData.task_actual_start"
                label="Task Actual Start"
                type="date"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="taskData.task_actual_start"
              @input="menu.task_actual_start = false"
              :max="taskData.task_actual_end"
            />
          </v-menu>
        </v-col>

        <!-- Task Actual End -->
        <v-col cols="12" sm="4">
          <v-menu
            v-model="menu.task_actual_end"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="taskData.task_actual_end"
                label="Task Actual End"
                type="date"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="taskData.task_actual_end"
              @input="menu.task_actual_end = false"
              :min="taskData.task_actual_start"
            />
          </v-menu>
        </v-col>

        <!-- Actual Manday -->
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="taskData.Actual_manday"
            label="Actual Manday"
            type="number"
            min="0"
            disabled
          />
        </v-col>
      </v-row>
    </v-form>
    <history_task_table :taskId="task.id" />

    <v-btn color="primary" @click="updateTask">Save</v-btn>
    <v-btn color="secondary" @click="$emit('close-dialog')">Close</v-btn>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import history_task_table from "./history_task_table.vue";

export default {
  middleware: "auth",
  components: {
    history_task_table,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.$auth.user,
      Plan_manday: 0,
      Actual_manday: 0,
      menu: {
        task_plan_start: false,
        task_plan_end: false,
        task_actual_start: false,
        task_actual_end: false,
      },
      taskData: {
        task_progress: 0,
        task_status: "",
        task_detail: "",
        task_plan_start: "",
        task_plan_end: "",
        plan_manday: 0,
        task_actual_start: "",
        task_actual_end: "",
        task_manday: 0,
      },
    };
  },
  mounted() {
    this.calculateTaskStatus();
  },
  watch: {
    "taskData.task_progress": function () {
      this.calculateTaskStatus();
    },
    "taskData.task_plan_start": "updatePlanDates",
    "taskData.task_plan_end": "updatePlanDates",
    "taskData.task_actual_start": "updateActualDates",
    "taskData.task_actual_end": "updateActualDates",
    task: {
      handler(newTask) {
        // ตรวจสอบว่า newTask มีวันที่และทำการแปลงวันที่เมื่อจำเป็น
        this.taskData = {
          task_progress: newTask.task_progress || 0,
          task_detail: newTask.task_detail || "",
          task_plan_start: newTask.task_plan_start
            ? this.formatDate(newTask.task_plan_start)
            : "",
          task_plan_end: newTask.task_plan_end
            ? this.formatDate(newTask.task_plan_end)
            : "",
          plan_manday: this.Plan_manday,
          task_actual_start: newTask.task_actual_start
            ? this.formatDate(newTask.task_actual_start)
            : "",
          task_actual_end: newTask.task_actual_end
            ? this.formatDate(newTask.task_actual_end)
            : "",
          Actual_manday: this.Actual_manday,
        };
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    calculateTaskStatus() {
      const progress = this.taskData.task_progress;

      if (progress === 0) {
        this.taskData.task_status = "Not started yet";
      } else if (progress > 0 && progress < 100) {
        this.taskData.task_status = "In Progress";
      } else if (progress === 100) {
        this.taskData.task_status = "Completed";
      }
    },
    updatePlanDates(type) {
      const start = new Date(this.taskData.task_plan_start);
      const end = new Date(this.taskData.task_plan_end);

      // ตรวจสอบวันเริ่มต้นและวันสิ้นสุด
      if (type === "start" && start > end) {
        this.taskData.task_plan_start = this.taskData.task_plan_end;
      } else if (type === "end" && end < start) {
        this.taskData.task_plan_end = this.taskData.task_plan_start;
      }

      // คำนวณ Plan Manday
      if (this.taskData.task_plan_start && this.taskData.task_plan_end) {
        const startDate = new Date(this.taskData.task_plan_start);
        const endDate = new Date(this.taskData.task_plan_end);
        const diffTime = endDate - startDate;
        this.taskData.plan_manday = Math.max(
          1,
          Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        ); // ถ้าวันเดียวกันให้นับเป็น 1 วัน
      }
    },
    updateActualDates() {
      const start = new Date(this.taskData.task_actual_start);
      const end = new Date(this.taskData.task_actual_end);

      // ตรวจสอบวันเริ่มต้นและวันสิ้นสุด
      if (start > end) {
        this.taskData.task_actual_start = this.taskData.task_actual_end;
      } else if (end < start) {
        this.taskData.task_actual_end = this.taskData.task_actual_start;
      }

      // คำนวณ Actual Manday
      if (this.taskData.task_actual_start && this.taskData.task_actual_end) {
        const startDate = new Date(this.taskData.task_actual_start);
        const endDate = new Date(this.taskData.task_actual_end);
        const diffTime = endDate - startDate;
        this.taskData.Actual_manday = Math.max(
          1,
          Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        ); // ถ้าวันเดียวกันให้นับเป็น 1 วัน
      }
    },
    formatDate(dateString) {
      if (!dateString) return ""; // ตรวจสอบค่าว่าง
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async updateTask() {
      try {
        // ตรวจสอบและแปลงค่าที่เป็นสตริงว่างให้เป็น null
        const formatDateValue = (value) => (value === "" ? null : value);

        // ส่งข้อมูลไปที่ API
        await this.$axios.put(`/tasks/save_history_tasks/${this.task.id}`, {
          task_name: this.task.task_name,
          task_detail: this.task.task_detail,
          task_progress: this.taskData.task_progress,
          task_plan_start: formatDateValue(this.taskData.task_plan_start),
          task_plan_end: formatDateValue(this.taskData.task_plan_end),
          task_actual_start: formatDateValue(this.taskData.task_actual_start),
          task_actual_end: formatDateValue(this.taskData.task_actual_end),
          user_update: this.user.id, // เปลี่ยนเป็น id ของผู้ใช้ที่ปัจจุบัน
          task_manday: this.taskData.Actual_manday,
          task_status: this.taskData.task_status,
        });

        // ใช้ SweetAlert2 ในการแจ้งเตือน
        Swal.fire({
          title: "Success",
          text: "Task updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$emit("close-dialog"); // ปิด Dialog เมื่อผู้ใช้กด OK
          }
        });
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire({
          title: "Error",
          text: "Error updating task",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<style>
</style>
