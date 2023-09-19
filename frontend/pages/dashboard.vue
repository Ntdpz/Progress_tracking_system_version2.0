<template>
  <div class="mx-auto">
    <v-row class="header" no-gutters>
      <v-col cols="1" class="pa-0 ml-5" style="text-align: center">
        <v-icon size="40px" color="primary">mdi-view-dashboard</v-icon></v-col
      >
      <v-col cols="10" style="align-self: center" class="pa-0">
        <h2>แดชบอร์ด</h2></v-col
      >
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "DashboardHeader",
  data() {
    return {
      reveal: false,
      projects: [
        {
          name: "Project 1",
          screens: [
            {
              name: "ชื่อหน้าจอ",
              PNI: 5, // Set a numeric value for PNI
              PNC: 15,
            },
            {
              name: "ชื่อหน้าจอ",
              PNI: 5, // Set a numeric value for PNI
              PNC: 15,
            },
            {
              name: "ชื่อหน้าจอ",
              PNI: 5, // Set a numeric value for PNI
              PNC: 15,
            },
            {
              name: "ชื่อหน้าจอ",
              PNI: 5, // Set a numeric value for PNI
              PNC: 15,
            },
          ],
        },
        {
          name: "Project 2",
          screens: [
            {
              name: "ชื่อหน้าจอ",
              tasks: ["Task 1", "Task 2"],
              PNI: 10, // Set a numeric value for PNI
              PNC: 20,
            },
            // Add more screens and tasks as needed
          ],
        },
        {
          name: "Project 2",
          screens: [
            {
              name: "ชื่อหน้าจอ",
              tasks: ["Task 1", "Task 2"],
              PNI: 10, // Set a numeric value for PNI
              PNC: 20,
            },
            // Add more screens and tasks as needed
          ],
        },
        {
          name: "Project 2",
          screens: [
            {
              name: "ชื่อหน้าจอ",
              tasks: ["Task 1", "Task 2"],
              PNI: 10, // Set a numeric value for PNI
              PNC: 20,
            },
            // Add more screens and tasks as needed
          ],
        },
        // Add more projects as needed
      ],
    };
  },
  computed: {
    totalTasks() {
      return this.project.screens.reduce(
        (total, screen) => total + screen.tasks,
        0
      );
    },
  },
  methods: {},
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>