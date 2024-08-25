<template>
  <div>
    <p>Task ID: {{ task.id }}</p>
    <v-form ref="form">
      <!-- ฟอร์มของคุณ -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="taskData.task_progress"
            label="Task Progress (%)"
            type="number"
            min="0"
            max="100"
            required
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

      <v-text-field
        v-model="taskData.task_detail"
        label="Remark"
        required
      ></v-text-field>

      <v-row>
        <v-col cols="6">
          <v-menu
            v-model="menuPlanStart"
            :close-on-content-click="false"
            transition="slide-x-reverse-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                :value="formattedTaskData.task_plan_start"
                label="Plan Start Date"
                readonly
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="taskData.task_plan_start"
              @input="menuPlanStart = false"
              :format="dateFormat"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu
            v-model="menuPlanEnd"
            :close-on-content-click="false"
            transition="slide-x-reverse-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                :value="formattedTaskData.task_plan_end"
                label="Plan End Date"
                readonly
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="taskData.task_plan_end"
              @input="menuPlanEnd = false"
              :format="dateFormat"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-menu
            v-model="menuActualStart"
            :close-on-content-click="false"
            transition="slide-x-reverse-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                :value="formattedTaskData.task_actual_start"
                label="Actual Start Date"
                readonly
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="taskData.task_actual_start"
              @input="menuActualStart = false"
              :format="dateFormat"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu
            v-model="menuActualEnd"
            :close-on-content-click="false"
            transition="slide-x-reverse-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-bind="attrs"
                v-on="on"
                :value="formattedTaskData.task_actual_end"
                label="Actual End Date"
                readonly
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="taskData.task_actual_end"
              @input="menuActualEnd = false"
              :format="dateFormat"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <history_task_table :taskId="task.id" />

      <v-btn color="primary" @click="updateTask">Save</v-btn>
      <v-btn color="secondary" @click="$emit('close-dialog')">Close</v-btn>
    </v-form>
  </div>
</template>

<script>
import history_task_table from "./history_task_table.vue";

export default {
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
      taskData: { ...this.task }, // ทำสำเนา task เพื่อแก้ไข
      formattedTaskData: {
        // สำหรับการแสดงผล
        task_plan_start: this.formatDate(this.task.task_plan_start),
        task_plan_end: this.formatDate(this.task.task_plan_end),
        task_actual_start: this.formatDate(this.task.task_actual_start),
        task_actual_end: this.formatDate(this.task.task_actual_end),
      },
      menuPlanStart: false,
      menuPlanEnd: false,
      menuActualStart: false,
      menuActualEnd: false,
      taskStatusOptions: ["Not Started", "In Progress", "Completed"],
      dateFormat: "dd/MM/yyyy" // กำหนดรูปแบบวันที่
    };
  },
  watch: {
    task: {
      handler(newTask) {
        this.taskData = { ...newTask }; // อัปเดต taskData เมื่อ task prop เปลี่ยนแปลง
        this.formattedTaskData = {
          // อัปเดต formattedTaskData
          task_plan_start: this.formatDate(newTask.task_plan_start),
          task_plan_end: this.formatDate(newTask.task_plan_end),
          task_actual_start: this.formatDate(newTask.task_actual_start),
          task_actual_end: this.formatDate(newTask.task_actual_end),
        };
      },
      deep: true, // ใช้ deep watch หาก task มี properties ที่ซับซ้อน
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`; // รูปแบบ dd/MM/yyyy
    },
    updateTaskDate(field, value) {
      // รับค่าในรูปแบบ dd/MM/yyyy
      const [day, month, year] = value.split("/").map(Number);
      this.taskData[field] = new Date(year, month - 1, day)
        .toISOString()
        .split("T")[0]; // แปลงเป็น yyyy-MM-dd
    },
    async updateTask() {
      if (this.$refs.form.validate()) {
        try {
          const response = await this.$axios.put(
            `/save_history_tasks/${this.taskData.id}`,
            {
              task_name: this.taskData.task_name,
              task_detail: this.taskData.task_detail,
              task_status: this.taskData.task_status,
              task_progress: this.taskData.task_progress,
              task_plan_start: this.taskData.task_plan_start,
              task_plan_end: this.taskData.task_plan_end,
              task_actual_start: this.taskData.task_actual_start,
              task_actual_end: this.taskData.task_actual_end,
              task_manday: this.taskData.task_manday,
              task_member_id: this.taskData.task_member_id,
              user_update: this.taskData.user_update || 11, // ใส่ user_update ค่าเริ่มต้น
            }
          );

          console.log("Task updated successfully:", response.data);
          this.$emit("task-updated", this.taskData); // ส่งข้อมูลกลับไปยัง parent
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
    },
  },
};
</script>
