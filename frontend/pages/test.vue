<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col>
            <v-row class="mt-1">
              <h4>Stock Product</h4>
              <p style="color: #b6b5b5; font-size: 16px; margin-left: 5%">
                3 Sub System
              </p>
            </v-row>
          </v-col>
          <v-col>
            <v-row class="mt-1 mb-1">
              <h4>AD005</h4>
              <v-spacer></v-spacer>
              <h4>1 year</h4>
              <v-spacer></v-spacer>
              <h4>Test agency</h4>
              <v-spacer></v-spacer> </v-row
          ></v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  data: () => ({
    date: null,
    trip: {
      name: "",
      location: null,
      start: null,
      end: null,
    },
    locations: [
      "Australia",
      "Barbados",
      "Chile",
      "Denmark",
      "Ecuador",
      "France",
    ],
  }),
};
</script>

<style>
</style>