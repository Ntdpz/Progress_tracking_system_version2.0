<template>
  <div>
    <!-- แสดง Loader เมื่อข้อมูลกำลังถูกโหลด -->
    <!-- นี่คือจุดที่แสดง Loader ในการโหลดหน้าและข้อมูล -->
    <Loader v-if="$store.state.isLoading" />

    <!-- แสดงหัวข้อ Dashboard -->
    <h1 class="centered-heading">Dashboard</h1>

    <!-- ช่องว่างระหว่างส่วนต่าง ๆ ของหน้า -->
    <v-spacer></v-spacer>

    <div>
      <!-- แสดงผล Component result_projects โดยส่งค่า userId ของผู้ใช้ไปเป็น prop -->
      <result_projects :userId="user.id" />

      <!-- ช่องว่างระหว่าง component -->
      <v-spacer></v-spacer>

      <!-- คอนเทนเนอร์แบบ fluid (ยืดหยุ่น) สำหรับการจัดวางส่วนต่าง ๆ -->
      <v-container fluid>
        <v-row>
          <v-col
            v-for="project in projectsWithTasks"
            :key="project.id"
            cols="12"
            class="full-width-card"
          >
            <!-- แสดง Tabs -->
            <v-card class="full-card">
              <v-row>
                <v-tabs
                  v-model="tab"
                  color="primary"
                  slider-color="primary"
                  class="tabs"
                >
                  <v-tab class="custom-tab">ToDay</v-tab>
                  <v-tab class="custom-tab">All</v-tab>
                </v-tabs>
              </v-row>
              <v-tabs-items v-model="tab">
                <!-- แถบ ToDay -->
                <v-tab-item>
                  <v-card class="full-card">
                    <task_project_table :projectId="project.id" />
                  </v-card>
                </v-tab-item>
                <!-- แถบ All -->
                <v-tab-item>
                  <v-card class="full-card">
                    <all_task_user :projectId="project.id" />
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/Loader.vue";
import result_projects from "../../components/Progress_tracking/Dashbord/result_projects.vue";
import task_project_table from "../../components/Progress_tracking/Dashbord/task_project_table.vue";
import all_task_user from "../../components/Progress_tracking/Dashbord/all_task_user.vue";
import "./Dashbord.css";

export default {
  components: { Loader, result_projects, task_project_table, all_task_user },
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      projects: [],
      tab: 0, // ใช้เพื่อควบคุมแถบที่เลือก
    };
  },
  computed: {
    projectsWithTasks() {
      return this.projects.filter((project) => project.hasTasks !== false);
    },
  },
  async created() {
    // เริ่มต้นการโหลดข้อมูลและแสดง Loader
    this.$store.dispatch("setLoading", true);

    try {
      // ดึงข้อมูลโปรเจกต์ของผู้ใช้
      const { data: projectIds } = await this.$axios.get(
        `/user_projects/get_project_by_userid/${this.user.id}`
      );

      // ดึงข้อมูลของแต่ละโปรเจกต์
      const projectsPromises = projectIds.map((id) =>
        this.$axios.get(`/projects/getOne/${id}`)
      );

      // รอการตอบกลับและจัดเก็บข้อมูลโปรเจกต์
      const projectsResponses = await Promise.all(projectsPromises);

      this.projects = projectsResponses.map((response) => ({
        ...response.data,
        hasTasks: true,
      }));
    } catch (error) {
      // แสดงข้อผิดพลาดถ้ามีปัญหาในการดึงข้อมูล
      console.error("Error fetching projects:", error);
    } finally {
      // ปิด Loader เมื่อข้อมูลโหลดเสร็จ
      this.$store.dispatch("setLoading", false);
    }
  },
  beforeRouteEnter(to, from, next) {
    // แสดง Loader ก่อนเข้าหน้าใหม่
    next((vm) => {
      vm.$store.dispatch("setLoading", true);
    });
  },
  beforeRouteLeave(to, from, next) {
    // ซ่อน Loader ก่อนออกจากหน้า
    this.$store.dispatch("setLoading", false);
    next();
  },
};
</script>

<style>
.centered-heading {
  color: #374aab;
  text-align: center;
}

.tabs {
  margin-bottom: 16px;
}
</style>
