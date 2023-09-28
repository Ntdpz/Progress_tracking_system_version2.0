<template>
  <div>
    <v-card class="mx-auto my-12" max-width="1000" rounded>
      <v-toolbar color="primary" dark dense elevation="0" rounded>
        <v-toolbar-title
          >รายละเอียดปัญหาที่พบ | โครงการ : ProjectName > ระบบ : SystemName
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="black" dark :to="`/history/${id}`" v-if="history"
          >ประวัติ</v-btn
        >
      </v-toolbar>
      <v-container class="pa-10">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="id"
              label="เลขที่ปัญหา"
              placeholder="เลขที่ปัญหา"
              disabled
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="ชื่อปัญหา"
              placeholder="ชื่อปัญหา"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="type_select"
              label="PNI/PNC/New Req"
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select label="เลขที่หน้าจอ : ชื่อหน้าจอ" dense outlined>
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="ผู้แจ้งปัญหา"
              placeholder="ผู้แจ้งปัญหา"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              label="ความสำคัญของปัญหา"
              dense
              outlined
              prepend-icon="mdi-flag-outline"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              label="สถานะ"
              placeholder="สถานะ"
              dense
              outlined
              disabled
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-menu
              ref="menuDateStart"
              v-model="menuStart"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              disabled
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateStart"
                  label="วันที่สร้าง"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="pt-0"
                  disabled
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateStart" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuStart = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuDateStart.save(dateStart)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="วันกำหนดส่ง"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="pt-0"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                :min="dateToday"
                @change="formattedDate()"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              label="ผู้พัฒนา"
              dense
              outlined
              item-text="user_firstname"
              return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              label="ผู้ตรวจสอบ"
              dense
              outlined
              item-text="user_firstname"
              return-object="false"
            ></v-select>
          </v-col>
          <!-- จำนวนวันและชั่วโมงของ Qc -->
          <!-- <v-col cols="12" class="hidden-sm-and-down" md="6">
            <v-text-field
              label="จำนวนวันที่ใช้ตรวจสอบ"
              placeholder="จำนวนวันที่ใช้ตรวจสอบ"
              type="number"
              dense
              outlined
            ></v-text-field>
          </v-col> -->
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              label="จำนวนชั่วโมงที่ใช้ตรวจสอบ"
              placeholder="จำนวนชั่วโมงที่ใช้ตรวจสอบ"
              type="number"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="เลขที่เอกสาร"
              placeholder="เลขที่เอกสาร"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="ชื่อลูกค้า"
              placeholder="ชื่อลูกค้า"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              label="ประเภทของปัญหา"
              placeholder="ประเภทของปัญหา"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <p class="ma-2">คำอธิบายปัญหา</p>
            <v-textarea
              solo
              name="input-7-4"
              label="คำอธิบายปัญหา"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <p class="ma-2">คำอธิบายถึง SA</p>
            <v-textarea
              solo
              name="input-7-4"
              label="คำอธิบายถึง SA"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              ref="fileInput"
              label="อัปโหลดไฟล์"
              outlined
              dense
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="pl-10 pr-10">
        <v-toolbar color="primary" dark dense elevation="0" rounded>
          <v-toolbar-title>ส่วนของผู้พัฒนา </v-toolbar-title>
        </v-toolbar>
      </v-container>
      <v-container class="pl-10 pr-10">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <!-- Date of accepting-->
            <v-menu
              v-model="acceptMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDateAccept"
                  label="วันที่รับ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="rules"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                scrollable
                format="yyyy-MM-dd"
                locale="th"
                v-model="IssueAccepting"
                @input="acceptMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <!-- Start date -->
            <v-menu
              v-model="startMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDateStart"
                  label="วันที่เริ่ม"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="rules"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="IssueStart"
                no-title
                scrollable
                format="yyyy-MM-dd"
                locale="th"
                @input="startMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-menu
              v-model="expectedMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDateExpected"
                  label="วันที่คาดว่าแก้ไขเสร็จ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="rules"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="IssueExpected"
                no-title
                scrollable
                format="yyyy-MM-dd"
                locale="th"
                @input="expectedMenu = false"
              ></v-date-picker> </v-menu
          ></v-col>
          <v-col cols="12" sm="6" md="6">
            <v-row v-if="mandayProps" class="mt-2">
              <p class="pa-2">Manday</p>
              <v-text-field
                label="Manday"
                placeholder="Manday"
                outlined
                dense
                v-model="IssueManday"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pt-5">
          <v-col>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <!-- <p class="pa-2">สถานะ</p> -->
                <v-select
                  label="สถานะ"
                  placeholder="สถานะ"
                  dense
                  outlined
                  v-model="IssueDeveloperStatus"
                ></v-select>
              </v-col>
              <v-col v-if="sendWork" cols="12" sm="6" md="6">
                <!-- <p class="pa-2">โปรดเลือกคนที่จะส่งต่องาน</p> -->
                <v-select
                  return-object="false"
                  label="โปรดเลือกคนที่จะส่งต่องาน"
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
          <v-menu
            v-model="completionMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formattedDateComplete"
                label="วันที่เสร็จ"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="rules"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="IssueComplete"
              no-title
              scrollable
              format="yyyy-MM-dd"
              locale="th"
              @input="completionMenu = false"
              @change="changeDate()"
            ></v-date-picker>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="">คำอธิบาย</p>
            <v-textarea
              solo
              name="input-7-4"
              label="คำอธิบายของผู้พัฒนา"
              v-model="IssueDesDev"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <!-- End developer section 1 -->

      <v-container class="pl-10 pr-10">
        <v-toolbar color="primary" dark dense elevation="0" rounded>
          <v-toolbar-title>ส่วนของผู้ตรวจสอบ </v-toolbar-title>
        </v-toolbar>
      </v-container>

      <v-container class="pl-10 pr-10">
        <v-col>
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <p class="pa-2">สถานะการตรวจสอบ</p>
                  <v-select
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
              <p class="">คำอธิบายของผู้ตรวจสอบ</p>
              <v-textarea
                solo
                name="input-7-4"
                label="คำอธิบายของผู้ตรวจสอบ"
                v-model="IssueDesImplementer"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
      <v-container class="pa-10">
        <v-btn color="white" @click.native="goBack">
          <h4>ย้อนกลับ</h4>
        </v-btn>
        <v-btn color="error"><h4>ลบ</h4></v-btn>
        <v-btn color="primary"><h4>อัปเดต</h4></v-btn>
        <v-spacer></v-spacer>
      </v-container>
    </v-card>
  </div>
</template>
  
  <script>
export default {
  layout: "admin",
  data() {
    return {
      id: this.$route.params.id,
      //
      history: true,
      mandayProps: true,
      sendWork: true,
      type_select: [],
      menuStart: false,
      menu: false,
      //
      dateStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateToday: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      //date
      acceptMenu: false,
      startMenu: false,
      expectedMenu: false,
      completionMenu: false,
      //date2
      formattedDateAccept: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      formattedDateStart: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      formattedDateExpected: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      formattedDateComplete: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      //
      IssueAccepting: "",
      IssueStart: "",
      IssueExpected: "",
      IssueManday: "",
      IssueDeveloperStatus: "",
      IssueAssign: "",
      IssueComplete: "",
      IssueDesDev: "",
      IssueImplementerStatus: "",
      IssueRound: "",
      IssueDesImplementer: "",
    };
  },
  created() {},
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
  
  <style scoped>
</style>