<template>
  <div class="body">
    <v-row class="mb-3">
      <v-text-title
        class="center ml-4 mr-4 mt-3 mb-1"
        style="font-weight: bold; font-size: 20px"
      >
        Project List
      </v-text-title>
      <v-divider
        class="mt-3 mb-1"
        inset
        vertical
        style="background-color: black"
      ></v-divider>
      <div
        style="
          border-radius: 99px;
          border: 2px solid #333;
          height: 32px;
          width: 15%;
          margin-left: 1%;
          margin-top: 0.8%;"
      >
        <v-text-field
          placeholder="Search some project"
          prepend-icon="mdi-magnify"
          rounded
          dense
          color="primary"
          style="margin-top: 1px; margin-left: 3%"
        ></v-text-field>
      </div>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-4 ml-2 mb-2">
      <h4>Project Name</h4>
      <p style="color: #b6b5b5; font-size: 16px" class="ml-2">2 Projects</p>
      <v-spacer></v-spacer>
      <h4 class="" style="margin-right: 13%">Code</h4>
      <h4 class="" style="margin-right: 13%">Period</h4>
      <h4 class="" style="margin-right: 16.5%">Agency</h4>
    </v-row>

    <v-row justify="center" class="ml-5 mr-5 mt-0">
      <!-- *dialog -->
      <v-dialog
        v-model="dialogNewProject"
        persistent
        max-width="600px"
        class=""
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="new-btn ma-2 text-left"
            outlined
            color="indigo"
            dark
            v-bind="attrs"
            v-on="on"
            block
          >
            <span
              class="mdi mdi-plus-circle-outline"
              style="font-size: 20px; color: black"
            ></span>
            <h4 style="color: black">Add New Project</h4>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <v-col cols="12">
              <v-row>
                <h5>Create Project</h5>
              </v-row>
            </v-col>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Project ID"
                    placeholder="Project ID"
                    outlined
                    dense
                    v-model="formCreateProject.project_id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ตัวย่อ"
                    placeholder="ตัวย่อ"
                    outlined
                    dense
                    v-model="formCreateProject.project_shortname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    label="Project Name"
                    placeholder="Project Name"
                    outlined
                    dense
                    v-model="formCreateProject.project_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    label="Agency"
                    placeholder="Agency"
                    outlined
                    dense
                    v-model="formCreateProject.project_agency"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    ref="menuDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    :return-value.sync="formCreateProject.project_start"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formCreateProject.project_start"
                        label="Date Start"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formCreateProject.project_start"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateStart = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateStart.save(
                            formCreateProject.project_start
                          )
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    ref="menuDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    :return-value.sync="formCreateProject.project_end"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formCreateProject.project_end"
                        label="Date End"
                        prepend-icon="mdi mdi-calendar-clock-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formCreateProject.project_end"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDateEnd = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menuDateEnd.save(formCreateProject.project_end)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogNewProject = false">
              <h5>Close</h5></v-btn
            >
            <v-btn color="primary" dark @click="postProject()">
              <h5>Create</h5>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <br />
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
          <v-row justify="center" class="ml-5 mr-5 mt-0">
            <!-- *dialog -->
            <v-dialog v-model="dialog" persistent max-width="600px" class="">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="new-btn ma-2 text-left"
                  outlined
                  color="indigo"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  block
                >
                  <span
                    class="mdi mdi-plus-circle-outline"
                    style="font-size: 20px; color: black"
                  ></span>
                  <h4 style="color: black">Add New Sub System</h4>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <v-col cols="12">
                    <v-row>
                      <h5>Create System</h5>
                    </v-row>
                  </v-col>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="System Name (TH)"
                          placeholder="System Name (TH)"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="System Name (EN)"
                          placeholder="System Name (EN)"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8" md="8">
                        <v-text-field
                          label="Short system name"
                          placeholder="Short system name"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="member_select"
                          label="Member"
                          dense
                          outlined
                          v-model="member"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="primary" dark @click="dialog = false">
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="issue"
            sort-by="calories"
            class="v-data-table elevation-1 mb-2 mt-5"
            v-remove-row-borders
          >
            <template v-slot:top> </template>
            <template v-slot:[`item.name`]="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.name }}
            </template>
            <template v-slot:[`item.short_name`]="{ item }">
              <v-icon>mdi-format-list-bulleted</v-icon>
              {{ item.short_name }}
            </template>
            <template v-slot:[`item.member`]="{ item }">
              {{ item.member }}
            </template>
            <template v-slot:[`item.actions`]>
              <v-btn color="primary" icon :to="`/systemdetail`">
                <v-icon class="mr-2 ml-2" size="20" color="primary">
                  mdi mdi-chevron-right-circle-outline
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  layout: "admin",
  directives: {
    "remove-row-borders": {
      inserted(el) {
        const trs = el.querySelectorAll("td");
        trs.forEach((tr) => {
          tr.style.borderBottom = "none";
        });
      },
    },
  },
  data() {
    return {
      menuDateStart: false,
      menuDateEnd: false,
      dialog: false,
      dialogNewProject: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Short system name", value: "short_name", sortable: false },
        { text: "Member", value: "member" },
        { text: "Actions", value: "actions", sortable: false },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      issue: [],
      member_select: ["Dev1"],
      formCreateProject: {
        project_shortname: "",
        project_name: "",
        project_id: "",
        project_agency: "",
        project_start: new Date().toISOString().substr(0, 10),
        project_end: new Date().toISOString().substr(0, 10),
      },
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.issue = [
        {
          name: "sub system",
          short_name: "Issue name",
          member: "Dev",
        },
        {
          name: "sub system",
          short_name: "Issue name",
          member: "Dev",
        },
        {
          name: "sub system",
          short_name: "Issue name",
          member: "Dev",
        },
        {
          name: "sub system",
          short_name: "Issue name",
          member: "Dev",
        },
        {
          name: "sub system",
          short_name: "Issue name",
          member: "Dev",
        },
      ];
    },
    async postProject() {
      try {
        await this.$axios.post(
          "/projects/createProject",
          this.formCreateProject
        );
        console.log("post success");
        const promise = new Promise((resolve, reject) => {
          resolve();
          this.dialogNewProject = false;
        });
        promise.then(() => {
          setTimeout(() => {
            alert("success");
          }, 2000);
        });
      } catch (error) {
        console.error(error);
        alert("Error submitting form");
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
.new-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px dotted #333;
  padding: 8px 16px;
}
</style>