<template>
    <div>
        <!-- title -->
        <v-row class="mb-3 ">
            <b class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
                Screen {{ id }}
            </b>
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
                    <form class="center">
                        <v-icon color="purple">mdi-magnify</v-icon>
                        <input class="mr-3" type="text" v-model="query" placeholder="Search some screen" />
                    </form>
                </v-banner>
            </template>
        </v-row>
        <v-divider></v-divider>
        <!-- Screen detail -->
        <v-container>
            <!-- title -->
            <v-row no-gutters>
                <v-col col="12" sm="12" md="12">
                    <v-card outlined tile style="box-shadow: none; border: none;">
                        <v-card-title>
                            <v-btn icon to="/systemdetail" class="mr-4" color="primary" size="35px" left>
                                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
                            </v-btn>
                            Screen {{ id }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <!-- รูป กับรายลละเอียด -->
            <v-row no-gutters>
                <v-col col="6" sm="6" md="6">
                    <v-card style="" class="ma-1 mt-0" tile>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="430px"></v-img>
                    </v-card>
                </v-col>
                <v-col col="6" sm="6" md="6">
                    <v-card outlined tile height="100%">
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
                                    <v-text-field style="text-align-last: center;" v-model="screencode" hide-details="auto"
                                        dense outlined></v-text-field>
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
                                    <v-text-field style="text-align-last: center;" v-model="screenname" hide-details="auto"
                                        dense outlined></v-text-field>
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
                                    <v-text-field style="text-align-last: center;" v-model="developer" hide-details="auto"
                                        dense outlined></v-text-field>
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
                                    <v-text-field style="text-align-last: center;" v-model="implementer" hide-details="auto"
                                        dense outlined></v-text-field>
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
                                        <v-text-field style="text-align-last: center;" v-model="status" hide-details="auto"
                                            readonly dense outlined>
                                            <template v-slot:prepend-inner>
                                                <v-icon :color="status === 'Complete' ? 'green' : 'red'">mdi-circle</v-icon>
                                            </template>
                                        </v-text-field>
                                    </template>
                                </v-col>
                                <v-col class="hidden-xs-only" sm="2" md="2" style="place-self: center;">
                                    <h4 class="">Level</h4>
                                </v-col>
                                <v-col sm="4" md="4">
                                    <v-text-field style="text-align-last: center;" v-model="level" hide-details="auto" dense
                                        outlined></v-text-field>
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
                                    <v-text-field style="text-align-last: center;" v-model="manday" hide-details="auto"
                                        dense outlined></v-text-field>
                                </v-col>
                                <v-col style="place-self: center;">
                                        <h4 class="">Days</h4>
                                    </v-col>
                            </v-row>
                            <!--  -->
                            <v-row class="mb-4" style="justify-content: right;">
                                <v-col class="col-auto"  sm="9" md="9" style="text-align: right;">
                                        <v-btn to="#" class=" mr-0" elevation="2" color="error"
                                            style="color: white; border-radius: 10px;">Delete
                                        </v-btn>
                                    </v-col>
                                <v-col class="col-auto" sm="3" md="3" style="text-align: right;">
                                    <v-btn to="#" class="" elevation="2" color="primary"
                                        style="color: white; border-radius: 10px;">Update
                                    </v-btn>
                                </v-col>

                            </v-row>

                            <!--  -->
                        </v-container>


                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            query: '',
            showIcon: true,
            screencode: 'A001',
            screenname: 'List Page',
            developer: 'Developer 1',
            implementer: 'Implements 1',
            status: 'Not Complete',
            level: 100,
            manday: '365',
            id: this.$route.params.id,
        };
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