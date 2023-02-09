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
                        <input class="mr-3" type="text" v-model="query" placeholder="Search some project" />
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
                    <v-card class="mt-0" tile outline style="box-shadow: none;">
                        <v-card-title>
                            <v-btn icon to="/Home" color="primary" size="35px" left>
                                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
                            </v-btn>
                            Sub System ระบบรอง SS For
                            <v-icon color="primary" right>
                                mdi-circle
                            </v-icon>
                            <v-icon color="error" right>
                                mdi-circle
                            </v-icon>
                            <v-icon color="orange" right>
                                mdi-circle
                            </v-icon>

                        </v-card-title>
                        <!-- button + dialog new sub system -->
                        <v-dialog v-model="dialog_newscreen" max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="(dialog_newscreen = true)" class="mr-2" elevation="2" color="primary" top
                                    right absolute v-bind="attrs" v-on="on" style="color: white; border-radius: 10px">
                                    <v-icon left> mdi-plus-circle-outline </v-icon>New Screen
                                </v-btn>
                            </template>
                            <!--  -->
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Create Screen</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row class="">
                                            <v-col cols="12" sm="12" md="12" style="margin-top: -4%;">
                                                <v-text-field label="Screen Code" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" style="margin-top: -4%;">
                                                <v-text-field label="Screen Name" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" style="margin-top: -4%;">
                                                <v-text-field label="Developer" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" style="margin-top: -4%;">
                                                <v-text-field label="Implementer" required></v-text-field>
                                            </v-col>
                                            <v-col cols="6" style="margin-top: -4%;">
                                                <v-text-field label="Status" required></v-text-field>
                                            </v-col>
                                            <v-col cols="6" style="margin-top: -4%;">
                                                <v-text-field label="Level" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" style="margin-top: -4%;">
                                                <v-text-field label="Man Day" required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" style="color: white; border-radius: 10px; margin-top: -4%;"
                                        @click="dialog_newscreen = false">
                                        Create Project
                                    </v-btn>
                                </v-card-actions>
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
                        <v-card :to="`/screendetail/${item}`" style="" class="ma-4 mt-0" tile outline height="300px">
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
        };
    },
    methos: {
    },
}
</script>

<style scoped>
input[type="text"] {
    border: black;
    font-size: 16px;
    padding-left: 10px;
    outline: black;
}
</style>