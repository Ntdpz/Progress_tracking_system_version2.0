<template>
  <div class="body">
    <v-row class="mb-3">
      <v-text-title class="center ml-4 mr-4 mt-3 mb-1" style="font-weight: bold; font-size: 20px">
        Project List
      </v-text-title>
      <v-divider class="mt-3 mb-1" inset vertical style="background-color: black"></v-divider>
      <div style="
                  border-radius: 99px;
                  border: 2px solid #333;
                  height: 32px;
                  width: 25%;
                  margin-left: 1%;
                  margin-top: 0.8%;
                ">
        <v-text-field placeholder="Search some project" prepend-icon="mdi-magnify" rounded dense color="primary"
          style="margin-top: 1px; margin-left: 3%"></v-text-field>
      </div>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-4 ml-1 mb-2" no-gutters>
      <v-col cols="3">
        <h4>Project</h4>
        <p style="color: #b6b5b5; font-size: 16px" class="">
          {{ this.projectList.length }} Projects
        </p>
      </v-col>

      <v-col cols="2">
        <h4 class="">Code</h4>
      </v-col>
      <v-col cols="2">
        <h4 class="">Start</h4>
      </v-col>
      <v-col cols="2">
        <h4 class="">End</h4>
      </v-col>
      <v-col cols="2">
        <h4 class="">Agency</h4>
      </v-col>
      <v-col cols="1"></v-col>
      <!-- <v-col cols="1"></v-col> -->
    </v-row>

    <v-btn class="new-btn ma-2 text-left" outlined color="indigo" dark block @click="openDialog('create')">
      <span class="mdi mdi-plus-circle-outline" style="font-size: 20px; color: black"></span>
      <h4 style="color: black">Add New Project</h4>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
      <v-card>
        <v-card-title>
          <v-col cols="12">
            <v-row>
              <h5>
                {{
                  mode === "create" ? "Create Project" : "Edit Project"
                }}
              </h5>
            </v-row>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Project ID" placeholder="Project ID" outlined dense
                  v-model="editedItem.project_id"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="ตัวย่อ" placeholder="ตัวย่อ" outlined dense
                  v-model="editedItem.project_shortname"></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field label="Project Name" placeholder="Project Name" outlined dense
                  v-model="editedItem.project_name"></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field label="Agency" placeholder="Agency" outlined dense
                  v-model="editedItem.project_agency"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                <v-menu ref="menuDateStart" v-model="menuDateStart" :close-on-content-click="false"
                  transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateStart" label="Picker in menu" prepend-icon="mdi mdi-calendar-clock-outline"
                      readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateStart" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDateStart = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateStart.save(dateStart)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                <v-menu ref="menuDateEnd" v-model="menuDateEnd" :close-on-content-click="false"
                  transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateEnd" label="Picker in menu" prepend-icon="mdi mdi-calendar-clock-outline"
                      readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateEnd" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDateEnd = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateEnd.save(dateEnd)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                <v-text-field label="Date Start" placeholder="Date Start" outlined dense
                  v-model="editedItem.formattedDateStart"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="mode == 'edit'">
                <v-text-field label="Date End" placeholder="Date End" outlined dense
                  v-model="editedItem.formattedDateEnd"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" dark @click="DeleteAllProject()" v-show="mode == 'edit'">
            <h5>Delete</h5>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            <h5>Close</h5>
          </v-btn>
          <v-btn color="primary" dark @click="saveProject()">
            <h5>{{ mode === "create" ? "Create" : "Save" }}</h5>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />



    <!-- Admin -->
    <div v-if="loading === true" style="text-align: center;">
        <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else-if="userrole === 'Admin' || userposition === 'Implementer'">
      <v-expansion-panels  v-for="(project, index) in projectListAdmin" :key="index" class="mb-5" :items="projectList">
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <v-row no-gutters>
              <v-col cols="3">
                <h4>{{ project.project_name }}</h4>
                <p class="mt-1" style="color: #b6b5b5; font-size: 16px">
                  {{ getSystemCount(project) }} Sub System
                </p>
              </v-col>
              <v-col> </v-col>
              <v-col cols="2">
                <h4>{{ project.project_id }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.formattedDateStart }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.formattedDateEnd }}</h4>
              </v-col>
              <v-col cols="2">
                <h4>{{ project.project_agency }}</h4>
              </v-col>
              <v-col cols="1">
                <v-btn color="primary" icon @click="openDialog('edit', projectList[index])">
                  <v-icon class="pa-0" size="25" color="primary">mdi mdi-square-edit-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
  
          </v-expansion-panel-header>
          <!--  -->
  
          <!--  -->
          <v-expansion-panel-content>
            <v-row justify="center" class="ml-5 mr-5 mt-0">
              <!-- *dialog -->
              <v-dialog v-model="dialogSubsystem" persistent max-width="600px" class="">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="new-btn ma-2 text-left" outlined color="indigo" dark v-bind="attrs" v-on="on" block
                    @click="dialogSystem(projectList[index])">
                    <span class="mdi mdi-plus-circle-outline" style="font-size: 20px; color: black"></span>
                    <h4 style="color: black">Add New Sub System</h4>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <v-col cols="12">
                      <v-row>
                        <h5>Create System</h5>
                      </v-row>
                    </v-col>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <p>Create system form Project ID</p>
                          <v-text-field label="Project ID" placeholder="Project ID" outlined dense disabled
                            v-model="editedItem.project_id"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="System ID" placeholder="System ID" outlined dense
                            v-model="system.system_id"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="System Name (TH)" placeholder="System Name (TH)" outlined dense
                            v-model="system.system_nameTH"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="System Name (EN)" placeholder="System Name (EN)" outlined dense
                            v-model="system.system_nameEN"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field label="Short system name" placeholder="Short system name" outlined dense
                            v-model="system.system_shortname"></v-text-field>
                        </v-col>
                        <v-col class="col-12" sm="12" md="12">
                          <v-select label="Choose developer" style="text-align-last: left" v-model="user_id"
                            :items="data_position_Developer" item-text="user_firstname" item-value="id" dense outlined chips
                            multiple single-line>
                            <template v-slot:item="{ item }">
                              {{ item.user_firstname }}
                            </template>
                          </v-select>
                        </v-col>
                        <v-col class="col-12" sm="12" md="12">
                          <v-select label="Choose implementer" style="text-align-last: left" v-model="user_id"
                            :items="data_position_Implementer" item-text="user_firstname" item-value="id" dense outlined
                            chips multiple single-line>
                            <template v-slot:item="{ item }">
                              {{ item.user_firstname }}
                            </template>
                          </v-select>
                        </v-col>
                        <!-- <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            label="Autocomplete"
                            :items="[
                              'dev1',
                              'dev2',
                              'dev3',
                              'dev4',
                              'dev5',
                              'dev6',
                            ]"
                            multiple
                            variant="solo"
                            v-model="system.system_member"
                          ></v-autocomplete>
                        </v-col> -->
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogSubsystem = false">
                      Close
                    </v-btn>
                    <v-btn color="primary" dark @click="CreateAllSystem()">
                      Create
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
  
  
            <!-- Admin -->
            <v-data-table :headers="headers" :items="project.systems" sort-by="calories"
              class="v-data-table elevation-1 mb-2 mt-5" v-remove-row-borders>
              <template v-slot:top> </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_nameTH }}
              </template>
              <template v-slot:[`item.short_name`]="{ item }">
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                {{ item.system_shortname }}
              </template>
              <template v-slot:[`item.member`]="{ item }">
                {{ item.system_member }}
              </template>
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
    <div v-else-if="userrole !== 'Admin' && userposition !== 'Implementer' ">
      <v-expansion-panels  v-for="(project, index) in projectList" :key="index" class="mb-5" :items="projectList">
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              <v-row no-gutters>
                <v-col cols="3">
                  <h4>{{ project.project_name }}</h4>
                  <p class="mt-1" style="color: #b6b5b5; font-size: 16px">
                    {{ getSystemCount(project) }} Sub System
                  </p>
                </v-col>
                <v-col> </v-col>
                <v-col cols="2">
                  <h4>{{ project.project_id }}</h4>
                </v-col>
                <v-col cols="2">
                  <h4>{{ project.formattedDateStart }}</h4>
                </v-col>
                <v-col cols="2">
                  <h4>{{ project.formattedDateEnd }}</h4>
                </v-col>
                <v-col cols="2">
                  <h4>{{ project.project_agency }}</h4>
                </v-col>
                <v-col cols="1">
                  <v-btn color="primary" icon @click="openDialog('edit', projectList[index])">
                    <v-icon class="pa-0" size="25" color="primary">mdi mdi-square-edit-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
  
            </v-expansion-panel-header>
            <!--  -->
  
            <!--  -->
            <v-expansion-panel-content>
              <v-row justify="center" class="ml-5 mr-5 mt-0">
                <!-- *dialog -->
                <v-dialog v-model="dialogSubsystem" persistent max-width="600px" class="">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="new-btn ma-2 text-left" outlined color="indigo" dark v-bind="attrs" v-on="on" block
                      @click="dialogSystem(projectList[index])">
                      <span class="mdi mdi-plus-circle-outline" style="font-size: 20px; color: black"></span>
                      <h4 style="color: black">Add New Sub System</h4>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <v-col cols="12">
                        <v-row>
                          <h5>Create System</h5>
                        </v-row>
                      </v-col>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <p>Create system form Project ID</p>
                            <v-text-field label="Project ID" placeholder="Project ID" outlined dense disabled
                              v-model="editedItem.project_id"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="System ID" placeholder="System ID" outlined dense
                              v-model="system.system_id"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="System Name (TH)" placeholder="System Name (TH)" outlined dense
                              v-model="system.system_nameTH"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field label="System Name (EN)" placeholder="System Name (EN)" outlined dense
                              v-model="system.system_nameEN"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Short system name" placeholder="Short system name" outlined dense
                              v-model="system.system_shortname"></v-text-field>
                          </v-col>
                          <v-col class="col-12" sm="12" md="12">
                            <v-select label="Choose developer" style="text-align-last: left" v-model="user_id"
                              :items="data_position_Developer" item-text="user_firstname" item-value="id" dense outlined chips
                              multiple single-line>
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                          <v-col class="col-12" sm="12" md="12">
                            <v-select label="Choose implementer" style="text-align-last: left" v-model="user_id"
                              :items="data_position_Implementer" item-text="user_firstname" item-value="id" dense outlined
                              chips multiple single-line>
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                          <!-- <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            label="Autocomplete"
                            :items="[
                              'dev1',
                              'dev2',
                              'dev3',
                              'dev4',
                              'dev5',
                              'dev6',
                            ]"
                            multiple
                            variant="solo"
                            v-model="system.system_member"
                          ></v-autocomplete>
                        </v-col> -->
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogSubsystem = false">
                        Close
                      </v-btn>
                      <v-btn color="primary" dark @click="CreateAllSystem()">
                        Create
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
  
  
              <!-- Admin -->
              <v-data-table :headers="headers" :items="project.systems" sort-by="calories"
                class="v-data-table elevation-1 mb-2 mt-5" v-remove-row-borders>
                <template v-slot:top> </template>
                <template v-slot:[`item.name`]="{ item }">
                  <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                  {{ item.system_nameTH }}
                </template>
                <template v-slot:[`item.short_name`]="{ item }">
                  <v-icon color="primary">mdi-format-list-bulleted</v-icon>
                  {{ item.system_shortname }}
                </template>
                <template v-slot:[`item.member`]="{ item }">
                  {{ item.system_member }}
                </template>
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
    
    
  </div>
</template>

<script>
import { create } from "domain";
import moment from "moment";
import Vue from "vue";
export default {
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
      dateStart: new Date().toISOString().substr(0, 10),
      dateEnd: new Date().toISOString().substr(0, 10),
      menuDateStart: false,
      menuDateStartEdit: false,
      dateStartEdit: new Date().toISOString().substr(0, 10),
      menuDateEnd: false,
      dialog: false,
      mode: "create",
      dialogSubsystem: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Short system name", value: "short_name", sortable: false },
        { text: "Member", value: "member" },
        { text: "Actions", value: "actions", sortable: false },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      system: {
        project_id: "", //primary key of projects
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
        system_member: "dev1",
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
      user_id: [],
      name_Dev: [],
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
    };
  },
  updated() {
    console.log(this.user_id);
  },
  async created() {
    await this.getUser();
    await this.initialize();
    await this.getProject();
    await this.getProject2();
    await this.getSystems();
    await this.getPosition_Developer();
    await this.getPosition_Implementer();
    await this.getSystemOwner();
    await this.getSystemsOwner();
    
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
    // this.getSystems();
    // this.getProject();
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
        // console.log(this.user_position);
      });
    },
    async CreateAllSystem() {
      await this.createSystem();
      // console.log("Create system successfully!");
      await this.getsystemID();
      // console.log("Get SystemID successfully!");
      await this.getProjectId();
      // console.log("Get ProjectId successfully!");
      await this.addUser_system(this.systemId);
      // console.log("Create successfully!");
    },
    async getsystemID() {
      await this.$axios
        .get("/systems/getAll?system_id=" + this.system.system_id)
        .then((data) => {
          this.systemId = data.data[0].id;
          // console.log(this.systemId);
        });
    },
    async addUser_system(systemID) {
      try {
        await this.$axios.post("/user_systems/createUser_system", {
          user_id: this.user_id,
          system_id: systemID,
          project_id: this.projectIds,
        });
        // console.log("POST success for system ID: " + systemID);
        alert("Post Success!!");
        await this.getProject();
        await this.getSystems();
        this.dialogSubsystem = false;
        this.ClearSubsystem();
      } catch (error) {
        console.log(error);
        alert("user_system: " + error);
      }
    },
    ClearSubsystem() {
      this.system.project_id = "";
      this.system.system_id = "";
      this.system.system_nameTH = "";
      this.system.system_nameEN = "";
      this.system.system_shortname = "";
      this.user_id = [];
    },
    async getProjectId() {
      await this.$axios
        .get("/projects/getAll?project_id=" + this.editedItem.project_id)
        .then((data) => {
          this.projectIds = data.data[0].id;
          // console.log(this.projectIds);
        });
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.data_position_Developer = data.data;
          this.name_Dev = this.data_position_Developer.map(
            (item) => item.user_firstname
          );
          // console.log(data.data);
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.data_position_Implementer = data.data;
          this.name_Implementer = this.data_position_Implementer.map(
            (item) => item.user_firstname
          );
          // console.log(this.name_Implementer);
        });
    },
    // async getSystemsOwner() {
    //   console.log(this.projectListAdmin[0].systems[0], "List");
    //   console.log(this.systemOwner, "List systemss");

    //   const projectsWithSystems = [];

    //   for (let i = 0; i < this.projectListAdmin.length; i++) {
    //     console.log(this.projectListAdmin[i], "projectListAdmin");
    //     console.log(this.projectList[i], "projectList");

    //     // Check if any system in the current project matches with systemOwner's system_id
    //     for (let num = 0; num < this.systemOwner.length; num++) {
    //       console.log(this.systemOwner[num].system_id, "systems Owner2");
    //       const hasSystem = this.projectListAdmin[i].systems.find(system => {
    //         return system.id === this.systemOwner[num].system_id;
    //       });

    //       if (hasSystem) {
    //         console.log(hasSystem, "hasSystem");
    //         // If the project has a system installed, add it to the projectsWithSystems array
    //         projectsWithSystems.push(this.projectListAdmin[i]);
    //   // console.log(this.projectList[0].systems[0], "Liseeeet");
    //         // Clear the existing systems data in the projectListAdmin[i].systems array
    //         this.projectListAdmin[i].systems.splice(0, this.projectListAdmin[i].systems.length);
    //         // Push the new systems data to the corresponding projectList's systems array
    //         if (hasSystem) {
    //           const systemData = this.systemOwner.find(owner => owner.system_id === hasSystem.id);
    //           console.log(systemData, "systemData");
    //           this.projectListAdmin[i].systems.push(systemData);
    //         }
    //       }
    //     }
    //   }

    //   // projectsWithSystems now contains only projects from this.projectList which have systems installed
    //   console.log(projectsWithSystems);
    // },

    async getSystemsOwner() {
      this.loading = true;
      this.projectOwner = [];
      // console.log(this.projectList[0].systems[0], "projectList");
      // console.log(this.systemOwner, "List systemOwner");

      const projectsWithSystems = [];
      for (let i = 0; i < this.projectList.length; i++) {
        // console.log(this.projectList[i], "projectList");
        
        for (let num = 0; num < this.systemOwner.length; num++) {
          // console.log(this.systemOwner[num].system_id, "systems Owner2");
          const hasSystem = this.projectList[i].systems.find(system => {
            return system.id === this.systemOwner[num].system_id;
          });

          if (hasSystem) {
            // console.log(hasSystem, "hasSystem");
            
            projectsWithSystems.push(this.projectList[i]);
            this.projectList[i].systems.splice(0, this.projectList[i].systems.length);
            
            const systemData = this.projectListAdmin[i].systems.find(owner => owner.id === hasSystem.id);
            if (systemData) {
              
              this.projectList[i].systems.push(systemData);
            }
          }
        }
      }

      // projectsWithSystems now contains only projects from this.projectList which have systems installed
      // console.log(projectsWithSystems);
      // console.log(this.projectListAdmin, "edki");
      // console.log(this.userrole);
      this.loading = false;
    },




    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        this.projectList = res.data;

        // console.log(this.projectList);
        this.projectList.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          // console.log(project.formattedDateStart);
          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          // console.log(project.formattedDateEnd);
        });

      });
    },
      async getProject2() {
      await this.$axios.get("/projects/getAll").then((data) => {
        this.projectListAdmin = data.data;
        // console.log(this.projectList);
        this.projectListAdmin.forEach((project) => {
          const date = moment(
            project.project_start,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateStart = date.format("YYYY-MM-DD");
          // console.log(project.formattedDateStart);
          const dateEnd = moment(
            project.project_end,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          );
          project.formattedDateEnd = dateEnd.format("YYYY-MM-DD");
          // console.log(project.formattedDateEnd);
        });

      });
    },
    async saveProject() {
      // console.log(this.mode);
      // console.log(this.editedItem.id);
      if (this.mode == "edit") {
        this.editedItem.project_start = this.editedItem.formattedDateStart;
        this.editedItem.project_end = this.editedItem.formattedDateEnd;
        try {
          await this.$axios.put(
            `/projects/updateProject/${this.editedItem.id}`,
            this.editedItem
          );
          // console.log("put success");
          // window.location.reload();
          this.initialize();
          this.getProject();
          this.getProject2();
          this.getSystems();
          this.getPosition_Developer();
          this.getPosition_Implementer();
          this.getSystemOwner();
          this.getSystemsOwner();
          const promise = new Promise((resolve, reject) => {
            resolve();
            this.dialog = false;
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
      } else if (this.mode === "create") {
        this.editedItem.project_start = this.dateStart;
        this.editedItem.project_end = this.dateEnd;
        try {
          await this.$axios.post("/projects/createProject", this.editedItem);
          // console.log("post success");
          // window.location.reload();
          const promise = new Promise((resolve, reject) => {
            resolve();
            this.dialog = false;
            this.editedItem.project_shortname == "";
            this.editedItem.project_name == "";
            this.editedItem.project_id == "";
            this.editedItem.project_agency == "";
            this.editedItem.project_start == "";
            this.editedItem.project_end == "";
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
    },
    async DeleteAllProject() {
      await this.deleteUser_screens();
      // console.log("success User_screen");
      await this.deleteUserSystem();
      // console.log("success User_system");
      await this.deleteScreenByIdProject();
      // console.log("success screen");
      await this.deleteSystem();
      // console.log("success system");
      await this.deleteProject();
      // console.log("success project");
      alert("success delete all");
      // window.location.reload();
      await this.initialize();
      await this.getProject();
      await this.getSystems();
      await this.getPosition_Developer();
      await this.getPosition_Implementer();
      this.dialog = false;
    },
    async deleteProject() {
      try {
        await this.$axios.delete("/projects/delete/" + this.editedItem.id);
        console.log("delete success");
        // window.location.reload();
        // await this.initialize();
        // await this.getProject();
        // await this.getSystems();
        // const promise = new Promise((resolve, reject) => {
        //   resolve();
        //   this.dialog = false;

        // });
        // promise.then(() => {
        //   setTimeout(() => {
        //     alert("delete success");
        //   }, 2000);
        // });
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
          // alert("delete user_screen success");
          // window.location.reload();
          // console.log("delete user_screen success");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // do nothing when 404 error occurs
          console.log(err.response);
        }
        console.log(err);
      }
    },
    async deleteUserSystem() {
      try {
        const response = await this.$axios.delete(
          "/user_systems/deleteProjectID/" + this.editedItem.id
        );
        if (response.status === 200) {
          // alert("delete user_system success");
          // window.location.reload();
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
        alert(err);
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
          // alert("Update success");

          // window.location.reload();
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
        .then((response) => {
          console.log(response);
          // console.log("delete success");
          // alert("delete success");
          // window.location.reload();
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
    openDialog(mode, projectList) {
      this.mode = mode;
      this.dialog = true;
      if (mode === "edit") {
        this.editedIndex = this.projectList.indexOf(projectList);
        this.editedItem = Object.assign({}, projectList);
        this.dialog = true;
        // console.log(mode, projectList);
      } else if (mode === "create") {
        this.dialog = true;
        // console.log(mode);
        if (this.$refs.form) {
          this.$refs.form.reset();
        }
      }
    },
    async getSystemOwner() {
      await this.$axios
        .get("/user_systems/getOneUserID/" + this.userId)
        .then((data) => {
          this.systemOwner = data.data;
          // console.log(this.systemOwner, "systemOwner");
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
      // console.log(this.projectList[0].systems[0] , "systemListtt");
    },
    getSystemCount(project) {
      return project.systems ? project.systems.length : 0;
    },
    async dialogSystem(projectList) {
      // console.log(projectList.id);
      this.editedIndex = this.projectList.indexOf(projectList);
      this.editedItem = Object.assign({}, projectList);
      this.system.project_id = projectList.id;
      // console.log(this.system.project_id + "id is post");
      // console.log(this.projectList.project_id);
    },
    async createSystem() {
      try {
        await this.$axios.post("/systems/createSystem", this.system);
        // console.log("post success");
        // window.location.reload();
        const promise = new Promise((resolve, reject) => {
          resolve();
          this.dialog = false;
          this.system.project_id == "";
          this.system.system_nameTH == "";
          this.system.system_nameEN == "";
          this.system.system_shortname == "";
          this.system.system_member == "";
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