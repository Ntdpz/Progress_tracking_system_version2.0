<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="user_systems"
      item-key="id"
      :items-per-page="5"
    >
      <!-- image -->
      <template v-slot:item.user_pic="{ item }">
        <v-avatar size="36">
          <v-img :src="getBase64Image(item.user_pic)" />
        </v-avatar>
      </template>
      <template v-slot:top>
        <v-toolbar flat class="toolbar">
          <v-toolbar-title class="toolbar-title">
            User Systems : {{ systemData.system_nameEN }}
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.user_position="{ item }">
        <v-chip :color="getColor(item.user_position)" dark>
          {{ item.user_position }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    systemData: {
      type: Object,
      required: true,
    },
    userSystems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { text: "Image", value: "user_pic" },
        { text: "First Name", value: "user_firstname" },
        { text: "Last Name", value: "user_lastname" },
        { text: "Position", value: "user_position", align: "center" },
      ],
    };
  },
  computed: {
    user_systems() {
      return this.userSystems; // Directly use the prop
    },
  },
  methods: {
    getColor(position) {
      switch (position) {
        case "System Analyst":
          return "#864F80";
        case "Developer":
          return "#374AAB";
        case "Tester":
          return "#359C73";
        default:
          return "grey";
      }
    },
    getBase64Image(base64String) {
      if (!base64String) {
        // If base64String is null or undefined, return an empty string or a placeholder image
        return "";
      }
      if (base64String.startsWith("data:image/jpeg;base64,")) {
        // If the base64 string already includes the prefix, return it as is
        return base64String;
      } else {
        // Otherwise, add the prefix and return the modified string
        return `data:image/jpeg;base64,${base64String}`;
      }
    },
  },
};
</script>

<style scoped>
</style>