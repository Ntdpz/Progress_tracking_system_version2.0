<template>
  <v-container>
    <v-row>
      <v-col v-for="(project, index) in projectList" :key="index" cols="12">
        <v-card>
          <v-card-title>
            {{ project.project_id }} ({{ getSystemCount(project) }})
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="project.systems">
              <template #item="{ item }">
                <tr>
                  <td>{{ item.system_nameTH }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.updated_at }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      projectList: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Created At", value: "created_at" },
        { text: "Updated At", value: "updated_at" },
      ],
    };
  },
  methods: {
    async getProjects() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.projectList = res.data;
      });
    },
    async getSystems() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projectList.forEach((project) => {
          project.systems = res.data.filter(
            (system) => system.project_id === project.id
          );
        });
      });
    },
    getSystemCount(project) {
      return project.systems ? project.systems.length : 0;
    },
  },
  computed: {
    totalSystemCount() {
      return this.projectList.reduce(
        (count, project) => count + project.systems.length,
        0
      );
    },
  },
  mounted() {
    this.getProjects();
    this.getSystems();
  },
};
</script>


<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
