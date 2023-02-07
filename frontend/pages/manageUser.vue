<template>
  <div class="body">
    <v-row class="mb-3 ml-4">
      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Manage Users
      </v-text-title>
      <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <template>
        <v-banner class="mt-0 ml-4" style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 30px;
                      border-radius: 30px;
                      padding: 0 0px;
                    " outlined elevation="2">
          <form class="center" @submit.prevent="search">
            <v-icon color="purple">mdi-magnify</v-icon>
            <input class="mr-3" type="text" v-model="query" placeholder="Search some User" />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>
    <!-- class="green lighten-5" -->
    <v-container>
      <v-row no-gutters>
        <!-- เอาเส้นออกใส่ border: none; -->
        <v-card class="pa-2" tile outlined style=" width: 100%; height: 100%; display: flex; justify-content: center">
          <v-col col="12" sm="12" md="12">
            <!-- หมวดหมู่ หัวข้อใหญ่ -->
            <v-toolbar class="mb-2">
              <v-tabs fixed-tabs v-model="tab" next-icon="mdi-menu-right-outline" prev-icon="mdi-menu-left-outline"
                show-arrows>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item" style="font-weight: bold; color: black;">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <!-- ตารางย่อยในหัวข้อ -->
            <v-tabs-items v-model="tab">
              <!-- <v-tab-item v-for="item in items" :key="item">
                  <v-card flat>
                    <v-card-text v-text="text"></v-card-text>
                  </v-card>
                </v-tab-item> -->
              <!-- Tab1 -->
              <v-tab-item>
                <v-card flat>
                  <!--  -->
                  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteItem(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                  </v-data-table>
                  <!--  -->
                </v-card>
              </v-tab-item>
              <!--  -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Tab2</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Tab3</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Tab4</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Tab5</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Tab6</v-card-text>
                </v-card>
              </v-tab-item>

            </v-tabs-items>

          </v-col>

        </v-card>


      </v-row>
      <!--  -->
      <v-btn class="ml-2 mr-10 mb-0 " elevation="2" color="primary" bottom right absolute
        style="color: white; border-radius: 10px">
        <v-icon left>
          mdi-plus-circle-outline
        </v-icon>
        New User
      </v-btn>
      <!--  -->
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      tab: null,
      items: [
        'All', 'Developer', 'Implementer', 'Program Management', 'System Analyst', 'report developer',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Photo',
          align: 'start',
          sortable: false,
          value: 'photo',
        },
        { text: 'Name', value: 'name' },
        { text: 'Code', value: 'code' },
        { text: 'Position', value: 'position' },
        { text: 'Department', value: 'department' },
        { text: 'Status', value: 'status' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          photo: '',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: '',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: '',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: '',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
        {
          photo: '',
          name: 'Mr. Implementer1',
          code: 'AI00000001',
          position: 'Implementer',
          department: 'DD',
          status: 'Active',
          role: 'User',
        },
      ]
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
  },


}
</script>

<style scoped>
input[type="text"] {
  border: black;
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}
</style>