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
          height: 35px;
          width: 15%;
          margin-left: 1%;
          margin-top: 0.5%;
        "
      >
        <v-text-field
          placeholder="Search some project"
          prepend-icon="mdi-magnify"
          rounded
          dense
          color="primary"
          style="margin-top: 1.5px; margin-left: 3%"
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
            <!-- <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click="infoItem()">
                mdi-information-outline
              </v-icon>
            </template> -->
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
        // { text: "Actions", value: "actions", sortable: false },
      ],
      issue: [],
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
  },
};
</script>

<style scoped>
.new-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px dotted #333;
  padding: 8px 16px;
}
</style>