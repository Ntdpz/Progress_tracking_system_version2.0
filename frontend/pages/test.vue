<template>
  <div class="All">
    <input type="text" v-model="searchQuery" placeholder="Search task name">
    <v-row>
      <v-col
        v-for="task in filteredTasks"
        :key="task.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <TaskCard
          :task="task"
          class="task-card">
          
        </TaskCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TaskCard from '../components/TaskComponent/TaskCard.vue';

export default {
  name: 'TestPage',
  components: {
    TaskCard
  },
  data() {
    return {
      searchQuery: '',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          assignee: 'John Doe',
          estimateHours: 8,
          planStart: '21/02/204',
          planEnd: '23/02/204',
          actualStart: '',
          actualEnd: '',
          taskDetail: 'Task 1 Detail',
        },
        {
          id: 2,
          name: 'Task 2',
          assignee: 'Jane Smith',
          estimateHours: 6,
          planStart: '22/02/204',
          planEnd: '25/02/204',
          actualStart: '',
          actualEnd: '',
          taskDetail: 'Task 2 Detail',
        },
        // Add more tasks as needed
      ]
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => task.name.includes(this.searchQuery));
    }
  }
}
</script>

<style scoped>
.All {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.task-card {
  /* Add your component styles here */
}
</style>
