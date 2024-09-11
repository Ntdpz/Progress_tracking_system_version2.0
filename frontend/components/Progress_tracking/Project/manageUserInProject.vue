<template>
  <v-card>
    <v-card>
      <!-- Current User Title -->
      <v-card-title color="black">Manage users in Project :</v-card-title>
      <v-card-text>
        <!-- Current User Table -->
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1 mt-4 mb-3"
        >
          <!-- User Avatar in the "Image" column -->
          <template v-slot:item.user_pic="{ item }">
            <v-avatar>
              <img :src="getBase64Image(item.user_pic)" alt="User Avatar" />
            </v-avatar>
          </template>

          <!-- User Name in the "User Name" column -->
          <template v-slot:item.user_name="{ item }">
            {{ item.user_firstname }} {{ item.user_lastname }}
          </template>

          <!-- User Position in the "User Position" column -->
          <template v-slot:item.user_position="{ item }">
            <v-chip
              :style="{
                width: '120px',
                display: 'flex',
                justifyContent: 'center',
              }"
              :color="getColor(item.user_position)"
              dark
            >
              {{ item.user_position }}
            </v-chip>
          </template>

          <!-- Action buttons in the "Action" column -->
          <template v-slot:item.action="{ item }">
            <v-btn icon @click="deleteUser(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAssignUserDialog">Assign User</v-btn>
        <v-btn color="secondary">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    project_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      users: [], // จัดเก็บข้อมูลผู้ใช้ที่ได้จาก API
      headers: [
        { text: "Image", value: "user_pic", align: "start", sortable: false },
        {
          text: "User Name",
          value: "user_name",
          align: "start",
          sortable: false,
        },
        { text: "User Position", value: "user_position", align: "start" },
        { text: "Action", value: "action", sortable: false },
      ],
    };
  },
  methods: {
    // เรียกใช้ API และเก็บข้อมูลผู้ใช้ใน users
    async fetchUsers() {
      try {
        const response = await this.$axios.get(
          `user_projects/getUserProjectsByProjectId/${this.project_id}`
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    getBase64Image(base64String) {
      if (!base64String) {
        return "";
      }
      if (base64String.startsWith("data:image/jpeg;base64,")) {
        return base64String;
      } else {
        return `data:image/jpeg;base64,${base64String}`;
      }
    },
    getColor(position) {
      switch (position) {
        case "System Analyst":
          return "#864F80"; // สีสำหรับตำแหน่ง System Analyst
        case "Developer":
          return "#374AAB"; // สีสำหรับตำแหน่ง Developer
        case "Tester":
          return "#359C73"; // สีสำหรับตำแหน่ง Tester
        default:
          return "grey"; // สีสำหรับตำแหน่งที่ไม่ระบุ
      }
    },
    async deleteUser(item) {
      // แสดง SweetAlert2 เพื่อยืนยันการลบ
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to remove ${item.user_firstname} ${item.user_lastname} from this project?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      // ถ้าผู้ใช้ยืนยันการลบ
      if (result.isConfirmed) {
        try {
          // เรียก API เพื่อลบผู้ใช้
          const response = await this.$axios.delete(
            `/user_projects/deleteUserProjectById/${this.project_id}/${item.user_id}`
          );

          if (response.status === 200) {
            // แสดงข้อความสำเร็จ
            await Swal.fire({
              title: "Deleted!",
              text: "The user has been removed from the project.",
              icon: "success",
            });

            // อัปเดตข้อมูลผู้ใช้ใหม่
            this.fetchUsers();
          }
        } catch (error) {
          // แสดงข้อความผิดพลาดถ้ามีปัญหาในการลบ
          await Swal.fire({
            title: "Error!",
            text: "There was an issue removing the user. Please try again.",
            icon: "error",
          });
          console.error("Error deleting user:", error);
        }
      }
    },
    openAssignUserDialog() {
      // เปิด dialog สำหรับ assign ผู้ใช้ใหม่
      console.log("Assigning new user");
    },
  },
  mounted() {
    this.fetchUsers(); // เรียก API เมื่อ component ถูก mount
  },
};
</script>
