<template>
  <div>
    <v-card class="mx-auto my-12" max-width="1000" rounded>
      <v-toolbar color="primary" dark dense elevation="0" rounded>
        <v-toolbar-title
          >สร้างปัญหาใหม่ | {{ system.nameTH }} ({{ system.shortname }})
        </v-toolbar-title>
      </v-toolbar>
      <v-container class="pa-10">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="this.issue.id"
              label="เลขที่ปัญหา"
              placeholder="เลขที่ปัญหา"
              disabled
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              label="ชื่อปัญหา"
              placeholder="ชื่อปัญหา"
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
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="8">
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
          <v-col cols="12">
            <v-text-field
              label="ชื่อลูกค้า"
              placeholder="ชื่อลูกค้า"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-container fluid class="ma-0 pa-0">
              <!-- <p>Type Issue {{ selected }}</p> -->
              <p>ประเภทของปัญหา</p>
              <v-row>
                <v-col>
                  <v-row>
                    <v-checkbox label="UI" value="UI"></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-checkbox label="Business" value="Business"></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-checkbox label="Data" value="Data"></v-checkbox
                  ></v-row>
                </v-col>
                <v-col>
                  <v-row>
                    <v-checkbox label="Servies" value="Servies"></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-checkbox label="Report" value="Report"></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-checkbox label="Training" value="Training"></v-checkbox>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <p>คำอธิบายถึง SA</p>
            <v-textarea
              solo
              name="input-7-4"
              label="คำอธิบายถึง SA"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="mt-0">
            <v-textarea
              solo
              name="input-7-4"
              label="คำอธิบายปัญหา"
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
        <v-btn color="error" @click.native="goBack"> <h4>ย้อนกลับ</h4> </v-btn>
        <v-btn color="primary" dark @click="saveIssue()">
          <h4>สร้างปัญหาใหม่</h4>
        </v-btn>
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
      system: {
        nameTH: "",
        shortname: "",
      },
      issue: {
        id: "",
      },
      //
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
    };
  },
  created() {
    this.getInfoSystem();
  },
  methods: {
    goBack() {
      window.history.back();
    },
    //get ข้อมูลของ system
    async getInfoSystem() {
      try {
        const res = await this.$axios.get("/systems/getOne/" + this.id);
        this.system.nameTH = res.data[0].system_nameTH;
        this.system.shortname = res.data[0].system_shortname;
      } catch (error) {
        console.error(error);
      }
    },
    //get length issue
    async getInfoSystem() {
      try {
        const res = await this.$axios.get("/issues/getLength/" + this.id);
        console.log(res.data[0].length);
        this.issue.id = res.data[0].length + 1;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>