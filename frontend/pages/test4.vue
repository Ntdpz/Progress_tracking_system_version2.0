<template>
  <div class="ma-4">
    <v-text-field v-model="text1"></v-text-field>
    <div class="file-input">
      <!-- Use a label instead of a button -->

      <label for="fileInput" v-if="!FileUpload">Choose PDF file</label>
      <label for="fileInput" v-if="FileUpload">You chose: <span>{{ FileUpload.name }}</span></label>

      <!-- Add an ID to the file input -->
      <input type="file" id="fileInput" ref="fileInput" @change="uploadFile()" />
    </div>
    <v-btn class="mt-4" @click="postpdf()"> post </v-btn>
    <v-btn class="mt-4" @click="clear()"> clear </v-btn>
    <div class="ma-4">
      <v-card class="ma-2" v-for="(pdf, index) in datapdf" :key="index">
        <v-card-title> ID: {{ pdf.id }} </v-card-title>
        <v-card-subtitle> Text: {{ pdf.text1 }} </v-card-subtitle>
        <v-card-subtitle v-if="pdf.pdf">
          File: {{ pdf.pdf }}
          <a :href="URI + '/pdf/downloadfile/' + pdf.pdf" download>
            <v-icon small>mdi-download</v-icon>
          </a>
        </v-card-subtitle>
        <v-btn icon @click="deletefile(pdf.id)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      URI: "http://localhost:7777",
      text1: "",
      FileUpload: "",
      file: "",
      datapdf: [],
    };
  },
  created() {
    this.getAll();
  },
  mounted() {
    const fileNameElement = document.getElementById("fileName");
    if (fileNameElement) {
      fileNameElement.innerHTML = this.FileUpload ? this.FileUpload.name : "";
    }
  },
  methods: {
    clear() {
      this.text1 = "";
      this.FileUpload = "";
      this.file = "";
    },
    getImageUrl(fileName) {
      return require(`@/static/screenImages/${fileName}`);
    },

    uploadFile() {
      const input2 = this.$refs.fileInput;
      this.FileUpload = input2.files[0];
      console.log(this.FileUpload);
      try {
        this.file = URL.createObjectURL(this.FileUpload);
        console.log(this.FileUpload);

        const fileNameElement = document.getElementById("fileName");
        if (fileNameElement) {
          fileNameElement.innerHTML = this.FileUpload.name;
        }
        // Do something with the file, for example upload to a server
      } catch (error) {
        console.error(error);
        this.file = null;
      }
    },
    async postpdf() {
      const formData = new FormData();
      formData.append("file", this.FileUpload);
      formData.append("text1", this.text1);

      try {
        const response = await this.$axios.post("/pdf/createfile", formData);
        console.log(response.data);
        this.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    async getAll() {
      await this.$axios.get("/pdf/getAll").then((data) => {
        this.datapdf = data.data;
        console.log(this.datapdf);
      });
    },
    async deletefile(id) {
      try {
        await this.$axios.delete("/pdf/deletefile/" + id).then((res) => {
          console.log(response);
          console.log("delete success");
          this.getAll();
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}

.file-input input[type="file"] {
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 1rem;
  /* add more styles as needed */
}

/* Hide the default file input button */
.file-input input[type="file"] {
  display: none;
}

.file-input label {
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 1rem;
  /* add more styles as needed */
}
</style>
