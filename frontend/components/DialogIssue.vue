<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-card-title>
          <v-col cols="12">
            <v-row>
              <h5>Create Issue |</h5>
              <p style="font-size: 16px; margin-left: 2%">
                {{ projectName }} > {{ systemName }}
              </p>
            </v-row>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Issue ID"
                  placeholder="Issue ID"
                  outlined
                  dense
                  v-model="form.issue_id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  label="Issue Name"
                  placeholder="Issue Name"
                  outlined
                  dense
                  v-model="form.issue_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="type_select"
                  label="PNI/PNC/New Req"
                  dense
                  outlined
                  v-model="form.issue_type"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="screen_select"
                  label="Screen No."
                  dense
                  outlined
                  v-model="form.screen_id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Informer"
                  placeholder="Informer"
                  outlined
                  dense
                  v-model="form.issue_informer"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="priotity_select"
                  label="Priotity"
                  dense
                  outlined
                  prepend-icon="mdi-flag-outline"
                  v-model="form.issue_priority"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
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
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4" md="2">
                <v-select
                  :items="dev_select"
                  label="Dev"
                  dense
                  outlined
                  v-mode="form.issue_assign"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="2">
                <v-select
                  :items="qc_select"
                  label="QC"
                  dense
                  outlined
                  v-model="form.issue_qc"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-show="PNC">
                <v-text-field
                  label="Document No."
                  placeholder="Document No."
                  outlined
                  dense
                  v-model="form.issue_doc_id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8" v-show="PNC">
                <v-text-field
                  label="Customer Name"
                  placeholder="Customer Name"
                  outlined
                  dense
                  v-model="form.issue_customer"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="Newreq">
                <v-container fluid class="ma-0 pa-0">
                  <p>Type Issue {{ selected }}</p>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="UI"
                          value="UI"
                        ></v-checkbox>
                      </v-row>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="Business"
                          value="Business"
                        ></v-checkbox>
                      </v-row>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="Data"
                          value="Data"
                        ></v-checkbox
                      ></v-row>
                    </v-col>
                    <v-col>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="Servies"
                          value="Servies"
                        ></v-checkbox>
                      </v-row>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="Report"
                          value="Report"
                        ></v-checkbox>
                      </v-row>
                      <v-row>
                        <v-checkbox
                          v-model="selected"
                          label="Training"
                          value="Training"
                        ></v-checkbox>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-show="Newreq">
                <p>Note for SA</p>
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Note for SA"
                  v-model="form.issue_des_sa"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="mt-0">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Description"
                  v-model="form.issue_des"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input label="File input" outlined dense></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="close"> Close </v-btn>
          <v-btn color="primary" dark @click.native="close"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    projectName: String,
    systemName: String,
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      form: {
        issue_id: "",
        issue_name: "",
        issue_type: "",
        screen_id: "",
        issue_qc: "",
        issue_priority: "",
        issue_informer: "",
        issue_assign: "",
        issue_doc_id: "",
        issue_customer: "",
        issue_des_sa: "",
        issue_des: "",
      },
    };
  },
  methods: {
    close() {
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