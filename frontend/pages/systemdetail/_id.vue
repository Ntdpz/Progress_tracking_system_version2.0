<template>
  <div>
    <!-- title -->
    <v-row class="mb-3">
      <title
        class="center ml-4 mr-4 mt-0 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        รายละเอียดระบบ
      </title>
      <v-divider
        class="mt-0 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <template>
        <v-banner
          class="mt-0 ml-4"
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
            <v-icon color="purple">mdi-magnify</v-icon>
            <input
              class="mr-3"
              type="text"
              v-model="query"
              placeholder="Search some system"
            />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>
    <!-- Sub System -->
    <v-container class="" style="margin-top: 0%">
      <v-row class="mt-0 mb-0" no-gutters>
        <v-col col="12" sm="12" md="12">
          <!-- box-shadow: none; -->
          <v-card
            class="mt-0"
            tile
            outlined
            style="box-shadow: none; border: none"
          >
            <v-card-title>
              <v-btn
                class="mr-2"
                icon
                @click="back"
                color="primary"
                size="35px"
                left
              >
                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
              </v-btn>
              {{ dataSystem.system_nameTH }}: {{ dataSystem.system_id }} ({{
                dataSystem.system_shortname
              }}) ของโครงการ: {{ projectName.project_name }} ●
              <b class="ml-1" style="color: #b6b5b5"> มี {{ count_screen }} </b>
              <!-- <v-avatar class="ml-4" color="primary" size="20"> </v-avatar>
              <v-avatar class="ml-4" color="error" size="20"> </v-avatar> -->
              <v-btn
                v-if="userposition != 'Developer' || userrole == 'Admin'"
                class="ml-3"
                icon
                color="primary"
                size="35px"
              >
                <v-icon size="35px" @click="editSystem = true"
                  >mdi mdi-square-edit-outline</v-icon
                >
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="userposition != 'Developer' || userrole == 'Admin'"
                @click="
                  (dialog_newscreen = true),
                    resetday(),
                    (menuDateStart = false),
                    (menuDateEnd = false)
                "
                elevation="2"
                color="primary"
                style="color: white; border-radius: 10px; font-weight: bold"
              >
                <v-icon left> mdi-plus-circle-outline </v-icon>สร้างหน้าจอใหม่
              </v-btn>
            </v-card-title>
            <!-- button + dialog new screen -->
            <!--  -->
            <v-dialog v-model="dialog_newscreen" max-width="600px">
              <v-card>
                <v-col>
                  <v-card outlined tile height="100%" style="border: none">
                    <v-card-title class="mr-0 pa-0"
                      >สร้างหน้าจอใหม่</v-card-title
                    >
                    <v-container fluid>
                      <v-row>
                        <v-col>
                          <v-card
                            style="border: none"
                            class="mx-auto text-center"
                            outlined
                            tile
                            height="100%"
                          >
                            <!--  -->
                            <form>
                              <div class="d-flex justify-center">
                                <label
                                  class="mt-0 avatar-upload"
                                  style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                  "
                                >
                                  <input
                                    type="file"
                                    ref="fileInput"
                                    @change="uploadFile"
                                  />
                                  <v-icon
                                    class="center mt-0"
                                    color="black"
                                    size="30px"
                                    v-if="!photo"
                                    >mdi-cloud-upload-outline</v-icon
                                  >
                                  <img v-if="photo" :src="photo" />
                                </label>
                              </div>
                            </form>

                            <!--  -->
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-form ref="form" @submit.prevent="CreateAllScreen">
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">รหัสหน้าจอ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">รหัสหน้าจอ</h4>
                          </v-col>

                          <v-col class="col-12" sm="8" md="8">
                            <v-text-field
                              :rules="rules"
                              style="text-align-last: left"
                              v-model="screenID"
                              hide-details="auto"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">ชื่อหน้าจอ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">ชื่อหน้าจอ</h4>
                          </v-col>
                          <v-col class="col-12" sm="8" md="8">
                            <v-text-field
                              :rules="rules"
                              style="text-align-last: left"
                              v-model="screenname"
                              hide-details="auto"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">System Analyst</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">System Analyst</h4>
                          </v-col>
                          <v-col class="col-12" sm="8" md="8">
                            <v-select
                              style="text-align-last: left"
                              v-model="user_id"
                              :items="position_Sa"
                              item-text="user_firstname"
                              item-value="id"
                              hide-details="auto"
                              dense
                              outlined
                              chips
                              multiple
                              persistent-hint
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">Developer</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">Developer</h4>
                          </v-col>
                          <v-col class="col-12" sm="8" md="8">
                            <v-select
                              style="text-align-last: left"
                              v-model="user_id"
                              :items="position_Developers"
                              item-text="user_firstname"
                              item-value="id"
                              hide-details="auto"
                              dense
                              outlined
                              chips
                              multiple
                              persistent-hint
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">Implementer</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">Implementer</h4>
                          </v-col>
                          <v-col class="col-12" sm="8" md="8">
                            <v-select
                              style="text-align-last: left"
                              v-model="user_id"
                              :items="position_Implementers"
                              item-text="user_firstname"
                              item-value="id"
                              hide-details="auto"
                              dense
                              outlined
                              chips
                              multiple
                              persistent-hint
                            >
                              <template v-slot:item="{ item }">
                                {{ item.user_firstname }}
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">ระดับหน้าจอ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">ระดับหน้าจอ</h4>
                          </v-col>
                          <v-col class="" sm="8" md="8">
                            <v-select
                              style="text-align-last: center"
                              v-model="level"
                              :items="selectlevel"
                              hide-details="auto"
                              dense
                              outlined
                              persistent-hint
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">ประเภทหน้าจอ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">ประเภทหน้าจอ</h4>
                          </v-col>
                          <v-col class="" sm="8" md="8">
                            <v-select
                              style="text-align-last: center"
                              v-model="screentype"
                              :items="SelectScreenType"
                              hide-details="auto"
                              dense
                              outlined
                              persistent-hint
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">สถานะ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">สถานะ</h4>
                          </v-col>
                          <v-col class="col-10" sm="6" md="6">
                            <h4 class="">
                              <v-icon color="error">mdi-circle</v-icon>
                              {{ status }}
                            </h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">วันเริ่ม-วันจบ</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            sm="4"
                            md="4"
                            style="place-self: center"
                          >
                            <h4 class="">วันเริ่ม-วันจบ</h4>
                          </v-col>
                          <!-- ปุ่มเลือกวันที่-->
                          <v-col cols="12" sm="4" md="4">
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
                                  v-model="newscreen_dateStart"
                                  label="วันเริ่ม"
                                  prepend-icon="mdi mdi-calendar-clock-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="newscreen_dateStart"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menuDateStart = false"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.menuDateStart.save(
                                      newscreen_dateStart
                                    )
                                  "
                                  >ตกลง</v-btn
                                >
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="4" md="4">
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
                                  v-model="newscreen_dateEnd"
                                  label="วันจบ"
                                  prepend-icon="mdi mdi-calendar-clock-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="newscreen_dateEnd"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menuDateEnd = false"
                                  >ยกเลิก</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.menuDateEnd.save(newscreen_dateEnd)
                                  "
                                  >ตกลง</v-btn
                                >
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <!--  -->
                        </v-row>
                        <v-row>
                          <v-col
                            class="mb-0 pb-0 hidden-sm-and-up"
                            style="place-self: center"
                          >
                            <h4 class="">จำนวนวัน</h4>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            class="hidden-xs-only"
                            cols="4"
                            style="place-self: center"
                          >
                            <h4 class="">จำนวนวัน</h4>
                          </v-col>
                          <v-col class="col-10" sm="6" md="6">
                            <v-text-field
                              :rules="rules"
                              v-model="manday"
                              style="text-align-last: left"
                              hide-details="auto"
                              type="number"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col style="place-self: center">
                            <h4 class="">วัน</h4>
                          </v-col>
                        </v-row>
                        <!--  -->
                        <v-row class="" style="justify-content: right">
                          <v-btn
                            @click="(dialog_newscreen = false), ClearText()"
                            class="mr-2"
                            elevation="2"
                            color="error"
                            style="color: white; border-radius: 10px"
                            >ยกเลิก
                          </v-btn>

                          <v-btn
                            type="submit"
                            class="mr-2"
                            elevation="2"
                            color="primary"
                            style="color: white; border-radius: 10px"
                            >สร้างหน้าจอใหม่
                          </v-btn>
                        </v-row>
                      </v-form>
                      <!--  -->
                    </v-container>
                  </v-card>
                </v-col>
              </v-card>
              <!--  -->
            </v-dialog>
            <!-- dialog system -->
            <v-dialog v-model="editSystem" max-width="600px">
              <v-card
                class="mt-0"
                tile
                outlined
                style="box-shadow: none; border: none"
              >
                <!-- code text fields system  -->
                <v-container fluid>
                  <v-card-title> รายละเอียดระบบ </v-card-title>
                  <!-- กล่องข้อความ 1 -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">รหัสของระบบ</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">รหัสของระบบ</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-text-field
                            style="text-align-last: left"
                            v-model="system_id"
                            hide-details="auto"
                            dense
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">ชื่อระบบ (ภาษาไทย)</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">ชื่อระบบ (ภาษาไทย)</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-text-field
                            style="text-align-last: left"
                            v-model="system_nameTH"
                            hide-details="auto"
                            dense
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class=""
                            >ชื่อระบบ (ภาษาอังกฤษ)</v-card-text
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class=""
                            >ชื่อระบบ (ภาษาอังกฤษ)</v-card-text
                          >
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-text-field
                            style="text-align-last: left"
                            v-model="system_nameEN"
                            hide-details="auto"
                            dense
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">ชื่อย่อระบบ</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">ชื่อย่อระบบ</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-text-field
                            style="text-align-last: left"
                            v-model="short_system_name"
                            hide-details="auto"
                            dense
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">System Analyst</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">System Analyst</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <!-- <v-text-field
                            style="text-align-last: left"
                            v-model="short_system_analyst"
                            hide-details="auto"
                            dense
                            outlined
                          ></v-text-field> -->
                          <v-select
                            style="text-align-last: left"
                            v-model="user_sa"
                            :items="sa_system"
                            item-text="user_firstname"
                            item-value="id"
                            hide-details="auto"
                            dense
                            outlined
                            chips
                            multiple
                            persistent-hint
                          >
                            <template v-slot:item="{ item }">
                              {{ item.user_firstname }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">Developer</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">Developer</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-select
                            style="text-align-last: left"
                            v-model="user_developer"
                            :items="develop_system"
                            item-text="user_firstname"
                            item-value="id"
                            hide-details="auto"
                            dense
                            outlined
                            chips
                            multiple
                            persistent-hint
                          >
                            <template v-slot:item="{ item }">
                              {{ item.user_firstname }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="mb-0 pb-0 hidden-sm-and-up"
                          style="place-self: center"
                        >
                          <v-card-text class="">Implementer</v-card-text>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="hidden-xs-only"
                          sm="4"
                          md="4"
                          style="place-self: center"
                        >
                          <v-card-text class="">Implementer</v-card-text>
                        </v-col>
                        <v-col
                          class="col-12"
                          sm="8"
                          md="8"
                          style="align-self: center"
                        >
                          <v-select
                            style="text-align-last: left"
                            v-model="user_implementer"
                            :items="implementer_system"
                            item-text="user_firstname"
                            item-value="id"
                            hide-details="auto"
                            dense
                            outlined
                            chips
                            multiple
                            persistent-hint
                          >
                            <template v-slot:item="{ item }">
                              {{ item.user_firstname }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <!-- button -->
                  <v-card-actions>
                    <v-btn @click="dialog_delete = true" color="error" dark>
                      <h5>ลบ</h5>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="editSystem = false" color="primary" text>
                      <h5>ปิด</h5>
                    </v-btn>
                    <v-btn
                      @click="(editSystem = false), AllUpdate()"
                      color="primary"
                      dark
                    >
                      <h5>อัปเดต</h5>
                    </v-btn>
                  </v-card-actions>
                  <!--  -->
                  <v-dialog v-model="dialog_delete" max-width="400px">
                    <v-card>
                      <div class="mt-2" style="text-align: center">
                        <v-icon size="70px" class="mt-2" color="error"
                          >mdi-alert-outline</v-icon
                        >
                      </div>
                      <v-card-title>
                        คูณแน่ใจที่จะลบหรือไม่?
                        <b style="color: red">&nbsp; delete &nbsp;</b> system?
                      </v-card-title>
                      <v-card-text>
                        ถ้าลบระบบแล้ว หน้าจอทั้งหมดในระบบจะถูกลบไปด้วย.
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="(dialog_delete = false), (editSystem = false)"
                          color="primary"
                          text
                        >
                          <h5>ยกเลิก</h5>
                        </v-btn>
                        <v-btn @click="deleteAll()" color="primary" dark>
                          <h5>ลบ</h5>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!--  -->
                </v-container>
              </v-card>
            </v-dialog>
            <!--    -->
          </v-card>
        </v-col>
      </v-row>
      <!-- card screen or table screen-->
      <v-row class="mb-2 ml-7">
        <div class="text-left mt-4">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <!-- style="border: none; font-weight: bold; font-size: 22px" -->
              <v-btn outlined color="black" dark v-bind="attrs" v-on="on">
                {{ type_show }}
                <v-icon size="22px" right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in Type_shows"
                :key="index"
                @click="clicks(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>

      <v-container v-if="type_show == 'การ์ด'">
        <v-row no-gutters>
          <template v-if="AllScreens.length">
            <v-col
              v-for="(item, i) in AllScreens"
              :key="i"
              col="4"
              sm="4"
              md="4"
            >
              <v-responsive :aspect-ratio="4 / 3" class="ma-4 mt-0">
                <v-card
                  :to="`/screendetail/${item.id}`"
                  class="elevation-0"
                  outlined
                  rounded
                >
                  <v-img
                    :src="getImageUrl(item.screen_pic)"
                    max-height="200px"
                    max-width="250px"
                    contain
                    aspect-ratio="1"
                    class="d-block mx-auto"
                  />
                  <v-card-title style="color: black">
                    รหัสหน้าจอ: {{ item.screen_id }}
                  </v-card-title>
                  <v-card-subtitle style="color: black">
                    ชื่อหน้าจอ: {{ item.screen_name }}
                  </v-card-subtitle>
                </v-card>
              </v-responsive>
            </v-col>
          </template>
          <template v-else>
            <v-container fluid>
              <v-divider class="full-width"></v-divider>
              <v-row class="center">
                <div class="ma-6">
                  <h1>ไม่มีหน้าจอ</h1>
                </div>
              </v-row>
              <v-divider class="full-width"></v-divider>
            </v-container>
          </template>
        </v-row>
      </v-container>
      <!-- Table Screen -->

      <template v-if="type_show == 'ตาราง'">
        <v-data-table
          class="elevation-1 ma-7"
          style="text-align: center"
          :headers="headers"
          :items="AllScreens"
        >
          <template v-slot:[`item.screen_status`]="{ item }">
            <span>
              <v-icon
                :color="item.screen_status === 'Complete' ? 'green' : 'red'"
                >mdi-circle</v-icon
              >
              {{ item.screen_status }}
            </span>
          </template>
          <template v-slot:[`item.id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn
              icon
              :to="`/screendetail/${item.id}`"
              color="primary"
              style="color: white; border-radius: 20px"
            >
              <v-icon>mdi-arrow-right-circle-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>

      <!--  -->
    </v-container>
    <dialog-success
      :dialog.sync="dialogSuccess"
      title="บันทึกข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-success
      :dialog.sync="dialogDeleteSuccess"
      title="ลบข้อมูลเสร็จเรียบร้อย"
    />
    <dialog-fail :dialog.sync="dialogFail" title="กรุณาใส่ข้อมูลให้ครบถ้วน" />
  </div>
</template>

<script>
import DialogFail from "../../components/DialogFail.vue";
export default {
  components: { DialogFail },
  layout: "admin",
  data() {
    return {
      newscreen_dateStart: new Date().toISOString().substr(0, 10),
      newscreen_dateEnd: new Date().toISOString().substr(0, 10),
      id: this.$route.params.id,
      dataSystem: [],
      projectID: null,
      projectName: [],
      photo: "",
      imageFileUpload: "",
      query: "",
      dialog_newscreen: false,
      screenID: "",
      screenname: "",
      developer: [],
      implementer: [],
      user_id: [],
      user_developer: [],
      user_implementer: [],
      user_sa: [],
      sumUserIds: [],
      sumUser: [],
      status: "Not Complete",
      level: "",
      selectlevel: [],
      manday: null,
      mode: "create",
      today: new Date(),
      dateEnd: new Date(),
      menuDateStart: false,
      menuDateStartEdit: false,
      AllScreens: [],
      imageDefault: "DefaultScreen.jpg",
      editSystem: false,
      dialog_delete: false,
      system_id: "",
      system_nameTH: "",
      system_nameEN: "",
      short_system_name: "",
      short_system_analyst: "",
      count_screen: "",
      menuDateStart: true,
      menuDateEnd: true,
      data_position_Developer: [],
      data_position_Implementer: [],
      data_position_Sa: [],
      develop_system: [],
      implementer_system: [],
      sa_system: [],
      name_Dev: [],
      name_Implementer: [],
      imageImplementer: null,
      screen_idd: [],
      position_Implementers: [],
      position_Developers: [],
      dataDefault: [],
      SelectScreenType: [],
      screentype: "",
      userid: "",
      userfirstname: "",
      userlastname: "",
      userposition: "",
      userrole: "",
      dialogSuccess: false,
      dialogDeleteSuccess: false,
      dialogFail: false,
      rules: [(value) => !!value || "Required field."],
      type_show: "ตาราง",
      Type_shows: [{ title: "การ์ด" }, { title: "ตาราง" }],
      headers: [
        {
          text: "No.",
          align: "center",
          value: "id",
        },
        {
          text: "รหัสหน้าจอ",
          align: "center",
          value: "screen_id",
        },
        {
          text: "ชื่อหน้าจอ",
          align: "center",
          value: "screen_name",
        },
        {
          text: "สถานะ",
          align: "center",
          value: "screen_status",
        },
        {
          text: "ระดับ",
          align: "center",
          value: "screen_level",
        },
        {
          text: "ประเภทหน้าจอ",
          align: "center",
          value: "screen_type",
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false,
          value: "action",
        },
      ],
    };
  },
  created() {
    this.getUser();
    this.getAllDefault();
    this.getSystemID();
    this.getProject();
    this.getScreens();
    this.getPosition_Developer();
    this.getPosition_Implementer();
    this.getPosition_Sa();
    this.getUserSystems();
  },
  computed: {
    userId() {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem("userId");
      }
      return null; // or some default value if localStorage is not available
    },
  },
  updated() {
    this.sumUser = this.user_developer.concat(
      this.user_implementer,
      this.user_sa
    );
  },
  methods: {
    async getUser() {
      await this.$axios.get("/users/getOne/" + this.userId).then((res) => {
        this.userid = res.data[0].user_id;
        this.userfirstname = res.data[0].user_firstname;
        this.userlastname = res.data[0].user_lastname;
        this.userposition = res.data[0].user_position;
        this.userrole = res.data[0].user_role;
      });
    },
    clicks(title) {
      this.type_show = title;
      console.log(this.select);
    },
    async getScreens() {
      await this.$axios
        .get("/screens/getAll?system_id=" + this.id)
        .then((data) => {
          this.AllScreens = data.data;
          this.AllScreens.length;
          this.count_screens();
        });
    },
    async getNewScreenAndAddUserScreen() {
      try {
        this.getScreens();
        await this.$axios
          .get("/screens/getAll?screen_id=" + this.screenID)
          .then((data) => {
            this.screen_idd = data.data[0].id;
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async getPosition_Developer() {
      await this.$axios
        .get("/users/getAll?user_position=Developer")
        .then((data) => {
          this.develop_system = data.data;
        });
    },
    async getPosition_Implementer() {
      await this.$axios
        .get("/users/getAll?user_position=Implementer")
        .then((data) => {
          this.implementer_system = data.data;
        });
    },
    async getPosition_Sa() {
      await this.$axios
        .get("/users/getAll?user_position=System%20Analyst")
        .then((data) => {
          this.sa_system = data.data;
        });
    },
    async getUserSystems() {
      await this.$axios
        .get("/user_systems/getOneScreenID/" + this.id)
        .then((data) => {
          this.data_position_Implementer = data.data
            .filter((item) => item.user_position === "Implementer")
            .map((user) => user.id);
          this.data_position_Developer = data.data
            .filter((item) => item.user_position === "Developer")
            .map((user) => user.id);
          this.data_position_Sa = data.data
            .filter((item) => item.user_position === "System Analyst")
            .map((user) => user.id);
          this.position_Implementers = data.data.filter(
            (item) => item.user_position === "Implementer"
          );
          this.position_Developers = data.data.filter(
            (item) => item.user_position === "Developer"
          );
          this.position_Sa = data.data.filter(
            (item) => item.user_position === "System Analyst"
          );

          this.user_developer = this.data_position_Developer;
          this.user_implementer = this.data_position_Implementer;
          this.user_sa = this.data_position_Sa;
        });
    },
    async addUser_Screen(screenID) {
      try {
        await this.$axios.post("/user_screens/createUser_screen", {
          user_id: this.user_id,
          screen_id: screenID,
          system_id: this.id,
          project_id: this.projectID,
        });
      } catch (error) {
        console.log(error);
        alert("user_screen: " + error);
      }
    },
    count_screens() {
      const c = this.AllScreens.length;
      if (c <= 1) {
        this.count_screen = c + " หน้าจอ";
      } else {
        this.count_screen = c + " หน้าจอ";
      }
      return;
    },
    async CreateAllScreen() {
      try {
        if (
          this.screenID == "" ||
          this.screenname == "" ||
          this.user_id == [] ||
          this.status == "" ||
          this.level == null ||
          this.manday == null ||
          this.screentype == null
        ) {
          this.dialogFail = true;
        } else {
          // this.calculateManDay();
          await this.createScreen();
          await this.getNewScreenAndAddUserScreen();
          await this.addUser_Screen(this.screen_idd);
          this.dialogSuccess = true;

          this.ClearText();
          this.dialog_newscreen = false;
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    resetday() {
      this.today = new Date();
      this.dateEnd = new Date();
      return;
    },
    getImageUrl(fileName) {
      return require(`@/static/screenImages/${fileName}`);
    },
    uploadFile() {
      const input2 = this.$refs.fileInput;
      this.imageFileUpload = input2.files[0];
      try {
        this.photo = URL.createObjectURL(this.imageFileUpload);
      } catch (error) {
        console.error(error);
        this.photo = null;
      }
    },
    back() {
      this.$router.push("/manageProject");
    },
    async getSystemID() {
      await this.$axios.get("/systems/getOne/" + this.id).then((data) => {
        this.dataSystem = data.data[0];
        this.projectID = data.data[0].project_id;
        this.system_id = data.data[0].system_id;
        this.system_nameTH = data.data[0].system_nameTH;
        this.system_nameEN = data.data[0].system_nameEN;
        this.short_system_name = data.data[0].system_shortname;
        this.short_system_analyst = data.data[0].system_analyst;
        this.getProjectID();
      });
    },
    async AllUpdate() {
      await this.deleteUserSystem();
      // console.log("successfully deleted 1");
      await this.addUser_system(this.id);
      // console.log("successfully deleted 2");
      await this.updateSystem();
      // console.log("successfully update");
      await this.addUser_project();
      // console.log("successfully update");
      this.dialogSuccess = true;
    },
    async updateSystem() {
      await this.$axios
        .put("/systems/updateSystem/" + this.id, {
          project_id: this.projectID,
          system_id: this.system_id,
          system_nameTH: this.system_nameTH,
          system_nameEN: this.system_nameEN,
          system_shortname: this.short_system_name,
          system_analyst: this.short_system_analyst,
          system_member: "",
        })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
          // alert(err);
        });
    },
    async deleteUserSystem() {
      try {
        const response = await this.$axios.delete(
          "/user_systems/deleteScreenID/" + this.id
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
          }
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
        // alert(err);
      }
    },

    async addUser_system(systemID) {
      try {
        await this.$axios.post("/user_systems/createUser_system", {
          user_id: this.sumUser,
          system_id: systemID,
          project_id: this.projectID,
        });
      } catch (error) {
        console.log(error);
        alert("user_system: " + error);
      }
    },
    async addUser_project() {
      try {
        await this.$axios.post("/user_projects/createUser_project", {
          user_id: this.sumUser,
          project_id: this.projectID,
        });

        await this.getProject();
        await this.getSystems();
        this.dialogSubsystem = false;
        this.ClearSubsystem();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAll() {
      await this.deleteUser_screens();
      // console.log("successfully deleted");
      await this.deleteScreenByIdSystem();
      // console.log("successfully deleted");
      await this.deleteUserSystem();
      // console.log("successfully deleted ");
      await this.deleteSystem();
      // console.log("successfully deleted");
      // this.dialogDeleteSuccess = true;
    },
    async deleteUser_screens() {
      try {
        const response = await this.$axios.delete(
          "/user_screens/deleteSystemID/" + this.id
        );
        // console.log("delete success");
        if (response.status === 200) {
          // alert("delete user_screen success");
          // window.location.reload();
        } else if (response.status === 400) {
          // handle error 400
          console.log("Error 400: Bad Request");
          alert("An error occurred while deleting user_screen.");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            // do nothing when 404 error occurs
            return;
          } else if (err.response.status === 400) {
            // handle error 400
            console.log("Error 400: Bad Request");
            alert("An error occurred while deleting user_screen.");
          }
        }
        console.log(err);
        alert("An error occurred while deleting user_screen.");
      }
    },
    async deleteSystem() {
      try {
        await this.$axios.delete("/systems/delete/" + this.id);
        this.$router.push("/manageProject");
        this.dialogDeleteSuccess = true;
      } catch (err) {
        if (err.response && err.response.status === 400) {
          console.log("Error 400: Bad Request");
          alert("ไม่สามารถลบได้เนื่องจากติดหน้าแก้ไขปัญหา");
        } else {
          console.log(err);
          alert("An error occurred while deleting the system.");
        }
      }
    },

    async deleteScreenByIdSystem() {
      this.$axios
        .delete("/screens/deleteScreen/" + this.id)
        .then((res) => {
          // alert("Delete Screen Success!");
          this.deleteSystem();
        })
        .then((response) => {
          // console.log(response);
          // console.log("delete success");
          // alert("delete success");
          // window.location.reload();
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // do nothing when 404 error occurs
          } else if (err.response && err.response.status === 400) {
            console.log(err);
          } else {
            console.log(err);
            // alert(err);
          }
        });
    },
    async getProject() {
      await this.$axios.get("/projects/getAll").then((res) => {
        // console.log(res.data);
      });
    },
    async getProjectID() {
      await this.$axios
        .get("/projects/getOne/" + this.projectID)
        .then((res) => {
          this.projectName = res.data[0];
          // console.log("this.projectName");
          // console.log(res.data);
        });
    },
    async getAllDefault() {
      await this.$axios.get("/default_settings/getAll").then((data) => {
        this.dataDefault = data.data;
        console.clear();
        // console.log(this.dataDefault);
        this.dataDefault.forEach((item) => {
          if (item.level) {
            this.selectlevel.push(item.level);
          }
          if (item.screen_type) {
            this.SelectScreenType.push(item.screen_type);
          }
        });
      });
    },
    ClearText() {
      this.photo = "";
      this.screenID = "";
      this.screenname = "";
      this.user_id = [];
      this.status = "Not Complete";
      this.level = null;
      this.manday = null;
      this.screentype = "";
    },
    async createScreen() {
      try {
        const datestart = this.newscreen_dateStart;
        const dateEnd = this.newscreen_dateEnd;
        const id_screen = this.screenID;
        const formData = new FormData();
        formData.append("image", this.imageFileUpload);
        formData.append("system_id", this.id);
        formData.append("project_id", this.projectID);
        formData.append("screen_id", this.screenID);
        formData.append("screen_name", this.screenname);
        formData.append("screen_developer", "");
        formData.append("screen_implementer", "");
        formData.append("screen_status", this.status);
        formData.append("screen_level", this.level);
        formData.append("screen_start", datestart);
        formData.append("screen_end", dateEnd);
        formData.append("screen_manday", this.manday);
        formData.append("screen_type", this.screentype);

        await this.$axios.post("/screens/createScreen", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("create screen success");
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

input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

.avatar-upload {
  display: inline-block;
  width: 300px;
  height: 200px;
  border-radius: 10px;
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
  border-radius: 10px;
  object-fit: cover;
}

.avatar-upload i {
  font-size: 16px;
  line-height: 40px;
  color: #bbbbbb;
}

.my-card {
  border-radius: 20px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>