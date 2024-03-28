<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <!-- Field ID and Name-->
            <v-text-field v-model="taskId" label="Task Id" outlined readonly></v-text-field>
            <v-text-field v-model="taskName" label="Task Name" outlined readonly></v-text-field>
            <!-- Field detail -->
            <v-textarea v-model="taskDetail" label="Task Detail" outlined readonly></v-textarea>
            <!-- Field status-->
            <v-select v-model="taskStatus" :items="['Not Started', 'In Progress', 'Completed']" label="Task Status"
                outlined></v-select>
            <!-- field progress -->
            <v-text-field v-model="taskProgress" label="Task Progress" outlined required></v-text-field>
            <!-- Field actual start choose in calendar-->
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="taskActualStart"
                transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="taskActualStart" label="Actual Start" outlined readonly
                        v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taskActualStart" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskActualStart)">OK</v-btn>
                </v-date-picker>
            </v-menu>

            <!-- Field actual end choose in calendar-->
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="taskActualEnd"
                transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="taskActualEnd" label="Actual End" outlined readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taskActualEnd" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(taskActualEnd)">OK</v-btn>
                </v-date-picker>
            </v-menu>
            <v-btn color="primary" @click="updateTaskProgress">Confirm</v-btn>
            <v-btn color="error" @click="cancel">Cancel</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>



export default {
    props: {
        value: Boolean,
    },
    data() {
        return {
            taskId: "",
            taskName: "",
            taskDetail: "",
            taskStatus: "",
            taskProgress: 0,
            taskActualStart: "",
            taskActualEnd: "",
            menu: false
        };
    },
    methods: {
        // method to update task progress which is update
        updateTaskProgress() {
            this.$emit("updateTaskProgress", {
                taskId: this.taskId,
                taskStatus: this.taskStatus,
                taskProgress: this.taskProgress,
                taskActualStart: this.taskActualStart,
                taskActualEnd: this.taskActualEnd
            });
            this.dialog = false;
        },
        // method to cancel the dialog
        cancel() {
            this.dialog = false;
        },
    }

};


</script>