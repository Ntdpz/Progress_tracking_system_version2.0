<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <td
          @click="
            showFormDialog = true;
            selectedItem = item;
          "
        >
          {{ item.name }}
        </td>
        <td
          @click="
            showFormDialog = true;
            selectedItem = item;
          "
        >
          {{ item.age }}
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="showFormDialog">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ selectedItem.name }}</span>
        </v-card-title>
        <v-card-text>
          <p>Age: {{ selectedItem.age }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showFormDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Age", value: "age" },
      ],
      items: [
        { name: "John Doe", age: 25 },
        { name: "Jane Doe", age: 30 },
      ],
      search: "",
      loading: false,
      showFormDialog: false,
      selectedItem: {},
    };
  },
};
</script>
