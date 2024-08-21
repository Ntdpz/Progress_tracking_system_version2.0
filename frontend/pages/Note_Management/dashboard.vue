<template>
  <div>
    <Greeting />
    <div>
      <h3>ปัญหาที่มีคนรับผิดชอบ</h3>
      <Issue_Table />
    </div>
  </div>
</template>

<script>
import Greeting from "/components/project/Greeting.vue";
import Issue_Table from "/components/Note_Management/Issue_Table.vue";

export default {
  middleware: "auth",
  layout: "admin",
  components: {
    Greeting,
    Issue_Table,
  },
  data() {
    return {
      //   userdata: [],
      userdata: this.$auth.user || {}, // Default value if no user data
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const res = await this.$axios.get(
          `/users/getOne/${this.$auth.user.id}`
        );
        this.userdata = res.data[0];
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
/* Add your page styles here */
</style>
