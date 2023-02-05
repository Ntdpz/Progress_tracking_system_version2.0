<template>
  <div class="content mx-auto">
    <v-row class="mb-3 ml-4">
      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Home
      </v-text-title>
      <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <div>
        <v-text-field v-model="query" class="ml-3 mb-5 ml-2" style="height: 20px;" rounded dense outlined label="Search some project"
          prepend-inner-icon="mdi-magnify"></v-text-field>
      </div>
    </v-row>
    <v-divider></v-divider>

    <v-row class="mb-6" no-gutters>
      <v-col class="ml-0" col="2" sm="2">
        <v-avatar class="mt-4" style="width: 100px; height: 100px; float: right">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col class="mt-4 mx-auto align-self-center" col="2" sm="2">
        <div>
          <v-text style="font-size: 20px">AM00000001</v-text>
        </div>
        <div>
          <v-text style="font-size: 20px">Mr. Admin 1</v-text>
        </div>
        <div>
          <v-icon class="mb-1" color="success" style="font-size: small">mdi-circle</v-icon>
          <v-text style="font-size: 20px">Active</v-text>
        </div>
      </v-col>
      <v-col class="mt-6 mx-auto align-self-center" col="7" sm="7">
        <v-btn icon to="/profile">
          <v-icon class="mb-1" color="success" style="font-size: 47px">mdi-pencil-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-container class="mt-4 grey lighten-5" height="400px">
      <v-card class="pa-2" tile outlined style="border: none; height: 350px">
        <v-row class="mb-0">
          <v-col col="12">
            <v-text class="font-weight-bold" style="font-size: 24px">Your Project</v-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="index in 2" :key="index" col="3" sm="3">
            <template>
              <v-card width="280px" height="145px" outlined absolute color="purple">
                <v-card-subtitle class="mb-1" style="font-size: 18px; color: black">
                  Stock Product {{ index }}
                </v-card-subtitle>
                <v-card-actions style="justify-content: right">
                  <v-btn rounded absolute bottom color="black" text> GO </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-col>
          <v-col v-for="index in 12" :key="index" col="3" sm="3">
            <template>
              <v-card width="280px" height="145px" outlined absolute color="orange">
                <v-card-subtitle class="mb-1" style="font-size: 18px; color: black">
                  Market System {{ index }}
                </v-card-subtitle>
                <v-card-actions style="justify-content: right">
                  <v-btn rounded absolute bottom color="black" text> GO </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <!-- persistent คือ การที่คลิกนอก dialog แล้ว dialog จะไม่ปิด -->
        <v-dialog v-model="dialog_newproject"  max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="(dialog_newproject = true)" class="mr-2" elevation="2" color="purple" top right absolute
              v-bind="attrs" v-on="on" style="color: white; border-radius: 10px">
              <v-icon left> mdi-plus-circle-outline </v-icon>New Project
            </v-btn>
          </template>
          <!--  -->
          <v-card>
            <v-card-title>
              <span class="text-h5">Create Project</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="10" md="10">
                    <v-text-field label="Project Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-text-field label="ตัวย่อ" hint=""></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Agency" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Period" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small style="color:red;">*หมายเหตุ*</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple" style="color: white; border-radius: 10px" @click="dialog_newproject = false">
                Create Project
              </v-btn>
            </v-card-actions>
          </v-card>
          <!--  -->
        </v-dialog>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "Nav",
  data() {
    return {
      dialog_newproject: false,
      query: "",
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}
</style>