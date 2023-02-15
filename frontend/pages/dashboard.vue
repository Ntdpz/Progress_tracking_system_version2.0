<template>
  <div class="mx-auto">
    <v-row class="mb-3 ml-4">
      <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
        Dashboard
      </v-text-title>
      <v-divider class=" hidden-xs-only mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
      <template>
        <v-banner class="mt-0 ml-4" style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 30px;
                      border-radius: 30px;
                      padding: 0 0px;
                    " outlined elevation="2">
          <form class="center">
            <v-icon class="hidden-xs-only" color="purple">mdi-magnify</v-icon>
            <input class="mr-3" type="text" v-model="query" placeholder="Search some Notification" />
          </form>
        </v-banner>
      </template>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col>
        <template>
          <div class="text-left mt-4">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined style="border:none; font-weight: bold; font-size: 22px;" color="black" dark
                  v-bind="attrs" v-on="on">
                  {{ select }}<v-icon size="22px" right>mdi-menu-down</v-icon>
                </v-btn>

              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="clicks(item.title)">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-col>
    </v-row>
    <!--  -->
    <v-row class="ml-2 mr-2">
      <v-col class="col-xs-12" sm="12" md="4" lg="4" xl="4">
        <v-card width="280px" height="180px" color="#EF6154">
          <v-card-title class="white--text">
            <v-icon left color="white">mdi-alert-circle</v-icon>
            Task Reject
          </v-card-title>
          <v-card-text class="white--text mt-4 ml-1" style="font-size: 80px;">
            20
          </v-card-text>
          <v-container class="mt-3">
            <v-row>
              <v-col class="center ml-4 col-7" style="height: 30px; background-color: #dcf5dc8f; border-radius: 50px;">
                <v-text class=" center ma-0 pa-0" style="font-weight: bold;"> per month</v-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col class="col-xs-12" sm="12" md="4" lg="4" xl="4">
        <v-card width="280px" height="180px" color="#F7B34C">
          <v-card-title class="white--text">
            <v-icon left color="white">mdi-file-document</v-icon>
            Task Inprogress
          </v-card-title>
          <v-card-text class="white--text mt-4 ml-1" style="font-size: 80px;">
            20
          </v-card-text>
          <v-container class="mt-3">
            <v-row>
              <v-col class="center ml-4 col-7" style="height: 30px; background-color: #dcf5dc8f; border-radius: 50px;">
                <v-text class=" center ma-0 pa-0" style="font-weight: bold;"> per month</v-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col class="col-xs-12" sm="12" md="4" lg="4" xl="4">
        <v-card width="280px" height="180px" color="#6DC193">
          <v-card-title class="white--text">
            <v-icon left color="white">mdi-check-circle</v-icon>
            Task Inprogress
          </v-card-title>
          <v-card-text class="white--text mt-4 ml-1" style="font-size: 80px;">
            20
          </v-card-text>
          <v-container class="mt-3">
            <v-row>
              <v-col class="center ml-4 col-7" style="height: 30px; background-color: #dcf5dc8f; border-radius: 50px;">
                <v-text class=" center ma-0 pa-0" style="font-weight: bold;"> per month</v-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!--  -->
    <v-row class="ma-2">
      <v-col>
        <v-card color="#BC90FF" width="100%" height="350px">
          <v-card-title class="white--text" style="font-size: 30px;">
            Performance
          </v-card-title>
          <v-col class="ma-0 pa-0"><v-card-text class="white--text" style="font-size:20px;">ระยะเวลาในการทำงานเฉลี่ย
              (งานระดับยาก)</v-card-text></v-col>
          <v-col class="ma-0 pa-0"><v-card-text class="white--text" style="font-size:20px;">ระยะเวลาในการทำงานเฉลี่ย
              (งานระดับปานกลาง)</v-card-text></v-col>
          <v-col class="ma-0 pa-0"><v-card-text class="white--text" style="font-size:20px;">ระยะเวลาในการทำงานเฉลี่ย
              (งานระดับง่าย)</v-card-text></v-col>
          <v-col class="ma-0 pa-0"><v-card-text class="white--text"
              style="font-size:20px;">งานที่ได้รับมอบหมายทั้งหมด</v-card-text></v-col>
          <v-col class="ma-0 pa-0"><v-card-text class="white--text"
              style="font-size:20px;">เปอร์เซ็นต์ในการทำงาน</v-card-text></v-col>
        </v-card>
      </v-col>
    </v-row>


  </div>
</template>

<script>
export default {
  layout: 'admin',
  name: 'DashboardHeader',
  data() {
    return {
      query: '',
      location: 'center',
      select: 'Developer Name',
      items: [
        { title: 'Developer Name' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    };
  },
  methods: {
    clicks(title) {
      this.select = title;
      console.log(this.select);
    }
  },
}
</script>

<style scoped>
input[type="text"] {
  font-size: 16px;
  padding-left: 10px;
  outline: black;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>