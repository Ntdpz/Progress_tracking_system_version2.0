<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="v-data-table elevation-1"
    v-remove-row-borders
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <h5 class="pa-1" style="background-color: #1cff17; text-align: left">
            Own issue
          </h5>
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.issue_name="{ item }">
      <v-icon>mdi-format-list-bulleted</v-icon>
      {{ item.issue_name }}
    </template>
    <template v-slot:item.issue_status="{ item }">
      <v-icon style="color: #1cff17">mdi-circle</v-icon>
      {{ item.issue_status }}
    </template>
    <template v-slot:item.issue_Priotity="{ item }">
      <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
      {{ item.issue_Priotity }}
    </template>
    <template v-slot:item.issue_assignees="{ item }">
      <v-icon style="color: black">mdi-account-circle</v-icon>
      <!-- {{ item.issue_assignees }} -->
    </template>
  </v-data-table>
</template>

<script>
export default {
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
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Issues No.",
        align: "start",
        sortable: false,
        value: "issue_no",
      },
      { text: "Issues Name", value: "issue_name", sortable: false },
      { text: "End Date", value: "issue_end_date" },
      { text: "Status", value: "issue_status" },
      { text: "Priotity", value: "issue_Priotity" },
      { text: "Assignees", value: "issue_assignees" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          issue_no: "SP-123xx-PNI-21/10/22-0001",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0002",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0003",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0004",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
        {
          issue_no: "SP-123xx-PNI-21/10/22-0005",
          issue_name: "Issue name",
          issue_end_date: "Nov 31, 2023",
          issue_status: "Finished",
          issue_Priotity: "Critical",
          issue_assignees: "Dev",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
v-data-table td {
  border-bottom: none !important;
}
</style>