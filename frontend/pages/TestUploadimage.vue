<template>
    <div>
        <div>
            <button @click="deleteImage">delete</button>
        </div>
        <div>
            <label for="textField1">Text Field 1:</label>
            <input type="text" id="textField1" v-model="textField1" />
        </div>
        <div>
            <label for="textField2">Text Field 2:</label>
            <input type="text" id="textField2" v-model="textField2" />
        </div>
        <div>
            <label for="image">Image:</label>
            <input type="file" id="image" @change="handleImageChange" />
        </div>
        <div>
            <button @click="submitForm">Submit</button>
        </div>
        <div>
            <button @click="getImage">image</button>
        </div>

        <div>
            image: {{ extractedFiles }}
        </div>
        <div>
            <v-row>
                <v-col>
                    <img src="../uploads/1677487607119-img_forest.jpg">
                </v-col>
            </v-row>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    layout: "admin",
    data() {
        return {
            textField1: '',
            textField2: '',
            imageFile: null,
            data: [],
            ImagePath: [],
            extractedFiles: [],
            image: [],
        }
    },
    created() {
        this.getImage();
        this.splitImage();
    },
    mounted() {
        
    },
    methods: {
        async submitForm() {
            try {
                const formData = new FormData()
                formData.append('textField1', this.textField1)
                formData.append('textField2', this.textField2)
                formData.append('image', this.imageFile)

                await this.$axios.post('/users/submit-form', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                alert('Form submitted successfully!')
                this.textField1 = ''
                this.textField2 = ''
                this.imageFile = null
            } catch (error) {
                console.error(error)
                alert('Error submitting form')
            }
        },

        handleImageChange(event) {
            this.imageFile = event.target.files[0]
        },

        async getImage() {
            await this.$axios
                .get('/users/image')
                .then((data) => {
                    this.data = data.data;
                    this.image = this.data[0].imagePath;
                    console.log(this.data[0].id);
                    this.extractedFiles = [];
                    this.splitImage();
                }).catch((err) => {
                    console.log(err);
                    alert(err);
                });
        },
        deleteImage() {
            this.$axios
                .delete("/users/api/images/" + 5)
                .then((response) => {
                    console.log(response);
                    console.log("Delete success");
                    alert("Delete success");
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                });
        },
        splitImage() {
                this.data.forEach(file => {
                const parts = file.imagePath.split("\\");
                const directory = parts[1];
                const fileName = parts[parts.length - 1];
                const extractedFile = { id: file.id, directory, fileName };
                this.extractedFiles.push(extractedFile);
                console.log(this.extractedFiles);
            });
        },
    },

}
</script>