<template>
    <v-dialog v-model="showFormDialog">
      <v-card>
        <v-card-title>
          Form Title
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedItem.yourColumn"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showFormDialog = false">Close</v-btn>
          <v-btn color="primary" @click="submitForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: ['showFormDialog', 'selectedItem'],
    methods: {
      submitForm () {
        // Add your form submit logic here
      }
    }
  }
  </script>
  