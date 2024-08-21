<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Responsible Screen Dashboard</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.id="{ item }">
        <td>{{ item.id }}</td>
      </template>
      <template v-slot:item.name="{ item }">
        <td>{{ item.name }}</td>
      </template>
      <template v-slot:item.status="{ item }">
        <td>{{ item.status }}</td>
      </template>
      <!-- Add more slots for other columns as needed -->
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [], // ข้อมูลที่จะแสดงในตาราง
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Status", value: "status" },
        // เพิ่ม header อื่นๆ ตามที่ต้องการ
      ],
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get('/api/responsible-screen'); // ปรับ URL ให้ตรงกับ API ของคุณ
        this.items = response; // สมมติว่า response เป็นอาร์เรย์ของข้อมูล
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์ของ Component ที่นี่ */
</style>
