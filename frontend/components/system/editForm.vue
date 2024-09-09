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
        };
    },
    methods: {
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