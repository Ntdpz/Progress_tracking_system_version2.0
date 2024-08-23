<template>
  <div>
    <v-data-table
      v-if="tasks.length > 0"
      :headers="headers"
      :items="tasks"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>จำนวนงาน: {{ taskCount }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
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
      headers: [
        { text: "Task Name", value: "task_name" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Due Date", value: "due_date" },
      ],
    };
  },
  computed: {
    taskCount() {
      return this.tasks.length; // นับจำนวน tasks
    },
  },
  async mounted() {
    await this.fetchTasks();

    // ถ้าไม่มี tasks ให้แจ้งกลับไปยัง component หลัก
    if (this.tasks.length === 0) {
      this.$emit("no-tasks");
    }
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$axios.get(
          `/tasks/searchByProjectId/${this.projectId}`
        );
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
  },
};
</script>

<style scoped>
</style>
