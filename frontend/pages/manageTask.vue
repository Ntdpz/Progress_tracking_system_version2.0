<template>
    <div class="manage-task">
        <div class="task-header">
            <div class="task-name">
                <span>Screen test name</span>
                <span class="task-id">SC-12341</span>
                <router-link to="./taskCreate">
                    <v-btn class="add-task" icon="mdi-plus" size="small" color="black">
                        <v-icon color="black">mdi-plus</v-icon>
                    </v-btn>
                </router-link>
            </div>
            <div class="task-status">
                <button class="status-button in-progress">In Progress</button>
                <button class="status-button not-started">Yet start</button>
                <button class="status-button finished">Finish</button>
                <button class="status-button cancelled">Cancel</button>
            </div>
        </div>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" max-width="600" outlined>
                        <v-card-text>
                            <div class="task-details">
                                <div class="task-topic primary-color">Task Topic</div>
                                <div class="task-assignee">
                                    Person in charge:
                                    <span class="assignee-name">(Dev) Programmer Coder</span>
                                </div>
                                <div class="task-description">
                                    detaildetaildetaildetalldetaildetaildetalldetaldetailde
                                    talldetaiidetalldetallidetaildetaildetaildetalldetaildetal
                                    Idetaildetaildetalldetaildetaildetaildetalldetaildetail
                                </div>
                                <div class="task-start-date">Start working: 12-01-2023</div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
export default {
    name: 'ManageTask',
};
</script>

<style scoped>
.manage-task {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 16px;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.task-name {
    font-weight: bold;
}

.task-id {
    font-size: 12px;
    color: #aaa;
    margin-left: 8px;
}

.task-status {
    display: flex;
    gap: 8px;
}

.add-task {
    border: 1px solid #000000;
}

.status-button {
    padding: 8px 16px;
    border: 1px solid #000000;
    border-radius: 4px;
    cursor: pointer;
}

.status-button.in-progress {
    background-color: #f0f8ff;
}

.status-button.not-started {
    background-color: #fff;
}

.status-button.finished {
    background-color: #d4f5b4;
}

.status-button.cancelled {
    background-color: #fcf3f3;
}

.task-details {
    margin-top: 16px;
}

.task-topic {
    font-weight: bold;
    margin-bottom: 8px;
    color: var(--primary);
    /* Use a Vuetify theme color */
}

.task-assignee {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.assignee-name {
    font-weight: bold;
    margin-left: 8px;
}

.task-description {
    white-space: pre-wrap;
    margin-bottom: 8px;
}

.task-start-date {
    font-size: 12px;
    color: #aaa;
}
</style>