<template>
    <div class="mx-auto">

        <v-row class="mb-6 " no-gutters>
            <v-col class="col-12" col="12" xs="12" sm="12" md="3">
                <!-- เอาเส้นออกใส่ border: none; -->
                <v-card class="pa-2 mx-auto" tile outlined
                    style="border: none;  height: 200px; display: flex; justify-content: center">
                    <div>
                        <v-avatar class="mt-6 mx-auto" style="width: 150px; height: 150px">
                            <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
                            <img v-if="avatar != null" :src="avatar" />
                            <img v-else-if="user_pic" :src="getImageUrl(user_pic)" />
                        </v-avatar>
                        <v-btn color="white" icon
                            style="background-color: #883cfe; float: right; margin-left: -42px; margin-top: 131px; position: absolute;">
                            <v-icon @click="$refs.fileInput.click()">mdi-pencil</v-icon>
                            <input ref="fileInput" type="file" style="display:none;" @change="uploadFile">
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <v-col col="12" xs="12" sm="12" md="9">
                <!-- เอาเส้นออกใส่ border: none; -->
                <v-card class="pa-2" tile outlined style="border: none; height: 600px">
                    <div class="mt-6 ml-2">
                        <!-- form -->

                        <v-row class="mr-2" style="margin-bottom:-2%; font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="7" xs="7" sm="7" md="7">
                                First Name
                            </v-col>
                            <v-col class="hidden-xs-only" cols="5" xs="5" sm="5" md="5"
                                style="margin-right:-1%; padding-right:0%;">
                                Last Name
                            </v-col>
                        </v-row>

                        <v-row class="mr-2" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <!-- <v-col class="" cols="2" sm="2" style="margin-right:-1%; padding-right:0%;">
                                        <v-select class="" v-model="name" :items="items" label="Mr/Miss" solo></v-select>
                                    </v-col> -->
                            <v-col class="" cols="2" sm="2" style="margin-right:-1%; padding-right:0%;">
                                <v-select v-model="name" :items="items" label="Mr/Miss" solo item-text="text"
                                    item-value="value">
                                    <template #item="{ item, on }">
                                        <v-list-item :value="item.value" v-on="on">
                                            <v-list-item-content>
                                                <v-list-item-title class="my-bold-item">{{ item }}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col class="" cols="5" sm="5">
                                <v-text-field v-model="firstname" label="First Name" solo></v-text-field>
                            </v-col>
                            <v-col class="" cols="5" sm="5">
                                <v-text-field v-model="user_lastname" label="Last Name" solo></v-text-field>
                            </v-col>
                        </v-row>


                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%;font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="4" sm="4">
                                Code
                            </v-col>
                            <v-col class="hidden-xs-only" cols="4" sm="4">
                                Position
                            </v-col>
                            <v-col class="hidden-xs-only" cols="4" sm="4">
                                Department
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <v-col cols="4" sm="4">
                                <v-text-field v-model="user_id" label="Code" solo></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="4">
                                <v-text-field v-model="user_position" label="Position" solo readonly></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="4">
                                <v-text-field v-model="user_department" label="Department" solo readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%;font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="12" sm="12">
                                E-mail
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <v-col class="" cols="12" sm="12">
                                <v-text-field v-model="user_email" label="E-mail" solo></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%;font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="12" sm="12">
                                Password
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <v-col cols="12" sm="12">
                                <v-text-field :append-icon="show3 ? 'mdi-pencil' : 'mdi-pencil'"
                                    :type="show3 ? 'Password' : 'Password'" @click:append="show3 = !show3"
                                    v-model="user_password" label="Password" solo readonly></v-text-field>
                                <!-- Icon -->
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%;font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="6" sm="6">
                                Status
                            </v-col>
                            <v-col class="hidden-xs-only" cols="6" sm="6">
                                Role
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <v-col class="" cols="6" sm="6">
                                <v-text-field v-model="user_status" label="Status" solo readonly>
                                    <template v-slot:prepend-inner>
                                        <v-icon v-if="online === true" color="green">mdi-circle</v-icon>
                                        <v-icon v-else color="red">mdi-circle</v-icon>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col class="" cols="6" sm="6">
                                <v-text-field v-model="user_role" label="Role" solo readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0 mt-lg-6" style="justify-content: right;font-weight: bold; color: black;">
                            <v-btn to="/home" class="mr-2" elevation="2" color="primary"
                                style="color: white; border-radius: 10px;">Update
                            </v-btn>
                        </v-row>
                        <!--  -->
                    </div>
                    <!-- dialog password persistent -->
                    <v-dialog v-model="show3" max-width="500px">
                        <v-card width="100%" height="100%">
                            <v-card-title>
                                <span class="text-h5" style="font-weight: bold; color: black;">Change Password</span>
                            </v-card-title>
                            <v-container>
                                <v-col class="mr-2 mt-0 hidden-xs-only" cols="12" sm="12"
                                    style="margin-bottom:-2%;font-weight: bold;font-size: 16px;">
                                    Current Password
                                </v-col>
                                <v-col class="mt-0 mb-0 pb-0" cols="12">
                                    <v-text-field v-model="c_password" solo label="Current Password"
                                        type="password"></v-text-field>
                                </v-col>
                                <v-col class="mr-2 mt-0 pt-0 hidden-xs-only" cols="12" sm="12"
                                    style="margin-bottom:-2%;font-weight: bold;">
                                    New Password
                                </v-col>
                                <v-col class="mt-0 mb-0 pb-0" cols="12">
                                    <v-text-field v-model="n_password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" solo
                                        label="New Password"></v-text-field>
                                </v-col>
                                <v-col class="mr-2 mt-0 pt-0 hidden-xs-only" cols="12" sm="12"
                                    style="margin-bottom:-2%;font-weight: bold;">
                                    Confirm Password Again
                                </v-col>
                                <v-col class="mt-0 mb-0 pb-0" cols="12">
                                    <v-text-field v-model="cf_password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" solo
                                        label="Confirm Password Again"></v-text-field>
                                </v-col>
                                <!--  -->
                                <v-row class="mr-2 mt-0 mb-4 pt-0"
                                    style="justify-content: right;font-weight: bold; color: black;">
                                    <v-btn class="mr-2" elevation="2" color="error"
                                        @click="(show3 = false), (clearChangePassword())"
                                        style="color: white; border-radius: 10px;">Cancel
                                    </v-btn>
                                    <v-btn class="mr-2" elevation="2" color="primary"
                                        @click="(show3 = false), (clearChangePassword())"
                                        style="color: white; border-radius: 10px;">Save
                                    </v-btn>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-dialog>


                </v-card>

            </v-col>


        </v-row>


    </div>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            c_password: "",
            n_password: "",
            cf_password: "",
            password: 'Password',
            user_id: "",
            user_firstname: "",
            user_lastname: "",
            user_status: "",
            user_role: "",
            user_position: "",
            user_password: "",
            user_email: "",
            user_department: "",
            name: "",
            online: "true",
            title: "",
            firstname: "",
            online: true,
            items: ['Mr.', 'Miss.'],
            user_pic: null,
            imageUpload: null,
            avatar: null,
        };
    },
    mounted() {
        this.titleName();
    },
    created() {
        this.getUser();
    },
    methods: {

        async getUser() {
            await this.$axios.get("/users/getAll?user_id=" + this.$store.state.user_id).then((res) => {
                console.log(res.data);
                this.user_id = res.data[0].user_id;
                this.user_firstname = res.data[0].user_firstname;
                this.user_lastname = res.data[0].user_lastname;
                this.user_status = res.data[0].user_status;
                this.user_role = res.data[0].user_role;
                this.user_position = res.data[0].user_position;
                this.user_password = res.data[0].user_password;
                this.user_email = res.data[0].user_email;
                this.user_department = res.data[0].user_department;
                this.user_pic = res.data[0].user_pic;
                console.log(this.user_pic);
                this.titleName();
            });
        },
        titleName() {
            const regex = /^(Mr\.|Miss\.)\s+(.*)$/; // Regular expression to match title and name
            const matches = this.user_firstname.match(regex);
            if (matches) {
                console.log(matches);
                this.name = matches[1];
                const name2 = matches[2].trim();
                const nameParts = name2.split(" ");
                this.firstname = nameParts[0];
                console.log(this.title);
            }
        },
        clearChangePassword() {
            this.c_password = "";
            this.n_password = "";
            this.cf_password = "";
        },
        getImageUrl(fileName) {
            return require(`@/uploads/${fileName}`);
        },
        uploadFile() {
            const input = this.$refs.fileInput;
            this.imageUpload = input.files[0];
            try {
                // editedItem.photo
                this.avatar = URL.createObjectURL(this.imageUpload);
                console.log(this.imageUpload);
                // Do something with the file, for example upload to a server
            } catch (error) {
                console.error(error);
                // this.avatar = null;
            }
        },

        async updateUser() {
            const formData = new FormData();
            formData.append("image", this.imageUpload);
            formData.append("user_firstname", this.name + " " + this.user_firstname);
            formData.append("user_lastname", this.user_lastname);
            formData.append("user_id", this.user_id);
            formData.append("user_position", this.user_position);
            formData.append("user_department", this.user_department);
            formData.append("user_email", this.user_email);
            formData.append("user_password", this.user_password);
            formData.append("user_status", this.user_status);
            formData.append("user_role", this.user_role);

            await this.$axios
                .put("/users/updateUsers/" + this.editedItem.id + "/image", formData)
                .then((response) => {
                    console.log(response);
                    console.log("Update success");
                    this.getAll();
                    this.getPosition_Developer();
                    this.getPosition_Implementer();
                    this.getPosition_ProgramManagement();
                    this.getPosition_SystemAnalyst();
                    this.getPosition_ReportDeveloper();
                    alert("Update success");
                    this.dialog_manage = false;
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                });
        },
    },
};
</script>

<style scoped>
* {
    font-family: "Lato", sans-serif;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.my-bold-item {
    font-weight: bold;
}
</style>
