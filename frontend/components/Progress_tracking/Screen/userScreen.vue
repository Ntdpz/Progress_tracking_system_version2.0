<template>
    <div>
        <v-data-table :headers="headers" :items="userProjects" item-key="id" class="styled-table" :items-per-page="5"
            align="center">
            <template v-slot:top>
                <v-toolbar flat class="toolbar">
                    <v-toolbar-title class="toolbar-title">
                        Screen Name: {{ screenData.screen_name }}
                    </v-toolbar-title>
                </v-toolbar>
            </template>

            <template v-slot:item.user_pic="{ item }">
                <v-img :src="item.user_pic" max-width="75" max-height="75" class="picture-img"></v-img>
            </template>

            <!-- เพิ่ม slot อื่นๆ ตามที่จำเป็น -->
        </v-data-table>
    </div>
</template>

<script>
export default {
    props: {
        screenData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            headers: [
                { text: "Picture", value: "user_pic", align: "center" },
                { text: "First Name", value: "user_firstname" },
                { text: "Last Name", value: "user_lastname" },
                { text: "Position", value: "user_position", align: "center" },
                { text: "Department", value: "user_department", align: "center" },
            ],
            userProjects: [], // ใช้ชื่อที่เหมาะสมตามข้อมูลของคุณ
        };
    },
    async created() {
        try {
            const screenId = this.screenData.id;
            const response = await this.$axios.$get(
                `/user_screens/getUserScreenByScreenId/${screenId}`
            );
            this.userProjects = response;
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style>
.styled-table thead th {
    background-color: #ffffff;
    color: #009933 !important;
    font-weight: bold !important;
    border-bottom: 2px solid black;
    font-size: 18px !important;
}

.styled-table thead th,
.styled-table tbody td {
    height: 75px !important;
}

.picture-img {
    border: 3px solid #009933;
    /* กำหนดสีและความหนาของขอบ */
    border-radius: 300px;
    /* ปรับความโค้งมนของมุมขอบ */
}

.styled-table thead th:nth-child(2),
.styled-table thead th:nth-child(3),
.styled-table thead th:nth-child(4) {
    text-align: center !important;
    /* จัดชิดกลางสำหรับคอลัมน์ 'First Name', 'Last Name', 'Position' */
}

.styled-table tbody td {
    padding: 8px;
}

.styled-table tbody td:nth-child(2),
.styled-table tbody td:nth-child(3) {
    text-align: left !important;
    /* จัดชิดซ้ายสำหรับ 'First Name' และ 'Last Name' */
}

.toolbar-title {
    color: #009933 !important;
}
</style>
