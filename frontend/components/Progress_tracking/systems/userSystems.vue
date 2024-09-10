<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="user_systems"
      item-key="id"
      class="styled-table"
      :items-per-page="5"
      align="center"
    >
      <template v-slot:top>
        <v-toolbar flat class="toolbar">
          <v-toolbar-title class="toolbar-title">
            User System : {{ systemData.system_nameEN }}
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.user_pic="{ item }">
        <v-img
          :src="item.user_pic"
          max-width="75"
          max-height="75"
          class="picture-img"
        ></v-img>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    systemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: "Picture", value: "user_pic", align: `center` },
        { text: "First Name", value: "user_firstname" },
        { text: "Last Name", value: "user_lastname" },
        { text: "Position", value: "user_position", align: `center` },
        { text: "Department", value: "user_department", align: `center` },
      ],
      user_systems: [],
    };
  },
  async created() {
    try {
      const systemsId = this.systemData.id;
      const response = await this.$axios.$get(
        `/user_systems/getUserSystemsBySystemId/${systemsId}`
      );
      this.user_systems = response;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
.styled-table thead th {
  background-color: #ffffff;
  color: #009933 !important;
  font-weight: bold !important;
  border-bottom: 2px solid black;
  font-size: 18px !important;
}

.styled-table thead th,
.styled-table tbody td {
  height: 75px !important;
}

.picture-img {
  border: 3px solid #009933; /* กำหนดสีและความหนาของขอบ */
  border-radius: 300px; /* ปรับความโค้งมนของมุมขอบ */
}

.styled-table thead th:nth-child(2) {
  text-align: center !important; /* จัดชิดขวาสำหรับคอลัมน์ 'First Name' */
}

.styled-table thead th:nth-child(3) {
  text-align: center !important; /* จัดชิดขวาสำหรับคอลัมน์ 'Last Name' */
}

.styled-table thead th:nth-child(4) {
  text-align: center !important; /* จัดชิดขวาสำหรับคอลัมน์ 'Position' */
}

.styled-table tbody td {
  padding: 8px;
}

/* CSS สำหรับคอลัมน์ 'First Name' */
.styled-table tbody td:nth-child(2) {
  text-align: left !important; /* จัดชิดขวาสำหรับ First Name */
}

/* CSS สำหรับคอลัมน์ 'Last Name' */
.styled-table tbody td:nth-child(3) {
  text-align: left !important; /* จัดชิดขวาสำหรับ Last Name */
}

.picture-img {
  border: 3px solid #009933; /* กำหนดสีและความหนาของขอบ */
  border-radius: 300px; /* ปรับความโค้งมนของมุมขอบ */
}
.toolbar-title {
  color: #009933 !important;
}
</style>
