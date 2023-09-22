<template>
  <div class="">
    <v-row class="header" no-gutters>
      <v-col cols="1" class="pa-0 ml-5" style="text-align: center">
        <v-icon size="40px" color="primary">mdi-view-dashboard</v-icon></v-col
      >
      <v-col cols="10" style="align-self: center" class="pa-0">
        <h2>แดชบอร์ด</h2></v-col
      >
    </v-row>
    <v-col class="d-flex" cols="12" sm="6">
      <v-select :items="items" dense outlined v-model="e1"></v-select>
    </v-col>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          :loading="loading"
          class="my-12"
          max-width="400"
          v-for="(screen, index) in screendetaile"
          :key="index"
        >
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card-title>{{ screen.screen_name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-col>
                <v-row>
                  <v-col><p>จำนวน PNI ทั้งหมด :</p></v-col>
                  <v-col
                    ><p>{{ amount_PNI }}</p></v-col
                  ></v-row
                >
                <v-row>
                  <v-col class="pt-0 pb-0"><p>สถานะรอแก้ไขทั้งหมด :</p></v-col>
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0"
                    ><p>สถานะกำลังแก้ไขทั้งหมด :</p></v-col
                  >
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0"
                    ><p>สถานะแก้ไขเรียบร้อยทั้งหมด :</p></v-col
                  >
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>

                <v-row
                  ><v-col><p>จำนวน PNC ทั้งหมด :</p></v-col>
                  <v-col><p>20</p></v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0"><p>สถานะรอแก้ไขทั้งหมด :</p></v-col>
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0"
                    ><p>สถานะกำลังแก้ไขทั้งหมด :</p></v-col
                  >
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0"
                    ><p>สถานะแก้ไขเรียบร้อยทั้งหมด :</p></v-col
                  >
                  <v-col class="pt-0 pb-0"><p>10</p></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="primary" text @click="reserve"> Reserve </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  name: "DashboardHeader",
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      e1: "Foo",
      screendetaile: [
        {
          screen_name: "Card 1",
          amount_PNI: "10",
          amount_PNI_waiting: "10",
          amount_PNI_editing: "10",
          amount_PNI_complete: "10",
          amount_PNC: "10",
          amount_PNC_waiting: "10",
          amount_PNC_editing: "10",
          amount_PNC_complete: "10",
        },
      ],
      loading: false,
      selection: 1,
    };
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>