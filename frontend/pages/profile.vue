<template>
    <div class="mx-auto">

        <v-row class="mb-6 " no-gutters>
            <v-col class="col-12" col="12" xs="12" sm="12" md="3">
                <!-- เอาเส้นออกใส่ border: none; -->
                <v-card class="pa-2 mx-auto" tile outlined
                    style="border: none;  height: 200px; display: flex; justify-content: center">
                    <div>
                        <v-avatar class="mt-6 mx-auto" style="width: 150px; height: 150px">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                        </v-avatar>
                        <v-btn color="white" icon style="background-color: #883cfe; float: right;
                                                        margin-left: -42px; margin-top: 131px; position: absolute;">
                            <v-icon>mdi-pencil</v-icon>
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
                                <v-text-field v-model="user_firstname" label="First Name" solo></v-text-field>
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
                                <v-text-field v-model="user_code" label="Code" solo readonly></v-text-field>
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
                                <v-text-field v-model="user_email" label="E-mail" solo readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-2%;font-weight: bold; color: black;">
                            <v-col class="hidden-xs-only" cols="12" sm="12">
                                Password
                            </v-col>
                        </v-row>
                        <v-row class="mr-2 mt-0" style="margin-bottom:-4%;font-weight: bold; color: black;">
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="user_password" label="Password" solo readonly></v-text-field>
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

            user_id: "",
            user_firstname: "",
            user_lastname: "",
            user_status: "",
            user_role: "",
            user_code: "",
            user_position: "",
            user_password: "",
            user_email: "",
            user_department: "",
            name: "Mr.",
            firstname: "implementer1",
            lastname: "implementer1",
            code: "A000000001",
            position: "Implementer",
            department: "DD",
            online: "true",
            email: "implementer1@admin.com",
            password: "**********",
            status: "Active",
            online: true,
            role: "User",
            items: ['Mr.', 'Miss'],
        };
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
                this.user_code = res.data[0].user_code;
                this.user_position = res.data[0].user_position;
                this.user_password = res.data[0].user_password;
                this.user_email = res.data[0].user_email;
                this.user_department = res.data[0].user_department;
                console.log(this.user_status);
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
