<template>
    <div>
        <!-- title -->
        <v-row class="mb-3 ">
            <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
                System Detail
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
                        <input class="mr-3" type="text" v-model="query" placeholder="Search some system" />
                    </form>
                </v-banner>
            </template>
        </v-row>
        <v-divider></v-divider>
        <!-- Sub System -->
        <v-container class="" style="margin-top: 0%;">
            <v-row class="mt-0" no-gutters>
                <v-col col="12" sm="12" md="12">
                    <!-- box-shadow: none; -->
                    <v-card class="mt-0" tile outlined style="box-shadow: none; border: none;">
                        <v-card-title>
                            <v-btn icon to="/Home" color="primary" size="35px" left>
                                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
                            </v-btn>
                            Sub System ระบบรอง SS For
                            <v-avatar class="ml-4" color="primary" size="20">
                            </v-avatar>
                            <v-avatar class="ml-4" color="error" size="20">
                            </v-avatar>
                            <v-avatar class="ml-4" color="orange" size="20">
                            </v-avatar>

                        </v-card-title>
                        <!-- button + dialog new sub system -->


                        <v-btn @click="(dialog_newscreen = true)" class="mr-2" elevation="2" color="primary" top right
                            absolute v-bind="attrs" v-on="on" style="color: white; border-radius: 10px; font-weight: bold;">
                            <v-icon left> mdi-plus-circle-outline </v-icon>New Screen
                        </v-btn>

                        <!--  -->
                        <v-dialog v-model="dialog_newscreen" max-width="600px">
                            <v-card>
                                <v-col>
                                    <v-card outlined tile height="100%" style="border:none;">
                                        <v-container fluid>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Screen Code</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" sm="4" md="4" style="place-self: center;">
                                                    <h4 class="">Screen Code</h4>
                                                </v-col>

                                                <v-col class="col-12" sm="8" md="8">
                                                    <v-text-field style="text-align-last: center;" v-model="screencode"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Screen Name</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" sm="4" md="4" style="place-self: center;">
                                                    <h4 class="">Screen Name</h4>
                                                </v-col>
                                                <v-col class="col-12" sm="8" md="8">
                                                    <v-text-field style="text-align-last: center;" v-model="screenname"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Developer</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" sm="4" md="4" style="place-self: center;">
                                                    <h4 class="">Developer</h4>
                                                </v-col>
                                                <v-col class="col-12" sm="8" md="8">
                                                    <v-text-field style="text-align-last: center;" v-model="developer"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Implementer</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" sm="4" md="4" style="place-self: center;">
                                                    <h4 class="">Implementer</h4>
                                                </v-col>
                                                <v-col class="col-12" sm="8" md="8">
                                                    <v-text-field style="text-align-last: center;" v-model="implementer"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Status</h4>
                                                </v-col>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Level</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" sm="2" md="2" style="place-self: center;">
                                                    <h4 class="">Status</h4>
                                                </v-col>
                                                <v-col sm="4" md="4">
                                                    <template>
                                                        <v-text-field style="text-align-last: center;" v-model="status"
                                                            hide-details="auto" readonly dense outlined>
                                                            <template v-slot:prepend-inner>
                                                                <v-icon
                                                                    :color="status === 'Complete' ? 'green' : 'red'">mdi-circle</v-icon>
                                                            </template>
                                                        </v-text-field>
                                                    </template>
                                                </v-col>
                                                <v-col class="hidden-xs-only" sm="2" md="2" style="place-self: center;">
                                                    <h4 class="">Level</h4>
                                                </v-col>
                                                <v-col sm="4" md="4">
                                                    <v-text-field style="text-align-last: center;" v-model="level"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>

                                            </v-row>
                                            <v-row>
                                                <v-col class="mb-0 pb-0 hidden-sm-and-up" style="place-self: center;">
                                                    <h4 class="">Manday</h4>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="hidden-xs-only" cols="3" style="place-self: center;">
                                                    <h4 class="">Manday</h4>
                                                </v-col>
                                                <v-col class="col-10" sm="4" md="4">
                                                    <v-text-field style="text-align-last: center;" v-model="manday"
                                                        hide-details="auto" dense outlined></v-text-field>
                                                </v-col>
                                                <v-col style="place-self: center;">
                                                    <h4 class="">Days</h4>
                                                </v-col>
                                            </v-row>
                                            <!--  -->
                                            <v-row class="" style="justify-content: right;">

                                                <v-btn @click="(dialog_newscreen = false)" to="#" class="mr-2" elevation="2"
                                                    color="error" style="color: white; border-radius: 10px;">Cancel
                                                </v-btn>

                                                <v-btn @click="(dialog_newscreen = false)" to="#" class="mr-2" elevation="2"
                                                    color="primary" style="color: white; border-radius: 10px;">Create
                                                </v-btn>

                                            </v-row>
                                            <!--  -->
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-card>
                            <!--  -->
                        </v-dialog>
                        <!--    -->
                    </v-card>
                </v-col>
            </v-row>
            <!-- card screen -->
            <v-container class="">
                <v-row no-gutters>
                    <v-col v-for="(item, i) in 5" :key="i" col="4" sm="4" md="4">
                        <!-- box-shadow: none; -->
                        <v-card :to="`/screendetail/${item}`" style="" class="ma-4 mt-0" tile height="300px">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
                            <v-card-title>
                                Screen {{ item }}
                            </v-card-title>
                            <v-card-subtitle style="color:black;">
                                ผู้รับผิดชอบ Dev {{ item }}
                            </v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {
            query: '',
            dialog_newscreen: false,
            screencode: 'A001',
            screenname: 'List Page',
            developer: 'Developer 1',
            implementer: 'Implements 1',
            status: 'Not Complete',
            level: 100,
            manday: '365',
        };
    },
    methos: {
    },
}
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
input[type="text"] {
    border: black;
    font-size: 16px;
    padding-left: 10px;
    outline: black;
}
</style>