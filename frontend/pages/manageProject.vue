<template>
  <div class="body">
    <searchbar title="จัดการโครงการ" />

    <v-divider></v-divider>
    <v-row class="mt-4 ml-1 mb-2" no-gutters>
      <v-col cols="3">
        <h4>โครงการ</h4>
        <p style="color: #b6b5b5; font-size: 16px" class="">
          มี {{ this.projectList.length }} โครงการ
        </p>
      </v-col>

      <v-col cols="2">
        <h4>รหัสพนักงาน</h4>
      </v-col>
      <v-col cols="2">
        <h4 style="margin-left: -7%">เริ่มโครงการ</h4>
      </v-col>
      <v-col cols="2">
        <h4 style="margin-left: -16%">จบโครงการ</h4>
      </v-col>
      <v-col cols="3">
        <h4 style="margin-left: -16%">หน่วยงาน</h4>
      </v-col>
      <v-col cols="1"></v-col>
      <!-- <v-col cols="1"></v-col> -->
    </v-row>

    <v-btn
      v-if="userposition != 'Developer' || userrole == 'Admin'"
      class="new-btn ma-2 text-left"
      outlined
      color="indigo"
      dark
      block
      @click="openDialog('create')"
    >
      <span
        class="mdi mdi-plus-circle-outline"
        style="font-size: 20px; color: black"
      ></span>
      <h4 style="color: black">&nbsp;&nbsp; สร้างโครงการใหม่</h4>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
      <v-card>
        <v-card-title>
          <v-col cols="12">
            <v-row>
              <h5>
                {{ mode === "create" ? "สร้างโครงการใหม่" : "แก้ไขโครงการ" }}
              </h5>
            </v-row>
          </v-col>
        </v-card-title>
        <v-form ref="form" @submit.prevent="saveProject">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อโครงการ"
                    placeholder="ชื่อโครงการ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ตัวย่อ"
                    placeholder="ตัวย่อ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_shortname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    label="รหัสโครงการ"
                    placeholder="รหัสโครงการ"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    label="หน่วยงาน"
                    placeholder="หน่วยงาน"
                    outlined
                    dense
                    :rules="rules"
                    v-model="editedItem.project_agency"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                  <v-menu
                    ref="menuDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateS"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateStart = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateStart.save(dateStart)"
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                  <v-menu
                    ref="menuDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateE"
                        label="วันจบโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateEnd"
                      no-title
                      scrollable
                      :min="dateStart"
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateEnd = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDateEnd.save(dateEnd)"
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                  <!-- <v-text-field
                    label="วันเริ่มโครงการ"
                    placeholder="วันเริ่มโครงการ"
                    outlined
                    dense
                    v-model="editedItem.formattedDateStart"
                  ></v-text-field> -->

                  <v-menu
                    ref="menuDateStartEdit"
                    v-model="menuDateStartEdit"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateStartEdit"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.formattedDateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuDateStartEdit = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateStartEdit.save(
                            editedItem.formattedDateStart
                          )
                        "
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                  <!-- <v-text-field
                    label="วันจบโครงการ"
                    placeholder="วันจบโครงการ"
                    outlined
                    dense
                    v-model="editedItem.formattedDateEnd"
                  ></v-text-field> -->

                  <v-menu
                    ref="menuDateEndEdit"
                    v-model="menuDateEndEdit"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateEndEdit"
                        label="วันเริ่มโครงการ"
                        :rules="rules"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.formattedDateEnd"
                      :min="editedItem.formattedDateStart"
                      no-title
                      scrollable
                      format="yyyy-MM-dd"
                      locale="th"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuDateEndEdit = false"
                        >ยกเลิก</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateEndEdit.save(
                            editedItem.formattedDateEnd
                          )
                        "
                        >ตกลง</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="error"
              dark
              @click="DeleteAllProject(), clearCreateProject()"
              v-show="mode == 'edit'"
            >
              <h5>ลบโครงการ</h5>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="clearCreateProject">
              <h5>ปิด</h5>
            </v-btn>
            <v-btn color="primary" dark type="submit">
              <h5>{{ mode === "create" ? "สร้างโครงการ" : "อัปเดต" }}</h5>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <br />

    <!-- Admin -->
    <div v-if="userrole === 'Admin' || userposition === 'Implementer'">
      <v-expansion-panels
        v-for="(project, index) in projectListAdmin"
        :key="index"
        class="mb-5"
        :items="projectList"
      >
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <v-row no-gutters>
              <v-col cols="3">
                <h4>{{ project.project_name }}</h4>
                <p class="mt-1" style="color: #b6b5b5; font-size: 16px">
                  มี {{ getSystemCount(project) }} ระบบย่อย
                </p>
              </v-col>
              <v-col> </v-col>
              <v-col cols="2">
                <h4>{{ project.project_id }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.showdatestart }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.showdateend }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.project_agency }}</h4>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="primary"
                  icon
                  @click="openDialog('edit', projectList[index])"
                >
                  <v-icon class="pa-0" size="25" color="primary"
                    >mdi mdi-square-edit-outline</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <!--  -->

          <!--  -->
          <v-expansion-panel-content>
            <v-row justify="center" class="ml-5 mr-5 mt-0">
              <!-- *dialog -->
              <v-dialog
                v-model="dialogSubsystem"
                persistent
                max-width="600px"
                class=""
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="new-btn ma-2 text-left"
                    outlined
                    color="indigo"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    block
                    @click="dialogSystem(projectList[index])"
                  >
                    <span
                      class="mdi mdi-plus-circle-outline"
                      style="font-size: 20px; color: black"
                    ></span>
                    <h4 style="color: black">&nbsp;&nbsp; สร้างระบบใหม่</h4>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <v-col cols="12">
                      <v-row>
                        <h5>สร้างระบบใหม่</h5>
                      </v-row>
                    </v-col>
                  </v-card-title>
                  <v-form ref="myForm" @submit.prevent="CreateAllSystem">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <p>สร้างโครงการจากรหัสโครงการ</p>
                            <v-text-field
                              :rules="rules"
                              label="รหัสโครงการ"
                              placeholder="รหัสโครงการ"
                              outlined
                              dense
                              disabled
                              v-model="editedItem.project_id"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              :rules="rules"
                              label="รหัสของระบบ"
                              placeholder="รหัสของระบบ"
                              outlined
                              dense
                              v-model="system.system_id"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              :rules="rules"
                              label="ชื่อระบบ (ภาษาไทย)"
                              placeholder="ชื่อระบบ (ภาษาไทย)"
                              outlined
                              dense
                              v-model="system.system_nameTH"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              :rules="rules"
                              label="ชื่อระบบ (ภาษาอังกฤษ)"
                              placeholder="ชื่อระบบ (ภาษาอังกฤษ)"
                              outlined
                              dense
                              v-model="system.system_nameEN"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :rules="rules"
                              label="ชื่อย่อของระบบ"
                              placeholder="ชื่อย่อของระบบ"
                              outlined
                              dense
                              v-model="system.system_shortname"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              :rules="rules"
                              required
                              label="เลือก System Analyst"
                              v-model="choose_user_id"
                              :items="data_position_Sa"
                              item-text="user_firstname"
                              item-value="id"
                              outlined
                              chips
                              multiple
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                          <v-col class="col-12" sm="12" md="12">
                            <!--  -->
                            <v-select
                              :rules="rules"
                              required
                              label="เลือก Developer"
                              v-model="choose_user_id"
                              :items="data_position_Developer"
                              item-text="user_firstname"
                              item-value="id"
                              outlined
                              chips
                              multiple
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                          <v-col class="col-12" sm="12" md="12">
                            <v-select
                              :rules="rules"
                              required
                              label="เลือก Implementer"
                              style="text-align-last: left"
                              v-model="choose_user_id"
                              :items="data_position_Implementer"
                              item-text="user_firstname"
                              item-value="id"
                              outlined
                              chips
                              multiple
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="(dialogSubsystem = false), ClearSubsystem()"
                      >
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" dark type="submit">
                        สร้างระบบ
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-row>

            <!-- Admin -->
            <v-data-table
              :headers="headers"
              :items="project.systems"
              sort-by="calories"
              class="v-data-table elevation-1 mb-2 mt-5"
              v-remove-row-borders
            >
              <template v-slot:top> </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_nameTH }}
              </template>
              <template v-slot:[`item.id_system`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_id }}
              </template>
              <template v-slot:[`item.short_name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_shortname }}
              </template>
              <!-- <template v-slot:[`item.member`]="{ item }">
                {{ item.system_member }}
              </template> -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="primary" icon :to="`/systemdetail/${item.id}`">
                  <v-icon class="mr-2 ml-2" size="20" color="primary">
                    mdi mdi-chevron-right-circle-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- Develop -->
    <div v-else-if="userrole !== 'Admin' && userposition !== 'Implementer'">
      <v-expansion-panels
        v-for="(project, index) in projectList"
        :key="index"
        class="mb-5"
        :items="projectList"
      >
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <v-row no-gutters>
              <v-col cols="3">
                <h4>{{ project.project_name }}</h4>
                <p class="mt-1" style="color: #b6b5b5; font-size: 16px">
                  มี {{ getSystemCount(project) }} Sub System
                </p>
              </v-col>
              <v-col> </v-col>
              <v-col cols="2">
                <h4>{{ project.project_id }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.showdatestart }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.showdateend }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.project_agency }}</h4>
              </v-col>
              <v-col cols="1">
                <!-- <v-btn color="primary" icon @click="openDialog('edit', projectList[index])">
                  <v-icon class="pa-0" size="25" color="primary">mdi mdi-square-edit-outline</v-icon>
                </v-btn> -->
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <!--  -->

          <!--  -->
          <v-expansion-panel-content>
            <!-- Admin -->
            <v-data-table
              :headers="headers"
              :items="project.systems"
              sort-by="calories"
              class="v-data-table elevation-1 mb-2 mt-5"
              v-remove-row-borders
            >
              <template v-slot:top> </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_nameTH }}
              </template>
              <template v-slot:[`item.id_system`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_id }}
              </template>
              <template v-slot:[`item.short_name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_shortname }}
              </template>
              <!-- <template v-slot:[`item.member`]="{ item }">
                {{ item.system_member }}
              </template> -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="primary" icon :to="`/systemdetail/${item.id}`">
                  <v-icon class="mr-2 ml-2" size="20" color="primary">
                    mdi mdi-chevron-right-circle-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="loading === true" style="text-align: center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <dialog-success
      :dialog.sync="dialogSuccess"
      title="บันทึกข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-success
      :dialog.sync="dialogDeleteSuccess"
      title="ลบข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-fail
      :dialog.sync="dialogValidate"
      title="กรุณาใส่ข้อมูลให้ครบถ้วน"
    />
  </div>
</template>

<script>
import { create } from "domain";
import moment from "moment";
import Vue from "vue";
import DialogSuccess from "../components/DialogSuccess.vue";
import Searchbar from "../components/Searchbar.vue";
export default {
  components: { DialogSuccess, Searchbar },
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
      // new Date().toISOString().substr(0, 10)
      dateStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateEnd: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateS: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateE: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menuDateStart: false,
      menuDateEnd: false,
      menuDateStartEdit: false,
      dateStartEdit: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menuDateEndEdit: false,
      dateEndEdit: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateStartShow: null,
      dateEndShow: null,
      dateStartDataShow:[],
      dateEndDataShow:[],
      dialog: false,
      mode: "create",
      dialogSubsystem: false,
      dialogSuccess: false,
      dialogDeleteSuccess: false,
      dialogValidate: false,
      headers: [
        {
          text: "ชื่อระบบ",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "รหัสของระบบ", value: "id_system", sortable: false },
        { text: "ชื่อย่อระบบ", value: "short_name", sortable: false },
        // { text: "สมาชิก", value: "member" },
        { text: "จัดการ", value: "actions", sortable: false },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      system: {
        project_id: "",
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
        system_analyst: "",
        system_member: "",
      },
      projectList: [],
      member_select: ["Dev1"],
      member: "",
      editedIndex: -1,
      editedItem: {
        project_shortname: "",
        project_name: "",
        project_id: "",
        project_agency: "",
        project_start: "",
        project_end: "",
      },
      data_position_Developer: [],
      data_position_Implementer: [],
      data_position_Sa: [],
      choose_user_id: [],
      systemId: null,
      projectIds: null,
      //
      userid: "",
      userfirstname: "",
      userlastname: "",
      userposition: "",
      userrole: "",
      systemOwner: [],
      projectOwner: [],
      projectListAdmin: [],
      loading: false,
      rules: [(value) => !!value || "*กรุณาใส่ข้อมูลให้ถูกต้อง*"],
    };
  },
  async created() {
    await this.getUser();
    await this.initialize();
    await this.getProject();
    await this.getProject2();
    await this.getSystems();
    await this.getPosition_Developer();
    await this.getPosition_Implementer();
    await this.getPosition_Sa();
    await this.getSystemOwner();
    await this.getSystemsOwner();
    this.dateS = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateE = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateStartEdit = moment().add(543, "years").format("DD-MM-YYYY");
    this.dateEndEdit = moment().add(543, "years").format("DD-MM-YYYY");
  },
  updated() {
    const dateS = moment(this.dateStart).add(543, "years").format("DD-MM-YYYY");
    this.dateS = dateS;

    const dateE = moment(this.dateEnd).add(543, "years").format("DD-MM-YYYY");
    this.dateE = dateE;

    const dateStartEdit = moment(this.editedItem.formattedDateStart)
      .add(543, "years")
      .format("DD-MM-YYYY");
    this.dateStartEdit = dateStartEdit;

    const dateEndEdit = moment(this.editedItem.formattedDateEnd)
      .add(543, "years")
      .format("DD-MM-YYYY");
    this.dateEndEdit = dateEndEdit;
  },
  computed: {
    userId() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("userId");
      }
      return null; // or some default value if localStorage is not available
    },
  },
  mounted() {
    this.getSystemsOwner();
  },
  methods: {
    initialize() {
      this.projectList = [];
      this.projectListAdmin = [];
    },
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
        this.userid = res.data[0].user_id;
        this.userfirstname = res.data[0].user_firstname;
        this.userlastname = res.data[0].user_lastname;
        this.userposition = res.data[0].user_position;
        this.userrole = res.data[0].user_role;
      });
    },
    ClearSystemField() {},
    async CreateAllSystem() {
      try {
        if (
          this.system.system_id.trim() == "" ||
          this.system.system_nameTH.trim() == "" ||
          this.system.system_nameEN.trim() == "" ||
          this.system.system_shortname.trim() == ""
        ) {
          this.dialogValidate = true;
        } else {
          await this.createSystem();
          await this.getsystemID();
          await this.getProjectId();
          await this.addUser_project(this.projectIds);
          await this.addUser_system(this.systemId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getsystemID() {
      await this.$axios
        .get("/systems/getAll?system_id=" + this.system.system_id)
        .then((data) => {
          this.systemId = data.data[0].id;
          console.log(this.systemId);
        });
    },
    async addUser_system(systemID) {
      try {
        await this.$axios.post("/user_systems/createUser_system", {
          user_id: this.choose_user_id,
          system_id: systemID,
          project_id: this.projectIds,
        });
        await this.getProject();
        await this.getSystems();
        this.dialogSuccess = true;
        this.dialogSubsystem = false;
        this.ClearSubsystem();
      } catch (error) {
        console.log(error);
        alert("user_system: " + error);
      }
    },
    async addUser_project(projectId) {
      try {
        await this.$axios.post("/user_projects/createUser_project", {
          user_id: this.choose_user_id,
          project_id: projectId,
        });
      } catch (error) {
        console.log(error);
      }
    },
    ClearSubsystem() {
      this.system.project_id = "";
      this.system.system_id = "";
      this.system.system_nameTH = "";
      this.system.system_nameEN = "";
      this.system.system_shortname = "";
      this.system.system_analyst = "";
      this.choose_user_id = [];
    },
    async getProjectId() {
      await this.$axios
        .get("/projects/getAll?project_id=" + this.editedItem.project_id)
        .then((data) => {
          this.projectIds = data.data[0].id;
        });
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.data_position_Developer = data.data;
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.data_position_Implementer = data.data;
        });
    },
    async getPosition_Sa() {
      await this.$axios
        .get("/users/getAll?user_position=System%20Analyst")
        .then((data) => {
          this.data_position_Sa = data.data;
        });
    },

    async getSystemsOwner() {
      try {
        this.loading = true;
        this.projectOwner = [];
        this.projectList.forEach((project, i) => {
          this.projectList[i].systems.splice(
            0,
            this.projectList[i].systems.length
          );
        });
        this.projectListAdmin.forEach((project, i) => {
          project.systems.forEach((system, s) => {
            this.systemOwner.forEach((owner, num) => {
              if (project.systems[s].id === owner.system_id) {
                this.projectList[i].systems.push({
                  ...this.projectListAdmin[i].systems[s],
                });
              } else {
                // console.log("System not push");
              }
            });
          });
        });
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.projectList = res.data;

        this.projectList.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          project.showdatestart = moment(date).add(543, "years").format("DD-MM-YYYY");
          // this.dateStartShow  = moment(date).add(543, "years").format("DD-MM-YYYY");

          // this.dateStartDataShow.push(this.dateStartShow);
          // this.dateStartEdit = date.format("YYYY-MM-DD");

          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          project.showdateend = moment(dateEnd).add(543, "years").format("DD-MM-YYYY");
          // this.dateEndEdit = dateEnd.format("YYYY-MM-DD");
        });
      });
    },
    async getProject2() {
      await this.$axios.get("/projects/getAll").then((data) => {
        this.projectListAdmin = data.data;

        this.projectListAdmin.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          project.showdatestart = moment(date).add(543, "years").format("DD-MM-YYYY");

          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          project.showdateend = moment(dateEnd).add(543, "years").format("DD-MM-YYYY");

        });
      });
    },
    async saveProject() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
      } else {
        if (this.mode == "edit") {
          this.editedItem.project_start = this.editedItem.formattedDateStart;
          this.editedItem.project_end = this.editedItem.formattedDateEnd;
          try {
            await this.$refs.form.validate();
            await this.$axios.put(
              `/projects/updateProject/${this.editedItem.id}`,
              this.editedItem
            );
            const promise = new Promise((resolve, reject) => {
              resolve();
              this.getUser();
              this.initialize();
              this.getProject();
              this.getProject2();
              this.getSystems();
              this.getPosition_Developer();
              this.getPosition_Implementer();
              this.getSystemOwner();
              this.getSystemsOwner();
              this.dialog = false;
              this.clearCreateProject();
            });
            promise.then(() => {
              setTimeout(() => {
                // alert("success");
                this.dialogSuccess = true;
              }, 2000);
            });
          } catch (error) {
            console.error(error);
            alert("Error submitting form");
          }
        } else if (this.mode === "create") {
          this.editedItem.project_start = this.dateStart;
          this.editedItem.project_end = this.dateEnd;
          try {
            await this.$refs.form.validate();

            await this.$axios.post("/projects/createProject", this.editedItem);

            const promise = new Promise((resolve, reject) => {
              resolve();
              this.dialog = false;
              this.getUser();
              this.initialize();
              this.getProject();
              this.getProject2();
              this.getSystems();
              this.getPosition_Developer();
              this.getPosition_Implementer();
              this.getSystemOwner();
              this.getSystemsOwner();
            });
            promise.then(() => {
              setTimeout(() => {
                // alert("success");
                this.dialogSuccess = true;
                this.clearCreateProject();
              }, 2000);
            });
          } catch (error) {
            console.error(error);
            alert("Error submitting form");
          }
        }
      }
    },
    clearCreateProject() {
      // this.$refs.form.reset();
      this.editedItem.project_shortname = "";
      this.editedItem.project_name = "";
      this.editedItem.project_id = "";
      this.editedItem.project_agency = "";
      this.dialog = false;
    },
    async DeleteAllProject() {
      await this.deleteUser_screens();
      await this.deleteUserSystem();
      await this.deleteUserProject();
      await this.deleteScreenByIdProject();
      await this.deleteSystem();
      await this.deleteProject();

      this.dialogDeleteSuccess = true;
      this.dialog = false;
      this.clearCreateProject();
      const promise = new Promise((resolve, reject) => {
        resolve();
        this.loading = true;
        this.getUser();
        this.initialize();
        this.getProject();
        this.getProject2();
        this.getSystems();
        this.getPosition_Developer();
        this.getPosition_Implementer();
        this.getSystemOwner();
        this.getSystemsOwner();
      });
      promise.then(() => {
        setTimeout(() => {
          // alert("success");
          this.loading = false;
        }, 2000);
      });
      // this.loading = false;
    },
    async deleteProject() {
      try {
        await this.$axios.delete("/projects/delete/" + this.editedItem.id);
        // console.log("delete success");
      } catch (error) {
        console.error(error);
        alert("Error delete form");
      }
    },
    async deleteUser_screens() {
      try {
        const response = await this.$axios.delete(
          "/user_screens/deleteProjectID/" + this.editedItem.id
        );
        // console.log("delete success");
        if (response.status === 200 || response.status === 404) {
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log(err.response);
        }
        console.log(err);
      }
    },
    async deleteUserProject() {
      try {
        const response = await this.$axios.delete(
          "/user_projects/deleteProjectID/" + this.editedItem.id
        );
        if (response.status === 200) {
        } else if (response.status === 404) {
          const responseData = response.data;
          if (responseData) {
            // alert("user_system no have data");
          } else if (responseData.error && response.status != 404) {
            // alert(responseData.error);
            console.log(responseData.error);
          }
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUserSystem() {
      try {
        const response = await this.$axios.delete(
          "/user_systems/deleteProjectID/" + this.editedItem.id
        );
        if (response.status === 200) {
        } else if (response.status === 404) {
          const responseData = response.data;
          if (responseData) {
            // alert("user_system no have data");
          } else if (responseData.error && response.status != 404) {
            // alert(responseData.error);
          }
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteSystem() {
      await this.$axios
        .delete("/systems/deleteProjectId/" + this.editedItem.id)
        .then((res) => {
          // alert("Detete system Success!");
          // this.$router.push("/manageProject");
        })
        .then((response) => {
          console.log(response);
          // console.log("Update success");
        })
        .catch((err) => {
          console.log(err);
          // alert(err);
        });
    },
    async deleteScreenByIdProject() {
      await this.$axios
        .delete("/screens/deleteScreenProjectId/" + this.editedItem.id)
        .then((res) => {
          // alert("Delete Screen Success!");
          // this.deleteSystem();
        })
        .then((response) => {})
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // do nothing when 404 error occurs
          } else {
            console.log(err);
            // alert(err);
          }
        });
    },
    openDialog(mode, projectList) {
      this.mode = mode;
      this.dialog = true;
      if (mode === "edit") {
        this.editedIndex = this.projectList.indexOf(projectList);
        this.editedItem = Object.assign({}, projectList);
        this.dialog = true;
      } else if (mode === "create") {
        this.dialog = true;
      }
    },
    async getSystemOwner() {
      await this.$axios
        .get("/user_systems/getOneUserID/" + this.userId)
        .then((data) => {
          this.systemOwner = data.data;
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // do nothing when 404 error occurs
          } else {
            console.log(err);
            // alert(err);
          }
        });
    },
    async getSystems() {
      await this.$axios.get("/systems/getAll").then((res) => {
        // Loop through each project and assign the associated systems
        this.projectList.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });

        this.projectListAdmin.forEach((project) => {
          Vue.set(
            project,
            "systems",
            res.data.filter((system) => system.project_id === project.id)
          );
        });
      });
    },
    getSystemCount(project) {
      return project.systems ? project.systems.length : 0;
    },
    async dialogSystem(projectList) {
      this.editedIndex = this.projectList.indexOf(projectList);
      this.editedItem = Object.assign({}, projectList);
      this.system.project_id = projectList.id;
    },
    async createSystem() {
      try {
        await this.$axios.post("/systems/createSystem", this.system);
        const promise = new Promise((resolve, reject) => {
          resolve();
          this.dialog = false;
          this.system.project_id == "";
          this.system.system_nameTH == "";
          this.system.system_nameEN == "";
          this.system.system_shortname == "";
          this.system.system_analyst == "";
          this.system.system_member == "";
        });
        promise.then(() => {
          setTimeout(() => {
            // alert("success");
          }, 2000);
        });
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
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
</style>