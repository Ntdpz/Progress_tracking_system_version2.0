<template>
  <div>
    <Greeting />
    <div>
      <Dashbord_ResponsibleScreen />

      <h3>ปัญหาที่มีคนรับผิดชอบ</h3>
      <Issue_Table />

      <h3>ปัญหาที่ไม่มีคนรับผิดชอบ</h3>
      <Issue_Table_non />
    </div>
  </div>
</template>

<script>
import Greeting from "/components/project/Greeting.vue";
import Issue_Table from "/components/Note_Management/Issue_Table.vue";
import Issue_Table_non from "/components/Note_Management/Issue_Table_non.vue";
import Dashbord_ResponsibleScreen from "/components/Note_Management/Dashbord_ResponsibleScreen.vue";

export default {
  middleware: "auth",
  layout: "admin",
  components: {
    Greeting,
    Issue_Table,
    Issue_Table_non,
    Dashbord_ResponsibleScreen,
  },
  data() {
    return {
      loggedIn: this.$auth.loggedIn,
      //   userdata: [],
    };
  },
  created() {},
  methods: {},
};
</script>
