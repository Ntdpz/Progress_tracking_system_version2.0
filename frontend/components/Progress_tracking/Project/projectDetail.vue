<!-- projectDetail.vue -->
<template>
  <div>
    <v-row>
      <v-col>
        <p>
          <v-icon @click.stop="showUserDialog = true">
            mdi-account-multiple
          </v-icon>
          Project Name Thai : {{ project.project_name_TH }}
        </p>
        <p>Project Name Eng : {{ project.project_name_ENG }}</p>
        <p>
          Project Manday :
          {{ project.project_manday ? project.project_manday : "0" }}
        </p>
        <p>Project Count : {{ project.project_progress }}</p>
        <p>
          Project Plan :
          {{
            project.project_plan_start && project.project_plan_end
              ? formatDate(project.project_plan_start) +
                " - " +
                formatDate(project.project_plan_end)
              : "Not determined"
          }}
        </p>
      </v-col>
      <v-col>
        <v-progress-circular
          :value="parseInt(project.project_progress)"
          color="blue-grey"
          :size="100"
          :rotate="360"
          :width="15"
        >{{ parseInt(project.project_progress) }} %</v-progress-circular>
        <p>Project Progress</p>
      </v-col>
    </v-row>

    <v-dialog v-model="showUserDialog" max-width="50%">
      <v-card>
        <userProject :project="project" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import userProject from "./userProject.vue";
export default {
  components: {
    userProject,
  },
  props: {
    project: {
      type: Object, // เปลี่ยนเป็น Object
      required: true,
    },
  },
  data() {
    return {
      showUserDialog: false,
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "Not determined";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
};
</script>
