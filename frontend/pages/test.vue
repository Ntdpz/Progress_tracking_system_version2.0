<template>
  <div>
    <v-file-input
      v-model="files"
      @change="postFile"
      label="File input"
      outlined
      dense
    ></v-file-input>
    <v-img :src="base64" alt="Selected Image" v-if="base64" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      base64: "",
    };
  },
  methods: {
    postFile() {
      const selectedFile = this.files;
      if (selectedFile) {
        const reader = new FileReader();
        // เมื่ออ่านไฟล์เสร็จสิ้น
        reader.onload = (event) => {
          this.base64 = event.target.result;
          console.log(this.base64);

          // ตอนนี้คุณสามารถทำสิ่งอื่น ๆ กับข้อมูล Base64 ได้ตามต้องการ
        };
        // อ่านไฟล์เป็น Base64
        reader.readAsDataURL(selectedFile);
      }
    },
  },
};
</script>