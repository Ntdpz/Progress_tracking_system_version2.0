<template>
    <div class="body">
        <!-- title -->
        <v-row class="mb-3 ">
            <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
                Project List
            </v-text-title>
            <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
            <template>
                <v-banner class="mt-0 ml-4" style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              height: 30px;
                              border-radius: 30px;
                              padding: 0 0px;
                            " outlined elevation="2">
                    <form class="center" @submit.prevent="search">
                        <v-icon color="purple">mdi-magnify</v-icon>
                        <input class="mr-3" type="text" v-model="query" placeholder="Search some project" />
                    </form>
                </v-banner>
            </template>
        </v-row>
        <v-divider></v-divider>
        <!-- หัวข้อ Project Name -->
        <v-row no-gutters>
            <v-col col="5" sm="5" md="5">
                <v-card tile outlined height="50px">
                    <!-- *Header* -->
                    <v-row class="mt-4 ml-1 mb-1">
                        <h4>Project Name</h4>
                        <p style="color: #b6b5b5; font-size: 16px" class="ml-2">
                            {{ project_count }} Projects
                        </p>
                    </v-row>
                </v-card>
            </v-col>
            <v-col col="2" sm="2" md="2">
                <v-card tile outlined>
                    <v-row class="mt-4 ml-1 mb-2">
                        <h4>Code</h4>
                    </v-row>
                </v-card>
            </v-col>
            <v-col col="2" sm="2" md="2">
                <v-card tile outlined>
                    <v-row class="mt-4 ml-1 mb-2">
                        <h4>Period</h4>
                    </v-row>
                </v-card>
            </v-col>
            <v-col col="2" sm="2" md="2">
                <v-card tile outlined>
                    <v-row class="mt-4 ml-1 mb-2">
                        <h4>Agency</h4>
                    </v-row>
                </v-card>
            </v-col>
            <v-col col="1" sm="1" md="1">
                <v-card tile outlined height="50px">
                </v-card>
            </v-col>
        </v-row>
        <!-- Add new project + Dialog -->
        <template>
            <v-btn class="new-btn mt-2 text-left" outlined color="indigo" dark v-bind="attrs" v-on="on" block>
                <span class="mdi mdi-plus-circle-outline" style="font-size: 20px; color: black"></span>
                <h4 style="color: black">Add New Project</h4>
            </v-btn>
        </template>
        <!-- ALL Project -->
        <v-expansion-panels class="mt-4 mb-6 ">
            <v-expansion-panel v-for="(item, i) in project_name" :key="i">
                <!-- header box -->
                <v-expansion-panel-header>
                    <v-row no-gutters>
                        <v-col col="5" sm="5" md="5">
                            <v-card tile outlined height="29px">
                                <!-- *Header* -->
                                <v-row class="mt-1 ml-1 mb-1">
                                    <h4>{{ item }}</h4>
                                    <p style="color: #b6b5b5; font-size: 16px" class="ml-2">
                                        {{ project_count }} Projects
                                    </p>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col col="2" sm="2" md="2">
                            <v-card tile outlined>
                                <v-row class="mt-1 ml-2 mb-2">
                                    <h4>{{ code }}</h4>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col col="2" sm="2" md="2">
                            <v-card tile outlined>
                                <v-row class="mt-1 ml-6 mb-2">
                                    <h4>{{ period }}</h4>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col col="2" sm="2" md="2">
                            <v-card tile outlined>
                                <v-row class="mt-1 ml-8 mb-2">
                                    <h4>{{ agency }}</h4>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col col="0" sm="0" md="0">
                            <v-card tile outlined height="29px">
                            </v-card>
                        </v-col>

                    </v-row>
                </v-expansion-panel-header>
                <!-- Sub Systems -->
                <v-expansion-panel-content>
                    <template>
                        <v-btn class="new-btn mt-2 text-left" outlined color="indigo" dark v-bind="attrs" v-on="on" block>
                            <span class="mdi mdi-plus-circle-outline" style="font-size: 20px; color: black"></span>
                            <h4 style="color: black">Add New Sub System</h4>
                        </v-btn>
                    </template>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>





    </div>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {
            code: "AD005",
            period: "1 Year",
            agency: "Test Agency",
            project_count: "2",
            project_name:['Stock Produce','Market System']
        };
    }
}
</script>

<style scoped>
input[type="text"] {
    border: black;
    font-size: 16px;
    padding-left: 10px;
    outline: black;
}

.new-btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px dotted #333;
    padding: 8px 16px;
}
</style>