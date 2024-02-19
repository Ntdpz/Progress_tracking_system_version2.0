<template>
  <div class="center">
    <h1>Create/Edit Project</h1>
   <v-form @submit.prevent="submitForm">
    
    <!-- Project ID -->
   <v-row>
            <v-col cols="4" sm="6" md="4">
              <h2>Project ID</h2>
            </v-col>
            <v-col cols="8" sm="6" md="4">
                  <v-text-field
                    v-model="projectID"
                    label="Project ID"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
    </v-row> 
    <!-- Project Name -->
    <v-row>
        <v-col cols="4" sm="6" md="4">
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
    <div>
        <!-- Add personnel -->
         <v-row>
            <v-col  cols="4">
               <h2>Personnel</h2>
            </v-col>
            <!-- Add personnel button -->
            <v-col  cols="4">
                   <v-btn>
                        <v-icon left>
                        mdi-plus
                        </v-icon>
                    Add personnel
                </v-btn>
            </v-col>
         </v-row>
         <!-- Personnel table -->
         <v-data-table   
            :headers="headers"
            :items="personnel"
            item-key="name"
            class="elevation-1">
            
          <v-toolbar
            flat
          />
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            />
            
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
           
        </v-data-table>

    </div>
      <!-- confirm and cancel buttons -->
    <v-row>
        <v-col cols="4" sm="6" md="4">
            <v-btn color="primary" @click="submitForm">Confirm</v-btn>
        </v-col>
        <v-col cols="4" sm="6" md="4">
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
</style>
