<template>
  <v-card>
    <v-card-title class="headline">
      Assign User to Project: {{ projectDetails.project_name_ENG }}
    </v-card-title>
    <v-card-text>
      <!-- Select User to Assign -->
      <v-select
        v-model="selectedUsers"
        :items="filteredUsersNotInProject"
        item-text="user_fullname"
        item-value="id"
        label="Select User"
        multiple
        outlined
      >
        <!-- Select All Option -->
        <template v-slot:prepend-item>
          <v-list-item @click="selectAllUsers">
            <v-list-item-content>Select All</v-list-item-content>
          </v-list-item>
        </template>

        <!-- Selected User Chips -->
        <template v-slot:selection="{ item, index }">
          <v-chip
            v-if="item"
            :key="index"
            class="d-flex align-center"
            close
            @click:close="removeUser(item)"
          >
            <v-avatar left>
              <img :src="getBase64Image(item.user_pic)" alt="User Avatar" />
            </v-avatar>
            {{ item.user_firstname }}
          </v-chip>
        </template>

        <!-- User List with Checkboxes -->
        <template v-slot:item="{ item }">
          <v-list-item>
            <v-checkbox v-model="selectedUsers" :value="item.id" />
            <v-list-item-avatar>
              <img :src="getBase64Image(item.user_pic)" alt="User Avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.user_firstname }}
                {{ item.user_lastname }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="assignUsersToProject">Assign Users</v-btn>
      <v-btn color="secondary" @click="closeDialog">Close</v-btn>
    </v-card-actions>
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
      projectDetails: {},
      usersNotInProject: [],
      selectedUsers: [],
      headers: [
        { text: "Avatar", value: "user_pic", sortable: false },
        { text: "Name", value: "user_name" },
        { text: "Position", value: "user_position" },
        { text: "Action", value: "action", sortable: false },
      ],
    };
  },
  computed: {
    filteredUsersNotInProject() {
      return this.usersNotInProject; // You can add filtering logic here if needed
    },
  },
  methods: {
    async fetchProjectDetails() {
      try {
        const response = await this.$axios.get(
          `/projects/getOne/${this.project_id}`
        );
        this.projectDetails = response.data;
      } catch (error) {
        console.error("Error fetching project details:", error);
        await Swal.fire({
          title: "Error!",
          text: "There was an issue fetching project details. Please try again.",
          icon: "error",
        });
      }
    },
    async fetchUsersNotInProject() {
      try {
        const response = await this.$axios.get(
          `/user_projects/getUsersNotInProject/${this.project_id}`
        );
        this.usersNotInProject = response.data.map((user) => ({
          ...user,
          user_fullname: `${user.user_firstname} ${user.user_lastname}`,
        }));
      } catch (error) {
        console.error("Error fetching users not in project:", error);
        await Swal.fire({
          title: "Error!",
          text: "There was an issue fetching users. Please try again.",
          icon: "error",
        });
      }
    },
    async assignUsersToProject() {
      if (this.selectedUsers.length === 0) {
        await Swal.fire({
          title: "Warning!",
          text: "Please select at least one user to assign.",
          icon: "warning",
        });
        return;
      }

      try {
        // Call API to assign users to project
        await this.$axios.post("/user_projects/createUser_project", {
          user_ids: this.selectedUsers,
          project_id: this.project_id,
        });
        await Swal.fire({
          title: "Success!",
          text: "Users assigned successfully.",
          icon: "success",
          confirmButtonColor: "#009933",
        });
        this.fetchUsersNotInProject();
        this.$emit("usersAssigned");
        this.closeDialog();
      } catch (error) {
        console.error("Error assigning users to project:", error);
        await Swal.fire({
          title: "Error!",
          text: "There was an issue assigning the users. Please try again.",
          icon: "error",
          confirmButtonColor: "#009933",
        });
      }
    },
    closeDialog() {
      this.$emit("close");
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
    selectAllUsers() {
      // ตรวจสอบว่ามีการเลือกผู้ใช้ทั้งหมดแล้วหรือยัง
      if (this.selectedUsers.length === this.filteredUsersNotInProject.length) {
        // หากเลือกทั้งหมดแล้ว ให้ยกเลิกการเลือกทั้งหมด
        this.selectedUsers = [];
      } else {
        // หากยังไม่เลือกทั้งหมด ให้เลือกผู้ใช้ทั้งหมด
        this.selectedUsers = this.filteredUsersNotInProject.map(
          (user) => user.id
        );
      }
    },
    removeUser(user) {
      const index = this.selectedUsers.indexOf(user.id);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      }
    },
  },

  watch: {
    project_id(newVal) {
      if (newVal) {
        this.fetchProjectDetails();
        this.fetchUsersNotInProject();
      }
    },
  },
  mounted() {
    if (this.project_id) {
      this.fetchProjectDetails();
      this.fetchUsersNotInProject();
    }
  },
};
</script>
