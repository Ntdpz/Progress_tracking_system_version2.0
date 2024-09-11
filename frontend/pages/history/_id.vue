<template>
  <v-data-table
    :headers="issuesHeaders"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="created_at"
    show-expand
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>ตารางประวัติ</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch> -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-card elevation="2" class="mt-5">
          <v-card-title style="background-color: #5c3efe; height: 50px">
            <p
              style="font-size: 18px; font-weight: bold; color: white"
              class="mb-2"
            >
              ข้อมูลเกี่ยวกับปัญหาเพิ่มเติม
            </p>
          </v-card-title>
          <div class="pa-4">
            <v-row class="pa-4">
              <v-col>
                <v-row>
                  <p style="font-weight: bold">รหัสโครงการ :</p>
                  {{ project_ids }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">ชื่อโครงการ :</p>
                  {{ project_name }}</v-row
                >
                <v-row>
                  <p style="font-weight: bold">รหัสระบบ :</p>
                  {{ system_ids }}</v-row
                >
                <v-row>
                  <p style="font-weight: bold">ชื่อหน้าจอ :</p>
                  {{ screen_name }}</v-row
                >
                <v-row>
                  <p style="font-weight: bold">รหัสน้าจอ :</p>
                  {{ screen_ids }}</v-row
                >
                <v-row>
                  <p style="font-weight: bold">คำอธิบายปัญหา :</p>
                  {{ item.issue_des }}</v-row
                >
                <div class="mt-10"></div>
                <!-- Type PNC option -->
                <v-row>
                  <p style="font-weight: bold">เลขที่เอกสาร :</p>
                  {{ item.issue_doc_id }}</v-row
                >
                <v-row
                  ><p style="font-weight: bold">ชื่อลูกค้า :</p>
                  {{ item.issue_customer }}</v-row
                >
                <!-- Type New Req option -->
                <v-row
                  ><p style="font-weight: bold">ประเภทความต้องการใหม่ :</p>
                  {{ item.issue_type_sa }}</v-row
                >
                <v-row
                  ><p style="font-weight: bold">คำอธิบายถึง SA :</p>
                  {{ item.issue_des_sa }}</v-row
                >
              </v-col>
              <v-col>
                <v-row
                  ><p style="font-weight: bold">ผู้แจ้งปัญหา :</p>
                  {{ item.issue_informer }}
                </v-row>
                <v-row
                  ><p style="font-weight: bold">ผู้ตรวจสอบ :</p>
                  {{ item.issue_qc }}</v-row
                >
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-card elevation="2" class="mt-5">
          <v-card-title style="background-color: #5c3efe; height: 50px">
            <p
              style="font-size: 18px; font-weight: bold; color: white"
              class="mb-2"
            >
              ส่วนของผู้พัฒนา
            </p>
          </v-card-title>
          <div class="pa-4">
            <v-row class="pa-4">
              <v-col
                ><v-row>
                  <p style="font-weight: bold">วันที่รับปัญหา :</p>
                  {{ item.formattedIssue_accepting }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">วันที่เริ่ม :</p>
                  {{ item.formattedIssue_start }}</v-row
                >
                <v-row
                  ><p style="font-weight: bold">วันที่คาดว่าจะแก้ไขเสร็จ :</p>
                  {{ item.formattedIssue_expected }}
                </v-row>
                <v-row
                  ><p style="font-weight: bold">คำอธิบายของผู้พัฒนา :</p>
                  {{ item.issue_des_dev }}
                </v-row>
              </v-col>
              <v-col
                ><v-row>
                  <p style="font-weight: bold">Manday :</p>
                  {{ item.issue_manday }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">สถานะของผู้พัฒนา :</p>
                  {{ item.issue_status_developer }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">วันที่แก้ไขเสร็จ :</p>
                  {{ item.formattedIssue_complete }}
                </v-row></v-col
              >
            </v-row>
          </div>
        </v-card>
        <v-card elevation="2" class="mt-5 mb-5">
          <v-card-title style="background-color: #5c3efe; height: 50px">
            <p
              style="font-size: 18px; font-weight: bold; color: white"
              class="mb-2"
            >
              ส่วนของผู้ตรวจสอบ
            </p>
          </v-card-title>
          <div class="pa-4">
            <v-row class="pa-4">
              <v-col>
                <v-row>
                  <p style="font-weight: bold">สถานะของผู้ตรวจสอบ :</p>
                  {{ item.issue_status_implement }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">จำนวนรอบของการแก้ไข :</p>
                  {{ item.issue_round }}
                </v-row>
                <v-row>
                  <p style="font-weight: bold">คำอธิบายของผู้ตรวจสอบ:</p>
                  {{ item.issue_des_implementer }}
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
export default {
  layout: "admin",
  data() {
    return {
      search: "",
      id: this.$route.params.id,
      expanded: [],
      singleExpand: false,
      issuesHeaders: [
        {
          text: "ID",
          align: "start",

          value: "index",
        },
        {
          text: "เลขที่ปัญหา",
          align: "start",
          sortable: false,
          value: "issue_id",
        },
        { text: "ปัญหา", value: "issue_name" },
        { text: "ประเภทปัญหา", value: "issue_type" },
        { text: "วันกำหนดส่ง", value: "formattedIssue_end" },
        { text: "สถานะปัญหา", value: "issue_status" },
        { text: "ความสำคัญของปัญหา", value: "issue_priority" },
        { text: "ผู้พัฒนา", value: "issue_assign" },
        { text: "ผู้อัปเดต", value: "user_updated" },
        { text: "อัปเดตเวลา", value: "formattedCreated_at" },
        { text: "", value: "data-table-expand" },
      ],
      items: [],
      project_id: "",
      project_name: "",
      system_id: "",
      ststem_nameTH: "",
      screen_id: "",
      screen_name: "",

      //id
      project_ids: "",
      system_ids: "",
      screen_ids: "",
    };
  },
  async created() {
    await this.getIssueHistory();
    await this.getMore();
  },
  methods: {
    async getIssueHistory() {
      try {
        const res = await this.$axios.get(
          "/history_issues/getAll?issues_id=" + this.id
        );
        this.items = res.data;
        console.log("items", this.items);
        this.items.forEach((issue) => {
          const dateFields = [
            "issue_end",
            "issue_accepting",
            "issue_start",
            "issue_expected",
            "issue_complete",
            "created_at",
          ];

          dateFields.forEach((field) => {
            const date = issue[field];
            if (date) {
              const formattedDate = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ")
                .add(543, "years")
                .format("DD-MM-YYYY");
              issue[
                `formatted${field.charAt(0).toUpperCase() + field.slice(1)}`
              ] = formattedDate;
            } else {
              issue[
                `formatted${field.charAt(0).toUpperCase() + field.slice(1)}`
              ] = "No Date";
            }
          });
        });
        console.log("items", this.items);
        this.screen_id = this.items[0].screen_id;
        this.system_id = this.items[0].system_id;
        this.project_id = this.items[0].project_id;
      } catch (error) {
        console.error(error);
      }
    },
    async getMore() {
      const resProject = await this.$axios.get(
        "/projects/getOne/" + this.project_id
      );
      const resSystem = await this.$axios.get(
        "/systems/getOne/" + this.system_id
      );
      const resScreen = await this.$axios.get(
        "/screens/getOne/" + this.screen_id
      );

      this.project_name = resProject.data[0].project_name;
      this.system_nameTH = resSystem.data[0].system_nameTH;
      this.screen_name = resScreen.data[0].screen_name;

      //ids
      this.project_ids = resProject.data[0].project_id;
      this.system_ids = resProject.data[0].system_id;
      this.screen_ids = resProject.data[0].screen_id;
    },
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
</style>