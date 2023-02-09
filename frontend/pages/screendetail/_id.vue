<template>
    <div>
        <!-- title -->
        <v-row class="mb-3 ">
            <v-text-title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
                Screen {{ id }}
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
                    <v-card outlined tile>
                        <h1>รูป</h1>
                    </v-card>
                </v-col>
                <v-col col="6" sm="6" md="6">
                    <v-card outlined tile>
                        <h1>รายละเอียด</h1>
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
            query:'',
            id: this.$route.params.id,
        };
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