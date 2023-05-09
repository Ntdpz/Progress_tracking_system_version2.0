<template>
  <div class="body">
    <!-- *Search bar* -->
    <Searchbar title="รายการปัญหา " />
    <v-divider></v-divider>

    <!-- *Header* -->
    <v-row class="mt-4 ml-2 mb-2">
      <h4>{{ this.projectName }} ({{ this.project_id }})</h4>
      <p style="color: #b6b5b5; font-size: 16px" class="ml-2">
        {{ this.systemslength }} ระบบ
      </p>
    </v-row>

    <!-- * box -->
    <v-expansion-panels
      class="mb-6"
      v-for="(system, index) in systemsList"
      :key="index"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template>
            <v-row no-gutters>
              <v-col cols="12">
                <v-row style="margin-top: 1px">
                  <h4>{{ system.system_nameTH }} ({{ system.system_id }})</h4>
                  <!-- <p style="color: #b6b5b5; font-size: 16px; margin-left: 5%">
                    3 Issue
                  </p> -->
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>

        <!-- *content -->
        <v-expansion-panel-content class="mt-2">
          <v-row justify="center">
            <v-btn
              v-if="user_role == 'Admin' || user_position == 'Implementer'"
              class="new-btn ma-2 text-left"
              outlined
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
              block
              @click="
                showIssueCreateDialog(
                  system.system_nameTH,
                  system.id,
                  system.system_id
                )
              "
            >
              <span
                class="mdi mdi-plus-circle-outline"
                style="font-size: 20px; color: black"
              ></span>
              <h4 style="color: black">สร้างปัญหาใหม่</h4>
            </v-btn>
            <!-- *dialog -->
            <dialog-issue
              :dialog.sync="dialog"
              :projectName="projectName"
              :systemName="infoCreate.systemName"
              :systemids="infoCreate.system_id"
              :projectId="projectId"
              :projectids="project_id"
              :systemId="infoCreate.systemId"
              mode="create"
              :userFirstname="user_firstname"
              :userLastname="user_lastname"
              :userId="userId"
              :runningNumber="runningNumber"
              @button-clicked="getIssue()"
            />
          </v-row>
          <!-- *tabs -->
          <v-tabs
            fixed-tabs
            v-model="tab"
            next-icon="mdi-menu-right-outline"
            prev-icon="mdi-menu-left-outline"
            show-arrows
            color="primary"
            class="mt-5"
          >
            <v-tab>
              <h3 style="color: black">ทั้งหมด</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">PNI</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">PNC</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">NewReq</h3>
            </v-tab>
            <v-tab>
              <h3 style="color: black">ประวัติ</h3>
            </v-tab>
          </v-tabs>
          <!-- Dialog Admin Dev Implementer -->
          <dialog-issue-detail
            :history.sync="history"
            :dialog.sync="dialogIssueDetail"
            :ProjectName="projectName"
            :ProjectId="projectId"
            :SystemName="system.system_nameTH"
            :SystemId="system.id"
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
            :IssueAccepting="selected.formattedDateAccepting"
            :IssueManday="selected.issue_manday"
            :IssueStart="selected.formattedDateStart"
            :IssueExpected="selected.formattedDateExpected"
            :IssueComplete="selected.issue_complete"
            :IssueDesImplementer="selected.issue_des_implementer"
            :IssueDesDev="selected.issue_des_dev"
            :IssueDes="selected.issue_des"
            :IssueDocId="selected.issue_doc_id"
            :IssueCustomer="selected.issue_customer"
            :IssueTypeSA="selected.issue_type_sa"
            :IssueCreate="selected.created_at"
            :ScreenName="selected.screenName"
            :IssueDeveloperStatus="selected.issue_status_developer"
            :IssueImplementerStatus="selected.issue_status_implement"
            :IssueRound="selected.issue_round"
            :ImpleSection="selected.impleSection"
            :UserId="selected.userId"
            @button-clicked="getIssue()"
          />
          <dialog-issue-imple
            :dialog.sync="dialogIssueImple"
            :ProjectName="projectName"
            :ProjectId="projectId"
            :SystemName="system.system_nameTH"
            :SystemId="system.id"
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
            :IssueAccepting="selected.formattedDateAccepting"
            :IssueManday="selected.issue_manday"
            :IssueStart="selected.formattedDateStart"
            :IssueExpected="selected.formattedDateExpected"
            :IssueComplete="selected.issue_complete"
            :IssueDesImplementer="selected.issue_des_implementer"
            :IssueDesDev="selected.issue_des_dev"
            :IssueDes="selected.issue_des"
            :IssueDocId="selected.issue_doc_id"
            :IssueCustomer="selected.issue_customer"
            :IssueTypeSA="selected.issue_type_sa"
            :IssueCreate="selected.created_at"
            :ScreenName="selected.screenName"
            :IssueDeveloperStatus="selected.issue_status_developer"
            :IssueImplementerStatus="selected.issue_status_implement"
            :IssueRound="selected.issue_round"
            :ImpleSection="selected.impleSection"
            :UserId="selected.userId"
            @button-clicked="getIssue()"
          />
          <dialog-issue-dev
            :dialog.sync="dialogIssueDev"
            :ProjectName="projectName"
            :ProjectId="projectId"
            :SystemName="system.system_nameTH"
            :SystemId="system.id"
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
            :IssueAccepting="selected.formattedDateAccepting"
            :IssueManday="selected.issue_manday"
            :IssueStart="selected.formattedDateStart"
            :IssueExpected="selected.formattedDateExpected"
            :IssueComplete="selected.issue_complete"
            :IssueDesImplementer="selected.issue_des_implementer"
            :IssueDesDev="selected.issue_des_dev"
            :IssueDes="selected.issue_des"
            :IssueDocId="selected.issue_doc_id"
            :IssueCustomer="selected.issue_customer"
            :IssueTypeSA="selected.issue_type_sa"
            :IssueCreate="selected.created_at"
            :ScreenName="selected.screenName"
            :IssueDeveloperStatus="selected.issue_status_developer"
            :IssueImplementerStatus="selected.issue_status_implement"
            :IssueRound="selected.issue_round"
            :ImpleSection="selected.impleSection"
            :UserId="selected.userId"
            @button-clicked="getIssue()"
          />
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <!-- *cardAll -->
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
                        ปัญหาที่มีคนรับผิดชอบ
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
                  <!-- <v-icon
                    v-if="item.issue_status == 'active'"
                    style="color: #1cff17"
                    >mdi-circle</v-icon
                  > -->
                  <!-- <v-icon
                    v-if="item.issue_status == 'open'"
                    style="color: gainsboro"
                    >mdi-circle</v-icon
                  > -->
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
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    class="mr-2"
                    v-if="
                      user_position === 'Implementer' &&
                      user_role !== 'Admin' &&
                      item.issue_qc !== user_firstname &&
                      item.issue_informer !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else-if="
                      user_position === 'Developer' &&
                      user_role !== 'Admin' &&
                      item.issue_assign !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>

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
                        ปัญหาที่ไม่มีคนรับผิดชอบ
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
                  <!-- <v-icon style="color: #1cff17">mdi-circle</v-icon> -->
                  {{ item.issue_status }}
                </template>
                <template v-slot:[`item.issue_Priotity`]="{ item }">
                  <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
                  {{ item.issue_Priotity }}
                </template>
                <template #item.issue_assign="{ value }"> No assign </template>
                <template v-slot:item.actions="{ item }">
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <!-- *card PNI -->
              <!-- *Table assignedIssues -->
              <v-data-table
                :headers="headers"
                :items="system.assignedIssuesPNI"
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
                        ปัญหาที่มีคนรับผิดชอบ
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
                  <!-- <v-icon
                    v-if="item.issue_status == 'active'"
                    style="color: #1cff17"
                    >mdi-circle</v-icon
                  > -->
                  <!-- <v-icon
                    v-if="item.issue_status == 'open'"
                    style="color: gainsboro"
                    >mdi-circle</v-icon
                  > -->
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
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    class="mr-2"
                    v-if="
                      user_position === 'Implementer' &&
                      user_role !== 'Admin' &&
                      item.issue_qc !== user_firstname &&
                      item.issue_informer !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else-if="
                      user_position === 'Developer' &&
                      user_role !== 'Admin' &&
                      item.issue_assign !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
              <!-- *Table 2 unassignedIssues-->
              <v-data-table
                :headers="headers"
                :items="system.unassignedIssuesPNI"
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
                        ปัญหาที่ไม่มีคนรับผิดชอบ
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
                  <!-- <v-icon style="color: #1cff17">mdi-circle</v-icon> -->
                  {{ item.issue_status }}
                </template>
                <template v-slot:[`item.issue_Priotity`]="{ item }">
                  <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
                  {{ item.issue_Priotity }}
                </template>
                <template #item.issue_assign="{ value }"> No assign </template>
                <template v-slot:item.actions="{ item }">
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <!-- *card PNC -->
              <!-- *Table assignedIssues -->
              <v-data-table
                :headers="headers"
                :items="system.assignedIssuesPNC"
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
                        ปัญหาที่มีคนรับผิดชอบ
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
                  <!-- <v-icon
                    v-if="item.issue_status == 'active'"
                    style="color: #1cff17"
                    >mdi-circle</v-icon
                  > -->
                  <!-- <v-icon
                    v-if="item.issue_status == 'open'"
                    style="color: gainsboro"
                    >mdi-circle</v-icon
                  > -->
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
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    class="mr-2"
                    v-if="
                      user_position === 'Implementer' &&
                      user_role !== 'Admin' &&
                      item.issue_qc !== user_firstname &&
                      item.issue_informer !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else-if="
                      user_position === 'Developer' &&
                      user_role !== 'Admin' &&
                      item.issue_assign !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
              <!-- *Table 2 unassignedIssues-->
              <v-data-table
                :headers="headers"
                :items="system.unassignedIssuesPNC"
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
                        ปัญหาที่ไม่มีคนรับผิดชอบ
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
                  <!-- <v-icon style="color: #1cff17">mdi-circle</v-icon> -->
                  {{ item.issue_status }}
                </template>
                <template v-slot:[`item.issue_Priotity`]="{ item }">
                  <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
                  {{ item.issue_Priotity }}
                </template>
                <template #item.issue_assign="{ value }"> No assign </template>
                <template v-slot:item.actions="{ item }">
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <!-- *card New req -->
              <!-- *Table assignedIssues -->
              <v-data-table
                :headers="headers"
                :items="system.assignedIssuesNewReq"
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
                        ปัญหาที่มีคนรับผิดชอบ
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
                  <!-- <v-icon
                    v-if="item.issue_status == 'active'"
                    style="color: #1cff17"
                    >mdi-circle</v-icon
                  > -->
                  <!-- <v-icon
                    v-if="item.issue_status == 'open'"
                    style="color: gainsboro"
                    >mdi-circle</v-icon
                  > -->
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
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    class="mr-2"
                    v-if="
                      user_position === 'Implementer' &&
                      user_role !== 'Admin' &&
                      item.issue_qc !== user_firstname &&
                      item.issue_informer !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else-if="
                      user_position === 'Developer' &&
                      user_role !== 'Admin' &&
                      item.issue_assign !== user_firstname
                    "
                    :disabled="true"
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    class="mr-2"
                    v-else
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
              <!-- *Table 2 unassignedIssues-->
              <v-data-table
                :headers="headers"
                :items="system.unassignedIssuesNewReq"
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
                        ปัญหาที่ไม่มีคนรับผิดชอบ
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
                  <!-- <v-icon style="color: #1cff17">mdi-circle</v-icon> -->
                  {{ item.issue_status }}
                </template>
                <template v-slot:[`item.issue_Priotity`]="{ item }">
                  <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
                  {{ item.issue_Priotity }}
                </template>
                <template #item.issue_assign="{ value }"> No assign </template>
                <template v-slot:item.actions="{ item }">
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = false)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <!-- *card History -->
              <!-- *Table assignedIssues -->
              <v-data-table
                :headers="headers"
                :items="system.assignedIssuesHistory"
                sort-by="calories"
                class="v-data-table elevation-1 mb-2"
                v-remove-row-borders
              >
                <template v-slot:[`item.issue_name`]="{ item }">
                  <v-icon>mdi-format-list-bulleted</v-icon>
                  {{ item.issue_name }} /{{ item.issue_id }}
                </template>
                <template v-slot:[`item.formattedDateEnd`]="{ item }">
                  {{ item.formattedDateEnd }}
                </template>
                <template v-slot:[`item.issue_status`]="{ item }">
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
                <template v-slot:[`item.actions`]="{ item }">
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
                        item.formattedDateAccepting,
                        item.issue_manday,
                        item.formattedDateStart,
                        item.formattedDateExpected,
                        item.formattedDateComplete,
                        item.issue_des_implementer,
                        item.issue_des_dev,
                        item.issue_des,
                        item.issue_customer,
                        item.issue_doc_id,
                        item.issue_type_sa,
                        item.created_at,
                        item.issue_status_developer,
                        item.issue_status_implement,
                        item.issue_round
                      ), (history = true)
                    "
                    size="20"
                    color="primary"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
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
import DialogIssueImple from "../../components/DialogIssueImple.vue";
export default {
  components: { Searchbar, DialogIssue, DialogIssueDetail, DialogIssueImple },
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
      tab: null,
      dialog: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      dialogInfo: false,
      dialogIssueDetail: false,
      dialogIssueImple: false,
      dialogIssueDev: false,
      history: false,
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
        issue_status: "",
        issue_accepting: "",
        issue_manday: "",
        issue_complete: "",
        created_at: "",
        screenName: "",
        formattedDateEnd: "",
        formattedDateAccepting: "",
        formattedDateExpected: "",
        formattedDateStart: "",
        issue_status_developer: "",
        issue_status_implement: "",
        issue_round: "",
        impleSection: false,
        userId: "",
      },
      infoCreate: {
        systemName: "",
        systemId: "",
        system_id: "",
      },
      headers: [
        {
          text: "เลขที่ปัญหา",
          align: "start",
          sortable: false,
          value: "issue_id",
        },
        { text: "ชื่อปัญหา", value: "issue_name" },
        { text: "ประเทภปัญหา", value: "issue_type" },
        { text: "วันกำหนดส่ง", value: "formattedDateEnd" },
        { text: "สถานะ", value: "issue_status" },
        { text: "ความสำคัญของปัญหา", value: "issue_priority" },
        { text: "ผู้รับผิดชอบ", value: "issue_assign" },
        { text: "จัดการ", value: "actions", sortable: false },
      ],
      issue: [],
      issueDev: [],
      issueImple: [],
      project: [],
      projectDev: [],
      projectImple: [],
      systems: [],
      systemsDev: [],
      systemsImple: [],
      default: [],
      projectName: "",
      projectId: "",
      project_id: "",
      systemslength: "",
      user_id: "",
      user_firstname: "",
      user_lastname: "",
      user_position: "",
      user_role: "",
      runningNumber: "",
    };
  },
  async created() {
    await this.getUser();
    await this.getProject();
    await this.getProjectDev();
    await this.getProjectImple();
    await this.getSystems();
    await this.getSystemsDev();
    await this.getSystemsImple();
    await this.getIssue();
  },
  async mounted() {
    await this.getUser();
    await this.getProject();
    await this.getProjectDev();
    await this.getProjectImple();
    await this.getSystems();
    await this.getSystemsDev();
    await this.getSystemsImple();
    await this.getIssue();
  },
  computed: {
    userId() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("userId");
      }
      return null; // or some default value if localStorage is not available
    },
    systemsList() {
      if (this.user_role === "Admin" || this.user_position === "Implementer") {
        return this.systems;
      } else if (
        this.user_role === "User" &&
        this.user_position === "Developer"
      ) {
        return this.systems;
        // return this.systemsDev; // Dev ถ้าต้องการดูของตัวเองให้เปิด
      } else {
        return [];
      }
    },
    // disabledButton() {
    //   if (this.user_role === "Admin" || this.user_position === "Developer") {
    //     return false;
    //   } else if (this.user_role === "User" && this.user_position === "Implementer") {
    //     if () {
    //       return true;
    //     }
    //   } else {
    //     return [];
    //   }
    // },
  },
  methods: {
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
        this.user_id = res.data[0].user_id;
        this.user_firstname = res.data[0].user_firstname;
        this.user_lastname = res.data[0].user_lastname;
        this.user_position = res.data[0].user_position;
        this.user_role = res.data[0].user_role;
      });
    },
    async getProjectDev() {
      await this.$axios.get("/projects/getOne/" + this.id).then((res) => {
        this.projectDev = res.data;
      });
      // this.systemsDev = this.projectDev[0];
    },
    async getSystemsDev() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projectDev.forEach((projectDev) => {
          Vue.set(
            projectDev,
            "systemsDevs",
            res.data.filter((system) => system.project_id === projectDev.id)
          );
        });
      });
      this.systemsDev = this.projectDev[0].systemsDevs;
    },
    async getProjectImple() {
      await this.$axios.get("/projects/getOne/" + this.id).then((res) => {
        this.projectImple = res.data;
      });
      // this.systemsDev = this.projectDev[0];
    },
    async getSystemsImple() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projectImple.forEach((projectImple) => {
          Vue.set(
            projectImple,
            "systemsImples",
            res.data.filter((system) => system.project_id === projectImple.id)
          );
        });
      });
      this.systemsImple = this.projectImple[0].systemsImples;
    },
    async getProject() {
      await this.$axios.get("/projects/getOne/" + this.id).then((res) => {
        this.project = res.data;
        this.projectName = this.project[0].project_name;
        this.projectId = this.project[0].id;
        this.project_id = this.project[0].project_id;
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
      });
      this.systems = this.project[0].systems;
      this.systemslength = this.project[0].systems.length;
    },

    async getIssue() {
      try {
        const res = await this.$axios.get(
          "/issues/getAll?project_id=" + this.id
        );
        this.issue = res.data;
        this.runningNumber = this.issue.length + 1;
        this.issue.forEach((issue) => {
          const dateEnd = moment(issue.issue_end, "YYYY-MM-DDTHH:mm:ss.SSSZ");
          issue.formattedDateEnd = dateEnd.format("YYYY-MM-DD");

          const dateAccepting = moment(
            issue.issue_accepting,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          issue.formattedDateAccepting = dateAccepting.format("YYYY-MM-DD");

          const dateStart = moment(
            issue.issue_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          issue.formattedDateStart = dateStart.format("YYYY-MM-DD");

          const dateExpected = moment(
            issue.issue_expected,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          issue.formattedDateExpected = dateExpected.format("YYYY-MM-DD");

          const dateComplete = moment(
            issue.issue_complete,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          issue.formattedDateComplete = dateComplete.format("YYYY-MM-DD");
        });

        this.systems.forEach((system) => {
          Vue.set(
            system,
            "assignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign !== "" &&
                issue.issue_assign !== null &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign !== "" &&
                issue.issue_assign !== null &&
                issue.issue_type === "PNI" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNI" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign !== "" &&
                issue.issue_assign !== null &&
                issue.issue_type === "PNC" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNC" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesNewReq",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign !== "" &&
                issue.issue_assign !== null &&
                issue.issue_type === "New Req" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuessNewReq",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "New Req" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesHistory",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_status_implement === "ตรวจสอบผ่าน"
            )
          );
        });

        this.systemsDev.forEach((system) => {
          Vue.set(
            system,
            "assignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign == this.user_firstname &&
                issue.issue_assign !== null &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign == this.user_firstname &&
                issue.issue_assign !== null &&
                issue.issue_type === "PNI" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNI" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign == this.user_firstname &&
                issue.issue_assign !== null &&
                issue.issue_type === "PNC" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNC" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesNewReq",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                issue.issue_assign == this.user_firstname &&
                issue.issue_assign !== null &&
                issue.issue_type === "New Req" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "unassignedIssuessNewReq",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "New Req" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesHistory",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_status_implement === "ตรวจสอบผ่าน"
            )
          );
        });

        this.systemsImple.forEach((system) => {
          Vue.set(
            system,
            "assignedIssues",
            this.issue.filter(
              (issue) =>
                (issue.system_id === system.id &&
                  issue.issue_assign != "" &&
                  issue.issue_assign !== null &&
                  issue.issue_status_implement !== "ตรวจสอบผ่าน" &&
                  issue.issue_informer == this.user_firstname) ||
                issue.issue_qc == this.user_firstname
            )
          );
          Vue.set(
            system,
            "unassignedIssues",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign != "" || issue.issue_assign === null) &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                (issue.system_id === system.id &&
                  issue.issue_assign != "" &&
                  issue.issue_assign !== null &&
                  issue.issue_type === "PNI" &&
                  issue.issue_status_implement !== "ตรวจสอบผ่าน" &&
                  issue.issue_informer == this.user_firstname) ||
                issue.issue_qc == this.user_firstname
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNI",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNI" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                (issue.system_id === system.id &&
                  issue.issue_assign != "" &&
                  issue.issue_assign !== null &&
                  issue.issue_type === "PNC" &&
                  issue.issue_status_implement !== "ตรวจสอบผ่าน" &&
                  issue.issue_informer == this.user_firstname) ||
                issue.issue_qc == this.user_firstname
            )
          );
          Vue.set(
            system,
            "unassignedIssuesPNC",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign === "" || issue.issue_assign === null) &&
                issue.issue_type === "PNC" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesNewReq",
            this.issue.filter(
              (issue) =>
                (issue.system_id === system.id &&
                  issue.issue_assign != "" &&
                  issue.issue_assign !== null &&
                  issue.issue_type === "New Req" &&
                  issue.issue_status_implement !== "ตรวจสอบผ่าน" &&
                  issue.issue_informer == this.user_firstname) ||
                issue.issue_qc == this.user_firstname
            )
          );
          Vue.set(
            system,
            "unassignedIssuessNewReq",
            this.issue.filter(
              (issue) =>
                issue.system_id === system.id &&
                (issue.issue_assign != "" || issue.issue_assign === null) &&
                issue.issue_type === "New Req" &&
                issue.issue_status_implement !== "ตรวจสอบผ่าน"
            )
          );
          Vue.set(
            system,
            "assignedIssuesHistory",
            this.issue.filter(
              (issue) =>
                (issue.system_id === system.id &&
                  (issue.issue_assign != "" || issue.issue_assign === null) &&
                  issue.issue_status_implement === "ตรวจสอบผ่าน" &&
                  issue.issue_informer == this.user_firstname) ||
                issue.issue_qc == this.user_firstname
            )
          );
        });
      } catch (err) {
        console.error(err);
      }
    },
    showIssueCreateDialog(systemName, systemId, systemids) {
      this.infoCreate.systemName = systemName;
      this.infoCreate.systemId = systemId;
      this.infoCreate.system_id = systemids;
      this.dialog = true;
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
      issueformattedDateAccepting,
      issueManday,
      issueformattedDateStart,
      issueformattedDateExpected,
      issueComplete,
      issueDesImplementer,
      issueDesDev,
      issueDes,
      issueCustomer,
      issueDocId,
      issueTypeSA,
      issueCreate,
      issueDeveloperStatus,
      issueImplementerStatus,
      issueRound
    ) {
      this.selected.userId = this.userId;
      //formattedDateAccepting
      this.selected.formattedDateAccepting =
        issueformattedDateAccepting == null ||
        issueformattedDateAccepting == "Invalid date" ||
        issueformattedDateAccepting == undefined
          ? null
          : issueformattedDateAccepting;
      //formattedDateStart
      this.selected.formattedDateStart =
        issueformattedDateStart == null ||
        issueformattedDateStart == "Invalid date" ||
        issueformattedDateStart == undefined
          ? null
          : issueformattedDateStart;
      //formattedDateExpected
      this.selected.formattedDateExpected =
        issueformattedDateExpected == null ||
        issueformattedDateExpected == "Invalid date" ||
        issueformattedDateExpected == undefined
          ? null
          : issueformattedDateExpected;
      //formattedDateComplete
      this.selected.issue_complete =
        issueComplete == null ||
        issueComplete == "Invalid date" ||
        issueComplete == undefined
          ? null
          : issueComplete;
      //formattedDateEnd
      this.selected.formattedDateEnd =
        issueFormattedDateEnd == null ||
        issueFormattedDateEnd == "Invalid date" ||
        issueFormattedDateEnd == undefined
          ? null
          : issueFormattedDateEnd;

      this.selected.Id = issueid;
      this.selected.issue_id = issueId;
      this.selected.issue_type = issueType;
      this.selected.screen_id = issueScreenid;
      this.selected.issue_status = issueStatus;
      this.selected.issue_priority = issuePriority;
      this.selected.issue_name = issueName;
      this.selected.issue_des_sa = issueDesSA;
      this.selected.issue_informer = issueInformer;
      this.selected.issue_assign = issueAssign;
      this.selected.issue_qc = issueQc;
      this.selected.issue_filename = issueFilename;
      this.selected.issue_manday = issueManday;
      this.selected.issue_des_implementer = issueDesImplementer;
      this.selected.issue_des_dev = issueDesDev;
      this.selected.issue_des = issueDes;
      this.selected.issue_customer = issueCustomer;
      this.selected.issue_doc_id = issueDocId;
      this.selected.issue_type_sa = issueTypeSA;
      //created at
      const dateCreate = moment(issueCreate).format("YYYY-MM-DD");
      this.selected.created_at = dateCreate;
      //get screen name
      this.$axios.get("/screens/getOne/" + issueScreenid).then((res) => {
        const screen = res.data[0].screen_name;
        this.selected.screenName = screen;
      });
      this.selected.issue_status_developer = issueDeveloperStatus;
      if (issueDeveloperStatus === "แก้ไขเรียบร้อย") {
        this.selected.impleSection = true;
      } else {
        this.selected.impleSection = false;
      }
      this.selected.issue_status_implement = issueImplementerStatus;
      this.selected.issue_round = issueRound;
      //check role
      if (this.history == true) {
        this.dialogIssueDetail = true;
      }
      else if (this.user_role == "Admin") {
        this.dialogIssueDetail = true;
      } else if (
        this.user_position == "Implementer" &&
        this.user_role == "User"
      ) {
        this.dialogIssueImple = true;
      } else if (
        this.user_position == "Developer" &&
        this.user_role == "User"
      ) {
        this.dialogIssueDev = true;
      }
      //check role
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
</style>