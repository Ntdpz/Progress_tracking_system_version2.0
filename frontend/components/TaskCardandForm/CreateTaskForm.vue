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

            <v-btn color="error" @click="cancel">Cancel</v-btn>
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
        async createTask() {
            // Pass Screen ID as a Prop
            const screenId = this.$route.params.id;

            try {
                // Fetch screen data to get project_id and system_id
                const { data: screen } = await axios.get(`http://localhost:7777/screens/${screenId}`);
                const projectId = screen.project_id;
                const systemId = screen.system_id;

                // Prepare data to send
                const requestData = {
                    task_name: this.taskName,
                    task_id: this.taskId,
                    difficulty_level: this.difficultyLevel,
                    person_in_charge: this.personInCharge,
                    detail: this.detail,
                    screen_id: screenId,
                    project_id: projectId,
                    system_id: systemId,
                };

                // Make the request to create a new task
                await axios.post('http://localhost:7777/tasks/createTask', requestData);

                // Display a success message
                alert('Task created successfully');

                // Clear the form
                this.clearForm();
            } catch (error) {
                console.error('Error creating task:', error);
                alert('Error creating task');
            }
        },
        cancel() {
            this.$emit('cancel');
        },
        clearForm() {
            // Clear form fields
            this.taskName = '';
            this.taskId = '';
            this.difficultyLevel = '';
            this.personInCharge = '';
            this.detail = '';
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
