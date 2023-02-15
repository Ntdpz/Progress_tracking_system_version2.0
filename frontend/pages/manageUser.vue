<template>
  <div class="body">
    <v-row class="mb-3 ml-4">
      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Manage Users
      </v-text-title>
      <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <template>
        <v-banner class="mt-0 ml-4" style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 30px;
                      border-radius: 30px;
                      padding: 0 0px;
                    " outlined elevation="2">
          <form class="center" @submit.prevent="search">
            <v-icon color="purple">mdi-magnify</v-icon>
            <input class="mr-3" type="text" v-model="query" placeholder="Search some User" />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>
    <!-- class="green lighten-5" -->
    <v-container>
      <v-row no-gutters>
        <!-- เอาเส้นออกใส่ border: none; -->
        <v-card class="pa-2" tile outlined
          style="border: none; width: 100%; height: 100%; display: flex; justify-content: center">
          <v-col class="mb-6" col="12" sm="12" md="12">
            <!-- หมวดหมู่ หัวข้อใหญ่ -->
            <v-toolbar class="mb-2">
              <v-tabs fixed-tabs v-model="tab" next-icon="mdi-menu-right-outline" prev-icon="mdi-menu-left-outline"
                show-arrows>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item" style="font-weight: bold; color: black;">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <!-- ตารางย่อยในหัวข้อ -->
            <v-tabs-items v-model="tab">
              <!-- Tab1 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="all" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), (editItem(item))" color="primary"
                        style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- Tab2 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="developer" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]>
                      <v-btn color="primary" style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- Tab3 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="implementer" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]>
                      <v-btn color="primary" style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- Tab4 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="pm" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]>
                      <v-btn color="primary" style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- Tab5 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="sa" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]>
                      <v-btn color="primary" style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- Tab6 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center;" :headers="headers" :items="reportdev" class="elevation-1">
                    <template v-slot:[`item.photo`]="{ item }">
                      <v-avatar class="mx-auto" style="width: 35px; height: 35px">
                        <img :src="item.photo" alt="John" />
                      </v-avatar>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]>
                      <v-btn color="primary" style="color: white; border-radius: 20px">
                        Manage
                      </v-btn>
                    </template>
                    <!--  -->
                    <template v-slot:no-data>
                      <v-col>No Data</v-col>
                      <v-btn class="mb-4" color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                    <!--  -->
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!-- จบ Tab ทั้ง 6 -->
            </v-tabs-items>
            <!-- ปุ่มสร้าง User + Dialog -->
            <template>
              <v-btn @click="(dialog = true)" class="ml-2 mb-0 mt-9" elevation="2" color="primary" bottom right absolute
                style="color: white; border-radius: 10px">
                <v-icon left>
                  mdi-plus-circle-outline
                </v-icon>
                New User
              </v-btn>
            </template>
            <v-dialog v-model="dialog" width="900px" max-height="100%">
              <v-card class="mx-auto" height="580px" max-height="100%">
                <v-card-title>
                  <span class="text-h5">Create User</span>
                </v-card-title>
                <!-- Form -->
                <v-row class="mb-2" no-gutters>
                  <!-- Upload image -->
                  <v-col class="col-12" col="12" sm="12" md="2">
                    <v-card style="border: none;" class="mx-auto text-center" outlined tile height="100%">
                      <!--  -->
                      <template>
                        <div>
                          <form>
                            <label class="mt-10 avatar-upload">
                              <input type="file" ref="fileInput" @change="uploadFile" />
                              <v-icon class="center mt-7" color="black" size="30px"
                                v-if="!photo">mdi-cloud-upload-outline</v-icon>
                              <img v-if="photo" :src="photo" />
                            </label>
                          </form>
                        </div>
                      </template>
                      <!--  -->
                    </v-card>
                  </v-col>
                  <!-- Input Form -->
                  <v-col col="12" sm="12" md="10">
                    <v-card style="border: none;" class="pa-2" outlined tile height="100%">
                      <div>
                        <v-row class="mr-2" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="7">
                            First Name
                          </v-col>

                          <v-col class="hidden-xs-only" cols="12" sm="5" style="margin-right:-1%; padding-right:0%;">
                            Last Name
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-8%;">
                          <v-col cols="12" sm="3" style="margin-right:-1%; padding-right:0%;">
                            <v-select v-model="name" :items="missname" label="Mr/Miss" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="firstname" label="First Name" dense rounded solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <v-text-field v-model="lastname" label="Last Name" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Code
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Position
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4" style="margin-right:-1%; padding-right:0%;">
                            Department
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-6%;">
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="code" label="Code" dense rounded solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select v-model="position" :items="positions" label="Position" dense rounded
                              solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="department" label="Department" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            E-mail
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-6%;">
                          <v-col cols="12" sm="12">
                            <v-text-field v-model="email" label="E-mail" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            Passwords
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;">
                          <v-col class="" cols="12" sm="12">
                            <v-text-field v-model="password" label="Password" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="6">
                            Status
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="6">
                            Role
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0">
                          <v-col cols="12" sm="6">
                            <v-select v-model="statusform" :items="status" label="Status" dense rounded solo></v-select>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select v-model="role" :items="roles" label="Role" dense rounded solo></v-select>
                          </v-col>
                          <!--  -->
                        </v-row>
                        <v-col>

                        </v-col>
                        <v-row class="mr-2 mt-0" style="justify-content: right;">
                          <v-btn elevation="2" color="primary" style=" color: white; border-radius: 10px"
                            @click="(dialog = false)">
                            Create
                          </v-btn>
                        </v-row>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- End Form -->
              </v-card>
            </v-dialog>
            <!-- Dialog for button manage -->
            <v-dialog v-model="dialog_manage" width="900px" max-height="100%">
              <v-card class="mx-auto" height="580px" max-height="100%">
                <v-card-title>
                  <span class="text-h5">Create User</span>
                </v-card-title>
                <!-- Form -->
                <v-row class="mb-2" no-gutters>
                  <!-- Upload image -->
                  <v-col class="col-12" col="12" sm="12" md="2">
                    <v-card style="border: none;" class="mx-auto text-center" outlined tile height="100%">
                      <!--  -->
                      <template>
                        <div>
                          <form>
                            <label class="mt-10 avatar-upload">
                              <input type="file" ref="fileInput" @change="uploadFile_manage" />
                              <v-icon class="center mt-7" color="black" size="30px"
                                v-if="!editedItem.photo">mdi-cloud-upload-outline</v-icon>
                              <img v-if="editedItem.photo" :src="editedItem.photo" />
                            </label>
                          </form>
                        </div>
                      </template>
                      <!--  -->
                    </v-card>
                  </v-col>
                  <!-- Input Form -->
                  <v-col col="12" sm="12" md="10">
                    <v-card style="border: none;" class="pa-2" outlined tile height="100%">
                      <div>
                        <v-row class="mr-2" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="7">
                            First Name
                          </v-col>

                          <v-col class="hidden-xs-only" cols="12" sm="5" style="margin-right:-1%; padding-right:0%;">
                            Last Name
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-8%;">
                          <v-col cols="12" sm="3" style="margin-right:-1%; padding-right:0%;">
                            <v-select v-model="editedItem.missname" :items="missname" label="Mr/Miss" dense rounded
                              solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.name" label="First Name" dense rounded
                              solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <v-text-field v-model="editedItem.lastname" label="Last Name" dense rounded
                              solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Code
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Position
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4" style="margin-right:-1%; padding-right:0%;">
                            Department
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-6%;">
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.code" label="Code" dense rounded solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select v-model="editedItem.position" :items="positions" label="Position" dense rounded
                              solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.department" label="Department" dense rounded
                              solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            E-mail
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-6%;">
                          <v-col cols="12" sm="12">
                            <v-text-field v-model="editedItem.email" label="E-mail" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            Passwords
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;">
                          <v-col class="" cols="12" sm="12">
                            <v-text-field v-model="editedItem.password" label="Password" dense rounded
                              solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%; font-size: 14px;">
                          <v-col class="hidden-xs-only" cols="12" sm="6">
                            Status
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="6">
                            Role
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0">
                          <v-col cols="12" sm="6">
                            <v-select v-model="editedItem.status" :items="status" label="Status" dense rounded
                              solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select v-model="editedItem.role" :items="roles" label="Role" dense rounded
                              solo></v-select>
                          </v-col>
                          <!--  -->
                        </v-row>
                        <v-col>
                        </v-col>
                        <v-row class="mr-2 mt-0" style="justify-content: right;">
                          <v-btn elevation="2" color="primary" style=" color: white; border-radius: 10px"
                            @click="(dialog_manage = false)">
                            Create
                          </v-btn>
                        </v-row>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- End Form -->
              </v-card>
            </v-dialog>
            <!--  -->
          </v-col>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      photo: null,
      name: '',
      firstname: '',
      lastname: '',
      code: '',
      position: '',
      department: '',
      email: '',
      password: '',
      role: '',
      statusform: '',
      query: '',
      editedIndex: -1,
      editedItem: {
        photo: null,
        missname: '',
        name: '',
        firstname: '',
        lastname: '',
        code: '',
        position: '',
        department: '',
        // email: '',
        // password: '',
        status: '',
        role: '',
      },

      tab: null,
      items: [
        'All', 'Developer', 'Implementer', 'Program Management', 'System Analyst', 'report developer',
      ],
      roles: ['User', 'Admin'],
      positions: ['Developer', 'Implementer', 'Program Management', 'System Analyst', 'Report Developer'],
      dialog: false,
      dialogDelete: false,
      dialog_manage: false,
      headers: [
        {
          text: 'Photo',
          align: 'center',
          sortable: true,
          value: 'photo',
        },
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Code', align: 'center', value: 'code' },
        { text: 'Position', align: 'center', value: 'position' },
        { text: 'Department', align: 'center', value: 'department' },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Role', align: 'center', value: 'role' },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false },
      ],
      all: [],
      developer: [],
      implementer: [],
      missname: ['Mr', 'Miss'],
      status: ['Active'],
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.all = [
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. Developer1',
          code: 'AD00000001',
          position: 'Developer',
          department: 'SDD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. PM1',
          code: 'AP00000001',
          position: 'PM',
          department: 'SDD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. SA1',
          code: 'AS00000001',
          position: 'System Analyst',
          department: 'SDD',
          status: 'Active',
          role: 'User',
        },
      ];
      this.developer = [
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. Developer1',
          code: 'AD00000001',
          position: 'Developer',
          department: 'SDD',
          status: 'Active',
          role: 'User',
        },
      ];
      this.implementer = [
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
      ];
      this.pm = [];
      this.sa = [
        {
          photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Mr. SA1',
          code: 'AS00000001',
          position: 'System Analyst',
          department: 'SDD',
          status: 'Active',
          role: 'User',
        },
      ];
      this.reportdev = [];
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog_manage = true
    },

    uploadFile() {
      const input = this.$refs.fileInput
      const file = input.files[0]
      try {
        this.photo = URL.createObjectURL(file)

        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error)
        this.photo = null
      }
    },
    uploadFile_manage() {
      const input2 = this.$refs.fileInput
      const file2 = input2.files[0]
      try {
        this.editedItem.photo = URL.createObjectURL(file2)
        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error)
        this.editedItem.photo = null
      }
    },
  },
}
</script>

<style scoped>
input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-upload {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  text-align: center;
  background-color: #a1a1a1;
  text-align: center;
  cursor: pointer;
}

.avatar-upload input[type="file"] {
  display: none;
}

.avatar-upload img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  object-fit: cover;
}

.avatar-upload i {
  font-size: 16px;
  line-height: 40px;
  color: #bbbbbb;
}
</style>