<template>
  <div>
    <v-btn color="primary" @click="resetTable">Reset Table</v-btn>
    <v-data-table :headers="headers" :items="items" :key="tableKey">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions" },
      ],
      items: [
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
        { name: "Bob Smith", email: "bob.smith@example.com" },
      ],
      tableKey: 0,
    };
  },
  methods: {
    deleteItem(item) {
      // Delete item logic here
    },
    editItem(item) {
      // Edit item logic here
    },
    resetTable() {
      this.items = [];
      this.tableKey++;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>