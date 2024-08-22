<template>
  <div>
    <Loader v-if="isLoading" />
    <v-container>
      <h1>Screen ID: {{ screenId }}</h1>
      <!-- คุณสามารถแสดงข้อมูลเพิ่มเติมตาม screen_id ได้ที่นี่ -->
    </v-container>
  </div>
</template>

<script>
import Loader from "../../../components/Loader.vue";

export default {
  middleware: "auth",
  layout: "admin",
  comments() {
    Loader;
  },
  data() {
    return {
      isLoading: true,
      screenId: null, // เก็บค่า screen_id ที่ดึงจาก route params
    };
  },
  created() {
    this.screenId = this.$route.params.id; // ดึงค่า screen_id จาก route params
  },
};
</script>
