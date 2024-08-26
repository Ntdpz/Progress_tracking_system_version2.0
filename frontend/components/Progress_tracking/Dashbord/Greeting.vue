<template>
  <div>
    <v-row no-gutters class="mt-4 justify-center">
      <v-col class="text-center" style="margin-right: 16px">
        <p class="text-01">{{ greeting }}, {{ currentDateTime }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      greeting: "",
      currentDateTime: "",
    };
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.greeting = this.getGreeting(now);
      this.currentDateTime = this.formatCustomDateTime(now);
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
    formatCustomDateTime(date) {
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const day = date.getDate();
      const monthName = date.toLocaleDateString("en-US", { month: "long" });
      const year = date.getFullYear();
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const time = date.toLocaleTimeString("en-US", timeOptions);

      return `${dayName} ${day} ${monthName} ${year} At : ${time}`;
    },
  },
  mounted() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
};
</script>

<style>
.text-01 {
  text-align: left;
  margin-left: 20px; /* Adjust margin as needed */
  margin-top: 10px; /* Adjust margin as needed */
}
</style>
