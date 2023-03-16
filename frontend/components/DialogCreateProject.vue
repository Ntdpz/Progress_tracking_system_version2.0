<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Dialog Title</v-card-title>
      <v-card-text>
        <!-- dialog content goes here -->
        <label>
          Name:
          <input v-model="postData.name" type="text" />
        </label>
        <label>
          Email:
          <input v-model="postData.email" type="email" />
        </label>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
  <script>
import axios from "axios";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      postData: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
    async submitForm() {
      try {
        const response = await axios.post("/api/posts", this.postData);
        console.log(response.data);
        this.$emit("update:dialog", false);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
  