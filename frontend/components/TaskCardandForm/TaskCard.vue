<template>
    <div>
        <template>
            <v-card class="mx-auto" max-width="344">
                <!-- omitted for brevity -->
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
                        <h5> person_in_charge </h5>
                    </v-row>
                </div>
                <v-card-actions>
                    <v-btn color="orange lighten-2" @click="openEditTaskForm">Update</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <!-- Plan start and Plan end in the same row -->
                        <v-row>
                            <v-col cols="6">
                                <!-- text request plan start from data base -->
                                <v-card-text>Plan Start: {{ taskPlanStart }}</v-card-text>
                            </v-col>
                            <v-col cols="6">
                                <!-- text request plan end from data base -->
                                <v-card-text>Plan End: {{ taskPlanEnd }}</v-card-text>
                            </v-col>
                        </v-row>
                        <v-chip color="primary" outlined>{{ task_status }}</v-chip>
                        <v-card-text>Task Detail: {{ taskDetail }}</v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </template>
    </div>
</template>

<script>
import axios from 'axios';

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
        openEditTaskForm() {
            this.$emit('openEditTaskForm');
        }
    }
};


</script>