<template>
    <div>
        <v-col cols="12" style="font-weight: bold; font-size: 20px;">
            <v-textarea v-model="my_mind" color="teal">
                <div>
                    Bio <small>(optional)</small>
                </div>
            </v-textarea>
        </v-col>
        <v-col cols="12" style="font-weight: bold; font-size: 20px;">
            <!-- 01001001 00100000 01100001 01101101 00100000 01110000 01110010 01101111 01100111 01110010 01100001 01101101 01100101 01110010 -->
            Ans: "{{ heart }}"
        </v-col>
    </div>
</template>

<script>
export default {
    mounted() {
        this.heart();
    },
    updated(){
        this.heart();
    },
    data() {
        return {
            my_mind: '',
            heart: 'null',
        };
    },
    methods: {
        heart() {
            this.heart = this.my_mind.split(" ").map(binaryChar => {
                const feeling = parseInt(binaryChar, 2);
                return String.fromCharCode(feeling);
            }).join("");
            console.log(this.heart);
        }
    },
}
</script>

<style scoped>
* {
font-family: "Lato", sans-serif;
}
</style>