<template>
  <!-- Create System Dialog -->
  <v-dialog v-model="dialog" max-width="600" ref="createSystemDialog">
    <v-card>
      <v-card-title>Create New System</v-card-title>
      <v-card-text>
        <!-- Form to create new system -->
        <v-form @submit.prevent="createSystem">
          <v-text-field v-model="newSystem.system_id" label="System ID"></v-text-field>
          <v-text-field v-model="newSystem.system_nameTH" label="System Name (TH)"></v-text-field>
          <v-text-field v-model="newSystem.system_nameEN" label="System Name (EN)"></v-text-field>
          <v-text-field v-model="newSystem.system_shortname" label="Short Name"></v-text-field>

          <!-- New fields for SA, DEV, IMP selection -->
          <v-select v-model="selectedUsers" :items="formatUserProjects(userProjects)" label="Select User" multiple>
            <template v-slot:prepend-item>
              <v-list-item @click="selectAll">
                <v-list-item-content>Select All</v-list-item-content>
              </v-list-item>
            </template>
          </v-select>

          <v-btn type="submit">Create</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreateSystemDialog",
  props: {
    createSystemDialog: Boolean,
    userProjects: Array,
  },
  data() {
    return {
      dialog: this.createSystemDialog,
      newSystem: {
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
      },
      selectedUsers: [],
    };
  },
  methods: {
    async createSystem() {
      const projectId = this.$route.params.id;
      if (
        !this.newSystem.system_id ||
        !this.newSystem.system_nameTH ||
        !this.newSystem.system_nameEN ||
        !this.newSystem.system_shortname
      ) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all required fields.",
        });
        return;
      }
      try {
        const response = await axios.post(
          `http://localhost:7777/systems/createSystem`,
          {
            project_id: projectId,
            ...this.newSystem,
            selectedUsers: this.selectedUsers,
          }
        );
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to create system");
        }
        // Clear the newSystem object
        this.newSystem = {
          system_id: "",
          system_nameTH: "",
          system_nameEN: "",
          system_shortname: "",
        };
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "New system created successfully",
        });
        // Emit event to parent component to close the dialog
        this.$emit("close");
      } catch (error) {
        console.error("Error creating system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to create system",
        });
      }
    },
    selectAll() {
      // สร้าง array ใหม่ที่มีค่าเท่ากับ items ทั้งหมด
      const allValues = this.formatUserProjects(this.userProjects).map(item => item.value);
      // ตรวจสอบว่าทุก item ใน allValues ถูกเลือกแล้วหรือไม่
      const allSelected = allValues.every(value => this.selectedUsers.includes(value));
      // หากทุก item ถูกเลือกแล้ว ให้ลบทุก item ออกจาก selectedUsers
      if (allSelected) {
        this.selectedUsers.splice(0, this.selectedUsers.length);
      } else {
        // หากยังไม่เลือกทั้งหมด ให้กำหนด selectedUsers เป็น allValues
        this.selectedUsers = allValues;
      }
    },
    formatUserProjects(userProjects) {
      return userProjects.map(user => ({
        text: `${user.user_firstname} ${user.user_lastname} (${user.user_position})`,
        value: user.user_id,
      }));
    },
    closeDialog() {
      // Emit event to parent component to close the dialog
      this.$emit("close");
    },
  },
};
</script>
