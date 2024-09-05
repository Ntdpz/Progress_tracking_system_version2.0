<!-- userProject.vue -->
<template>
  <div>
    <v-data-table :headers="headers" :items="user_projects" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >User Projects : {{ project.project_name_ENG }}</v-toolbar-title
          >
        </v-toolbar>
      </template>
      <template v-slot:item.user_pic="{ item }">
        <v-img :src="item.user_pic" max-width="100" max-height="100"></v-img>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object, // เปลี่ยนเป็น Object
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: "Picture", value: "user_pic" },
        { text: "First Name", value: "user_firstname" },
        { text: "Last Name", value: "user_lastname" },
        { text: "Position", value: "user_position" },
        { text: "Department", value: "user_department" },
      ],
      user_projects: [],
    };
  },
  async created() {
    try {
      const projectId = this.project.id; // ดึง project_id จาก URL
      const response = await this.$axios.$get(
        `/user_projects/getUserProjectsByProjectId/${projectId}`
      );
      this.user_projects = response;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
