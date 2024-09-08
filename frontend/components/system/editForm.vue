<template>
    <v-card>
        <v-card-title>Edit Screen</v-card-title>
        <v-card-text>
            <v-form ref="editForm">
                <!-- Line 1: Screen ID & Screen Name -->
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="form.screenCode" label="Screen ID"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="form.screenName" label="Screen Name"></v-text-field>
                    </v-col>
                </v-row>

                <!-- Line 2 Difficulty Level & Screen Status -->
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="form.difficultyLevel" label="Difficulty Level"
                            :items="[1, 2, 3, 4, 5]"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="form.screenStatus" label="Screen Status"
                            :items="['Not started', 'Design', 'Dev', 'Test']"></v-select>
                    </v-col>
                </v-row>

                <!-- Line 3: Image Upload -->
                <v-row>
                    <v-col cols="6">
                        <v-file-input v-model="imageFile" label="Change Image" accept="image/*"
                            @change="convertImageToBase64"></v-file-input>
                    </v-col>
                </v-row>
            </v-form>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- Current User Title -->
            <v-card-title color="black">Current Users</v-card-title>

            <!-- Current User Table -->
            <v-data-table :headers="headers" :items="filteredUserScreens" class="elevation-1 mt-4 mb-3">
                <template v-slot:item.user_position="{ item }">
                    <v-chip :style="{ width: '120px', display: 'flex', justifyContent: 'center' }"
                        :color="getColor(item.user_position)" dark>
                        {{ item.user_position }}
                    </v-chip>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn icon @click="deleteUser(item)">
                        <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- User System Selection -->
            <v-card-title color="black">Assign new user</v-card-title>
            <v-card-text>
                <v-form ref="newUserForm">
                    <!-- Line 1: System Analyst-->
                    <v-row>
                        <v-select label="Screen SA" v-model="selectedSA" :items="filteredUserSystems('System Analyst')"
                            item-text="name" item-value="id" multiple chips></v-select>
                    </v-row>

                    <!-- Line 2: Developer -->
                    <v-row>
                        <v-select label="Screen Dev" v-model="selectedDev" :items="filteredUserSystems('Developer')"
                            item-text="name" item-value="id" multiple chips></v-select>
                    </v-row>

                    <!-- Line 3: Implementer -->
                    <v-row>
                        <v-select label="Screen Imp" v-model="selectedImp" :items="filteredUserSystems('Implementer')"
                            item-text="name" item-value="id" multiple chips></v-select>
                    </v-row>
                </v-form>
            </v-card-text>

            <!-- Form Actions -->
            <v-card-actions>
                <v-btn color="red" outlined @click="confirmDeleteScreen">Delete Screen</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitForm">Submit</v-btn>
                <v-btn color="secondary" @click="cancelForm">Cancel</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    props: {
        screenId: Number,
        screenCode: String,
        screenName: String,
        userScreens: {
            type: Array,
            required: false,
            default: () => [],
        },
        userSystems: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            form: {
                screenCode: this.screenCode,
                screenName: this.screenName,
                difficultyLevel: null,
                screenStatus: null,
            },
            imageFile: null,
            imageBase64: '',
            headers: [
                { text: 'Name', value: 'user_firstname' },
                { text: 'Last', value: 'user_lastname' },
                { text: 'Position', value: 'user_position' },
                { text: 'Action', value: 'action', sortable: false },
            ],
            selectedSA: [],
            selectedDev: [],
            selectedImp: [],
            userScreensCopy: [...this.userScreens], // Create a local copy of the userScreens prop
        };
    },

    computed: {
        // Filter current user screens by their position
        filteredUserScreens() {
            return this.userScreens.filter(user => user.user_position);
        },
    },
    methods: {
        getColor(position) {
            switch (position) {
                case 'System Analyst':
                    return '#864F80';
                case 'Developer':
                    return '#374AAB';
                case 'Tester':
                    return '#359C73';
                default:
                    return 'grey';
            }
        },
        convertImageToBase64() {
            const file = this.imageFile;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                this.imageBase64 = base64String;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        // Filter user systems by position for assigning new users
        filteredUserSystems(position) {
            return (this.userSystems && Array.isArray(this.userSystems))
                ? this.userSystems
                    .filter(user => user.user_position === position)
                    .map(user => ({
                        id: user.id,
                        name: `${user.user_firstname} ${user.user_lastname}`, // Display name
                    }))
                : [];
        },
        deleteUser(user) {
            this.userScreensCopy = this.userScreensCopy.filter(u => u !== user);
            this.$emit('updateUserScreens', this.userScreensCopy); // Emit changes to parent
        },
        confirmDeleteScreen() {
            Swal.fire({
                title: 'Are sure you want to delete?',
                text: "If deleted, you won't be able to recover this screen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteScreen();
                }
            });
        },
        deleteScreen() {
            // Emit the event to delete the screen in the parent
            this.$emit('deleteScreen');
        },
        submitForm() {
            if (this.$refs.editForm.validate()) {
                const updatedScreen = {
                    screenId: this.form.screenId,
                    screenCode: this.form.screenCode,
                    screenName: this.form.screenName,
                    difficultyLevel: this.form.difficultyLevel,
                    screenStatus: this.form.screenStatus,
                    screenImage: this.imageBase64,
                    screenSA: this.selectedSA,
                    screenDev: this.selectedDev,
                    screenImp: this.selectedImp,
                    userScreens: this.userScreensCopy, // Include the updated userScreensCopy
                };
                this.$emit('submitForm', updatedScreen);
            }
        },
        cancelForm() {
            this.$emit('closeDialog');
        },
    },
};
</script>

<style scoped>
.mt-4 {
    margin-top: 20px;
}
</style>