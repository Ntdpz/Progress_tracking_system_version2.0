<template>
  <v-dialog v-model="editSystemDialog" max-width="600" ref="editSystemDialog">
    <v-card>
      <v-card-title>Edit System</v-card-title>
      <v-card-text>
        <!-- Form to edit system -->
        <v-form @submit.prevent="updateSystem">
          <v-text-field v-model="editedSystem.system_id" label="System ID" readonly></v-text-field>
          <v-text-field v-model="editedSystem.system_nameTH" label="System Name (TH)"></v-text-field>
          <v-text-field v-model="editedSystem.system_nameEN" label="System Name (EN)"></v-text-field>
          <v-text-field v-model="editedSystem.system_shortname" label="Short Name"></v-text-field>
          <!-- Add more fields as needed -->
          <!-- You can also add selection fields for system analyst and member -->
          <!-- Add buttons to submit and cancel -->
          <v-btn type="submit">Update</v-btn>
          <v-btn @click="editSystemDialog = false">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  props: {
    editSystemDialog: Boolean,
    editedSystem: Object,
  },
  methods: {
    async updateSystem() {
      try {
        const response = await fetch(
          `http://localhost:7777/systems/updateSystem/${this.editedSystem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedSystem),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update system");
        }
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "System updated successfully",
        });
        this.editSystemDialog = false;
        this.fetchSystems();
        this.$router.go();
      } catch (error) {
        console.error("Error updating system:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update system",
        });
        
      }
    },

    async fetchSystems() {
      const projectId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/getAll/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch systems");
        }
        const data = await response.json();
        this.systems = data;
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    },


  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
