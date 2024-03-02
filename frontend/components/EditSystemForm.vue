<template>
  <form @submit.prevent="submitForm">
    <label for="systemNameTH">System Name (TH):</label>
    <input type="text" id="systemNameTH" v-model="editedSystem.system_nameTH">
    <label for="systemNameEN">System Name (EN):</label>
    <input type="text" id="systemNameEN" v-model="editedSystem.system_nameEN">
    <label for="systemMember">System Member:</label>
    <input type="text" id="systemMember" v-model="editedSystem.system_member">
    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  props: {
    system: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedSystem: { ...this.system } // สร้างคัดลอกข้อมูลระบบเพื่อแก้ไข
    };
  },
  methods: {
    submitForm() {
      // ส่งข้อมูลที่แก้ไขไปยัง method ที่เพื่อการบันทึก
      this.$emit('save', this.editedSystem);
    }
  }
};
</script>
