<template>
  <div class="body">
    <!-- *Search bar* -->
    <Searchbar title="Issue List" />
    <v-divider></v-divider>

    <!-- *Header* -->
    <v-row class="mt-4 ml-2 mb-2">
      <h4>{{ this.projectName }}</h4>
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
            <dialog-issue
              :dialog.sync="dialog"
              :projectName="projectName"
              :systemName="system.system_nameTH"
              :mode="'create'"
            />
            <!-- *dialog -->
            <!-- <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="new-btn ma-2 text-left"
                  outlined
                  color="indigo"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  block
                >
                  <span
                    class="mdi mdi-plus-circle-outline"
                    style="font-size: 20px; color: black"
                  ></span>
                  <h4 style="color: black">Add New Issue</h4>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <v-col cols="12">
                    <v-row>
                      <h5>Create Issue |</h5>
                      <p style="font-size: 16px; margin-left: 2%">
                        Project Name / Sub system name
                      </p>
                    </v-row>
                  </v-col>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Issue No."
                          placeholder="Issue No."
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8" md="8">
                        <v-text-field
                          label="Issue Name"
                          placeholder="Issue Name"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="type_select"
                          label="PNI/PNC/New Req"
                          dense
                          outlined
                          v-model="type"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="screen_select"
                          label="Screen No."
                          dense
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Informer"
                          placeholder="Implementer"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="priotity_select"
                          label="Priotity"
                          dense
                          outlined
                          prepend-icon="mdi-flag-outline"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Picker in menu"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              class="pt-0"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="4" md="2">
                        <v-select
                          :items="dev_select"
                          label="Dev"
                          dense
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" md="2">
                        <v-select
                          :items="qc_select"
                          label="QC"
                          dense
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-show="PNC">
                        <v-text-field
                          label="Document No."
                          placeholder="Document No."
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8" md="8" v-show="PNC">
                        <v-text-field
                          label="Customer Name"
                          placeholder="Customer Name"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" v-show="Newreq">
                        <v-container fluid class="ma-0 pa-0">
                          <p>Type Issue {{ selected }}</p>
                          <v-row>
                            <v-col>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="UI"
                                  value="UI"
                                ></v-checkbox>
                              </v-row>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="Business"
                                  value="Business"
                                ></v-checkbox>
                              </v-row>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="Data"
                                  value="Data"
                                ></v-checkbox
                              ></v-row>
                            </v-col>
                            <v-col>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="Servies"
                                  value="Servies"
                                ></v-checkbox>
                              </v-row>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="Report"
                                  value="Report"
                                ></v-checkbox>
                              </v-row>
                              <v-row>
                                <v-checkbox
                                  v-model="selected"
                                  label="Training"
                                  value="Training"
                                ></v-checkbox>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" v-show="Newreq">
                        <p>Note for SA</p>
                        <v-textarea
                          solo
                          name="input-7-4"
                          label="Note for SA"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" class="mt-0">
                        <v-textarea
                          solo
                          name="input-7-4"
                          label="Description"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          label="File input"
                          outlined
                          dense
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="primary" dark @click="dialog = false">
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
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

          <!-- *Table 1 -->
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
              {{ item.issue_name }}
            </template>
            <!-- <template v-slot:[`item.issue_type`]="{ item }">
              {{ item.issue_type }}
            </template> -->
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
          <v-dialog v-model="dialogInfo" width="80%">
            <v-card>
              <v-card-title class="text-h5">
                <h5>Project Name > System 1 > Issue 1</h5>
              </v-card-title>
              <v-row class="pa-5">
                <v-col>
                  <v-row>
                    <v-col> No. 1 </v-col>
                    <v-col> PNI </v-col>
                    <v-col> Screen 1 </v-col>
                    <v-col> Finished </v-col>
                    <v-col>
                      <v-icon style="color: #ff0000"
                        >mdi-flag-outline</v-icon
                      ></v-col
                    >
                    <v-col> Nov 31, 2022 </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">Name</p>
                        <v-text-field
                          label="Issue No."
                          placeholder="Issue No."
                          outlined
                          dense
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        solo
                        name="input-7-4"
                        label="Note for SA"
                      ></v-textarea
                    ></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">Informer</p>
                        <v-text-field
                          label="Issue No."
                          placeholder="Issue No."
                          outlined
                          dense
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">Assign To</p>
                        <v-chip class="ma-2" color="primary" text-color="white">
                          <v-avatar left>
                            <v-icon>mdi-account-circle</v-icon>
                          </v-avatar>
                          Mike
                        </v-chip>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">QC</p>
                        <v-chip class="ma-2" color="primary" text-color="white">
                          <v-avatar left>
                            <v-icon>mdi-account-circle</v-icon>
                          </v-avatar>
                          Mike
                        </v-chip>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">Attachments</p>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- col ใหญ่ฝั่งขวา -->
                <v-col
                  ><v-row class="ml-2">
                    <v-col>
                      <v-row class="text-h6">
                        <h6>Developer Section 1</h6></v-row
                      >
                      <v-row class="mt-5">
                        <v-col cols="6">
                          <v-row>
                            <p class="pa-2">Date of accepting</p>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
                                  label="Picker in menu"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="pt-0"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <p class="pa-2">Manday</p>
                            <v-text-field
                              label="Manday"
                              placeholder="Manday"
                              outlined
                              dense
                            ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <p class="pa-2">Start date</p>
                            <p class="pa-2">-</p>
                            <p class="pa-2">Expected completion Date</p>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
                                  label="Picker in menu"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="pt-0"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
                                  label="Picker in menu"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="pt-0"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                      <v-row class="text-h6 mt-2"
                        ><h6>Developer Section 2</h6>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <p class="pa-2">Status</p>
                            <v-text-field
                              label="Status"
                              placeholder="Status"
                              outlined
                              dense
                            ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <p class="pa-2">Completion date</p>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
                                  label="Picker in menu"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="pt-0"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <p class="">Cause / Remedy</p>
                          <v-textarea
                            solo
                            name="input-7-4"
                            label="Note for SA"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row class="justify-center mr-16 mt-5">
                        <v-btn color="primary" @click="dialogInfo = false"
                          >Update</v-btn
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider width="50%"></v-divider>
              <v-row class="pa-5">
                <v-col>
                  <v-row class="text-h6"> Implements Section </v-row>
                  <v-row class="mt-5">
                    <v-col cols="6">
                      <v-row>
                        <p class="pa-2">Status</p>
                        <v-text-field
                          label="Status"
                          placeholder="Status"
                          outlined
                          dense
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <p class="">Cause / Remedy</p>
                      <v-textarea
                        solo
                        name="input-7-4"
                        label="Note for SA"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center mr-16">
                    <v-btn color="primary" @click="dialogInfo = false"
                      >Close</v-btn
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
          <!-- *Table 2 -->
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
export default {
  components: { Searchbar, DialogIssue },
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
      projectName: "",
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
  updated() {},
  computed: {},
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
    infoItem() {
      console.log("SHow");
      this.dialogInfo = true;
      console.log(this.dialogInfo);
    },
    showDialog() {
      console.log("SHow");
    },
    async getProject() {
      await this.$axios.get("/projects/getOne/" + this.id).then((res) => {
        this.project = res.data;
        this.projectName = this.project[0].project_name;
        console.log(this.project[0].project_name, "this.project");
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
        console.log(this.systems, "system issue2");
      } catch (err) {
        console.error(err);
      }
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
  
  <style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>