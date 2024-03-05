<!-- A Form use for Edit Task -->
<template>
    <div>
        <h1>Edit Task</h1>
        <v-form @submit.prevent="editTask">
            <!-- Name -->
            <v-text-field v-model="taskName" label="Task Name" required></v-text-field>
            <!-- ID is not editable -->
            <v-text-field v-model="taskId" label="Task ID" required disabled></v-text-field>
            <!-- Diffficulty in an option drop down 1-5-->
            <v-text-field v-model="difficultyLevel" label="Difficulty Level" required></v-text-field>
            <v-text-field v-model="personInCharge" label="Person in Charge" required></v-text-field>
            <v-text-field v-model="detail" label="Detail" required></v-text-field>
            <v-btn type="submit">Update</v-btn>
        </v-form>
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
        taskPersonInCharge: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            difficultyLevel: '',
            personInCharge: '',
            detail: ''
        };
    },
    methods: {
        // Handle task creation logic
        async editTask() {
            try {
                // Send a POST request
                await axios.post('http://localhost:3000/editTasks', { 
                    task_name: this.taskName,
                    task_id: this.taskId,
                    tasks_detail: this.taskDetail,
                    task_status: this.taskStatus,
                    screen_id: this.screenId,
                    project_id: this.projectId,
                    system_id: this.systemId,
                    task_plan_start: this.taskPlanStart,
                    task_plan_end: this.taskPlanEnd,
                });
                // Display a success message
                alert('Task updated successfully');
                // Clear the form
            } catch (error) {
                console.error('Error updating task:', error);
                alert('Error updating task');
            }
        },
    }
};
</script>


<style scoped>
</style>