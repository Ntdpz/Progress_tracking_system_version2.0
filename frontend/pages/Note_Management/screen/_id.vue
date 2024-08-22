<template>
  <div>
    <Loader v-if="isLoading" />
    <cardScreen :screenId="screenId" />

    <v-container>
      <h1>Screen ID: {{ screenId }}</h1>

      <v-row class="my-4" align="center">
        <!-- คอลัมน์ซ้ายสำหรับช่องค้นหา -->
        <v-col class="search-field" cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="ค้นหา"
            outlined
            dense
            prepend-icon="mdi-magnify"
            class="search-input"
          />
        </v-col>

        <!-- คอลัมน์ขวาสำหรับปุ่ม Add -->
        <v-col class="add-button" cols="12" md="4">
          <v-btn class="addButton">
            <v-icon>mdi-plus</v-icon>
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Loader from "../../../components/Loader.vue";
import cardScreen from "../../../components/Note_Management/Screen_id/cardScreen.vue";

export default {
  middleware: "auth",
  layout: "admin",
  components: {
    Loader,
    cardScreen,
  },
  data() {
    return {
      isLoading: true,
      screenId: this.$route.params.id,
      searchQuery: "",
    };
  },
  watch: {
    "$route.params.id"(newId) {
      this.screenId = newId;
    },
  },
};
</script>

<style scoped>
.search-field {
  display: flex;
}

.full-width-height {
  width: 100%;
  height: 100%;
}

.search-input .v-text-field__control {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0; /* สีพื้นหลังสำหรับช่องค้นหา */
  border-radius: 8px; /* มุมโค้งมน */
  border: 2px solid #1976d2; /* ขยายเส้นขอบ */
}

.search-input input {
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* ทำให้ขนาดของ input รวมถึง padding และ border */
}
.search-field {
  height: 100px;
}
.add-button {
  height: 100px;
}

/* การจัดรูปแบบของไอคอนใน toolbar */
.addButton {
  color: #ffffff !important;
  /* สีของข้อความในปุ่มเมื่อ hover */
  background-color: #388e3c !important;
  /* สีพื้นหลังของปุ่มเมื่อ hover */
  border: 1px solid #ffffff !important;
  /* เปลี่ยนเส้นขอบเป็นสีขาวเมื่อ hover */
  font-weight: bold;
  /* ทำให้ตัวหนังสือหนา */
  width: 100%;
}

/* เปลี่ยนสีของไอคอนเมื่อ hover */
.addButton:hover {
  color: #388e3c !important;
  /* สีของข้อความในปุ่มเมื่อ hover */
  background-color: #ffffff !important;
  /* สีพื้นหลังของปุ่มเมื่อ hover */
  border: 1px solid #388e3c !important;
  /* เปลี่ยนเส้นขอบเป็นสีขาวเมื่อ hover */
}
</style>
