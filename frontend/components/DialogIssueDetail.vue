<template>
  <v-dialog v-model="dialog" width="80%" :key="dialogKey">
    <v-card v-if="loading"><h1>Loading.....</h1></v-card>
    <v-card v-else>
      <v-card-title class="text-h5">
        <!-- <h5>{{ ProjectName }} > {{ SystemName }} > {{ IssueName }}</h5> -->
        <h5>{{ ProjectName }} > {{ SystemName }}</h5>
      </v-card-title>
      <v-row class="pa-5">
        <v-col>
          <v-row>
            <v-col>
              <p>No {{ IssueId }}</p></v-col
            >
            <v-col
              ><p>Type {{ IssueType }}</p></v-col
            >
            <v-col
              ><p>Screen {{ IssueScreenId }}</p></v-col
            >
            <v-col
              ><p>Status {{ IssueStatus }}</p>
            </v-col>
            <v-col>
              <p>Priority {{ IssuePriority }}</p>
              <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
            </v-col>
            <v-col> End Date {{ IssueEndDate }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Name</p>
                <v-text-field
                  label="Issue Name"
                  placeholder="Issue Name"
                  outlined
                  dense
                  v-model="IssueName"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                solo
                name="input-7-4"
                label="Note"
                v-model="IssueDes"
                style=""
              ></v-textarea
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Informer</p>
                <v-text-field
                  label="Issue Informer"
                  placeholder="Issue Informer"
                  outlined
                  dense
                  v-model="IssueInformer"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Assign To</p>
                <v-chip class="ma-2" color="primary" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{ IssueAssign }}
                </v-chip>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">QC</p>
                <v-chip class="ma-2" color="primary" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{ IssueQC }}
                </v-chip>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Attachments</p>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <!-- col ใหญ่ฝั่งขวา -->
        <v-col
          ><v-row class="ml-2">
            <v-col>
              <v-row class="text-h6"> <h6>Developer Section 1</h6></v-row>
              <v-row class="mt-5">
                <v-col cols="6">
                  <v-row>
                    <!-- Date of accepting-->
                    <p class="pa-2">Date of accepting</p>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <p class="pa-2">Manday</p>
                    <v-text-field
                      label="Manday"
                      placeholder="Manday"
                      outlined
                      dense
                      v-model="IssueManday"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <p class="pa-2">Start date</p>
                    <p class="pa-2">-</p>
                    <p class="pa-2">Expected completion Date</p>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <!-- Start date -->
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <!-- Expected completion Date -->
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="text-h6 mt-2"><h6>Developer Section 2</h6> </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <p class="pa-2">Status</p>
                    <v-text-field
                      label="Status"
                      placeholder="Status"
                      outlined
                      dense
                      v-model="IssueStatus"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <!-- Completion date-->
                    <p class="pa-2">Completion date</p>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <p class="">Cause / Remedy</p>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Note"
                    v-mode="IssueDesDev"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row class="justify-center mr-16 mt-5">
                <v-btn color="primary" @click="dialogInfo = false"
                  >Update</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider width="50%"></v-divider>
      <v-row class="pa-5">
        <v-col>
          <v-row class="text-h6"> <h6>Implements Section</h6> </v-row>
          <v-row class="mt-5">
            <v-col cols="6">
              <v-row>
                <p class="pa-2">Status</p>
                <v-text-field
                  label="Status"
                  placeholder="Status"
                  outlined
                  dense
                  v-model="IssueStatus"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p class="">Cause / Remedy</p>
              <v-textarea
                solo
                name="input-7-4"
                label="Note"
                v-model="Issue"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="justify-center mr-16">
            <v-btn color="primary" @click="handleClose()">Close</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
  
  <script>
export default {
  props: {
    ProjectName: String,
    SystemName: String,
    id: {
      type: String,
      required: true,
    },
    IssueId: String,
    IssueType: String,
    IssueScreenId: Number,
    IssueStatus: String,
    IssuePriority: String,
    IssueEndDate: String,
    IssueName: String,
    IssueDesSA: String,
    IssueInformer: String,
    IssueAssign: String,
    IssueQC: String,
    IssueFilename: String,
    IssueAccepting: String,
    IssueManday: String,
    IssueStart: String,
    IssueExpected: String,
    IssueComplete: String,
    IssueDesImplementer: String,
    IssueDesDev: String,
    IssueDes: String,
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      test: "active",
    };
  },
  updated() {
    console.log("form", this.form);
  },
  methods: {
    handleClose() {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>
  