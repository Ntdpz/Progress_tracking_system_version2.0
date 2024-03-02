<template>
  <!-- Project Details container -->
  <div class="dashboard">
    <!-- Greeting and current date/time -->
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1 class="text-01">{{ greeting }}, Bee</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>
    </v-row>

    <!-- Project Details -->
    <div class="project-details">
      <!-- Project Details -->
      <div v-if="project">
        <h1>{{ project.project_name_ENG }}</h1>
        <p>Project ID: {{ project.project_id }}</p>
        <p>Project Name (TH): {{ project.project_name_TH }}</p>
        <!-- Add more details as needed -->
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProjectDetails",
  data() {
    return {
      project: null,
      greeting: "",
      currentDateTime: ""
    };
  },
  async mounted() {
    // Fetch project details based on the ID from the route params
    const projectId = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:7777/projects/getOne/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const data = await response.json();
      this.project = data;
    } catch (error) {
      console.error("Error fetching project details:", error);
    }

    // Update date and time
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      this.greeting = this.getGreeting(now);
      this.currentDateTime = now.toLocaleDateString("en-US", options);
    },
    getGreeting(date) {
      const hour = date.getHours();

      if (hour >= 0 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
  }
};
</script>

<style scoped>
.text-01 {
  color: black !important;
}

.project-details {
  background-color: #ffffff;
  padding: 10px 70px;
  border-radius: 0;
  margin-right: 30px;
}

.project-details h1 {
  margin-bottom: 10px;
}

.project-details p {
  margin-bottom: 5px;
}

.project-details p:last-child {
  margin-bottom: 0;
}

</style>
