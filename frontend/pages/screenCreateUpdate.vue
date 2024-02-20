<template>
    <div class="center">
        <h1 class="bold-text">Create/Edit Screen</h1>
        <v-form @submit.prevent="submitForm">

            <!-- Screen Code -->
            <v-row class="center">
                <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Screen Code</h2>
                </v-col>
                <v-col cols="8" sm="6" md="4">
                    <v-text-field v-model="projectID" label="Screen Code" required outlined></v-text-field>
                </v-col>
            </v-row>

            <!-- Screen Name -->
            <v-row class="center">
                <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Screen Name</h2>
                </v-col>
                <v-col cols="8" sm="6" md="4">
                    <v-text-field v-model="projectName" label="Screen Name" required outlined></v-text-field>
                </v-col>
            </v-row>

            <!-- Screen Manday -->
            <v-row class="center">
                <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Screen Manday</h2>
                </v-col>
                <v-col cols="8" sm="6" md="4">
                    <v-text-field v-model="projectName" label="Manday" required outlined></v-text-field>
                </v-col>
            </v-row>

            <!-- Screen Level -->
            <v-row class="center">
                <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Screen Level</h2>
                </v-col>
                <v-col cols="8" sm="6" md="4">
                    <v-select v-model="screenLevel" :items="['Very Difficult', 'Hard', 'Moderate', 'Easy', 'Simple']"
                        label="Screen Level" required outlined></v-select>
                </v-col>
            </v-row>


            <!-- Date Start - Date End -->
            <v-row class="center">
                <v-col cols="4" sm="6" md="4" class="text-right">
                    <h2>Date Start - Date End</h2>
                </v-col>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Start Date" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
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
                    <v-col cols="12" sm="6" md="4">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="End Date" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
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
                </v-row>
            </v-row>

            <!-- Personnel -->
            <div class="personnel">
                <v-card>
                    <v-card-title>
                        <v-text-field v-model="search" label="Search" single-line hide-details outlined
                            prepend-inner-icon="mdi-magnify" rounded></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn>Add Personnel</v-btn>
                    </v-card-title>
                    <!-- Personnel table -->
                    <v-data-table :headers="headers" :items="personnel" item-key="name" class="elevation-1">
                        <template v-slot:item.actions="{ item }">
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <!-- confirm and cancel buttons -->
            <v-row class="d-flex justify-center mt-6">
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

h1,
v-form {
    margin-bottom: 30px;
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