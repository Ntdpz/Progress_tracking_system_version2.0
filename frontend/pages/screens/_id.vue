<template>
    <div class="screen-details">
        <!-- Search bar -->
        <v-row no-gutters>
            <v-col cols="12">
                <input type="text" v-model="searchQuery" placeholder="Search..." style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          " />
            </v-col>
        </v-row>
        <!-- Task list -->
        <div class="task-list">
            <!-- ScreenName and Progress -->
            <div class="topper">
                <h2>Task Management: {{ ScreenName }}</h2>
                <v-divider vertical></v-divider>
                <!-- open add task form -->
                <v-btn color="primary" @click="dialogAddTaskForm = true">Add Task</v-btn>
                <!-- <h3>Progress: {{ ScreenProgress }}</h3> -->
            </div>
            <v-divider></v-divider>
            <!-- Display Task in Card -->
            <v-row>
                <v-col v-for="task in filteredTasks" :key="task.task_id" cols="12" md="6" lg="4">
                    <v-card class="task-card">
                        <v-card-title>
                            <h3>{{ task.task_name }}</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-avatar color="grey" size="36">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                                <h4 style="margin-left: 20px; margin-top: 5px;">
                                    {{ task.person_in_charge }} </h4>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="orange lighten-2" @click="openEditTaskForm(task)">Update</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="show = !show">
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-expand-transition>
                            <div v-show="show" style="margin-left: 10px; margin-right: 10px;">
                                <v-divider></v-divider>
                                <v-row>

                                    <v-col cols="6">
                                        <v-card-text>Plan Start: {{ task.task_plan_start }}</v-card-text>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-card-text>End: {{ task.task_plan_end }}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-chip color="primary" outlined>{{ task.task_status }}</v-chip>
                                <v-card-text>Task Detail: {{ task.task_detail }}</v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
            <!-- Create task dialog -->
            <v-dialog v-model="dialogAddTaskForm" max-width="600px">
                <v-card>
                    <v-card-title>
                        <h2>Create New Task</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="createTask">
                            <v-text-field v-model="newTask.task_name" label="Task Name" required></v-text-field>
                            <v-text-field v-model="newTask.person_in_charge" label="Person in Charge" required></v-text-field>
                            <v-text-field v-model="newTask.task_plan_start" label="Plan Start" required></v-text-field>
                            <v-text-field v-model="newTask.task_plan_end" label="Plan End" required></v-text-field>
                            <v-text-field v-model="newTask.task_detail" label="Detail" required></v-text-field>
                            <v-btn type="submit">Create</v-btn>
                            <v-btn color="error" @click="cancel">Cancel</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";


export default {
    layout: "admin",
    data() {
        return {
            dialogAddTaskForm: false,
            show: false,
            // Screen data
            ScreenName: "",
            ScreenProgress: "",
            //Search bar
            searchQuery: "",
            // Task data
            //New Task data
            newTask: [
                {
                    task_id: "",
                    task_name: "",
                    person_in_charge: "",
                    task_status: "",
                    task_plan_start: "",
                    task_plan_end: "",
                    task_detail: "",
                },
            ],
            //Task
            tasks: [
                {
                    task_id: "1",
                    task_name: "Task 1",
                    person_in_charge: "Person 1",
                    task_status: "In Progress",
                    task_plan_start: "2021-08-01",
                    task_plan_end: "2021-08-31",
                    task_detail: "This is a task detail with out any description.",
                },
                {
                    task_id: "2",
                    task_name: "Task 2",
                    person_in_charge: "Person 2",
                    task_status: "In Progress",
                    task_plan_start: "2021-08-01",
                    task_plan_end: "2021-08-31",
                    task_detail: "This is a task",
                },
                {
                    task_id: "3",
                    task_name: "Task 3",
                    person_in_charge: "Person 3",
                    task_status: "In Progress",
                    task_plan_start: "2021-08-01",
                    task_plan_end: "2021-08-31",
                    task_detail: "This is a task",
                },
            ],

        };
    },
    computed: {
        filteredTasks() {
            return this.tasks.filter((task) => {
                return (
                    task.task_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    task.task_id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    task.person_in_charge.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            });
        },
    },
    async mounted() {
        // Fetch screen data
        try {
            // Fetch Screen Name and Progress
            const screenId = this.$route.params.id;
            const response = await fetch(`http://localhost:7777/screens/${screenId}`);
            const data = await response.json();
            this.ScreenName = data.screen_name;
            // this.ScreenProgress = data.screen_progress;
            
        } catch (error) {
            console.error("Error fetching screen data:", error);
            Swal.fire({
                icon: "error",
                title: "Error fetching screen data",
                text: error.message,
            });            
        }

        // Fetch tasks
        try {
            const screenId = this.$route.params.id;
            const response = await fetch(`http://localhost:7777/tasks/${screenId}`);
            const data = await response.json();
            this.tasks = data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            Swal.fire({
                icon: "error",
                title: "Error fetching tasks",
                text: error.message,
            });
        }
    },
    methods: {
        // Open add task form
        openAddTaskForm() {
            this.$router.push({
                name: "task-add",
                params: { id: this.$route.params.id },
            });
        },
        //Create new task
        async createTask(){
            //Fetch screen detail for screen_id sytem_id and project_id
            const screenId = this.$route.params.id;
            const response = await fetch(`http://localhost:7777/screens/${screenId}`);
            const data = await response.json();
            this.newTask.screen_id = data.screen_id;
            this.newTask.system_id = data.system_id;
            this.newTask.project_id = data.project_id;
            //Create new task
            try {
                const response = await fetch("http://localhost:7777/tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.newTask),
                });
                const data = await response.json();
                console.log("New task created:", data);
                Swal.fire({
                    icon: "success",
                    title: "New task created",
                    text: "Task has been created successfully",
                });
                this.$router.go();
            } catch (error) {
                console.error("Error creating new task:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error creating new task",
                    text: error.message,
                });
            }
        },
        // Open update task form
        openEditTaskForm(task) {
            this.$router.push({
                name: "task-edit",
                params: { id: task.task_id },
            });
       
        },
    },
};

</script>

<style scoped>
.task-card {
    margin-bottom: 10px;
}
.topper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
</style>