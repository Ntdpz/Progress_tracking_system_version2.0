CreateTask

<template>
    <div>
        <h1>Create Task</h1>
        <v-form @submit.prevent="createTask">
            <v-text-field v-model="taskName" label="Task Name" required></v-text-field>
            <v-text-field v-model="taskId" label="Task ID" required></v-text-field>
            <v-text-field v-model="difficultyLevel" label="Difficulty Level" required></v-text-field>
            <v-text-field v-model="personInCharge" label="Person in Charge" required></v-text-field>
            <v-text-field v-model="detail" label="Detail" required></v-text-field>
            <v-btn type="submit">Create</v-btn>

            <button type="submit">Create</button>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateTaskForm',
    data() {
        return {
            taskName: '',
            taskId: '',
            difficultyLevel: '',
            personInCharge: '',
            detail: ''
        };
    },
    methods: {
        // Handle task creation logic
         async createTask() {
            try {
                // Send a POST request
                await axios.post('http://localhost:3000/createTasks', { 
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
                alert('Task created successfully');
                // Clear the form
            } catch (error) {
                console.error('Error creating task:', error);
                alert('Error creating task');
            }
        },
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
