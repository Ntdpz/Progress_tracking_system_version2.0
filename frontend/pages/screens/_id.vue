<template>
    <div class="screen-details">
        <div class=" screen-top-section">
            <!-- Title -->
            <v-row>
                <v-col>
                    <h1>Screen Details</h1>
                </v-col>
                <!-- seperate line vertically-->
                <v-col>
                    <v-divider vertical></v-divider>
                </v-col>
                <!-- New Task button -->
                <v-col>
                    <v-btn @click="openCreateTaskForm">New Task</v-btn>
                </v-col>
            </v-row>
            <!-- search bar  -->
            <v-row style="margin-top: 20px; margin-left: 20px; width: 480px;">
                <v-text-field 
                v-model="search" 
                prepend-inner-icon="mdi-magnify" 
                label="Search" outlined
                hide-details>
                </v-text-field>
            </v-row>
        </div>
        <!-- Display TaskCard componenet in 4 card per row-->
        <div class="display-card">
            <v-divider></v-divider>
            <v-row>
                <v-col v-for="task in tasks" :key="task.task_id" cols="12" sm="6" md="4" lg="3">
                    <TaskCard 
                        :taskName="task.task_name" 
                        :taskId="task.task_id"         
                        :taskDetail="task.task_detail"
                        :taskPersonInCharge="task.person_in_charge" :taskPlanStart="task.task_plan_start"
                        :taskPlanEnd="task.task_plan_end" :taskStatus="task.task_status"
                        @openEditTaskForm="openEditTaskForm" />
                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
// import axios from 'axios';
// import Swal from 'sweetalert2';
import CreateTaskForm from '../../components/TaskCardandForm/CreateTaskForm.vue'; // 
import TaskCard from '../../components/TaskCardandForm/TaskCard.vue'; //
import EditTaskForm from '../../components/TaskCardandForm/EditTaskForm.vue'; // 

export default{
    layout: 'admin',
    components: {
        CreateTaskForm,
        TaskCard,
        EditTaskForm
    },
    data() {
        return {
            screenId: this.$route.params.id,
            tasks: [],
            search: '',
            createTaskFormVisible: false,
            editTaskFormVisible: false,
            selectedTask: null
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const { data: tasks } = await axios.get(`http://localhost:7777/tasks/getTasksByScreenId/${this.screenId}`);
                this.tasks = tasks;
            } catch (error) {
                console.error('Error fetching tasks:', error);
                alert('Error fetching tasks');
            }
        },
        openCreateTaskForm() {
            this.createTaskFormVisible = true;
        },
        closeCreateTaskForm() {
            this.createTaskFormVisible = false;
        },
        openEditTaskForm(task) {
            this.selectedTask = task;
            this.editTaskFormVisible = true;
        },
        closeEditTaskForm() {
            this.editTaskFormVisible = false;
        }
    },

}
    


</script>


<style scoped>
.display-card {
    margin-top: 20px;
}
</style>
