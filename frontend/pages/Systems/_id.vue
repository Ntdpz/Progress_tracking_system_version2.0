<template>
  <div class="system-details">
    <h1>System Details</h1>
    <div v-if="systemDetails">
      <p><strong>System ID:</strong> {{ systemDetails.system_id }}</p>
      <p>
        <strong>System Name (TH):</strong> {{ systemDetails.system_nameTH }}
      </p>
      <p>
        <strong>System Name (EN):</strong> {{ systemDetails.system_nameEN }}
      </p>
      <p><strong>Short Name:</strong> {{ systemDetails.system_shortname }}</p>
      <!-- Add more details as needed -->
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
    selectedSystemId: String, // รับรหัสระบบที่เลือกเป็นพารามิเตอร์
  },
  data() {
    return {
      systemDetails: null, // ข้อมูลของระบบที่ถูกเลือก
    };
  },
  mounted() {
    this.fetchSystemDetails();
  },
  methods: {
    async fetchSystemDetails() {
      const systemsId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:7777/systems/getOne/${systemsId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch system details");
        }
        const systemData = await response.json();
        this.systemDetails = systemData;
      } catch (error) {
        console.error("Error fetching system details:", error);
      }
    },
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์ตามต้องการ */
</style>
