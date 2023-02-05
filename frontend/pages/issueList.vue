<template>
  <div class="body">
    <!-- *Search bar* -->

    <v-row class="mb-3">
      <v-text-title
        class="center ml-4 mr-4 mt-3 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        System List
      </v-text-title>
      <v-divider
        class="mt-3 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <template>
        <v-banner
          class="mt-3 ml-4"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            border-radius: 30px;
            padding: 0 0px;
          "
          outlined
          elevation="2"
        >
          <form class="center" @submit.prevent="search">
            <v-icon color="primary">mdi-magnify</v-icon>
            <input
              class="mr-3 mt-1"
              type="text"
              v-model="query"
              placeholder="Search some issue"
            />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>

    <!-- *Header* -->
    <v-row class="mt-4 ml-2 mb-2">
      <h4>Project Name</h4>
      <p style="color: #b6b5b5; font-size: 16px" class="ml-2">
        {{ this.sub_project_count }} Sub Systems
      </p>
    </v-row>

    <!-- * box -->
    <v-expansion-panels class="mb-6">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template>
            <v-row no-gutters>
              <v-col cols="4">
                <v-row style="margin-top: 1%">
                  <h4>Sub System 1</h4>
                  <p style="color: #b6b5b5; font-size: 16px; margin-left: 5%">
                    3 Issue
                  </p>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="4">
                <v-row>
                  <h4 style="margin-top: 3.5%; margin-right: 2%">
                    Sub System 1
                  </h4>
                  <v-chip class="ma-2" color="primary" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-avatar>
                    Mike
                  </v-chip>
                  <v-chip class="ma-2" color="primary" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-account-circle</v-icon>
                    </v-avatar>
                    Mike
                  </v-chip>
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
        <v-expansion-panel-content>
          <v-row justify="center">
            <!-- *dialog -->
            <v-dialog v-model="dialog" persistent max-width="600px">
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
            </v-dialog>
          </v-row>
          <!-- *tabs -->
          <v-tabs fixed-tabs color="primary" class="mt-5">
            <v-tab> <h3 style="color: black">PNI</h3> </v-tab>
            <v-tab> <h3 style="color: black">PNC</h3> </v-tab>
            <v-tab> <h3 style="color: black">History</h3> </v-tab>
          </v-tabs>

          <!-- *Table 1 -->
          <v-data-table
            :headers="headers"
            :items="issue"
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
                    Own issue
                  </h5>
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.issue_name="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.issue_name }}
            </template>
            <template v-slot:item.issue_status="{ item }">
              <v-icon style="color: #1cff17">mdi-circle</v-icon>
              {{ item.issue_status }}
            </template>
            <template v-slot:item.issue_Priotity="{ item }">
              <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
              {{ item.issue_Priotity }}
            </template>
            <template v-slot:item.issue_assignees="{ item }">
              <v-icon style="color: black">mdi-account-circle</v-icon>
              <!-- {{ item.issue_assignees }} -->
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click="infoItem()">
                mdi-information-outline
              </v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogInfo" width="80%">
            <v-card>
              <v-card-title class="text-h5">
                Project Name > System 1 > Issue 1
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
                      <v-row class="text-h6"> Developer Section 1 </v-row>
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
                      <v-row class="text-h6 mt-2"> Developer Section 2 </v-row>
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
                          ></v-textarea
                        ></v-col>
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
                      ></v-textarea
                    ></v-col>
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
            :items="issue"
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
                    No one assigned
                  </h5>
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.issue_name="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.issue_name }}
            </template>
            <template v-slot:item.issue_status="{ item }">
              <v-icon style="color: #1cff17">mdi-circle</v-icon>
              {{ item.issue_status }}
            </template>
            <template v-slot:item.issue_Priotity="{ item }">
              <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
              {{ item.issue_Priotity }}
            </template>
            <template v-slot:item.issue_assignees="{ item }">
              <v-icon style="color: black">mdi-account-circle</v-icon>
              <!-- {{ item.issue_assignees }} -->
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- * box2 -->
  </div>
</template>

<script>
export default {
  layout: "Nav",
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
      dialog: false,
      sub_project_count: "2",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      type: "",
      PNC: false,
      Newreq: false,
      dialogInfo: false,
      headers: [
        {
          text: "Issues No.",
          align: "start",
          sortable: false,
          value: "issue_no",
        },
        { text: "Issues Name", value: "issue_name", sortable: false },
        { text: "End Date", value: "issue_end_date" },
        { text: "Status", value: "issue_status" },
        { text: "Priotity", value: "issue_Priotity" },
        { text: "Assignees", value: "issue_assignees" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      issue: [],
      priotity_select: ["Critical", "Hight", "Low"],
      type_select: ["PNI", "PNC", "New Req"],
      screen_select: ["Screen 1", "Screen 2"],
      qc_select: ["QC1"],
      dev_select: ["Dev1"],
      selected: ["UI"],
    };
  },
  created() {
    this.initialize();
  },
  updated() {
    if (this.type == "PNC") {
      this.PNC = true;
      this.Newreq = false;
    } else if (this.type == "PNI") {
      this.PNC = false;
      this.Newreq = false;
    } else if (this.type == "New Req") {
      this.Newreq = true;
      this.PNC = false;
    } else {
      this.PNC = false;
      this.Newreq = false;
    }
  },
  methods: {
    initialize() {
      this.issue = [
        {
          issue_no: "SP-123xx-PNI-21/10/22-0001",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0002",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0003",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0004",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0005",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
      ];
    },
    infoItem() {
      console.log("SHow");
      this.dialogInfo = true;
      console.log(this.dialogInfo);
    },
    showDialog() {
      console.log("SHow");
    },
  },
};
</script>

<style scoped>
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