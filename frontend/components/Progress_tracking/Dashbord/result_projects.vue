<template>
  <div>
    <h4 class="centered-heading">
      You Currently have {{ projects.length }} Projects
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      projects: [], // เก็บข้อมูลโปรเจกต์
    };
  },
  mounted() {
    this.fetchProjects(); // เรียกข้อมูลโปรเจกต์เมื่อ component ถูก mounted
  },
  methods: {
    async fetchProjects() {
      try {
        // ใช้ $axios แทน axios
        const response = await this.$axios.$get(
          `/user_projects/get_project_by_userid/${this.userId}`
        );
        this.projects = response;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },
};
</script>

<style>
/* สไตล์ที่ต้องการ */
</style>
