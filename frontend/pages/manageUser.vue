<template>
  <div class="body">
    <v-row class="mb-3 ml-4">

      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Manage Users
      </v-text-title>
      <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <v-banner class="mt-0 ml-4"
        style="display: flex; align-items: center; justify-content: center; height: 30px; border-radius: 30px; padding: 0 0px;"
        outlined elevation="2">
        <form class="center" @submit.prevent="search">
          <v-icon color="purple">mdi-magnify</v-icon>
          <input class="mr-3" type="text" v-model="query" placeholder="Search some User" />
        </form>
      </v-banner>

      <v-btn @click="dialog = true" class="ml-auto mr-10" elevation="2" color="primary"
        style="color: white; border-radius: 10px">
        <v-icon left> mdi-plus-circle-outline </v-icon>
        New User
      </v-btn>

    </v-row>
    <v-divider></v-divider>
    <!-- class="green lighten-5" -->
    <v-container>
      <v-row no-gutters>
        <!-- -เอาเส้นออกใส่ border: none; -->
        <v-card class="pa-2" tile outlined style="
                                                border: none;
                                                width: 100%;
                                                height: 100%;
                                                display: flex;
                                                justify-content: center;
                                              ">
          <v-col class="mb-6" col="12" sm="12" md="12">
            <!-- หมวดหมู่ หัวข้อใหญ่ -->
            <v-toolbar class="mb-2">
              <v-tabs fixed-tabs v-model="tab" next-icon="mdi-menu-right-outline" prev-icon="mdi-menu-left-outline"
                show-arrows>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item" style="font-weight: bold; color: black">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <!-- ตารางย่อยในหัวข้อ -->
            <v-tabs-items v-model="tab">
              <!-- Tab1 All -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data" class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data" :key="i">
                        <v-avatar v-if="item.id == imageALL[i].id" class="mx-auto" style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageALL[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>

                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- Tab2 Developer -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data_position_Developer"
                    class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data_position_Developer" :key="i">
                        <v-avatar v-if="item.id == imageDeveloper[i].id" class="mx-auto"
                          style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageDeveloper[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- Tab3 Implementer -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data_position_Implementer"
                    class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data_position_Implementer" :key="i">
                        <v-avatar v-if="item.id == imageImplementer[i].id" class="mx-auto"
                          style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageImplementer[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- Tab4 Program Management-->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data_position_ProgramManagement"
                    class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data_position_ProgramManagement" :key="i">
                        <v-avatar v-if="item.id == imageProgramManagement[i].id" class="mx-auto"
                          style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageProgramManagement[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- Tab5 System Analyst-->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data_position_SystemAnalyst"
                    class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data_position_SystemAnalyst" :key="i">
                        <v-avatar v-if="item.id == imageSystemAnalyst[i].id" class="mx-auto"
                          style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageSystemAnalyst[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- Tab6 -->
              <v-tab-item>
                <v-card flat>
                  <!-- hide-default-footer ซ่อน footer-->
                  <v-data-table style="text-align: center" :headers="headers" :items="data_position_ReportDeveloper"
                    class="elevation-1">
                    <template v-slot:[`item.name`]="{ item }">
                      {{ item.user_firstname }}
                    </template>
                    <template v-slot:[`item.code`]="{ item }">
                      {{ item.user_id }}
                    </template>
                    <template v-slot:[`item.position`]="{ item }">
                      {{ item.user_position }}
                    </template>
                    <template v-slot:[`item.department`]="{ item }">
                      {{ item.user_department }}
                    </template>
                    <template v-slot:[`item.role`]="{ item }">
                      {{ item.user_role }}
                    </template>
                    <template v-slot:[`item.photo`]="{ item }">
                      <div v-for="(info, i) in data_position_ReportDeveloper" :key="i">
                        <v-avatar v-if="item.id == imageReportDeveloper[i].id" class="mx-auto"
                          style="width: 35px; height: 35px">
                          <img :src="getImageUrl(imageReportDeveloper[i].fileName)" />
                        </v-avatar>
                      </div>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-icon v-if="item.user_status == 'Active'" color="success">mdi-circle</v-icon>
                      <v-icon v-else color="error">mdi-circle</v-icon>
                      {{ item.user_status }}
                    </template>
                    <!-- ปุ่ม Manage -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn @click="(dialog_manage = true), editItem(item)" color="primary"
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
              <!-- จบ Tab ทั้ง 6 -->
            </v-tabs-items>
            <!-- ปุ่มสร้าง User + Dialog -->
            <!-- <template>
              <v-btn @click="dialog = true" class="ml-2 mb-0 mt-9" elevation="2" color="primary" bottom right absolute
                style="color: white; border-radius: 10px">
                <v-icon left> mdi-plus-circle-outline </v-icon>
                New User
              </v-btn>
            </template> -->
            <v-dialog v-model="dialog" width="900px" max-height="100%">
              <v-card class="mx-auto" height="580px" max-height="100%">
                <v-card-title>
                  <span class="text-h5">Create User</span>
                </v-card-title>
                <!-- Form -->
                <v-row class="mb-2" no-gutters>
                  <!-- Upload image -->
                  <v-col class="col-12" col="12" sm="12" md="2">
                    <v-card style="border: none" class="mx-auto text-center" outlined tile height="100%">
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
                    <v-card style="border: none" class="pa-2" outlined tile height="100%">
                      <div>
                        <v-row class="mr-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="3">
                            Title
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            First Name
                          </v-col>

                          <v-col class="hidden-xs-only" cols="12" sm="5" style="margin-right: -1%; padding-right: 0%">
                            Last Name
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -8%">
                          <v-col cols="12" sm="3" style="margin-right: -1%; padding-right: 0%">
                            <v-select :rules="[rules.required]" v-model="name" :items="dataDefault_nametitle"
                              label="Mr/Miss" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field :rules="[rules.required]" v-model="firstname" label="First Name" dense rounded
                              solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <v-text-field :rules="[rules.required]" v-model="lastname" label="Last Name" dense rounded
                              solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-6" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Code
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Position
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4" style="margin-right: -1%; padding-right: 0%">
                            Department
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -6%">
                          <v-col cols="12" sm="4">
                            <v-text-field :rules="[rules.required]" v-model="code" label="Code" dense rounded
                              solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select :rules="[rules.required]" v-model="position" :items="dataDefault_position"
                              label="Position" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select :rules="[rules.required]" v-model="department" :items="dataDefault_department"
                              label="Department" dense rounded solo></v-select>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            E-mail
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -6%">
                          <v-col cols="12" sm="12">
                            <v-text-field :rules="[rules.required, rules.email]" v-model="email" label="E-mail" dense
                              rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            Passwords
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -4%">
                          <v-col class="" cols="12" sm="12">
                            <v-text-field :rules="[rules.required, rules.counter]" v-model="password" label="Password"
                              :append-icon="showpassword_newbt ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showpassword_newbt = !showpassword_newbt"
                              :type="showpassword_newbt ? 'text' : 'password'" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -2%; font-size: 14px">
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
                            <v-select :rules="[rules.required]" v-model="stratiform" :items="dataDefault_status_user"
                              label="Status" dense rounded solo></v-select>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-select :rules="[rules.required]" v-model="role" :items="dataDefault_role_user" label="Role"
                              dense rounded solo>
                            </v-select>
                          </v-col>
                          <!--  -->
                        </v-row>

                        <v-row class="mr-6 mt-0 mb-1" style="justify-content: right">
                          <v-btn class="mr-4" elevation="2" color="error" style="color: white; border-radius: 10px"
                            @click="(dialog = false), (clearInfoNewUser())">
                            Cancel
                          </v-btn>
                          <v-btn elevation="2" color="primary" style="color: white; border-radius: 10px"
                            @click="(dialog = false), createUser2()">
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
                  <span class="text-h5">Manage User</span>
                </v-card-title>
                <!-- Form -->
                <v-row class="mb-2" no-gutters>
                  <!-- Upload image -->
                  <v-col class="col-12" col="12" sm="12" md="2">
                    <v-card style="border: none" class="mx-auto text-center" outlined tile height="100%">
                      <!--  -->
                      <template>
                        <div>
                          <form>
                            <label class="mt-10 avatar-upload">
                              <input type="file" ref="fileInput" @change="uploadFile_manage" />
                              <v-icon class="center mt-7" color="black" size="30px"
                                v-if="!imageManage">mdi-cloud-upload-outline</v-icon>
                              <img v-if="avatar != null" :src="avatar" />
                              <img v-else-if="imageManage" :src="getImageUrl(imageManage)" />
                            </label>
                          </form>
                        </div>
                      </template>
                      <!--  -->
                    </v-card>
                  </v-col>
                  <!-- Input Form -->
                  <v-col col="12" sm="12" md="10">
                    <v-card style="border: none" class="pa-2" outlined tile height="100%">
                      <div>
                        <v-row class="mr-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="3">
                            Title
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            First Name
                          </v-col>

                          <v-col class="hidden-xs-only" cols="12" sm="5" style="margin-right: -1%; padding-right: 0%">
                            Last Name
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -8%">
                          <v-col cols="12" sm="3" style="margin-right: -1%; padding-right: 0%">
                            <v-select :rules="[rules.required]" v-model="editedItem.misname"
                              :items="dataDefault_nametitle" label="Mr/Miss" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field :rules="[rules.required]" v-model="editedItem.user_firstname" label="First Name"
                              dense rounded solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <v-text-field :rules="[rules.required]" v-model="editedItem.user_lastname" label="Last Name"
                              dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-6" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Code
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4">
                            Position
                          </v-col>
                          <v-col class="hidden-xs-only" cols="12" sm="4" style="margin-right: -1%; padding-right: 0%">
                            Department
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -6%">
                          <v-col cols="12" sm="4">
                            <v-text-field :rules="[rules.required]" v-model="editedItem.user_id" label="Code" dense
                              rounded solo></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select :rules="[rules.required]" v-model="editedItem.user_position"
                              :items="dataDefault_position" label="Position" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select :rules="[rules.required]" v-model="editedItem.user_department"
                              :items="dataDefault_department" label="Department" dense rounded solo></v-select>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            E-mail
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -6%">
                          <v-col cols="12" sm="12">
                            <v-text-field :rules="[rules.required, rules.email]" v-model="editedItem.user_email"
                              label="E-mail" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-2" style="margin-bottom: -2%; font-size: 14px">
                          <v-col class="hidden-xs-only" cols="12" sm="12">
                            Passwords
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -4%">
                          <v-col class="" cols="12" sm="12">
                            <v-text-field v-model="editedItem.user_password" label="Password"
                              :append-icon="showpassword_managebt ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showpassword_managebt = !showpassword_managebt"
                              :type="showpassword_managebt ? 'text' : 'password'" dense rounded solo></v-text-field>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="mr-2 mt-0" style="margin-bottom: -2%; font-size: 14px">
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
                            <v-select :rules="[rules.required]" v-model="editedItem.user_status"
                              :items="dataDefault_status_user" label="Status" dense rounded solo></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select :rules="[rules.required]" v-model="editedItem.user_role"
                              :items="dataDefault_role_user" label="Role" dense rounded solo></v-select>
                          </v-col>
                          <!--  -->
                        </v-row>
                        <v-row class="mr-6 mt-0 mb-1" style="justify-content: right">
                          <v-btn class="mr-4" elevation="2" color="error" style="color: white; border-radius: 10px"
                            @click="deleteUser()">
                            <h4>Delete</h4>
                          </v-btn>
                          <v-btn elevation="2" color="primary" style="color: white; border-radius: 10px"
                            @click="updateUser2()">
                            <h4>Update</h4>
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
      titleName: "",
      titleFirstname: "",
      imageManageUpload: null,
      imageFileUpload: "",
      imageManage: null,
      photo: "",
      avatar: null,
      name: "Mr.",
      firstname: "",
      lastname: "",
      code: "",
      position: "",
      department: "",
      email: "",
      password: "",
      role: "User",
      stratiform: "Active",
      query: "",
      editedIndex: -1,
      editedItem: {
        id: "",
        user_pic: null,
        misname: "",
        user_firstname: "",
        user_lastname: "",
        user_id: "",
        user_position: "",
        user_department: "",
        user_email: "",
        user_password: "",
        user_status: "",
        user_role: "",
        imageFile: "",
      },

      tab: null,
      items: [
        "All",
        "Developer",
        "Implementer",
        "Program Management",
        "System Analyst",
        "report developer",
      ],
      departments: ["DD"],
      rules: {
        required: value => !!value || '*Required*',
        counter: value => value.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      dialog: false,
      dialogDelete: false,
      dialog_manage: false,
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Photo",
          align: "center",
          sortable: false,
          value: "photo",
        },
        { text: "Name", align: "center", value: "name" },
        { text: "Code", align: "center", value: "code" },
        { text: "Position", align: "center", value: "position" },
        { text: "Department", align: "center", value: "department" },
        { text: "Status", align: "center", value: "status" },
        { text: "Role", align: "center", value: "role" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      all: [],
      developer: [],
      implementer: [],
      // For Api
      data: [],
      data_position_Developer: [],
      data_position_Implementer: [],
      data_position_ProgramManagement: [],
      data_position_SystemAnalyst: [],
      data_position_ReportDeveloper: [],
      imageALL: [],
      imageDeveloper: [],
      imageImplementer: [],
      imageProgramManagement: [],
      imageSystemAnalyst: [],
      imageReportDeveloper: [],
      showpassword_newbt: false,
      showpassword_managebt: false,
      dataDefault: [],
      dataDefault_role_user: [],
      dataDefault_nametitle: [],
      dataDefault_position: [],
      dataDefault_department: [],
      dataDefault_status_user: [],
      dataDefault_issue_type: [],
      dataDefault_issue_priotity: [],
    };
  },
  created() {
    this.getAll();
    this.getPosition_Developer();
    this.getPosition_Implementer();
    this.getPosition_ProgramManagement();
    this.getPosition_SystemAnalyst();
    this.getPosition_ReportDeveloper();
    this.getAllDefault();
  },
  methods: {
    async getAll() {
      await this.$axios.get("/users/getAll").then((data) => {
        this.data = data.data;
        console.log(this.data);
        this.splitImage(this.data, this.imageALL);
        // console.log("this.imageALL");
        // console.log(this.data[0].user_pic);
      });
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.data_position_Developer = data.data;
          // console.log(data.data);
          this.splitImage(this.data_position_Developer, this.imageDeveloper);
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.data_position_Implementer = data.data;
          // console.log(data.data);
          this.splitImage(this.data_position_Implementer, this.imageImplementer);
        });
    },
    async getPosition_ProgramManagement() {
      await this.$axios
        .get("/users/getAll?user_position=Program%20Management")
        .then((data) => {
          this.data_position_ProgramManagement = data.data;
          // console.log(data.data);
          this.splitImage(this.data_position_ProgramManagement, this.imageProgramManagement);
        });
    },
    async getPosition_SystemAnalyst() {
      await this.$axios
        .get("/users/getAll?user_position=System%20Analyst")
        .then((data) => {
          this.data_position_SystemAnalyst = data.data;
          // console.log(data.data);
          this.splitImage(this.data_position_SystemAnalyst, this.imageSystemAnalyst);

        });
    },
    async getPosition_ReportDeveloper() {
      await this.$axios
        .get("/users/getAll?user_position=Report%20Developer")
        .then((data) => {
          this.data_position_ReportDeveloper = data.data;
          // console.log(data.data);
          this.splitImage(this.data_position_ReportDeveloper, this.imageReportDeveloper);

        });
    },
    getImageUrl(fileName) {
      return require(`@/uploads/${fileName}`);
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      const parts = item.user_pic.split("\\");
      const directory = parts[1];
      this.imageManage = parts[parts.length - 1]
      // console.log(this.imageManage);
      // console.log(item.user_firstname);
      const regex = /^(Mr\.|Miss\.)\s+(.*)$/; // Regular expression to match title and name
      const matches = item.user_firstname.match(regex);
      if (matches) {
        // console.log(matches);
        this.editedItem.misname = matches[1];
        const name2 = matches[2].trim();
        const nameParts = name2.split(" ");
        this.editedItem.user_firstname = nameParts[0];
        console.log(this.editedItem.user_firstname);
      }
      this.dialog_manage = true;
    },

    async createUser2() {
      try {
        const formData = new FormData()
        formData.append('user_firstname', this.name + " " + this.firstname,)
        formData.append('user_lastname', this.lastname)
        formData.append('user_id', this.code)
        formData.append('user_position', this.position,)
        formData.append('user_department', this.department)
        formData.append('user_email', this.email)
        formData.append('user_password', this.password,)
        formData.append('user_status', this.stratiform,)
        formData.append('user_role', this.role,)
        formData.append('image', this.imageFileUpload)
        await this.$axios.post('/users/createUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log("post success");
        const promise = new Promise((resolve, reject) => {
          this.getAll();
          this.getPosition_Developer();
          this.getPosition_Implementer();
          this.getPosition_ProgramManagement();
          this.getPosition_SystemAnalyst();
          this.getPosition_ReportDeveloper();
          this.clearInfoNewUser();
          resolve();
        });
        promise.then(() => {
          setTimeout(() => {
            alert("success");
            window.location.href = 'http://localhost:3000/manageUser'; // replace with your actual URL
          }, 1000);
        });

      } catch (error) {
        console.error(error)
        alert('Error submitting form')
      }
    },

    splitImage(data, image) {
      data.forEach(file => {
        const parts = file.user_pic.split("\\");
        const directory = parts[1];
        const fileName = parts[parts.length - 1];
        const extractedFile = { id: file.id, directory, fileName };
        image.push(extractedFile);
        // console.log(image);
      });
    },

    uploadFile() {
      const input2 = this.$refs.fileInput;
      this.imageFileUpload = input2.files[0];
      try {
        this.photo = URL.createObjectURL(this.imageFileUpload);
        console.log(this.imageFileUpload);
        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error);
        this.photo = null;
      }
    },
    uploadFile_manage() {
      const input = this.$refs.fileInput;
      this.imageManageUpload = input.files[0];
      try {
        // editedItem.photo
        this.avatar = URL.createObjectURL(this.imageManageUpload);
        console.log(this.imageManageUpload);
        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error);
        // this.avatar = null;
      }
    },
    async updateUser() {
      await this.$axios
        .put("/users/update/" + this.editedItem.id, {
          user_firstname: this.editedItem.user_firstname,
          user_lastname: this.editedItem.user_lastname,
          user_id: this.editedItem.user_id,
          user_position: this.editedItem.user_position,
          user_department: this.editedItem.user_department,
          user_email: this.editedItem.user_email,
          user_password: this.editedItem.user_password,
          user_status: this.editedItem.user_status,
          user_role: this.editedItem.user_role,
          user_pic: "-",
        })
        .then((response) => {
          console.log(response);
          console.log("Update success");
          this.getAll();
          this.getPosition_Developer();
          this.getPosition_Implementer();
          this.getPosition_ProgramManagement();
          this.getPosition_SystemAnalyst();
          this.getPosition_ReportDeveloper();
          alert("Update success");
          this.dialog_manage = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },

    async updateUser2() {
      const formData = new FormData();
      formData.append("image", this.imageManageUpload);
      formData.append("user_firstname", this.editedItem.misname + " " + this.editedItem.user_firstname);
      formData.append("user_lastname", this.editedItem.user_lastname);
      formData.append("user_id", this.editedItem.user_id);
      formData.append("user_position", this.editedItem.user_position);
      formData.append("user_department", this.editedItem.user_department);
      formData.append("user_email", this.editedItem.user_email);
      formData.append("user_password", this.editedItem.user_password);
      formData.append("user_status", this.editedItem.user_status);
      formData.append("user_role", this.editedItem.user_role);

      await this.$axios
        .put("/users/updateUsers/" + this.editedItem.id + "/image", formData)
        .then((response) => {
          // console.log(response);
          // console.log("Update success");
          this.getAll();
          this.getPosition_Developer();
          this.getPosition_Implementer();
          this.getPosition_ProgramManagement();
          this.getPosition_SystemAnalyst();
          this.getPosition_ReportDeveloper();
          alert("Update success");
          this.dialog_manage = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },

    deleteUser() {
      this.$axios
        .delete("/users/deleteUser/" + this.editedItem.id)
        .then((response) => {
          // console.log(response);
          // console.log("Delete success");
          this.getAll();
          this.getPosition_Developer();
          this.getPosition_Implementer();
          this.getPosition_ProgramManagement();
          this.getPosition_SystemAnalyst();
          this.getPosition_ReportDeveloper();
          alert("Delete success");
          this.dialog_manage = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    titleName() {
      const regex = /^(Mr\.|Miss\.)\s+(.*)$/; // Regular expression to match title and name
      const matches = this.user_firstname.match(regex);
      if (matches) {
        // console.log(matches);
        this.titleName = matches[1];
        const name2 = matches[2].trim();
        const nameParts = name2.split(" ");
        this.titleFirstname = nameParts[0];
        // console.log(this.title);
      }
    },
    clearInfoNewUser() {
      this.photo = "";
      this.name = "";
      this.firstname = "";
      this.lastname = "";
      this.code = "";
      this.position = "";
      this.department = "";
      this.email = "";
      this.password = "";
      this.stratiform = "";
      this.role = "";
    },
    async getAllDefault() {
      await this.$axios.get("/default_settings/getAll").then((data) => {
        this.dataDefault = data.data;
        console.clear();
        console.log(this.dataDefault);
        this.dataDefault.forEach((item) => {
          if (item.role_user) {
            this.dataDefault_role_user.push(item.role_user);
          }
          if (item.nametitle) {
            this.dataDefault_nametitle.push(item.nametitle);
          }
          if (item.position) {
            this.dataDefault_position.push(item.position);
          }
          if (item.department) {
            this.dataDefault_department.push(item.department);
          }
          if (item.status_user) {
            this.dataDefault_status_user.push(item.status_user);
          }
          if (item.issue_type) {
            this.dataDefault_issue_type.push(item.issue_type);
          }
          if (item.issue_priotity) {
            this.dataDefault_issue_priotity.push(item.issue_priotity);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

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