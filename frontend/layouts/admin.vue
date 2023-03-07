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
          v-for="item in items3"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          color="primary"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            @click="goToPage(child.route)"
          >
            <v-list-item-content>
              <v-row class="ma-0 pa-0">
                <v-col class="ma-0 pa-0" style="flex-grow: 0.2 !important">
                  <v-icon class="ma-0 pa-0">mdi-view-list</v-icon>
                </v-col>
                <v-col class="ma-0 pa-0">
                  <v-list-item-title
                    v-text="child.title"
                    class="ma-0 mt-1 pa-0"
                  ></v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items2"
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
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/home",
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
            { title: "Project1", route: "/issueList" },
            { title: "Project2", route: "/issueList" },
            { title: "Project3", route: "/issueList" },
          ],
          title: "Project",
        },
      ],
      items2: [
        {
          icon: "mdi-calendar-month",
          title: "Schedule",
          to: "/schedule",
        },
        {
          icon: "mdi-account",
          title: "Manage User",
          to: "/manageUser",
        },
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
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
  },
};
</script>
  
  <style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
    