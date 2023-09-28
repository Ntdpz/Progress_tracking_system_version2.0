<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      style="background-color: #f3f3f3"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-layout align-center justify-center>
              <v-icon class="mr-2" color="primary"> mdi-domain </v-icon>
              <h5 class="">Note Management</h5>
            </v-layout>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list class="pb-0">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list class="pa-0" v-show="user_role == 'Admin'">
        <v-list-group
          v-for="(project, index) in items3"
          :key="index"
          v-model="project.active"
          :prepend-icon="project.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>โครงการ</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in project.projectList"
            :key="child.title"
            :to="`/issueList/${child.id}`"
          >
            <v-list-item-content>
              <v-list-item-title
                ><v-icon color="primary" class="mr-2"
                  >mdi mdi-format-list-bulleted</v-icon
                >{{ child.project_name }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <!-- {{ this.projectDetails.projectList }} -->
      <v-list v-show="user_role == 'User'">
        <v-list-group
          v-for="(project, index) in projectDetails"
          :key="index"
          v-model="project.active"
          :prepend-icon="project.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ project.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in projectDetails.projectList"
            :key="child.title"
            :to="`/issueList/${child[0].id}`"
          >
            <v-list-item-content>
              <v-list-item-title
                ><v-icon color="primary" class="mr-2"
                  >mdi mdi-format-list-bulleted</v-icon
                >{{ child[0].project_name }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-list class="pt-0">
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
          :to="item.to"
          router
          color="primary"
          exact
        >
          <v-list-item-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      app
      style="height: 49px"
      class="app-bar"
      color="white"
      elevation="1"
      outlined
    >
      <v-app-bar-nav-icon
        color="primary"
        @click.stop="drawer = !drawer"
        class="mb-3"
      />
      <v-toolbar-title v-text="title" class="mb-3" />
      <v-spacer></v-spacer>
      <v-btn icon color="error" class="mb-3" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
    
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      user_role: "",
      ownProject: [],
      projectIds: [],
      projectDetails: [
        {
          action: "mdi-view-list",
          active: false,
          title: "โครงการ",
          projectList: [],
        },
      ],
      items: [
        {
          icon: "mdi-home",
          title: "หน้าหลัก",
          to: "/",
        },
        // {
        //   icon: "mdi-bell-badge",
        //   title: "แจ้งเตือน",
        //   to: "/notification",
        // },
      ],
      items3: [
        {
          action: "mdi-view-list",
          active: false,
          title: "โครงการ",
          projectList: [],
        },
      ],
      menuOption: [],
      right: true,
      rightDrawer: false,
      title: "Note Management",
    };
  },
  async mounted() {
    await this.$axios.get("/projects/getAll").then((res) => {
      res.data.forEach((project) => {
        project.active = false; // initialize active property to false
      });
      this.items3[0].projectList = res.data;
      // console.log(this.items3, "this.items3");
    });
    await this.getUser();
    await this.getOwnProject();
  },
  async created() {
    await this.getUser();
    await this.getOwnProject();
  },
  computed: {
    userId() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("userId");
      }
      return null; // or some default value if localStorage is not available
    },
    filteredItems() {
      if (this.user_role === "Admin") {
        const items = this.menuOption.filter(
          (item) =>
            item.title !== "Manage User" &&
            item.title !== "Manage Project" &&
            item.title !== "Dashboard"
        );
        items.splice(0, 0, {
          icon: "mdi-view-dashboard",
          title: "แดชบอร์ด",
          to: "/dashboard",
        });
        items.splice(0, 0, {
          icon: "mdi-account",
          title: "จัดการผู้ใช้งานระบบ",
          to: "/manageUser",
        });
        items.splice(0, 0, {
          icon: "mdi-border-all",
          title: "จัดการโครงการ",
          to: "/manageProject",
        });
        items.splice(0, 0, {
          icon: "mdi-calendar-month",
          title: "ตารางงาน",
          to: "/schedule",
        });
        return items;
      } else if (this.user_role === "User") {
        const items = this.menuOption.filter(
          (item) =>
            item.title !== "Manage User" &&
            item.title !== "Manage Project" &&
            item.title !== "Dashboard"
        );
        items.splice(0, 0, {
          icon: "mdi-calendar-month",
          title: "ตารางงาน",
          to: "/schedule",
        });
        items.splice(0, 0, {
          icon: "mdi-border-all",
          title: "จัดการโครงการ",
          to: "/manageProject",
        });

        return items;
      } else {
        return this.menuOption;
      }
    },
  },
  methods: {
    async getOwnProject() {
      await this.$axios
        .get("/user_projects/getOneUserID/" + this.userId)
        .then((res) => {
          this.ownProject = res.data;
          // console.log("ownProject", this.ownProject);

          this.projectIds = this.ownProject.map(
            (project) => project.project_id
          );
          // console.log("this.projectIds", this.projectIds);

          const requests = this.projectIds.map((projectId) => {
            return this.$axios.get("/projects/getOne/" + projectId);
          });
          Promise.all(requests).then((responses) => {
            this.projectDetails.projectList = responses.map((res) => res.data);

            // console.log(
            //   "this.projectDetails.projectList",
            //   this.projectDetails.projectList
            // );
          });
        });
    },
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
        this.user_role = res.data[0].user_role;
        // console.log(this.user_role, "user position");
      });
    },
    async logout() {
      const response = await this.$axios.post("/auth/api/logout");

      if (response.status === 200) {
        // Clear the user data from Vuex store and localStorage
        this.$store.commit("clearUser");
        localStorage.removeItem("userId");
        this.$router.push("/login");
      }
    },
  },
};
</script>
  
<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.v-list-group >>> i {
  color: black;
}
</style>
    