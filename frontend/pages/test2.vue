<template>
  <v-container>
    <v-row>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(system, index) in systems"
            :key="system.id"
          >
            <v-expansion-panel-header>
              {{ system.id }} / {{ system.system_nameTH }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item-group>
                  <v-list-item
                    v-for="(issue, index) in system.issues"
                    :key="issue.id"
                  >
                    {{ issue.id }} / {{ issue.issue_name }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
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
      id: 1,
      systems: [],
    };
  },
  methods: {
    async getSystems() {
      try {
        const res = await this.$axios.get("/systems/getAll");
        this.systems = res.data;

        // Log the systems for debugging purposes
        console.log(this.systems);
      } catch (err) {
        console.error(err);
      }
    },
    async getIssues() {
      try {
        const res = await this.$axios.get(
          "/issues/getAll?project_id=" + this.id
        );
        // Loop through each system and assign the associated issues
        this.systems.forEach((system) => {
          Vue.set(
            system,
            "issues",
            res.data.filter((issue) => issue.system_id === system.id)
          );
        });
        console.log(this.systems);
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.getSystems();
    this.getIssues();
  },
};
</script>
