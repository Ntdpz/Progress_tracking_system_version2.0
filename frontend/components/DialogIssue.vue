<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <v-col cols="12">
          <v-row>
            <h5>Create Issue |</h5>
            <p style="font-size: 16px; margin-left: 2%">
              Project Name / Sub system name
            </p>
          </v-row>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Issue No."
                placeholder="Issue No."
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                label="Issue Name"
                placeholder="Issue Name"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="type_select"
                label="PNI/PNC/New Req"
                dense
                outlined
                v-model="type"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="screen_select"
                label="Screen No."
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Informer"
                placeholder="Implementer"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="priotity_select"
                label="Priotity"
                dense
                outlined
                prepend-icon="mdi-flag-outline"
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
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" md="2">
              <v-select :items="qc_select" label="QC" dense outlined></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-show="PNC">
              <v-text-field
                label="Document No."
                placeholder="Document No."
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="8" v-show="PNC">
              <v-text-field
                label="Customer Name"
                placeholder="Customer Name"
                outlined
                dense
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
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="mt-0">
              <v-textarea
                solo
                name="input-7-4"
                label="Description"
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
        <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        <v-btn color="primary" dark @click="dialog = false"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
    
    <script>
import axios from "axios";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      postData: {
        name: "",
        email: "",
      },
      priotity_select: ["Critical", "Hight", "Low"],
      type_select: ["PNI", "PNC", "New Req"],
      screen_select: ["Screen 1", "Screen 2"],
      qc_select: ["QC1"],
      dev_select: ["Dev1"],
      selected: ["UI"],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
    async submitForm() {
      try {
        const response = await axios.post("/api/posts", this.postData);
        console.log(response.data);
        this.$emit("update:dialog", false);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>

    