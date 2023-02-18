<template>
    <div>
        <img src="~/../images/1.jpg" />
        <img :src="require(`~/images/1.jpg`)" />
        <img src="~/../uploads/1.jpg" />
        <img :src="require(`~/uploads/1.jpg`)" />
        <h1>hello</h1>
        <h1>{{ data }}</h1>
        <h2>{{ data_position }}</h2>
    </div>
</template>

<script>
const URL = "http://localhost:7777";
export default {
    data() {
        return {
            data: [],
            data_position:[],
        };
    },
    created() {
        this.getAll();
        this.getPosition_Developer();
    },
    methods: {
        getAll() {
            this.$axios.get(URL + "/users/getAll").then((data) => {
                this.data = data.data;
                console.log(data.data);
            });
        },
        getPosition_Developer() {
            this.$axios.get(URL + "/users/getAll?user_position=Developer").then((data) => {
                this.data_position = data.data;
                console.log(data.data);
            });
        },

    },
}
</script>

<style></style>