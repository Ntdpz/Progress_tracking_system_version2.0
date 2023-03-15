<template>
    <div>
        <!-- title -->
        <v-row class="mb-3 ">
            <title class="center ml-4 mr-4 mt-0 mb-1" style="font-weight: bold; font-size: 20px">
                System Detail
            </title>
            <v-divider class="mt-0 mb-1" inset vertical style="background-color: black"></v-divider>
            <template>
                <v-banner class="mt-0 ml-4"
                    style="display: flex;align-items: center;justify-content: center;height: 30px;border-radius: 30px;padding: 0 0px;"
                    outlined elevation="2">
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
                            <v-btn icon @click="back" color="primary" size="35px" left>
                                <v-icon size="35px">mdi-arrow-left-circle</v-icon>
                            </v-btn>
                            {{ dataSystem.system_nameTH }}({{ dataSystem.system_shortname }}) ของ Project: {{
                                projectName.project_name }}
                            <v-avatar class="ml-4" color="primary" size="20">
                            </v-avatar>
                            <v-avatar class="ml-4" color="error" size="20">
                            </v-avatar>
                            <v-avatar class="ml-4" color="orange" size="20">
                            </v-avatar>

                        </v-card-title>
                        <!-- button + dialog new sub system -->


                        <v-btn @click="(dialog_newscreen = true), (resetday())" class="mr-2" elevation="2" color="primary"
                            top right absolute style="color: white; border-radius: 10px; font-weight: bold;">
                            <v-icon left> mdi-plus-circle-outline </v-icon>New Screen
                        </v-btn>

                        <!--  -->
                        <v-dialog v-model="dialog_newscreen" max-width="600px">
                            <v-card>
                                <v-col>
                                    <v-card outlined tile height="100%" style="border:none;">
                                        <v-container fluid>
                                            <v-row>
                                                <v-col>
                                                    <v-card style="border: none" class="mx-auto text-center" outlined tile
                                                        height="100%">
                                                        <!--  -->

                                                        <form>
                                                            <div class="d-flex justify-center">
                                                                <label class="mt-0 avatar-upload"
                                                                    style="display: flex; justify-content: center; align-items: center;">
                                                                    <input type="file" ref="fileInput"
                                                                        @change="uploadFile" />
                                                                    <v-icon class="center mt-0" color="black" size="30px"
                                                                        v-if="!photo">mdi-cloud-upload-outline</v-icon>
                                                                    <img v-if="photo" :src="photo" />
                                                                </label>
                                                            </div>
                                                        </form>

                                                        <!--  -->
                                                    </v-card>
                                                </v-col>
                                            </v-row>
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
                                                    <v-text-field style="text-align-last: center;" v-model="screenID"
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
                                            <!-- <v-row>
                                                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                                                    <v-menu ref="menuDateStart" v-model="menuDateStart"
                                                        :close-on-content-click="false" transition="scale-transition"
                                                        offset-y min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="dateStart" label="Screen Start"
                                                                prepend-icon="mdi mdi-calendar-clock-outline" readonly
                                                                v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="dateStart" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary"
                                                                @click="menuDateStart = false">Cancel</v-btn>
                                                            <v-btn text color="primary"
                                                                @click="$refs.menuDateStart.save(dateStart)">OK</v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6" v-show="mode == 'create'">
                                                    <v-menu ref="menuDateEnd" v-model="menuDateEnd"
                                                        :close-on-content-click="false" transition="scale-transition"
                                                        offset-y min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="dateEnd" label="Screen End"
                                                                prepend-icon="mdi mdi-calendar-clock-outline" readonly
                                                                v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="dateEnd" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary"
                                                                @click="menuDateEnd = false">Cancel</v-btn>
                                                            <v-btn text color="primary"
                                                                @click="$refs.menuDateEnd.save(dateEnd)">OK</v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row> -->
                                            <!--  -->
                                            <v-row class="" style="justify-content: right;">

                                                <v-btn @click="(dialog_newscreen = false)" to="#" class="mr-2" elevation="2"
                                                    color="error" style="color: white; border-radius: 10px;">Cancel
                                                </v-btn>

                                                <v-btn @click="(dialog_newscreen = false), (calculateManDay(manday))" to="#"
                                                    class="mr-2" elevation="2" color="primary"
                                                    style="color: white; border-radius: 10px;">Create
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
                    <template v-if="AllScreens.length">
                        <v-col v-for="(item, i) in AllScreens" :key="i" col="4" sm="4" md="4">
                            <v-responsive :aspect-ratio="4 / 3" class="ma-4 mt-0">
                                <v-card :to="`/screendetail/${item.id}`" class="elevation-0" outlined rounded>
                                    <v-img :src="getImageUrl(item.screen_pic)" height="250px" />
                                    <v-card-title>
                                        Screen: {{ item.screen_name }}
                                    </v-card-title>
                                    <v-card-subtitle style="color:black;">
                                        ผู้รับผิดชอบ Dev {{ item.screen_developer }}
                                    </v-card-subtitle>
                                </v-card>
                            </v-responsive>
                        </v-col>
                    </template>
                    <template v-else>
                        <v-container fluid>
                            <v-divider class="full-width"></v-divider>
                            <v-row class="center">
                                <div class="ma-6">
                                    <h1>No have Screen</h1>
                                </div>
                            </v-row>
                            <v-divider class="full-width"></v-divider>
                        </v-container>
                    </template>
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
            id: this.$route.params.id,
            dataSystem: [],
            projectID: null,
            projectName: [],
            photo: "",
            imageFileUpload: "",
            query: '',
            dialog_newscreen: false,
            screenID: 'A001',
            screenname: 'List Page',
            developer: 'Developer 1',
            implementer: 'Implements 1',
            status: 'Not Complete',
            level: 100,
            manday: 365,
            mode: "create",
            today: new Date(),
            dateEnd: new Date(),
            menuDateStart: false,
            menuDateStartEdit: false,
            AllScreens: [],
            imageDefault: 'DefaultScreen.jpg',
        };
    },
    created() {
        this.getSystemID();
        this.getProject();
        this.getScreens();
        // this.getProjectID();
        // this.calculateManDay();
    },
    methods: {
        async getScreens() {
            await this.$axios.get('/screens/getAll?system_id=' + this.id).then((data) => {
                this.AllScreens = data.data;
                console.log(this.AllScreens);
            })
        },
        calculateManDay(manday) {
            this.dateEnd = new Date(this.today.getTime() + manday * 24 * 60 * 60 * 1000);
            console.log(this.today.toISOString().substr(0, 10));
            console.log(this.dateEnd.toISOString().substr(0, 10));
            this.createScreen();
            return;
        },
        resetday() {
            this.today = new Date();
            this.dateEnd = new Date();
            return;
        },
        getImageUrl(fileName) {
            return require(`@/screenImages/${fileName}`);
        },
        uploadFile() {
            const input2 = this.$refs.fileInput;
            this.imageFileUpload = input2.files[0];
            try {
                this.photo = URL.createObjectURL(this.imageFileUpload);
                console.log(this.imageFileUpload);
                // Do something with the file, for example upload to a server
            } catch (error) {
                console.error(error);
                this.photo = null;
            }
        },
        back() {
            this.$router.push('/manageProject');
        },
        async getSystemID() {
            await this.$axios.get("/systems/getOne/" + this.id,).then((data) => {
                this.dataSystem = data.data[0];
                this.projectID = data.data[0].project_id;
                // console.clear();
                console.log("this.projectID");
                console.log(this.projectID);
                this.getProjectID();
            });
        },
        async getProject() {
            await this.$axios.get("/projects/getAll").then((res) => {
                console.log(res.data);
            });
        },
        async getProjectID() {
            await this.$axios.get("/projects/getOne/" + this.projectID).then((res) => {
                this.projectName = res.data[0];
                console.log("this.projectName");
                console.log(res.data);
            });
        },
        async createScreen() {
            try {
                const today = this.today.toISOString().substr(0, 10);
                const dateEnd = this.dateEnd.toISOString().substr(0, 10);
                const formData = new FormData();
                formData.append("image", this.imageFileUpload);
                formData.append("system_id", this.id);
                formData.append("project_id", this.projectID);
                formData.append("screen_id", this.screenID);
                formData.append("screen_name", this.screenname);
                formData.append("screen_developer", this.developer);
                formData.append("screen_implementer", this.implementer);
                formData.append("screen_status", this.status);
                formData.append("screen_level", this.level);
                formData.append("screen_start", today);
                formData.append("screen_end", dateEnd);
                formData.append("screen_manday", this.manday);

                await this.$axios.post('/screens/createScreen', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log("post success");
                const promise = new Promise((resolve, reject) => {
                    resolve();
                });
                promise.then(() => {
                    setTimeout(() => {
                        alert("success");
                        window.location.reload();
                    }, 1000);
                });
            } catch (error) {
                console.error(error);
                alert('Error submitting form');
            }

        },
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

.avatar-upload {
    display: inline-block;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    text-align: center;
    background-color: #a1a1a1;
    text-align: center;
    cursor: pointer;
}

.avatar-upload input[type="file"] {
    display: none;
}

.avatar-upload img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

.avatar-upload i {
    font-size: 16px;
    line-height: 40px;
    color: #bbbbbb;
}

.my-card {
    border-radius: 20px;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>