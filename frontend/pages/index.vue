<template>
  <div class="content mx-auto">
    <v-container fluid class="mt-1 pl-16" height="100%" >
      <v-card class="pa-2" tile outlined style="border: none; height: 100%">
        <v-row class="mb-0">
          <v-col col="6" sm="6" md="6" lg="6" class="pb-0">
            <v-text class="font-weight-bold" style="font-size: 24px"
              >โครงการของคุณ</v-text
            >
          </v-col>
          <v-col col="6" sm="6" md="6" lg="6" class="pb-0">
            <v-text-field
              v-model="searchText"
              placeholder="Search"
              filled
              rounded
              outlinde
              prepend-inner-icon="mdi-magnify"
              dense
              style="width: 60%"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-show="user.user_role == 'Admin'">
          <v-col v-for="(project, index) in projects" :key="index" cols="12">
            <template>
              <v-card
                :to="`issueList/${project.id}`"
                width="280px"
                height="80px"
                outlined
                absolute
                color="primary"
              >
                <v-card-subtitle
                  class="mb-1 mt-3"
                  style="font-size: 18px; color: white"
                >
                  {{ project.project_name }}
                </v-card-subtitle>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <v-row v-show="user.user_role == 'User'">
          <v-col
            v-for="(project, index) in projectDetails"
            :key="index"
            col="3"
            sm="3"
            md="3"
            xl="3"
            lg="2"
          >
            <template>
              <v-card
                :to="`issueList/${project[0].id}`"
                width="280px"
                height="145px"
                outlined
                absolute
                color="primary"
              >
                <v-card-subtitle
                  class="mb-1"
                  style="font-size: 18px; color: white"
                >
                  {{ project[0].project_name }}
                </v-card-subtitle>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <!-- persistent คือ การที่คลิกนอก dialog แล้ว dialog จะไม่ปิด -->
      </v-card>
    </v-container>
  </div>
</template>
<script>
import Searchbar from "../components/Searchbar.vue";
export default {
  components: { Searchbar },
  layout: "admin",
  middleware: "auth",
  data() {
    return {
      //auth
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      dialog: false,
      dialog_newproject: false,
      query: "",
      ownProject: [],
      projectIds: [],
      projectDetails: [],
      searchText: "",
      //test
      projects: [],
    };
  },
  created() {
    this.getOwnProject();
    this.getProject();
  },

  methods: {
    async getOwnProject() {
      await this.$axios
        .get("/user_projects/getOneUserID/" + this.$auth.user.id)
        .then((res) => {
          this.ownProject = res.data;

          // Extract the project IDs from the userProjects array
          this.projectIds = this.ownProject.map(
            (project) => project.project_id
          );

          // Fetch project details for each project ID
          const requests = this.projectIds.map((projectId) => {
            return this.$axios.get("/projects/getOne/" + projectId);
          });
          Promise.all(requests).then((responses) => {
            this.projectDetails = responses.map((res) => res.data);
          });
        });
    },
    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.projects = res.data;
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

@media (max-width: 599px) {
  .mx-4 {
    margin-left: 0;
    margin-right: 0;
  }
}

</style>
