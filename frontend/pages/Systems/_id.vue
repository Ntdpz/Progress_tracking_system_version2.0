<template>
  <div class="system-details">
    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input type="text" v-model="searchQuery" placeholder="Search..." style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          " />
      </v-col>
    </v-row>

    <!-- Display  system details -->
    <div v-if="systemDetails">
      <h3> System Details</h3>
      <v-data-table :headers="detailsHeaders" :items="[systemDetails]" class="elevation-1">

        <template v-slot:items="props">
          <tr>
            <td>{{ props.item.system_id }}</td>
            <td>{{ props.item.system_nameTH }}</td>
            <td>{{ props.item.system_nameEN }}</td>
            <td>{{ props.item.system_shortname }}</td>
            <!-- Add more columns as needed -->
          </tr>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <p>No system selected</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemDetails",
  props: {
    selectedSystemId: String, // Receive the selected system ID as a prop
  },
  layout: "admin",
  data() {
    return {
      systemDetails: null, // Data of the selected system
      searchQuery: "", // Search query for filtering systems
      headers: [
        { text: "System ID", value: "system_id" },
        { text: "System Name (TH)", value: "system_nameTH" },
        { text: "System Name (EN)", value: "system_nameEN" },
        { text: "Short Name", value: "system_shortname" },
        // Add more headers as needed
      ],
      detailsHeaders: [
        { text: "System ID", value: "system_id" },
        { text: "System Name (TH)", value: "system_nameTH" },
        { text: "System Name (EN)", value: "system_nameEN" },
        { text: "Short Name", value: "system_shortname" },
        // Add more headers as needed
      ],
      systems: [], // Array to store system data
    };
  },
  watch: {
    // Watch for changes in the selected system ID and fetch details accordingly
    selectedSystemId: "fetchSystemDetails",
  },
  mounted() {
    // Fetch system details on component mount
    this.fetchSystemDetails();
  },
  methods: {
    async fetchSystemDetails() {
      const systemId = this.selectedSystemId || this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/getOne/${systemId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch system details");
        }
        const systemData = await response.json();
        this.systemDetails = systemData;

        // Assuming you have an API endpoint to fetch all systems
        const allSystemsResponse = await fetch(`http://localhost:7777/systems`);
        if (!allSystemsResponse.ok) {
          throw new Error("Failed to fetch systems");
        }
        this.systems = await allSystemsResponse.json();
      } catch (error) {
        console.error("Error fetching system details:", error);
      }
    },
    selectSystem(systemId) {
      // Triggered when a row is clicked, update the selectedSystemId
      this.$emit("update:selectedSystemId", systemId);
    },
  },
  computed: {
    filteredSystems() {
      // Apply filtering based on searchQuery
      return this.systems.filter((system) =>
        system.system_nameTH.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
