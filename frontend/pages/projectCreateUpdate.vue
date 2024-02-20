<template>
  <div class="center">
    <h1 class="bold-text">Create/Edit Project</h1>
    <v-form @submit.prevent="submitForm">

      <!-- Project ID -->
      <v-row>
        <v-col cols="4" sm="6" md="4" class="text-right">
          <h2>Project ID</h2>
        </v-col>
        <v-col cols="8" sm="6" md="4">
          <v-text-field v-model="projectID" label="Project ID" required outlined></v-text-field>
        </v-col>
      </v-row>

      <!-- Project Name -->
      <v-row>
        <v-col cols="4" sm="6" md="4" class="text-right">
          <h2>Project Name</h2>
        </v-col>
        <v-col cols="8" sm="6" md="4">
              <v-text-field
                v-model="projectName"
                label="Project Name"
                required
                outlined
              ></v-text-field>
            </v-col>
     </v-row>
<!-- Personnel -->
    <div class="personnel">
        <v-card>
            <v-card-title>
         <v-btn>Add Personnel</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
         <!-- Personnel table -->
         <v-data-table   
            :headers="headers"
            :items="personnel"
            item-key="name"
            class="elevation-1">
              <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
           
        </v-data-table>
    </v-card>
    </div>
      <!-- confirm and cancel buttons -->
    <v-row>
        <v-col cols="6" sm="6" md="4">
          <v-btn color="primary" @click="submitForm">Confirm</v-btn>
        </v-col>
        <v-col cols="6" sm="6" md="4">
          <v-btn color="error" @click="submitForm">Cancel</v-btn>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectID: "",
      projectName: "",
      selected: [],
      singleSelect: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      personnel: [
        { id: 1, name: 'test', role: 'Developer' },
        { id: 2, name: 'Jane', role: 'Tester' },
      ],
      dialog: false,
      newPerson: {
        name: "",
        role: "",
      },
    };
  },
  methods: {
    deleteItem(item) {
      this.personnel = this.personnel.filter(person => person.id !== item.id);
    },
    openAddPersonnelDialog() {
      this.dialog = true;
    },
    cancelAddPersonnel() {
      this.dialog = false;
      this.clearNewPerson();
    },
    saveNewPersonnel() {
      this.personnel.push({
        id: this.personnel.length + 1,
        name: this.newPerson.name,
        role: this.newPerson.role,
      });
      this.dialog = false;
      this.clearNewPerson();
    },
    clearNewPerson() {
      this.newPerson = {
        name: "",
        role: "",
      };
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    save() {
      console.log('Saved:', this.editedItem);
      this.close();
    },
    submitForm() {
      if (!this.projectID || !this.projectName) {
        alert('Please fill in all required fields.');
        return;
      }

      console.log('Form submitted:', {
        id: this.projectID,
        name: this.projectName,
        personnel: this.personnel,
      });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.bold-text {
  font-weight: bold;
}

h1, v-form {
  margin-bottom: 30px; /* ปรับค่าตามที่คุณต้องการ */
}
.center {
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}

.personnel {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>