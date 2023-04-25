<template>
    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title class="text-h5">
                บันทึกข้อมูลเสร็จแล้ว
            </v-card-title>
            <v-card-text>
                บันทึกข้อมูลเสร็จแล้ว
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                    Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="closeDialog">
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:dialog", false);
        },
    },
}
</script>

<style></style>