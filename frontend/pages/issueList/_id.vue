<template>
  <div class="body">
    <!-- *Search bar* -->
    <Searchbar title="Issue List" />
    <v-divider></v-divider>

    <!-- *Header* -->
    <v-row class="mt-4 ml-2 mb-2">
      <h4>{{ this.projectName }} ({{ this.projectId }})</h4>
      <p style="color: #b6b5b5; font-size: 16px" class="ml-2">
        {{ this.systemslength }} Sub Systems
      </p>
    </v-row>

    <!-- * box -->
    <v-expansion-panels
      class="mb-6"
      v-for="(system, index) in systems"
      :key="index"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template>
            <v-row no-gutters>
              <v-col cols="4">
                <v-row style="margin-top: 1%">
                  <h4>{{ system.id }} {{ system.system_nameTH }}</h4>
                  <p style="color: #b6b5b5; font-size: 16px; margin-left: 5%">
                    <!-- 3 Issue -->
                  </p>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="4">
                <v-row>
                  <!-- <h4 style="margin-top: 3.5%; margin-right: 2%">
                    Sub System 1
                  </h4> -->
                  <v-chip class="ma-2" color="primary" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-avatar>
                    Mike
                  </v-chip>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </template>
        </v-expansion-panel-header>

        <!-- *content -->
        <v-expansion-panel-content class="mt-2">
          <v-row justify="center">
            <v-btn
              class="new-btn ma-2 text-left"
              outlined
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
              block
              @click="dialog = true"
            >
              <span
                class="mdi mdi-plus-circle-outline"
                style="font-size: 20px; color: black"
              ></span>
              <h4 style="color: black">Add New Issue</h4>
            </v-btn>
            <!-- *dialog -->
            <dialog-issue
              :dialog.sync="dialog"
              :projectName="projectName"
              :systemName="system.system_nameTH"
              :projectId="projectId"
              :systemId="system.id"
              :mode="'create'"
            />
          </v-row>
          <!-- *tabs -->
          <v-tabs fixed-tabs color="primary" class="mt-5">
            <v-tab>
              <h3 style="color: black">All</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">PNI</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">PNC</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">History</h3>
            </v-tab>
          </v-tabs>

          <!-- *Table assignedIssues -->
          <v-data-table
            :headers="headers"
            :items="system.assignedIssues"
            sort-by="calories"
            class="v-data-table elevation-1 mb-2"
            v-remove-row-borders
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  <h5
                    class="pa-1"
                    style="background-color: #1cff17; text-align: left"
                  >
                    assignedIssues
                  </h5>
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:[`item.issue_name`]="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.issue_name }} /{{ item.issue_id }}
            </template>
            <template v-slot:[`item.formattedDateEnd`]="{ item }">
              {{ item.formattedDateEnd }}
            </template>
            <template v-slot:[`item.issue_status`]="{ item }">
              <v-icon
                v-if="item.issue_status == 'active'"
                style="color: #1cff17"
                >mdi-circle</v-icon
              >
              <v-icon
                v-if="item.issue_status == 'open'"
                style="color: gainsboro"
                >mdi-circle</v-icon
              >
              {{ item.issue_status }}
            </template>
            <template v-slot:[`item.issue_priotity`]="{ item }">
              <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
            </template>
            <template v-slot:[`item.issue_assignees`]>
              <v-icon style="color: black">mdi-account-circle</v-icon>
              <!-- {{ item.issue_assignees }} -->
              <p v-show="item.issue_assign == ''">N/A</p>
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- <v-btn icon @click="showIssueDetailDialog(item.issue_name)"
                >Details</v-btn -->
              <v-icon
                class="mr-2"
                @click="
                  showIssueDetailDialog(
                    item.id,
                    item.issue_id,
                    item.issue_type,
                    item.screen_id,
                    item.issue_status,
                    item.issue_priority,
                    item.formattedDateEnd,
                    item.issue_name,
                    item.issue_des_sa,
                    item.issue_informer,
                    item.issue_assign,
                    item.issue_qc,
                    item.issue_filename,
                    item.issue_accepting,
                    item.issue_manday,
                    item.issue_start,
                    item.issue_expected,
                    item.issue_complete,
                    item.issue_des_implementer,
                    item.issue_des_dev,
                    item.issue_des
                  )
                "
                size="20"
                color="primary"
              >
                mdi-information-outline
              </v-icon>
            </template>
          </v-data-table>
          <dialog-issue-detail
            :dialog.sync="dialogIssueDetail"
            :ProjectName="projectName"
            :SystemName="system.system_nameTH"
            :id="selected.Id"
            :IssueId="selected.issue_id"
            :IssueType="selected.issue_type"
            :IssueScreenId="selected.screen_id"
            :IssueStatus="selected.issue_status"
            :IssuePriority="selected.issue_priority"
            :IssueEndDate="selected.formattedDateEnd"
            :IssueName="selected.issue_name"
            :IssueDesSA="selected.issue_des_sa"
            :IssueInformer="selected.issue_informer"
            :IssueAssign="selected.issue_assign"
            :IssueQC="selected.issue_qc"
            :IssueFilename="selected.issue_filename"
            :IssueAccepting="selected.issue_accepting"
            :IssueManday="selected.issue_manday"
            :IssueStart="selected.issue_start"
            :IssueExpected="selected.issue_expected"
            :IssueComplete="selected.issue_complete"
            :IssueDesImplementer="selected.issue_des_implementer"
            :IssueDesDev="selected.issue_des_dev"
            :IssueDes="selected.issue_des"
          />
          <!-- *Table 2 unassignedIssues-->
          <v-data-table
            :headers="headers"
            :items="system.unassignedIssues"
            sort-by="calories"
            class="v-data-table elevation-1"
            v-remove-row-borders
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  <h5
                    class="pa-1"
                    style="background-color: #aaaaaa; text-align: left"
                  >
                    unassignedIssues
                  </h5>
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:[`item.issue_name`]="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.issue_name }}
            </template>
            <template v-slot:[`item.issue_type`]="{ item }">
              {{ item.issue_type }}
            </template>
            <template v-slot:[`item.issue_status`]="{ item }">
              <v-icon style="color: #1cff17">mdi-circle</v-icon>
              {{ item.issue_status }}
            </template>
            <template v-slot:[`item.issue_Priotity`]="{ item }">
              <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
              {{ item.issue_Priotity }}
            </template>
            <template #item.issue_assign="{ value }"> No assign </template>
            <template v-slot:[`item.actions`]>
              <v-icon
                class="mr-2"
                @click="infoItem()"
                size="20"
                color="primary"
              >
                mdi-information-outline
              </v-icon>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- * box2 -->
  </div>
</template>
  
<script>
import Vue from "vue";
import Searchbar from "~/components/Searchbar.vue";
import DialogIssue from "../../components/DialogIssue.vue";
import moment from "moment";
import DialogIssueDetail from "../../components/DialogIssueDetail.vue";
export default {
  components: { Searchbar, DialogIssue, DialogIssueDetail },
  layout: "admin",
  directives: {
    "remove-row-borders": {
      inserted(el) {
        const trs = el.querySelectorAll("td");
        trs.forEach((tr) => {
          tr.style.borderBottom = "none";
        });
      },
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      sub_project_count: "2",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      dialogInfo: false,
      dialogIssueDetail: false,
      selected: {
        Id: "",
        screen_id: "",
        system_id: "",
        project_id: "",
        issue_name: "",
        issue_id: "",
        issue_type: "",
        issue_informer: "",
        issue_priority: "",
        issue_end: "",
        issue_assign: "",
        issue_qc: "",
        issue_des: "",
        issue_des_sa: "",
        issue_type_sa: "",
        issue_doc_id: "",
        issue_customer: "",
        issue_filename: "",
        issue_des_dev: "",
        issue_des_implementer: "",
        issue_start: "",
        issue_expected: "",
        issue_status: "open",
        issue_accepting: "",
        issue_manday: "",
        issue_complete: "",
        formattedDateEnd: "",
      },
      headers: [
        {
          text: "Issues ID",
          align: "start",
          sortable: false,
          value: "issue_id",
        },
        { text: "Issues Name", value: "issue_name" },
        { text: "Issues Type", value: "issue_type" },
        { text: "End Date", value: "formattedDateEnd" },
        { text: "Status", value: "issue_status" },
        { text: "Priotity", value: "issue_priority" },
        { text: "Assigned To", value: "issue_assign" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      issue: [],
      project: [],
      systems: [],
      default: [],
      projectName: "",
      projectId: "",
      systemslength: "",
    };
  },
  async created() {
    await this.initialize();
    await this.getProject();
    await this.getSystems();
    await this.getIssue();
    // await this.getIssues2();
  },
  methods: {
    initialize() {
      // this.issue = [
      //   {
      //     issue_no: "SP-123xx-PNI-21/10/22-0001",
      //     issue_name: "Issue name",
      //     issue_end_date: "Nov 31, 2023",
      //     issue_status: "Finished",
      //     issue_Priotity: "Critical",
      //     issue_assignees: "Dev",
      //   },
      //   {
      //     issue_no: "SP-123xx-PNI-21/10/22-0002",
      //     issue_name: "Issue name",
      //     issue_end_date: "Nov 31, 2023",
      //     issue_status: "Finished",
      //     issue_Priotity: "Critical",
      //     issue_assignees: "Dev",
      //   },
      //   {
      //     issue_no: "SP-123xx-PNI-21/10/22-0003",
      //     issue_name: "Issue name",
      //     issue_end_date: "Nov 31, 2023",
      //     issue_status: "Finished",
      //     issue_Priotity: "Critical",
      //     issue_assignees: "Dev",
      //   },
      //   {
      //     issue_no: "SP-123xx-PNI-21/10/22-0004",
      //     issue_name: "Issue name",
      //     issue_end_date: "Nov 31, 2023",
      //     issue_status: "Finished",
      //     issue_Priotity: "Critical",
      //     issue_assignees: "Dev",
      //   },
      //   {
      //     issue_no: "SP-123xx-PNI-21/10/22-0005",
      //     issue_name: "Issue name",
      //     issue_end_date: "Nov 31, 2023",
      //     issue_status: "Finished",
      //     issue_Priotity: "Critical",
      //     issue_assignees: "Dev",
      //   },
      // ];
    },
    showIssueDetailDialog(issue_name) {
      console.log("item:", this.item);
      console.log("assignedIssues:", this.system.assignedIssues);
      this.dialogIssueDetail = true;
    },
    async getProject() {
      await this.$axios.get("/projects/getOne/" + this.id).then((res) => {
        this.project = res.data;
        this.projectName = this.project[0].project_name;
        this.projectId = this.project[0].id;
        // console.log(this.project[0].project_name, "this.project");
        console.log(this.project[0].id, "this.projectId");
      });
    },
    async getSystems() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.project.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });
        console.log(this.systems, "system");
      });
      this.systems = this.project[0].systems;
      this.systemslength = this.project[0].systems.length;
      console.log(this.project, "this.project");
      console.log(this.system, "this.system");
      console.log(this.systemslength, "this.systemslength");
    },
    async getIssue() {
      try {
        const res = await this.$axios.get(
          "/issues/getAll?project_id=" + this.id
        );
        this.issue = res.data;
        this.issue.forEach((issue) => {
          const dateEnd = moment(issue.issue_end, "YYYY-MM-DDTHH:mm:ss.SSSZ");
          issue.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          // console.log(issue.formattedDateEnd);
        });
        this.systems.forEach((system) => {
          Vue.set(
            system,
            "assignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id && issue.issue_assign !== ""
            )
          );
          Vue.set(
            system,
            "unassignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id && issue.issue_assign === ""
            )
          );
        });
        // console.log(this.systems, "system issue2");
      } catch (err) {
        console.error(err);
      }
    },
    showIssueDetailDialog(
      issueid,
      issueId,
      issueType,
      issueScreenid,
      issueStatus,
      issuePriority,
      issueFormattedDateEnd,
      issueName,
      issueDesSA,
      issueInformer,
      issueAssign,
      issueQc,
      issueFilename,
      issueAccepting,
      issueManday,
      issueStart,
      issueExpected,
      issueComplete,
      issueDesImplementer,
      issueDesDev,
      issueDes
    ) {
      this.selected.Id = issueid;
      this.selected.issue_id = issueId;
      this.selected.issue_type = issueType;
      this.selected.screen_id = issueScreenid;
      this.selected.issue_status = issueStatus;
      this.selected.issue_priority = issuePriority;
      this.selected.formattedDateEnd = issueFormattedDateEnd;
      this.selected.issue_name = issueName;
      this.selected.issue_des_sa = issueDesSA;
      this.selected.issue_informer = issueInformer;
      this.selected.issue_assign = issueAssign;
      this.selected.issue_qc = issueQc;
      this.selected.issue_filename = issueFilename;
      this.selected.issue_accepting = issueAccepting;
      this.selected.issue_manday = issueManday;
      this.selected.issue_start = issueStart;
      this.selected.issue_expected = issueExpected;
      this.selected.issue_complete = issueComplete;
      this.selected.issue_des_implementer = issueDesImplementer;
      this.selected.issue_des_dev = issueDesDev;
      this.selected.issue_des = issueDes;
      this.dialogIssueDetail = true;
    },
  },
};
</script>
  
<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.new-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px dotted #333;
  padding: 8px 16px;
}

input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}
</style>