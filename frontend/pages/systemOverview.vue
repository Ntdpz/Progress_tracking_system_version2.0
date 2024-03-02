<template>
  <div>
    <!-- Search bar -->
    <v-row no-gutters>
      <v-col cols="12">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          "
        />
      </v-col>
    </v-row>

    <h2>Systems Data Table</h2>
    <table>
      <thead>
        <tr>
          <th>System ID</th>
          <th>System Name TH</th>
          <th>Systenm Name Eng</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="system in filteredSystems" :key="system.id">
          <td>{{ system.system_id }}</td>
          <td>{{ system.system_nameTH }}</td>
          <td>{{ system.system_nameEN }}</td>
          
          <td>
            <button @click="editSystem(system)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import EditSystemForm from '../components/EditSystemForm.vue';

export default {
  components: { EditSystemForm },
  layout: "admin",
  data() {
    return {
      showCreateForm: false,
      systems: [], // กำหนดให้ systems เป็น array เพื่อเก็บข้อมูลระบบ
      searchQuery: "", // กำหนดให้ searchQuery เป็น string เพื่อเก็บคำค้นหา
    };
  },
  methods: {
    fetchSystemsData() {
      fetch('http://localhost:7777/Systems/getall')
        .then(response => response.json())
        .then(data => {
          this.systems = data; // กำหนดค่าของ systems เมื่อข้อมูลถูกดึงมาสำเร็จ
        })
        .catch(error => {
          console.error('Error fetching systems data:', error);
        });
    },openCreateSystemForm() {
      // เปิดหน้าฟอร์มสำหรับการสร้างระบบ
     this.$router.push({ name: 'CreateSystem' });
      // คุณสามารถใช้วิธีการเปิดหน้าฟอร์มตามที่คุณได้กำหนดไว้ใน Vue Router ได้
    },
    createSystem() {
      // ตัวอย่าง method สำหรับการสร้างระบบ
      // คุณสามารถทำการสร้างระบบ โดยใช้ Axios หรือ Fetch API โดยส่งข้อมูลไปยัง API ของคุณ
      // ตัวอย่าง:
      
      axios.post('http://localhost:7777/Systems/create', {
        system_nameTH: 'ชื่อระบบ',
        system_nameEN: 'System Name',
        
      })
      .then(response => {
        console.log(response.data);
        // หลังจากสร้างระบบสำเร็จ คุณอาจต้องการเรียก method สำหรับการดึงข้อมูลระบบใหม่
        // this.fetchSystemsData();
      })
      .catch(error => {
        console.error('Error creating system:', error);
      });
      
    },
    
  },
  computed: {
    filteredSystems() {
      // กรองระบบตามคำค้นหา
      return this.systems.filter(
        (system) =>
          (system.system_name_TH &&
            system.system_name_TH
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (system.system_name_ENG &&
            system.system_name_ENG
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (system.system_id &&
            system.system_id
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
      );
    },
  },
  mounted() {
    this.fetchSystemsData(); // เรียกใช้ method เมื่อ component ถูก mount เพื่อดึงข้อมูลระบบ
  },
};
</script>

<style scoped>

</style>
