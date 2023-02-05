<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-title>Parent Menu</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-group v-if="showChild">
          <template v-slot:activator>
            <v-list-item-title>Child Menu</v-list-item-title>
          </template>
          <v-list-item v-for="item in childItems" :key="item.title" @click="goToPage(item.route)">
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-title v-text="item.route"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        showChild: true,
        childItems: [
          { title: "Child Menu 1", route: "/home" },
          { title: "Child Menu 2", route: "/child-menu-2" },
          { title: "Child Menu 3", route: "/child-menu-3" }
        ]
      };
    },
    methods: {
      goToPage(route) {
        this.$router.push(route);
      }
    }
  };
  </script>
  