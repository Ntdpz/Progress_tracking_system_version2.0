<!-- A Form use for Edit Task -->
<template>
    <div>
        <h1>Edit Task</h1>
        <v-form @submit.prevent="editTask">
            <v-text-field v-model="taskName" label="Task Name" required></v-text-field>
            <v-text-field v-model="taskId" label="Task ID" required></v-text-field>
            <v-text-field v-model="difficultyLevel" label="Difficulty Level" required></v-text-field>
            <v-text-field v-model="personInCharge" label="Person in Charge" required></v-text-field>
            <v-text-field v-model="detail" label="Detail" required></v-text-field>
            <v-btn type="submit">Update</v-btn>
        </v-form>
    </div>
</template>

<script>
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
        difficultyLevel: {
            type: String,
            required: true
        },
        personInCharge: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        }
    },
    methods: {
        editTask() {
            // Handle task update logic 

            // You can access the form data using this.taskName, this.taskId, etc.
            
        }
    }
};
</script>

<style scoped>
</style>