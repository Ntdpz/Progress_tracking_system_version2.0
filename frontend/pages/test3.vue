<template>
  <v-text-field
    label="Issue Status"
    v-model="IssueStatus"
    :disabled="isIssueInProcess"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      IssueStatus: "กำลังแก้ไข",
    };
  },
  computed: {
    isIssueInProcess() {
      return this.IssueStatus !== "รอแก้ไข";
    },
  },
};
</script>