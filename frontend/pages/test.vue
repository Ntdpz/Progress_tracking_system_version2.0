<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="unassignedIssues"
          hide-default-footer
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.issue_name }}</td>
              <td v-show="item.issue_assign != ''">{{ item.issue_assign }}</td>
              <td v-show="item.issue_assign == ''">Not have</td>
              <!-- <td>{{ item.system.system_nameTH }}</td> -->
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" class="my-8">
        <v-data-table
          :headers="headersWithoutAssign"
          :items="assignedIssues"
          hide-default-footer
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.issue_name }}</td>
              <td>{{ item.issue_assign }}</td>
              <!-- <td>{{ item.system.system_nameTH }}</td> -->
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Issue Name", value: "issue_name" },
        { text: "Issue assign", value: "issue_assign" },
        { text: "System Name", value: "system.system_nameTH" },
      ],
      headersWithoutAssign: [
        { text: "ID", value: "id" },
        { text: "Issue Name", value: "issue_name" },
        { text: "System Name", value: "system.system_nameTH" },
      ],
      assignedIssues: [],
      unassignedIssues: [],
    };
  },
  methods: {
    async getIssues() {
      try {
        const res = await this.$axios.get(  "/issues/getAll?project_id="+1);
        const assignedIssues = res.data.filter(
          (issue) => issue.issue_assign !== null && issue.issue_assign !== ""
        );
        const unassignedIssues = res.data.filter(
          (issue) => issue.issue_assign === null || issue.issue_assign === ""
        );
        this.assignedIssues = assignedIssues;
        this.unassignedIssues = unassignedIssues;
        console.log(this.assignedIssues, "this.assignedIssues");
        console.log(this.unassignedIssues, " this.unassignedIssues");
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.getIssues();
  },
};
</script>
