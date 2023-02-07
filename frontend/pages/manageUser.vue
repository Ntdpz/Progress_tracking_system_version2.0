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
    <v-container >
      <v-row no-gutters >
    <!-- เอาเส้นออกใส่ border: none; -->
            <v-card class="pa-2" tile outlined style="border: none; width: 100%; height: 100%; display: flex; justify-content: center">
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
              <v-tabs-items v-model="tab" >
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
                      <template v-slot:top>
                        
                          
                          <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                    
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                  Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                       
                      </template>
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
      <v-btn class="ml-2 mr-10 mb-0 " elevation="2" color="primary" bottom right absolute style="color: white; border-radius: 10px">
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
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
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
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    }
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