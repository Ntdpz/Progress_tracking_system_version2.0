Task Card

<template>
    <v-card class="mx-auto" max-width="344">
        <!-- Replace -->
        <div>
            <!-- Progress bar which show % of task -->
            <v-progress-linear v-if="true" :value="100" color="orange" height="16">
                <!-- Display % according to the v-progress value-->
                <template v-slot:default="{ value }">
                    {{ value }}%
                </template>
            </v-progress-linear>

        </div>
        <v-card-title>
            <v-row justify="space-between">
                <h4> Name: {{ taskName }}</h4>
                <h5>ID: {{ taskId }}</h5>
            </v-row>
        </v-card-title>
        <!-- Person in charge -->
        <div style="margin-left: 25px; margin-right: 25px; margin-top: 10px; margin-bottom: 10px;">
            <v-row>
                <!-- account icon -->
                <v-avatar color="grey" size="36">
                    <v-icon dark>mdi-account</v-icon>
                </v-avatar>
                <!-- person in charge -->
                <h5> {{ taskPersonInCharge }} </h5>
            </v-row>
        </div>
        <v-card-actions>
            <v-btn color="orange lighten-2" @click="editTask">Update</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>Task Detail: {{ taskDetail }}</v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
// Path: frontend/components/TaskCardandForm.vue/TaskCard.vue


export default {
    name: 'TaskCard',
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
            show: false
        };
    },
    methods: {
        editTask() {
            this.$emit('edit-task');
        }
    }
};
</script>

<style scoped>
.task-id {
    font-weight: bold;
}
</style>
