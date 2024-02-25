<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Create Project</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="project.project_id" label="Project ID"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="project.project_name_ENG" label="Project Name (English)"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="project.project_name_TH" label="Project Name (Thai)"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="project.project_shortname" label="Short Name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="project.project_agency" label="Agency"></v-text-field>
        </v-col>
        
      </v-row>
      <v-row>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-date-picker v-model="project.project_plan_start" label="Planned Start"></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <v-date-picker v-model="project.project_plan_end" label="Planned End"></v-date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="createProject">Create</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        project_id: '',
        project_name_ENG: '',
        project_name_TH: '',
        project_shortname: '',
        project_agency: '',
        project_progress: null,
        project_manday: null,
        system_count: 0,
        project_plan_start: null,
        project_plan_end: null,
        is_deleted: 0
      }
    };
  },
  methods: {
    createProject() {
      // เขียนโค้ดสำหรับส่งข้อมูลโปรเจกต์ไปยัง API หรือบันทึกลงในฐานข้อมูลที่ต้องการ
      console.log('Creating project:', this.project);
      // ตรวจสอบข้อมูลและดำเนินการต่อไปตามต้องการ
    }
  }
};
</script>
