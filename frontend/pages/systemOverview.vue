<template>
  <div class="dashboard">
    <!-- Back Button -->
    <button @click="goBack" class="back-button">Back</button>

    <h2>Tracking development work</h2>
    <input type="text" v-model="search" placeholder="Search for system...">
    <table>
      <thead>
        <tr>
          <th>System code</th>
          <th>System Name</th>
          <th>Estimated due date</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(system, index) in filteredSystems" :key="index">
          <td>TW-{{ system.code }}</td>
          <td>System{{ system.code }}</td>
          <td>{{ system.dueDate }}</td>
          <td>{{ system.progress }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systems: [
        { code: '01', dueDate: "12-12-2024", progress: 50 },
        { code: '02', dueDate: "12-12-2024", progress: 50 },
        { code: '03', dueDate: "12-12-2024", progress: 50 },
        { code: '04', dueDate: "12-12-2024", progress: 50 },
        { code: '05', dueDate: "12-12-2024", progress: 50 },
        { code: '06', dueDate: "12-12-2024", progress: 50 },
      ],
      search: '',
    };
  },
  computed: {
    filteredSystems() {
      return this.systems.filter(system => system.code.toString().includes(this.search));
    }
  },
  methods: {
    goBack() {
      // Implement the logic to go back as needed
      // For example, you can use Vue Router to navigate back
      // or use window.history.back() to go back in the browser history.
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

/* Back Button Styles */
.back-button {
  margin-right: 10px;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
