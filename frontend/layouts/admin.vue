<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-layout align-center justify-center>
              <v-icon color="black" class="mr-2"> mdi-domain </v-icon>
              <h5 class="">Note Management</h5>
            </v-layout>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="(project, index) in items3"
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
      <v-divider></v-divider>
      <v-list>
    <v-list-item
      v-for="(item, i) in filteredItems"
      :key="i"
      :to="item.to"
      router
      color="primary"
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mb-3" />
      <v-toolbar-title v-text="title" class="mb-3" />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer> -->
  </v-app>
</template>
    
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      user_role:"",
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-bell-badge",
          title: "Notification",
          to: "/notification",
        },
      ],
      items3: [
        {
          action: "mdi-view-list",
          active: true,
          items: [
            // { title: "Project1", route: "/issueList" },
            // { title: "Project2", route: "/issueList" },
            // { title: "Project3", route: "/issueList" },
          ],
          title: "Project",
          projectList: [],
        },
      ],
      items2: [
        {
          icon: "mdi-calendar-month",
          title: "Schedule",
          to: "/schedule",
        },
        // {
        //   icon: "mdi-account",
        //   title: "Manage User",
        //   to: "/manageUser",
        // },
        {
          icon: "mdi-view-list",
          title: "Manage Project",
          to: "/manageProject",
        },
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
      ],
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
      console.log(this.items3[0].projectList, "this.items[0].projectList");
    });
    await this.getUser();
  },
  async created() {
    await this.getUser();
  },
    computed: {
        userId() {
          if (typeof window !== "undefined") {
            return window.localStorage.getItem("userId");
          }
          return null; // or some default value if localStorage is not available
      },
      filteredItems() {
      if (this.user_role == 'Admin') {
        const items = this.items2.filter(item => item.title !== "Manage User");
        items.splice(1, 0, {
          icon: "mdi-account",
          title: "Manage User",
          to: "/manageUser",
        });
        return items;
      } else {
        return this.items2;
      }
    },
      },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.items3.items = res.data;
      });
    },
    async getUser() {
          await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
            this.user_role = res.data[0].user_role;
            console.log(this.user_position);
            // this.filteredItems();
          });
    },
    // filteredItems() {
    //   if (this.user_role === "Admin") {
    //     const items = this.items2.filter(item => item.title !== "Manage User");
    //     items.splice(2, 0, {
    //       icon: "mdi-account",
    //       title: "Manage User",
    //       to: "/manageUser",
    //     });
    //     return items;
    //   } else {
    //     return this.items2;
    //   }
    // },
  },
};
</script>
  
  <style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
    