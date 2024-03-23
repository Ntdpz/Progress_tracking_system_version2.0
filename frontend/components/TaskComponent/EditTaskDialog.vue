<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <!-- Field task Id, un-editable -->
            <v-text-field v-model="taskId" label="Task Id" outlined readonly></v-text-field>
            <!-- Field Name-->
            <v-text-field v-model="taskName" label="Task Name" outlined required></v-text-field>
            <!-- Field detail -->
            <v-textarea v-model="taskDetail" label="Task Detail" outlined required></v-textarea>
            <!-- Field status-->
            <v-select v-model="taskStatus" :items="['Not Started', 'In Progress', 'Completed']" label="Task Status"
                outlined required></v-select>
            <!-- Field plan start choose in calendar-->
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="taskPlanStart"
                transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="taskPlanStart" label="Plan Start" outlined readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taskPlanStart" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskPlanStart)">OK</v-btn>
                </v-date-picker>
            </v-menu>
            <!-- Field plan end choose in calendar-->
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="taskPlanEnd"
                transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="taskPlanEnd" label="Plan End" outlined readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taskPlanEnd" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskPlanEnd)">OK</v-btn>
                </v-date-picker>
            </v-menu>

            <!-- Confirm and Cancel button -->
            <v-row>
                <v-col cols="4">
                    <v-btn color="primary" @click="editTask">Confirm</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-btn color="error" @click="cancel">Cancel</v-btn>
                </v-col>
            </v-row>
            <!-- Delete button -->
            <v-row>
                <v-btn color="orange" @click="deleteTask">
                    <v-icon>mdi-delete</v-icon>
                    Delete
                </v-btn>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: {
        value: Boolean, // Define a prop for v-model binding
    },
    
    data() {
        return {
           dialog: false,

        };
    },
    methods: {
        editTask() {
            const task = {
                taskName: this.taskName,
                taskDetail: this.taskDetail,
                taskPlanStart: this.taskPlanStart,
                taskPlanEnd: this.taskPlanEnd,
                taskStatus: this.taskStatus
            };
            this.$emit('edit', task);

        },
        cancel() {
            this.$emit('cancel');
        },

        deleteTask() {
            this.$emit('delete');
        }
    }
};

        
</script>