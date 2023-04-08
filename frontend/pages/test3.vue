<template>
  <div>
    <v-btn @click="dialog = true">Open</v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Select Dates</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="acceptMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateOfAccepting"
                      label="Date of Accepting"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateOfAccepting"
                    @input="acceptMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @change="calculateManday()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="startMenu = false"
                    @change="calculateManday()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="expectedMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  @change="calculateManday()"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="expectedCompletionDate"
                      label="Expected Completion Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="expectedCompletionDate"
                    @input="expectedMenu = false"
                    @change="calculateManday()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Man-days"
                  v-model="manday"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveDates">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      dialog: false,
      acceptMenu: false,
      startMenu: false,
      expectedMenu: false,
      dateOfAccepting: null,
      startDate: null,
      expectedCompletionDate: null,
      manday: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    calculateManday() {
      const start = moment(this.startDate);
      const end = moment(this.expectedCompletionDate);
      const days = end.diff(start, "days");
      this.manday = days;
    },
    saveDates() {
      // Validate dates before saving
      if (
        !this.dateOfAccepting ||
        !this.startDate ||
        !this.expectedCompletionDate
      ) {
        alert("Please select all dates");
        return;
      }
      this.calculateManday(); // Call the calculateManday() method here
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>