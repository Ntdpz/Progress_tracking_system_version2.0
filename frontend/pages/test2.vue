<template>
  <v-container>
    <v-row>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(system, index) in projects[0].systems"
            :key="index"
          >
            <v-expansion-panel-header>
              {{ system.system_nameEN }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>{{ system.id }}</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    async getProjects() {
      await this.$axios.get("/projects/getOne/" + 1).then((res) => {
        this.projects = res.data;

        // Log the projects for debugging purposes
        console.log(this.projects);
      });
    },
    async getSystems() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projects.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });
      });
      console.log(this.projects);
    },
  },
  mounted() {
    this.getProjects();
    this.getSystems();
  },
};
</script>
