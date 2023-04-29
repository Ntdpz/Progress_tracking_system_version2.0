<template>
  <v-dialog v-model="dialog" width="90%" persistent>
    <v-card v-if="loading">
      <h1>Loading.....</h1>
    </v-card>
    <v-card v-else width="99%" class="pa-0 ma-0">
      <v-card-title class="text-h5 pt-8">
        <!-- <h5>{{ ProjectName }} > {{ SystemName }} > {{ IssueName }}</h5> -->
        <h5>Issue Detail | {{ ProjectName }} > {{ SystemName }}</h5>
      </v-card-title>
      <v-row class="pa-5">
        <v-col>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Issue ID"
                placeholder="Issue ID"
                disabled
                outlined
                dense
                v-model="IssueId"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                label="Issue Name"
                placeholder="Issue Name"
                outlined
                dense
                v-model="IssueName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="type_select"
                label="PNI/PNC/New Req"
                dense
                outlined
                v-model="IssueType"
                @change="selectedType()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-select
                @change="getUserSystems(ScreenName.id)"
                :items="screen_selectDefault"
                label="Screen No."
                dense
                outlined
                menu-props="auto"
                v-model="ScreenName"
                item-text="screen_name"
                return-object="false"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="ผู้จดแจ้ง"
                placeholder="ผู้จดแจ้ง"
                outlined
                dense
                v-model="IssueInformer"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="priotity_select"
                label="Priotity"
                dense
                outlined
                prepend-icon="mdi-flag-outline"
                v-model="IssuePriority"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="issue_status_default"
                label="สถานะ"
                placeholder="สถานะ"
                dense
                outlined
                v-model="IssueStatus"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="วันที่สร้าง"
                placeholder="วันที่สร้าง"
                outlined
                disabled
                dense
                v-model="IssueCreate"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-row>
                <!-- IssueEnd date-->
                <v-menu
                  v-model="endIssueMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="IssueEndDate"
                      label="วันกำหนดส่ง"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="IssueEndDate"
                    @input="endIssueMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                return-object="false"
                :items="position_Developers"
                label="Dev"
                dense
                outlined
                menu-props="auto"
                item-text="user_firstname"
                v-model="IssueAssign"
                @change="checkAssign()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                return-object="false"
                :items="position_Implementer"
                label="QC"
                dense
                outlined
                menu-props="auto"
                item-text="user_firstname"
                v-model="IssueQC"
                @change="checkAssign2()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                solo
                name="input-7-4"
                label="Note"
                v-model="IssueDes"
                style=""
              ></v-textarea
            ></v-col>
          </v-row>
          <!-- Type PNC option -->
          <v-row v-if="IssueType == 'PNC'">
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Document No.</p>
                <v-text-field
                  label="Issue Informer"
                  placeholder="Issue Informer"
                  outlined
                  dense
                  v-model="IssueDocId"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Customer Name</p>
                <v-text-field
                  label="Issue Informer"
                  placeholder="Issue Informer"
                  outlined
                  dense
                  v-model="IssueCustomer"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <!-- Type New Req option -->
          <v-row v-if="IssueType == 'New Req'">
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Type New Req</p>
                <v-text-field
                  label="Issue Informer"
                  placeholder="Issue Informer"
                  outlined
                  dense
                  v-model="IssueTypeSA"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Note to SA</p>
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Note"
                  v-model="IssueDesSA"
                ></v-textarea>
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
        <v-col style="width: 100%">
          <v-expansion-panels class="mb-2">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Developer Section</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col>
                  <v-row class="mt-5">
                    <v-col cols="6">
                      <v-row>
                        <!-- Date of accepting-->
                        <p class="pa-2">
                          Date of accepting:
                          {{ IssueAccepting }}
                        </p>
                        <!-- <v-menu
                          v-model="acceptMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="IssueAccepting"
                              label="Date of Accepting"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              @change="checkStatus()"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="IssueAccepting"
                            @input="acceptMenu = false"
                            @change="checkStatus()"
                          ></v-date-picker>
                        </v-menu> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row> </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-row>
                        <v-col>
                          <p class="pa-2">Start date: {{ IssueStart }}</p>
                        </v-col>
                        <v-col>
                          <p class="pa-2">-</p>
                        </v-col>
                        <v-col>
                          <p class="pa-2">
                            Expected completion Date:
                            {{ IssueExpected }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="mb-5">
                      <v-row>
                        <!-- Start date -->
                        <!-- <v-menu
                          v-model="startMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="IssueStart"
                              label="Start Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              disabled
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="IssueStart"
                            @input="startMenu = false"
                          ></v-date-picker>
                        </v-menu> -->
                        <!-- Expected completion Date -->
                        <!-- <v-menu
                          v-model="expectedMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="IssueExpected"
                              label="Expected Completion Date"
                              prepend-icon="mdi-calendar"
                              disabled
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="IssueExpected"
                            @input="expectedMenu = false"
                          ></v-date-picker>
                        </v-menu> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-col cols="6">
                    <v-row v-if="mandayProps">
                      <p class="pa-2">Manday</p>
                      <v-text-field
                        label="Manday"
                        placeholder="Manday"
                        disabled
                        outlined
                        dense
                        v-model="IssueManday"
                      ></v-text-field>
                    </v-row>
                    <!-- <v-row v-if="mandaySeleted">
                        <p class="pa-2">Manday (Edit)</p>
                        <v-text-field
                          label="Manday"
                          placeholder="Manday"
                          outlined
                          dense
                          v-model="manday"
                        ></v-text-field>
                      </v-row> -->
                  </v-col>
                  <v-divider></v-divider>
                  <v-row class="text-h6 mt-2 mb-2">
                    <h6>Developer Section 2</h6>
                  </v-row>
                  <v-row>
                    <v-col cols="8">
                      <v-row>
                        <v-col>
                          <p class="pa-2">Status</p>
                          <v-select
                            :items="issue_status_developer_default"
                            label="สถานะ"
                            placeholder="สถานะ"
                            dense
                            outlined
                            v-model="IssueDeveloperStatus"
                            @change="checkStatus2()"
                            disabled
                          ></v-select>
                        </v-col>
                        <v-col v-if="sendWork">
                          <p class="pa-2">โปรดเลือกคนที่จะส่งต่องาน</p>
                          <v-select
                            return-object="false"
                            :items="position_Developers"
                            label="Dev"
                            dense
                            outlined
                            menu-props="auto"
                            item-text="user_firstname"
                            v-model="IssueAssign"
                            disabled
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <!-- Completion date-->
                        <p class="pa-2">Completion date: {{ IssueComplete }}</p>
                        <!-- <v-menu
                          v-model="completionMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="IssueComplete"
                              label="Completion date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="IssueComplete"
                            @input="completionMenu = false"
                          ></v-date-picker>
                        </v-menu> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <p class="">Cause / Remedy</p>
                      <v-textarea
                        solo
                        name="input-7-4"
                        label="Note"
                        v-model="IssueDesDev"
                        disabled
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <!-- <v-row class="justify-center mr-16 mt-5">
                  <v-btn color="primary" @click="handleClose()">Update</v-btn>
                </v-row> -->
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- End developer section 1 -->
          <v-expansion-panels v-if="ImpleSection">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Implements Section</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col>
                  <v-row class="mt-5">
                    <v-col cols="8">
                      <v-row>
                        <v-col>
                          <p class="pa-2">Status</p>
                          <v-select
                            :items="issue_status_implement_default"
                            label="สถานะ"
                            placeholder="สถานะ"
                            dense
                            outlined
                            v-model="IssueImplementerStatus"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <p class="pa-2">จำนวนการแก้ไข</p>
                          <v-text-field
                            label="จำนวนการแก้ไข"
                            placeholder="จำนวนการแก้ไข"
                            outlined
                            disabled
                            dense
                            v-model="IssueRound"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <p class="">Cause / Remedy</p>
                      <v-textarea
                        solo
                        name="input-7-4"
                        label="Note"
                        v-model="IssueDesImplementer"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <!-- <v-divider width="50%"></v-divider> -->
      <v-row justify-center class="pa-5">
        <v-col class="" style="margin-left: 20%">
          <v-btn color="primary" @click="saveIssue()"><h4>Update</h4></v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn color="error" @click="handleClose()"><h4>Cancel</h4></v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
    
  <script>
import moment from "moment";
export default {
  props: {
    ProjectName: String,
    ProjectId: Number,
    SystemName: String,
    SystemId: Number,
    id: {
      type: Number,
      required: true,
    },
    IssueId: String,
    IssueType: String,
    IssueScreenId: Number,
    IssueStatus: String,
    IssuePriority: String,
    IssueEndDate: String,
    IssueName: String,
    IssueDesSA: String,
    IssueInformer: String,
    IssueAssign: String,
    IssueQC: String,
    IssueFilename: String,
    IssueAccepting: String,
    IssueManday: String,
    IssueStart: String,
    IssueExpected: String,
    IssueComplete: String,
    IssueDesImplementer: String,
    IssueDesDev: String,
    IssueDes: String,
    IssueDocId: String,
    IssueCustomer: String,
    IssueTypeSA: String,
    IssueCreate: String,
    ScreenName: String,
    IssueDeveloperStatus: String,
    IssueImplementerStatus: String,
    IssueRound: Number,
    ImpleSection: Boolean,
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      mandayProps: true,
      mandaySeleted: false,
      completionMenu: false,
      //menu
      acceptMenu: false,
      startMenu: false,
      expectedMenu: false,
      endIssueMenu: false,
      //date
      manday: null,
      screen_selectDefault: [],
      type_select: [],
      priotity_select: [],
      position_Developers: [],
      position_Implementer: [],
      issue_status_default: [],
      issue_status_developer_default: [],
      issue_status_implement_default: [],

      sendWork: false,
    };
  },
  async mounted() {
    await this.getDefault();
    await this.getUserSystemsOncreated();
    await this.checkStatus();
    await this.checkStatus2();
  },
  // updated() {
  //   console.log(this.IssueAssign, "this.IssueAssign");
  // },
  methods: {
    checkStatus() {
      if (this.IssueAccepting != null) {
        this.IssueDeveloperStatus = "กำลังแก้ไข";
        this.IssueStatus = "กำลังแก้ไข";
      }
    },
    checkStatus2() {
      if (this.IssueDeveloperStatus != "แก้ไขเรียบร้อย") {
        this.ImpleSection = false;
      }
      if (this.IssueDeveloperStatus == "แก้ไขเรียบร้อย") {
        this.IssueStatus = "แก้ไขเรียบร้อย";
      }
      if (this.IssueDeveloperStatus == "กำลังแก้ไข") {
        this.IssueStatus = "กำลังแก้ไข";
        this.ImpleSection = false;
      }
      if (this.IssueDeveloperStatus == "รอแก้ไข") {
        this.IssueStatus = "รอแก้ไข";
        this.ImpleSection = false;
      }
      if (this.IssueDeveloperStatus == "แก้ไขไม่ได้") {
        this.sendWork = true;
        this.IssueStatus = "รอแก้ไข";
      } else {
        this.sendWork = false;
      }
    },
    checkAssign() {
      console.log("checkAssigndev", this.IssueAssign);
      const dev = this.IssueAssign?.user_firstname ?? null;
      this.IssueAssign = dev;
    },
    checkAssign2() {
      console.log("checkAssignqc", this.IssueQC);
      const qc = this.IssueQC?.user_firstname ?? null;
      this.IssueQC = qc;
    },
    async saveIssue() {
      if (this.IssueImplementerStatus == "แก้ไขไม่สำเร็จ") {
        // console.log("check imple");
        // alert("check imple");
        this.IssueRound += 1;
        this.IssueStatus = "รอแก้ไข";
        this.IssueDeveloperStatus = "รอแก้ไข";
        this.IssueAccepting = null;
        this.IssueStart = null;
        this.IssueExpected = null;
        this.IssueImplementerStatus = null;
      }
      if (this.IssueImplementerStatus == "แก้ไขเรียบร้อย") {
        console.log("check แก้ไขเรียบร้อย");
        alert("check แก้ไขเรียบร้อย");
        const dataHistory = {
          screen_id: this.IssueScreenId,
          system_id: this.SystemId,
          project_id: this.ProjectId,
          issue_name: this.IssueName,
          issue_id: this.IssueId,
          issue_type: this.IssueType,
          issue_informer: this.IssueInformer,
          issue_priority: this.IssuePriority,
          issue_end: this.IssueEndDate,
          issue_assign: this.IssueAssign,
          issue_qc: this.IssueQC,
          issue_des: this.IssueDes,
          issue_des_sa: this.IssueDesSA,
          issue_type_sa: this.IssueTypeSA,
          issue_doc_id: this.IssueDocId,
          issue_customer: this.IssueCustomer,
          issue_filename: this.IssueFilename,
          issue_des_dev: this.IssueDesDev,
          issue_des_implementer: this.IssueDesImplementer,
          issue_start: this.IssueStart,
          issue_expected: this.IssueExpected,
          issue_status: this.IssueStatus,
          issue_accepting: this.IssueAccepting,
          issue_manday: this.IssueManday,
          issue_complete: this.IssueComplete,
          issue_status_developer: this.IssueDeveloperStatus,
          issue_status_implement: this.IssueImplementerStatus,
          issue_round: this.IssueRound,
        };
        try {
          await this.$axios.post(
            "/history_issues/createIssueHistory/",
            dataHistory
          );
          console.log("pout success");
          // window.location.reload();
          this.handleClose();
          const promise = new Promise((resolve, reject) => {
            resolve();
            this.close();
          });
          promise.then(() => {
            setTimeout(() => {
              alert("success");
            }, 2000);
          });
        } catch (error) {
          console.error(error);
          alert("Error submitting form");
        }
      }
      const data = {
        screen_id: this.IssueScreenId,
        system_id: this.SystemId,
        project_id: this.ProjectId,
        issue_name: this.IssueName,
        issue_id: this.IssueId,
        issue_type: this.IssueType,
        issue_informer: this.IssueInformer,
        issue_priority: this.IssuePriority,
        issue_end: this.IssueEndDate,
        issue_assign: this.IssueAssign,
        issue_qc: this.IssueQC,
        issue_des: this.IssueDes,
        issue_des_sa: this.IssueDesSA,
        issue_type_sa: this.IssueTypeSA,
        issue_doc_id: this.IssueDocId,
        issue_customer: this.IssueCustomer,
        issue_filename: this.IssueFilename,
        issue_des_dev: this.IssueDesDev,
        issue_des_implementer: this.IssueDesImplementer,
        issue_start: this.IssueStart,
        issue_expected: this.IssueExpected,
        issue_status: this.IssueStatus,
        issue_accepting: this.IssueAccepting,
        issue_manday: this.IssueManday,
        issue_complete: this.IssueComplete,
        issue_status_developer: this.IssueDeveloperStatus,
        issue_status_implement: this.IssueImplementerStatus,
        issue_round: this.IssueRound,
      };

      try {
        await this.$axios.put("/issues/updateIssueAdmin/" + this.id, data);
        console.log("put success");
        // window.location.reload();
        this.handleClose();
        const promise = new Promise((resolve, reject) => {
          resolve();
          this.close();
        });
        promise.then(() => {
          setTimeout(() => {
            alert("success");
          }, 2000);
        });
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
      }
    },
    handleClose() {
      this.$emit("update:dialog", false);
    },
    async getDefault() {
      try {
        const resScreen = await this.$axios.get(
          "/screens/getAll?project_id=" +
            this.ProjectId +
            "&&system_id=" +
            this.SystemId
        );
        this.screen_selectDefault = resScreen.data;
        console.log(this.screen_selectDefault, "this.screen_selectDefault");

        const resDefault = await this.$axios.get("/default_settings/getAll");
        this.default = resDefault.data;

        // console.log(this.default, "this.dataDefault");

        this.default.forEach((item) => {
          if (item.issue_type) {
            this.type_select.push(item.issue_type);
          }
          if (item.issue_priority) {
            this.priotity_select.push(item.issue_priority);
          }
          if (item.issue_status) {
            this.issue_status_default.push(item.issue_status);
          }
          if (item.developer_status) {
            this.issue_status_developer_default.push(item.developer_status);
          }
          if (item.implement_status) {
            this.issue_status_implement_default.push(item.implement_status);
          }
          // console.log(this.priotity_select, "this.priotity_select");
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getUserSystemsOncreated() {
      console.log(this.IssueScreenId, "this.IssueScreenId");
      await this.$axios
        .get("/user_screens/getOneScreenID/" + 391579736)
        .then((data) => {
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );
          this.position_Implementer = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
          console.log(
            this.position_Developers,
            this.position_Implementer,
            "data"
          );
        });
    },
    async getUserSystems(selectedScreenID) {
      this.IssueScreenId = selectedScreenID;
      console.log(this.IssueScreenId, "this.IssueScreenId");
      await this.$axios
        .get("/user_screens/getOneScreenID/" + selectedScreenID)
        .then((data) => {
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );
          this.position_Implementer = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
          this.checkAssign();
          this.checkAssign2();
        });
    },
    selectedType() {},
  },
};
</script>
  
  <style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>