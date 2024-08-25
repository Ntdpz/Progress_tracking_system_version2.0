<template>
  <v-card>
    <v-card-title>
      <span class="headline">Task id: {{ taskId }}</span>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="historyTasks"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>History Tasks</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.task_progress="{ item }">
        <v-chip :color="getProgressColor(item.task_progress)" dark>
          {{ item.task_progress }}%
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      historyTasks: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Task Code", value: "task_Code" },
        { text: "Task Name", value: "task_name" },
        { text: "Details", value: "task_detail" },
        { text: "Status", value: "task_status" },
        { text: "Progress", value: "task_progress" },
        { text: "Start Date", value: "task_plan_start" },
        { text: "End Date", value: "task_plan_end" },
      ],
    };
  },

  watch: {
    taskId: 'fetchHistoryTasks',
  },

  async mounted() {
    await this.fetchHistoryTasks();
  },

  methods: {
    async fetchHistoryTasks() {
      try {
        const response = await this.$axios.$get(
          `/tasks/history_tasks/${this.taskId}`
        );
        this.historyTasks = response;
      } catch (error) {
        console.error("Error fetching history tasks:", error);
      }
    },

    getProgressColor(progress) {
      if (progress < 50) return "red";
      if (progress < 75) return "orange";
      return "green";
    },
  },
};
</script>
