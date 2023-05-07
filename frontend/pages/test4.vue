<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-row>
          <v-col>หน้าจอ :</v-col>
          <v-col> {{ item.screen_id }}</v-col>
        </v-row>
        <v-row>
          <v-col>ผู้จดแจ้ง :</v-col>
          <v-col> {{ item.issue_informer }}</v-col>
        </v-row>
        <v-row>
          <v-col>Implementer :</v-col>
          <v-col> {{ item.issue_qc }}</v-col>
        </v-row>
        <!-- Type PNC option -->
        <v-row>
          <v-col>เลขที่เอกสาร :</v-col>
          <v-col> {{ item.issue_doc_id }}</v-col>
        </v-row>
        <v-row>
          <v-col>ชื่อลูกค้า :</v-col>
          <v-col> {{ item.issue_customer }}</v-col>
        </v-row>
        <!-- Type New Req option -->
        <v-row>
          <v-col>ประเภทความต้องการใหม่ :</v-col>
          <v-col> {{ item.issue_type_sa }}</v-col>
        </v-row>
        <v-row>
          <v-col>คำอธิบายถึง SA :</v-col>
          <v-col> {{ item.issue_des_sa }}</v-col>
        </v-row>
        <v-row>
          <v-col>คำอธิบายปัญหา :</v-col>
          <v-col> {{ item.issue_des }}</v-col>
        </v-row>
        <h1>Devloper Scection</h1>
        <v-row>
          <v-col>วันที่รับปัญหา :</v-col>
          <v-col> {{ item.issue_accepting }}</v-col>
        </v-row>
        <v-row>
          <v-col>วันที่เริ่ม :</v-col>
          <v-col> {{ item.issue_start }}</v-col>
        </v-row>
        <v-row>
          <v-col>วันที่คาดว่าจะแก้ไขเสร็จ :</v-col>
          <v-col> {{ item.issue_expected }}</v-col>
        </v-row>
        <v-row>
          <v-col> Manday:</v-col>
          <v-col> {{ item.issue_manday }}</v-col>
        </v-row>
        <v-row>
          <v-col> สถานะของผู้พัฒนา:</v-col>
          <v-col> {{ item.issue_status_developer }}</v-col>
        </v-row>
        <v-row>
          <v-col> วันที่แก้ไขเสร็จ:</v-col>
          <v-col> {{ item.issue_complete }}</v-col>
        </v-row>
        <v-row>
          <v-col> คำอธิบายของผู้พัฒนา:</v-col>
          <v-col> {{ item.issue_des_dev }}</v-col>
        </v-row>
        <h1>Implementer Scection</h1>
        <v-row>
          <v-col> สถานะของผู้ตรวจสอบ:</v-col>
          <v-col> {{ item.issue_status_implement }}</v-col>
        </v-row>
        <v-row>
          <v-col> จำนวนรอบของการแก้ไข:</v-col>
          <v-col> {{ item.issue_round }}</v-col>
        </v-row>
        <v-row>
          <v-col> คำอธิบายของผู้ตรวจสอบ:</v-col>
          <v-col> {{ item.issue_des_implementer }}</v-col>
        </v-row>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      id: 34,
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "issue_id",
        },
        { text: "ปัญหา", value: "issue_name" },
        { text: "ประเภทปัญหา", value: "issue_type" },
        { text: "วันกำหนดส่ง", value: "issue_end" },
        { text: "สถานะปัญหา", value: "issue_status" },
        { text: "ระดับความสำคัญของปัญหา", value: "issue_priority" },
        { text: "Developer", value: "issue_assign" },
        { text: "", value: "data-table-expand" },
      ],
      items: [],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
  created() {
    this.getIssueHistory();
  },
  methods: {
    async getIssueHistory() {
      try {
        const res = await this.$axios.get(
          "/history_issues/getAll?issues_id=" + this.id
        );
        this.items = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
</style>