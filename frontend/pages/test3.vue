<template>
    <div>
      <v-btn @click="dialogIssueDetail = true">Open Dialog</v-btn>
      <!-- <dialog-issue :dialog.sync="dialog"></dialog-issue> -->
      <dialog-issue-detail :dialog.sync="dialogIssueDetail"/>
    </div>
  </template>
  
  <script>
import DialogIssueDetail from '../components/DialogIssueDetail.vue'
//   import DialogIssue from '@/components/DialogIssue.vue'
  
  export default {
    data() {
      return {
        dialogIssueDetail: false
      }
    },
    components: {
        DialogIssueDetail
     
    }
  }
  </script>
  