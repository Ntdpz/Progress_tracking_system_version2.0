<template>
    <div>
        <v-container class="mt-4">
            <v-row class="mb-6" no-gutters>
                <v-col cols="3">
                    <!-- เอาเส้นออกใส่ border: none; -->
                    <v-card class="pa-2" tile outlined style="height: 465px; display: flex; justify-content: center">
                        <div>
                            <v-avatar class="mt-6 mx-auto" style="width: 150px; height: 150px">
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                            </v-avatar>
                            <v-btn icon style="color: white; background-color: purple; float: right;
                                margin-left: -42px; margin-top: 131px; position: absolute;">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="9">
                    <!-- เอาเส้นออกใส่ border: none; -->
                    <v-card class="pa-2" tile outlined style="height: 465px">
                        <div class="mt-6 ml-15">
                            <h1>Grid col-9 information</h1>
                        </div>
                        <v-btn elevation="2" color="purple" bottom right absolute
                            style="color: white; border-radius: 10px">Update
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
