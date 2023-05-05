<template>
  <row justify="center">
    <v-dialog v-model="dialog" persistent max-width="70%">
      <v-card v-if="loading">
        <h1>Loading.....</h1>
      </v-card>
      <v-card v-else>
        <v-card-title class="pt-3" style="background-color: #883cfe">
          <h5 style="color: white">
            รายละเอียดปัญหาที่พบ | โครงการ : {{ ProjectName }} > ระบบ :
            {{ SystemName }} {{ id }}
          </h5>
        </v-card-title>
        <v-row class="ml-2 mr-2 mt-2">
          <v-col>
            <v-row>
              <v-col cols="12" sm="4" md="4" class="pb-0">
                <v-text-field
                  label="Issue ID"
                  placeholder="Issue ID"
                  disabled
                  outlined
                  dense
                  x-small
                  v-model="IssueId"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8" class="pb-0">
                <v-text-field
                  label="Issue Name"
                  placeholder="Issue Name"
                  outlined
                  dense
                  :disabled="isIssueInProcess"
                  v-model="IssueName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-select
                  :items="type_select"
                  label="PNI/PNC/New Req"
                  dense
                  outlined
                  :disabled="isIssueInProcess"
                  v-model="IssueType"
                  @change="selectedType()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="pb-0">
                <v-select
                  @mousemove="getDefault()"
                  @change="getUserSystems(ScreenName.id)"
                  :items="screen_selectDefault"
                  label="Screen No."
                  dense
                  outlined
                  v-model="ScreenName"
                  :disabled="isIssueInProcess"
                  item-text="screen_name"
                  item-value="screen_name"
                  return-object="false"
                >
                  <template v-slot:item="{ item }">
                    {{ item.screen_id }} : {{ item.screen_name }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-text-field
                  label="ผู้จดแจ้ง"
                  placeholder="ผู้จดแจ้ง"
                  outlined
                  dense
                  :disabled="isIssueInProcess"
                  v-model="IssueInformer"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-select
                  :items="priotity_select"
                  label="ความสำคัญ"
                  dense
                  outlined
                  :disabled="isIssueInProcess"
                  prepend-icon="mdi-flag-outline"
                  v-model="IssuePriority"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pb-0">
                <v-select
                  :items="issue_status_default"
                  label="สถานะ"
                  :disabled="isIssueInProcess"
                  placeholder="สถานะ"
                  dense
                  outlined
                  v-model="IssueStatus"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-text-field
                  label="วันที่สร้าง"
                  placeholder="วันที่สร้าง"
                  outlined
                  disabled
                  dense
                  v-model="IssueCreate"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-row>
                  <!-- IssueEnd date-->
                  <v-menu
                    v-model="endIssueMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="IssueEndDate"
                        label="วันกำหนดส่ง"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :disabled="isIssueInProcess"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="IssueEndDate"
                      @input="endIssueMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  return-object="false"
                  :items="position_Developers"
                  label="Dev"
                  dense
                  outlined
                  :disabled="isIssueInProcess"
                  menu-props="auto"
                  item-text="user_firstname"
                  v-model="IssueAssign"
                  @change="checkAssign()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pb-0">
                <v-select
                  return-object="false"
                  :items="position_Implementer"
                  label="QC"
                  dense
                  outlined
                  menu-props="auto"
                  :disabled="isIssueInProcess"
                  item-text="user_firstname"
                  v-model="IssueQC"
                  @change="checkAssign2()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Note"
                  v-model="IssueDes"
                  :disabled="isIssueInProcess"
                  style=""
                ></v-textarea
              ></v-col>
            </v-row>
            <!-- Type PNC option -->
            <v-row v-if="IssueType == 'PNC'">
              <v-col cols="6" class="pb-0">
                <v-row>
                  <p class="pa-2">Document No.</p>
                  <v-text-field
                    label="Issue Informer"
                    placeholder="Issue Informer"
                    :disabled="isIssueInProcess"
                    outlined
                    dense
                    v-model="IssueDocId"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6" class="pb-0">
                <v-row>
                  <p class="pa-2">Customer Name</p>
                  <v-text-field
                    label="Issue Informer"
                    placeholder="Issue Informer"
                    outlined
                    :disabled="isIssueInProcess"
                    dense
                    v-model="IssueCustomer"
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <!-- Type New Req option -->
            <v-row v-if="IssueType == 'New Req'">
              <v-col cols="6" class="pb-0">
                <v-row>
                  <p class="pa-2">Type New Req</p>
                  <v-text-field
                    label="Issue Informer"
                    placeholder="Issue Informer"
                    :disabled="isIssueInProcess"
                    outlined
                    dense
                    v-model="IssueTypeSA"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6" class="pb-0">
                <v-row>
                  <p class="pa-2">Note to SA</p>
                  <v-textarea
                    solo
                    name="input-7-4"
                    :disabled="isIssueInProcess"
                    label="Note"
                    v-model="IssueDesSA"
                  ></v-textarea>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pb-0">
                <v-row>
                  <p class="pa-2">Attachments</p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <!-- col ใหญ่ฝั่งขวา -->
          <v-col>
            <v-expansion-panels class="mb-2">
              <v-expansion-panel>
                <v-expansion-panel-header
                  disable-icon-rotate
                  class="pb-0 pt-0"
                  style="background-color: #883cfe"
                >
                  <h3 style="color: white">Developer Section</h3>
                  <template v-slot:actions>
                    <v-icon color="white"> $expand </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-col class="pt-0">
                    <v-row class="mt-5">
                      <v-col cols="6" class="pb-0">
                        <p>
                          วันที่รับ -
                          {{ IssueAccepting }}
                        </p>
                        <v-row>
                          <!-- Date of accepting-->
                          <!-- <v-menu
                            v-model="acceptMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="IssueAccepting"
                                label="Date of Accepting"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="IssueAccepting"
                              @input="acceptMenu = false"
                            ></v-date-picker>
                          </v-menu> -->
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row> </v-row>
                    <v-row>
                      <v-col cols="6" class="mb-5">
                        <p>วันที่เริ่ม - {{ IssueStart }}</p>
                        <v-row>
                          <!-- Start date -->
                          <!-- <v-menu
                            v-model="startMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="IssueStart"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
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
                          <p class="ml-3">
                            วันที่คาดว่าแก้ไขเสร็จ -
                            {{ IssueExpected }}
                          </p>
                          <!-- <v-menu
                            v-model="expectedMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="IssueExpected"
                                label="Expected Completion Date"
                                prepend-icon="mdi-calendar"
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
                          outlined
                          dense
                          disabled
                          v-model="IssueManday"
                        ></v-text-field>
                      </v-row>
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
                              disabled
                              outlined
                              v-model="IssueDeveloperStatus"
                              @change="checkSendWork()"
                            ></v-select>
                          </v-col>
                          <v-col v-if="sendWork">
                            <p class="pa-2">โปรดเลือกคนที่จะส่งต่องาน</p>
                            <v-select
                              return-object="false"
                              :items="position_Developers_System"
                              @change="getUserScreen(IssueAssign.id)"
                              label="Dev"
                              dense
                              outlined
                              menu-props="auto"
                              item-text="user_firstname"
                              v-model="IssueAssign"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-row>
                          <!-- Completion date-->
                          <p class="pa-2">
                            Completion date - {{ IssueComplete }}
                          </p>
                          <!-- <v-menu
                            v-model="completionMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="IssueComplete"
                                label="Completion date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
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
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- End developer section 1 -->
            <v-expansion-panels v-if="ImpleSection">
              <v-expansion-panel>
                <v-expansion-panel-header
                  disable-icon-rotate
                  class="pb-0 pt-0"
                  style="background-color: #883cfe"
                >
                  <h3 style="color: white">Implements Section</h3>
                  <template v-slot:actions>
                    <v-icon color="white"> $expand </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-col>
                    <v-row>
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
                      <v-col cols="12" class="pt-0">
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
        <v-card-actions>
          <v-btn color="error" @click="issueReject()"><h4>Reject</h4></v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="handleClose()"><h4>Cancel</h4></v-btn>
          <v-btn color="primary" @click="saveIssue()"><h4>Update</h4></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </row>
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
    UserId: Number,
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
      position_Developers_System: [],
      position_Implementer: [],
      issue_status_default: [],
      issue_status_developer_default: [],
      issue_status_implement_default: [],
      userInfo: [],
      sendWork: false,
      //user
      user_id: "",
      user_firstname: "",
      user_lastname: "",
      user_position: "",
      userSendWork: null,
    };
  },
  async mounted() {
    console.log("mounted");
    await this.getDefault();
  },
  computed: {
    isIssueInProcess() {
      return this.IssueStatus !== "รอแก้ไข";
    },
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.getUserSystemsOncreated();
        this.getUser();
      }
    },
  },
  methods: {
    getUserScreen(selectedUserID) {
      this.userSendWork = selectedUserID;
      console.log("User send work", this.userSendWork);
    },
    checkSendWork() {
      if (this.IssueDeveloperStatus == "แก้ไขไม่ได้") {
        this.$axios
          .get("/user_systems/getOneScreenID/" + this.SystemId)
          .then((res) => {
            this.position_Developers_System = res.data.filter(
              (item) => item.user_position === "Developer"
            );
          });
        this.sendWork = true;
      }
    },
    checkStatus() {
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
      this.checkStatus();
      if (this.IssueManday == "") {
        this.IssueManday = 0;
      }
      if (this.userSendWork !== null) {
        try {
          await this.$axios
            .post("/user_screens/createUser_screen", {
              user_id: [this.userSendWork], //id new person
              screen_id: this.IssueScreenId,
              system_id: this.SystemId,
              project_id: this.ProjectId,
            })
            .then((res) => {
              console.log("POST success for user ID: " + this.userSendWork);
              alert("addUser_Screen Success!!");
            });
        } catch (error) {
          console.log("user_screen: " + error);
          alert("user_screen: " + error);
        }
      }
      if (this.IssueDeveloperStatus == "แก้ไขไม่ได้") {
        const dataHistoryDev = {
          screen_id: this.IssueScreenId,
          system_id: this.SystemId,
          project_id: this.ProjectId,
          issue_name: this.IssueName,
          issue_id: this.IssueId,
          issue_type: this.IssueType,
          issue_informer: this.IssueInformer,
          issue_priority: this.IssuePriority,
          issue_end: this.IssueEndDate,
          issue_assign: this.IssueAssign.user_firstname,
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
          user_updated: this.user_firstname,
          user_position_updated: this.user_position,
          user_id_updated: this.user_id,
        };
        try {
          await this.$axios.post(
            "/history_issues/createIssueHistory/",
            dataHistoryDev
          );
          console.log("post history dev");
          this.$emit("button-clicked");
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
        this.IssueDesDev = null;
        this.IssueDesImplementer = null;
        this.IssueStart = null;
        this.IssueExpected = null;
        this.IssueStatus = "รอแก้ไข";
        this.IssueAccepting = null;
        this.IssueManday = 0;
        this.IssueComplete = null;
        this.IssueDeveloperStatus = "รอแก้ไข";
        this.IssueImplementerStatus = null;
        this.IssueRound = 0;
        this.IssueAssign = this.IssueAssign.user_firstname;
      }
      if (this.IssueImplementerStatus == "ตรวจสอบไม่ผ่าน") {
        this.IssueRound += 1;
        this.IssueStatus = "รอแก้ไข";
        this.IssueDeveloperStatus = "รอแก้ไข";
        this.IssueAccepting = null;
        this.IssueStart = null;
        this.IssueExpected = null;
        this.IssueImplementerStatus = null;
        this.IssueStatus = "ตรวจสอบไม่ผ่าน";
      }
      if (this.IssueImplementerStatus == "ตรวจสอบผ่าน") {
        this.IssueStatus = "ตรวจสอบผ่าน";
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
          user_updated: this.user_firstname,
          user_position_updated: this.user_position,
          user_id_updated: this.user_id,
        };
        try {
          await this.$axios.post(
            "/history_issues/createIssueHistory/",
            dataHistory
          );
          console.log("pout success");
          this.$emit("button-clicked");
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
      const dataHistoryUpdate = {
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
        user_updated: this.user_firstname,
        user_position_updated: this.user_position,
        user_id_updated: this.user_id,
      };
      try {
        await this.$axios.put("/issues/updateIssueAdmin/" + this.id, data);
        await this.$axios.post(
          "/history_issues/createIssueHistory/",
          dataHistoryUpdate
        );
        console.log("put success && history");
        this.$emit("button-clicked");
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
      this.sendWork = false;
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

        console.log(this.screen_selectDefault, "this.screen_selectDefault ");

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
      console.log("getUserSystemsOncreated");
      await this.$axios
        .get("/user_screens/getOneScreenID/" + this.IssueScreenId)
        .then((data) => {
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );
          this.position_Implementer = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
        });
    },
    async getUserSystems(selectedScreenID) {
      this.IssueScreenId = selectedScreenID;
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
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.UserId).then((res) => {
        this.userInfo = res.data;
        this.user_id = res.data[0].user_id;
        this.user_firstname = res.data[0].user_firstname;
        this.user_lastname = res.data[0].user_lastname;
        this.user_position = res.data[0].user_position;
      });
    },
    issueReject() {
      try {
        this.$axios.delete("/issues/delete/" + this.id).then((res) => {
          alert("Reject Success!!");
          this.$emit("button-clicked");
          this.handleClose();
        });
      } catch (error) {
        console.log(error);
        alert("Reject: " + error);
      }
    },
    selectedType() {},
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.v-text-field >>> .v-input__slot {
  min-height: 20px !important;
}
</style>