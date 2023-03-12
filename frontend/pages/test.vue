<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ mode === 'create' ? 'Create Item' : 'Edit Item' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Name" v-model="item.name"></v-text-field>
            <v-text-field label="Description" v-model="item.description"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveItem">{{ mode === 'create' ? 'Create' : 'Save' }}</v-btn>
          <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn color="primary" @click="openDialog('create')">Create Item</v-btn>
    <v-btn color="primary" @click="openDialog('edit')">Edit Item</v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      mode: 'create',
      item: {
        name: '',
        description: '',
      },
      itemId: null, // Store the ID of the item being edited
    };
  },
  methods: {
    async openDialog(mode) {
      this.mode = mode;
      this.dialog = true;

      if (mode === 'edit') {
        const response = await axios.get(`/api/items/${this.itemId}`);
        const itemData = response.data;

        if (itemData) {
          this.item = { ...itemData };
        }
      } else {
        if (this.$refs.form) {
          this.$refs.form.reset();
        }
      }
    },
    async saveItem() {
      if (this.mode === 'create') {
        // Create new item
        await axios.post('/api/items', this.item);
      } else {
        // Update existing item
        await axios.put(`/api/items/${this.itemId}`, this.item);
      }
      this.dialog = false;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>