<template>
  <!-- Systems Data Table container -->
  <div class="systems-data-table">
    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          "
        />
      </v-col>
    </v-row>
    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="filteredSystems"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >Systems Management - Project :
            {{ projectNameENG }}</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="goToCreateSystem"
            >New System</v-btn
          >
          <v-btn
            color="primary"
            dark
            @click="goToHistorySystems"
            style="margin-left: 10px"
            >Show HistorySystem</v-btn
          >
        </v-toolbar>

        <!-- Create System Dialog -->
        <v-dialog
          v-model="createSystemDialog"
          max-width="600"
          ref="createSystemDialog"
        >
          <v-card>
            <v-card-title>Create New System</v-card-title>
            <v-card-text>
              <!-- Form to create new system -->
              <v-form @submit.prevent="createSystem">
                <v-text-field
                  v-model="newSystem.system_id"
                  label="System ID"
                ></v-text-field>
                <v-text-field
                  v-model="newSystem.system_nameTH"
                  label="System Name (TH)"
                ></v-text-field>
                <v-text-field
                  v-model="newSystem.system_nameEN"
                  label="System Name (EN)"
                ></v-text-field>
                <v-text-field
                  v-model="newSystem.system_shortname"
                  label="Short Name"
                ></v-text-field>

                <!-- New fields for SA, DEV, IMP selection -->
<<<<<<< HEAD
=======


                <v-select v-model="selectedUsers" :items="formatUserProjects(userProjects)" label="Select User"
                  multiple>
                  <template v-slot:prepend-item>
                    <v-list-item @click="selectAll">
                      <v-list-item-content>Select All</v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a

                <v-select
                  v-model="selectedUsers"
                  :items="formatUserProjects(userProjects)"
                  label="Select User"
                  multiple
                  item-text="text"
                >
                  <template v-slot:prepend-item>
                    <v-list-item @click="selectAll">
                      <v-list-item-content>Select All</v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>

                <v-btn color="primary" type="submit">Create</v-btn>
                <v-btn color="error" @click="createSystemDialog = false">Cancel</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Edit System Dialog -->
        <v-dialog
          v-model="editSystemDialog"
          max-width="600"
          ref="editSystemDialog"
        >
          <v-card>
            <v-card-title>Edit System</v-card-title>
            <v-card-text>
              <!-- Form to edit system -->
              <v-form @submit.prevent="updateSystem">
                <v-text-field
                  v-model="editedSystem.system_id"
                  label="System ID"
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_nameTH"
                  label="System Name (TH)"
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_nameEN"
                  label="System Name (EN)"
                ></v-text-field>
                <v-text-field
                  v-model="editedSystem.system_shortname"
                  label="Short Name"
                ></v-text-field>
                <!-- Add more fields as needed -->
                <!-- You can also add selection fields for system analyst and member -->
                <!-- Add buttons to submit and cancel -->
                <v-btn type="submit">Update</v-btn>
                <v-btn @click="editSystemDialog = false">Cancel</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Show deleted systems history -->
        <v-dialog v-model="showHistoryDialog" max-width="800">
          <v-data-table :headers="headers" :items="deletedSystems">
            <!-- Define headers for the table -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Deleted Systems History</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!-- Define actions for each row -->
            <template v-slot:item.actions="{ item }">
              <v-btn color="primary" @click="restoreSystem(item)">
                Restore
              </v-btn>
              <v-btn color="error" @click="confirmDeleteHistorySystem(item)">
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-dialog>
      </template>

<<<<<<< HEAD
=======
      <!-- Manage systems users dialog -->
      <v-dialog v-model="dialogUserSystems" max-width="800px">
        <v-card>
          <v-card-title>User Systems</v-card-title>
          <v-card-text>
            <v-text-field v-model="search" label="Search" dense hide-details solo flat></v-text-field>
            <v-data-table :headers="userSystemsHeaders" :items="filteredUserProjects">
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.id }}</td>
                  <td>{{ item.user_firstname }}</td>
                  <td>{{ item.user_lastname }}</td>
                  <td>{{ item.user_position }}</td>

                  <td>
                    <!-- Add trash icon here -->
                    <v-icon @click="tse(s, item)">mdi-delete</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialogUserSystems = false">Close</v-btn>
            <!-- Button to open nested dialog -->
            <v-btn color="blue darken-1" text @click="testsss">Assign User</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Nested Dialog for Assigning User -->
      <v-dialog v-model="dialogAssignUser" max-width="500px">
        <v-card>
          <v-card-title>Assign User</v-card-title>
          <v-card-text>
            <!-- New field for selecting users -->
            <v-select v-model="selectedUsersAF" :items="ssss" label="Select SA" item-text="displayText" item-value="id"
              multiple></v-select>

            <v-select v-model="selectedUsersAF" :items="ssss" label="Select DEV" item-text="displayText" item-value="id"
              multiple></v-select>

            <v-select v-model="selectedUsersAF" :items="ssss" label="Select IMP" item-text="displayText" item-value="id"
              multiple></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeNestedDialog">Cancel</v-btn>
            <!-- Button to assign selected users -->
            <v-btn color="blue darken-1" text @click="assignUserAF">Assign</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="20" px @click="openEditDialog(item)"
          >mdi-pencil-circle</v-icon
        >
        <v-icon size="20" px @click="confirmDeleteSystem(item)"
          >mdi-delete-empty</v-icon
        >
        <v-btn @click="goToSystemsDetail(item.id)" style="margin-left: 10px"
          >Screens</v-btn
        >
        <v-btn
          size="30"
          px
          @click="manageUserSystems(item)"
          style="margin-left: 10px"
        >
          manage User Systems
        </v-btn>
      </template>
    </v-data-table>

<<<<<<< HEAD
  
    <!-- Dialog to display user systems -->
      <v-dialog v-model="dialogUserSystems" max-width="600">
        <v-card>
          <v-card-title>User Systems</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search"
              dense
              hide-details
              solo
              flat
            ></v-text-field>
            <v-data-table :headers="userSystemHeader" :items="userSystems">
              <template v-slot:item="{ item }">
                <tr v-if="item">
                  <td>{{ item.id }}</td>
                  <td>{{ item.user_firstname }}</td>
                  <td>{{ item.user_lastname }}</td>
                  <td>{{ item.user_position }}</td>
                  <!-- <td>
                  <v-img :src="getBase64Image(item.user_pic)" height="50" contain></v-img>
                </td> -->
                  <td>
                    <!-- Add trash icon here -->
                    <v-icon @click="deleteUser(system_id, item.id)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="t">Assign Users</v-btn>
            <v-btn color="error" @click="dialogUserSystems = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

=======
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import EditSystemDialog from "../../components/SystemComponent/EditSystemDialog.vue";

export default {
  name: "SystemsDataTable",
  layout: "admin",
  components: {},
  data() {
    return {
      // Sample team members data
      teamMembers: ["SA1", "SA2", "DEV1", "DEV2", "IMP1", "IMP2"],
<<<<<<< HEAD
      projectId: [],
      system_id: null,
      dialogUserSystems: false,

      userSystemHeader: [
        { text: "ID", value: "id" },
        { text: "First Name", value: "user_firstname" },
        { text: "Last Name", value: "user_lastname" },
        { text: "Position", value: "user_position" },
        // { text: "Picture", value: "user_pic" }, // เพิ่มหัวข้อ Picture ลงใน userProjectsHeaders
      ],
      search: "", // Add this line
      AvailableUsersSystem: [],
      availableUsers: [],
      userSystems: [],
      selectedUsers: [], // เก็บข้อมูลผู้ใช้ที่ถูกเลือก
      userProjects: [], // เก็บข้อมูล user_projects ที่ได้มาจาก API
=======

      selectedUsers: [], // เก็บข้อมูลผู้ใช้ที่ถูกเลือก
      userProjects: [], // เก็บข้อมูล user_projects ที่ได้มาจาก API

      users: [], // เก็บข้อมูลผู้ใช้ที่ดึงมาจาก API
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a

      // users: [], // เก็บข้อมูลผู้ใช้ที่ดึงมาจาก API

      projectNameENG: "",
      showHistoryDialog: false,
      deletedSystems: [],
      createSystemDialog: false,
      editSystemDialog: false,

      newSystem: {
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
      },
      editedSystem: {
        system_id: "",
        system_nameTH: "",
        system_nameEN: "",
        system_shortname: "",
      },
      systems: [],
      searchQuery: "",
      headers: [
        { text: "System ID", value: "system_id" },
        { text: "System Name (TH)", value: "system_nameTH" },
        { text: "System Name (EN)", value: "system_nameEN" },
        { text: "Short Name", value: "system_shortname" },
        { text: "Screen Count", value: "screen_count" },
        { text: "System Progress (%)", value: "system_progress" },
        { text: "Planned Start", value: "system_plan_start" },
        { text: "Planned End", value: "system_plan_end" },
        { text: "Manday", value: "system_manday" },
        { text: "Actions", value: "actions", sortable: false },
      ],
<<<<<<< HEAD
    };
  },
  methods: {
    async fetchUserProjectsByProjectId(projectId) {
      try {
        const response = await axios.get(
          `http://localhost:7777/user_projects/getUserProjectsByProjectId/${projectId}`
        );
=======

    };
  },
  methods: {
    //     async checkUsers() {
    //   try {
    //     const project_id = this.$route.params.id;
    //     await this.fetchUserProjects(project_id); // เรียกใช้ฟังก์ชัน fetchUserProjects เพื่อดึงข้อมูลผู้ใช้

    //     // ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
    //     if (this.userProjects && this.userProjects.length > 0) {
    //       // มีผู้ใช้ในโปรเจกต์นี้
    //       console.log("มีผู้ใช้ในโปรเจกต์นี้");
    //       // แสดงรายชื่อผู้ใช้ที่มีในโปรเจกต์
    //       this.userProjects.forEach(user => {
    //         console.log(user.user_id,user.user_firstname); // ประเภทของข้อมูล user_id อาจเป็นอย่างอื่นตามโครงสร้างของข้อมูลที่ได้รับ
    //       });
    //     } else {
    //       // ไม่มีผู้ใช้ในโปรเจกต์นี้
    //       console.log("ไม่มีผู้ใช้ในโปรเจกต์นี้");
    //     }
    //   } catch (error) {
    //     console.error("Error checking users:", error);
    //   }
    // },

    // async fetchUserProjects(project_id) {
    //     try {
    //       const response = await fetch(`http://localhost:7777/user_projects/getUserProjectsByProjectId/${project_id}`);
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch user projects");
    //       }
    //       const data = await response.json();
    //       // ตั้งค่า userProjects เป็นข้อมูลที่ได้รับมา
    //       this.userProjects = data;
    //     } catch (error) {
    //       console.error("Error fetching user projects:", error);
    //     }
    //   },
    // http://localhost:7777/user_projects/getUserProjectsByProjectId/${projectId

    async fetchUserProjectsByProjectId(projectId) {
      try {
        const response = await axios.get(`http://localhost:7777/user_projects/getUserProjectsByProjectId/${projectId}`);
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
        if (response.status === 200) {
          // ดึงข้อมูลผู้ใช้จากการเรียก API
          this.userProjects = response.data;
          // console.log(this.userProjects)
        } else {
<<<<<<< HEAD
          console.error("Failed to fetch user projects");
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
=======
          console.error('Failed to fetch user projects');
        }
      } catch (error) {
        console.error('Error fetching user projects:', error);
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
      }
    },

    formatUserProjects(userProjects) {
<<<<<<< HEAD
      return userProjects.map((user) => ({
=======
      return userProjects.map(user => ({
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
        text: `${user.user_firstname} ${user.user_lastname} (${user.user_position})`,
        value: user.user_id,
      }));
    },

    selectAll() {
      // สร้าง array ใหม่ที่มีค่าเท่ากับ items ทั้งหมด
<<<<<<< HEAD
      const allValues = this.formatUserProjects(this.userProjects).map(
        (item) => item.value
      );
      // ตรวจสอบว่าทุก item ใน allValues ถูกเลือกแล้วหรือไม่
      const allSelected = allValues.every((value) =>
        this.selectedUsers.includes(value)
      );
=======
      const allValues = this.formatUserProjects(this.userProjects).map(item => item.value);
      // ตรวจสอบว่าทุก item ใน allValues ถูกเลือกแล้วหรือไม่
      const allSelected = allValues.every(value => this.selectedUsers.includes(value));
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
      // หากทุก item ถูกเลือกแล้ว ให้ลบทุก item ออกจาก selectedUsers
      if (allSelected) {
        this.selectedUsers.splice(0, this.selectedUsers.length);
      } else {
        // หากยังไม่เลือกทั้งหมด ให้กำหนด selectedUsers เป็น allValues
        this.selectedUsers = allValues;
      }
    },

<<<<<<< HEAD
    async manageUserSystems(item) {
      try {
        const systemId = item.id; // ดึง id ของระบบจาก item ที่รับเข้ามา
        // ตรวจสอบว่า systemId มีค่าที่ถูกต้องหรือไม่
        if (!systemId) {
          console.error("Error fetching user systems: systemId is undefined");
          return;
        }

        // เรียกเมธอดเพื่อเรียกข้อมูลผู้ใช้ที่เกี่ยวข้องกับระบบนี้
        this.fetchAvailableUsersSystem(this.$route.params.id);
        // Log เพื่อตรวจสอบค่า systemId
        console.log("System ID:", systemId);

        const response = await fetch(
          `http://localhost:7777/user_systems/getOneScreenID/${systemId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user systems");
        }
        const data = await response.json();
        // นำข้อมูลที่ได้รับมาเก็บไว้ในตัวแปรของคุณเพื่อนำไปแสดงใน <v-dialog>
        this.userSystems = data;
        // เปิด <v-dialog> เพื่อแสดงข้อมูลที่ได้รับมา
        this.dialogUserSystems = true;
      } catch (error) {
        console.error("Error fetching user systems:", error);
      }
    },
    
    fetchAvailableUsersSystem(systemId) {
      axios
        .get(
          "http://localhost:7777/user_systems/getOneScreenID/" +
            systemId
        )
        .then((response) => {
          this.availableUsers = response.data.map((user) => ({
            id: user.id,
            user_firstname: user.user_firstname,
            user_lastname: user.user_lastname,
            user_position: user.user_position,
            displayText: `${user.user_position}: ${user.user_firstname} ${user.user_lastname}`,
          }));
          // หลังจากกำหนดค่า availableUsers ให้กำหนดค่า system_id ด้วย
          this.systemId = systemId;
        })
        .catch((error) => {
          console.error("Error fetching available users:", error);
        });
    },

    async deleteUser(systemId, user_id) {
      console.log(systemId, user_id)
  try {
    if (!user_id) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "User ID is undefined",
      });
      console.error("Error deleting user: user_id is undefined");
      return;
    }

    // เรียกใช้งาน API ด้วย axios.delete โดยส่ง user_id ไปยังเส้นทางที่ต้องการ
    const response = await axios.delete(
      `http://localhost:7777/user_systems/deleteUserID/${user_id}`
    );

    if (response.status === 200) {
      // จัดการกรณีที่สำเร็จ
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
      // เรียกใช้ deleteUser() โดยส่ง user_id ของผู้ใช้ที่ต้องการลบ
      await this.deleteUser(systemId, user_id);

      console.log(response.data.message);
      window.location.reload();
      // อัปเดตข้อมูลผู้ใช้หลังจากที่ลบผู้ใช้เสร็จสิ้น
      this.fetchAvailableUsersSystem(systemId);
    } else {
      // จัดการกรณีที่เกิดข้อผิดพลาด
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user",
      });
      console.error("Failed to delete user:", response.status);
    }
  } catch (error) {
    // จัดการกรณีที่เกิดข้อผิดพลาดระหว่างการลบผู้ใช้
    console.error("Error deleting user:", error);
  }
},

=======
>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
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
        let requestBody = {
          project_id: projectId,
          system_id: this.newSystem.system_id,
          system_nameTH: this.newSystem.system_nameTH,
          system_nameEN: this.newSystem.system_nameEN,
          system_shortname: this.newSystem.system_shortname,
          // selectedUsers: this.selectedUsers.map((user) => user.user_id), // แปลงเป็นรูปแบบของ user_id เพื่อส่งไปยังเซิร์ฟเวอร์
        };
        // Check if any team members are selected
        // แปลงเป็นรูปแบบของ user_id เพื่อส่งไปยังเซิร์ฟเวอร์
        if (this.selectedUsers.length > 0) {
          requestBody.selectedUsers = this.selectedUsers.map(
            (user) => user.user_id
          );
        }

        const response = await fetch(
          "http://localhost:7777/systems/createSystem",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to create System");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message || "New System created successfully",
        });
        // Clear the newSystem object and selectedUsers
        this.newSystem = {
          system_id: "",
          system_nameTH: "",
          system_nameEN: "",  
          system_shortname: "",
        };
        this.selectedUsers = []; // เมื่อสร้างระบบเสร็จแล้ว ล้างข้อมูลผู้ใช้ที่ถูกเลือก
        this.fetchSystems(); // โหลดข้อมูลระบบใหม่
        // เพิ่มเรียกใช้งาน addUserToSystem ที่นี่
      
      } catch (error) {
        console.error("Error creating System:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to create System",
        });
      }
    },

    async goToSystemsDetail(systemId) {
      // Navigate to the Systems/_id.vue page with the systemId parameter
      await this.$router.push({ path: `/systems/${systemId}` });
    },
    async fetchProjectNameENG() {
      try {
        const projectId = this.$route.params.id;
        const response = await fetch(
          `http://localhost:7777/projects/getOne/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const projectData = await response.json();
        console.log(projectData); // ตรวจสอบข้อมูลที่ได้รับมา
        this.projectNameENG = projectData.project_name_ENG; // ใส่ชื่อ field ที่ต้องการแสดง
      } catch (error) {
        console.error("Error fetching project:", error);
        // Handle error fetching project
      }
    },
    async restoreSystem(item) {
      try {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You are about to restore this system.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, restore it!",
        });

        if (confirmResult.isConfirmed) {
          const systemId = item.id;
          const response = await fetch(
            `http://localhost:7777/systems/updateSystem/${systemId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                system_nameTH: item.system_nameTH,
                system_nameEN: item.system_nameEN,
                system_shortname: item.system_shortname,
                project_id: item.project_id,
                is_deleted: 0,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to restore system");
          }

          console.log("System restored successfully");

          await Swal.fire(
            "Success",
            "System restored successfully.",
            "success"
          );

          // เพิ่มบรรทัดนี้เพื่ออัพเดทตารางอัตโนมัติ
          this.fetchDeletedSystems();
        }
      } catch (error) {
        console.error("Error restoring system:", error);
        await Swal.fire(
          "Error",
          "An error occurred during the system restoration process.",
          "error"
        );
      }
    },

    async mounted() {
      try {
        const projectId = this.$route.params.id;
        const response = await fetch(
          `http://localhost:7777/projects/getOne/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const projectData = await response.json();
        console.log(projectData); // ตรวจสอบข้อมูลที่ได้รับมา
        this.projectNameENG = projectData.project_name_ENG; // ใส่ชื่อ field ที่ต้องการแสดง
      } catch (error) {
        console.error("Error fetching project:", error);
        // Handle error fetching project
      }
    },

    async confirmDeleteHistorySystem(item) {
      try {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (confirmResult.isConfirmed) {
          const systemId = item.id; // Get the ID of the system to delete
          const response = await fetch(
            `http://localhost:7777/systems/deleteHistorySystems/${systemId}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete system");
          }
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "System and related data deleted successfully",
          });
          this.fetchDeletedSystems(); // Refresh the deleted systems data
        }
      } catch (error) {
        console.error("Error confirming delete history system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete history system",
        });
      }
    },
    async goToHistorySystems() {
      await this.fetchDeletedSystems();
      this.showHistoryDialog = true;
    },
    async fetchDeletedSystems() {
      try {
        const projectId = this.$route.params.id;
        const response = await fetch(
          `http://localhost:7777/systems/searchByProjectId_delete/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch deleted systems");
        }
        const deletedSystems = await response.json();
        console.log(deletedSystems); // ตรวจสอบ deleted systems ที่ได้รับมา
        this.deletedSystems = deletedSystems;
      } catch (error) {
        console.error("Error fetching deleted systems:", error);
        // Handle error fetching deleted systems
      }
    },

    async updateSystem() {
      try {
        const response = await fetch(
          `http://localhost:7777/systems/updateSystem/${this.editedSystem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedSystem),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update system");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System updated successfully",
        });
        this.editSystemDialog = false;
        this.fetchSystems();
      } catch (error) {
        console.error("Error updating system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update system",
        });
      }
    },

    async fetchSystems() {
      const projectId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/getAll/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch systems");
        }
        const data = await response.json();
        this.systems = data;
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    },
    async goToCreateSystem() {
      // Open the create system dialog first
      this.createSystemDialog = true;
    },
    openEditDialog(system) {
      this.editedSystem = { ...system };
      this.editSystemDialog = true;
    },
    async editSystem(system) {
      // Set the edited system to the selected system
      this.editedSystem = { ...system };
      // Open the edit system dialog
      this.editSystemDialog = true;
    },
    async confirmDeleteSystem(system) {
      try {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          showClass: {
            popup: "animate__animated animate__fadeInDown", // กำหนด animation เมื่อแสดง SweetAlert
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp", // กำหนด animation เมื่อซ่อน SweetAlert
          },
        });
        if (confirmResult.isConfirmed) {
          // If user confirms deletion, call deleteSystem method
          await this.deleteSystem(system);
          // อัพเดทข้อมูลโดยอัตโนมัติหลังจากลบข้อมูล
          this.fetchSystems();
        }
      } catch (error) {
        console.error("Error confirming delete system:", error);
      }
    },

    async deleteSystem(system) {
      const systemId = system.id;
      try {
        // Send a DELETE request to the API to delete the system
        const response = await fetch(
          `http://localhost:7777/systems/delete/${systemId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete system");
        }
        // If deletion is successful, show success message and update systems data
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System deleted successfully",
        });
        this.fetchDeletedSystems(); // Refresh the deleted systems data
      } catch (error) {
        console.error("Error deleting system:", error);
        // If an error occurs during deletion, show error message
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete system",
        });
      }
    },
<<<<<<< HEAD
=======

>>>>>>> c0c74cfbd527534c933b0394302efa19cfd3cb4a
  },
  computed: {
    // userOptions() {
    //   // แปลงข้อมูลผู้ใช้ให้อยู่ในรูปแบบที่ v-select ต้องการ
    //   return this.selectedUsers.map((user) => ({ text: user.name, value: user.id }));
    // },

    filteredUserProjects() {
      return this.userProjects.filter((item) => {
        return (
          item.id
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_firstname
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_lastname
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_position.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },

    filteredUserSystems() {
      return this.userSystems.filter((item) => {
        return (
          item.id
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_firstname
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_lastname
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.user_position.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    filteredSystems() {
      return this.systems.filter((system) => {
        const searchText = this.searchQuery.toLowerCase();
        return (
          system.system_id.toLowerCase().includes(searchText) ||
          system.system_nameTH.toLowerCase().includes(searchText) ||
          system.system_nameEN.toLowerCase().includes(searchText) ||
          system.system_shortname.toLowerCase().includes(searchText)
        );
      });
    },

    filteredProjects() {
      return this.projects
        .map((project) => ({
          ...project,
          project_progress: project.project_progress || 0,
          project_plan_start: project.project_plan_start || "Not determined",
          project_plan_end: project.project_plan_end || "Not determined",
        }))
        .filter((project) => {
          const searchText = this.searchQuery.toLowerCase();
          return (
            (project.project_id &&
              project.project_id.toLowerCase().includes(searchText)) ||
            (project.project_name_ENG &&
              project.project_name_ENG.toLowerCase().includes(searchText)) ||
            (project.project_name_TH &&
              project.project_name_TH.toLowerCase().includes(searchText))
          );
        });
    },
  },

  mounted() {
    // ตรวจสอบว่ามี project_id ก่อนที่จะเรียกใช้ fetchAvailableUsers
    if (this.project_id) {
      this.fetchAvailableUsers(this.project_id);
    }
    const projectId = this.$route.params.id; // ดึง project id จากพารามิเตอร์ URL
    this.fetchUserProjectsByProjectId(projectId); // เรียกใช้เมื่อคอมโพเนนต์โหลด
    // console.log(this.userProjects)

    // this.fetchUserProjects(this.project_id);
    this.project_id = this.$route.params.id;
    this.fetchSystems();
    this.fetchProjectNameENG();
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>