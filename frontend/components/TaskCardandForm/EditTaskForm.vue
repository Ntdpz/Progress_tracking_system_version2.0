<template>
    <div>
        <form>
            <!-- Field task Id, un-editable -->
            <v-text-field
                v-model="taskId"
                label="Task Id"
                outlined
                readonly
            ></v-text-field>
            <!-- Field Name-->
            <v-text-field
                v-model="taskName"
                label="Task Name"
                outlined
                required
            ></v-text-field>
            <!-- Field detail -->
            <v-textarea
                v-model="taskDetail"
                label="Task Detail"
                outlined
                required
            ></v-textarea>
            <!-- Field status-->
            <v-select
                v-model="taskStatus"
                :items="['Not Started', 'In Progress', 'Completed']"
                label="Task Status"
                outlined
                required
            ></v-select>
            <!-- Field plan start choose in calendar-->
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="taskPlanStart"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="taskPlanStart"
                        label="Plan Start"
                        outlined
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="taskPlanStart" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskPlanStart)">OK</v-btn>
                </v-date-picker>
            </v-menu>
            <!-- Field plan end choose in calendar-->
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="taskPlanEnd"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="taskPlanEnd"
                        label="Plan End"
                        outlined
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="taskPlanEnd" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskPlanEnd)">OK</v-btn>
                </v-date-picker>
            </v-menu>

            <!-- Confirm and Cancel button -->
            <v-btn color="primary" @click="editTask">Confirm</v-btn>
            <v-btn color="error" @click="cancel">Cancel</v-btn>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditTaskForm',
    props: {
        taskId: {
            type: String,
            required: true
        },
        taskName: {
            type: String,
            required: true
        },
        taskDetail: {
            type: String,
            required: true
        },
        taskPlanStart: {
            type: String,
            required: true
        },
        taskPlanEnd: {
            type: String,
            required: true
        },
        taskStatus: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            menu: false
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
            axios.put(`http://localhost:7777/updateTasks/${this.taskId}`, task)
                .then(() => {
                    this.$emit('editTask');
                });
        },
        cancel() {
            this.$emit('cancel');
        }
    }
};

        
</script>