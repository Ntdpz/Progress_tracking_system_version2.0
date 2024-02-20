<template>
  <div class="center">
    <h1 style="margin-bottom: 30px;">Create/Edit Project</h1>
   <v-form @submit.prevent="submitForm">
    
    <!-- Project ID -->
   <v-row >
            <v-col cols="6" sm="6" md="6">
              <h2>Project ID</h2>
            </v-col>
            <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    style="max-width: 350px;"
                    v-model="projectID"
                    label="Project ID"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
    </v-row> 
    <!-- Project Name -->
    <v-row>
        <v-col cols="6" sm="6" md="6">
          <h2>Project Name</h2>
        </v-col>
        <v-col cols="6" sm="6" md="6">
              <v-text-field
               style="max-width: 350px;"
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
              <v-row style="padding-top: 20px;">
              <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              rounded
              outlined
      
              style="padding-left: 20px;"
            ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn style="margin-right: 20px;">Add Personnel</v-btn>
          </v-row>
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
    <v-col class="text-center">
      <v-btn color="primary" @click="submitForm" style="margin-right:30px ;">Confirm</v-btn>
      <v-btn color="error" @click="submitForm" style="margin-left: 30px;">Cancel</v-btn>
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
        }
    },
    methods: {
        deleteItem(item) {
            this.personnel = this.personnel.filter(person => person.id !== item.id);
        },
        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
            }, 300);
        },
        save() {
            // Save your data here
            console.log('Saved:', this.editedItem);
            this.close();
        },
        submitForm() {
            if (!this.projectID || !this.projectName) {
                alert('Please fill in all required fields.');
                return;
            }

            // Here you can call your API to create or update the project
            // For example:
            // this.$http.post('/api/projects', {
            //   id: this.projectID,
            //   name: this.projectName,
            //   personnel: this.personnel,
            // });

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
.center {
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
}
.personnel {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
}
</style>
