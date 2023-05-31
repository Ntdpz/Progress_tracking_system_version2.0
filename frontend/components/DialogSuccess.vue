<template >
    <v-dialog v-model="dialog" persistent max-width="400px" max-height="100%" class="">
        <v-card width="100%" max-height="100%">
            <v-row class="ma-0 pa-0" style="place-content: center;">
                <v-card-title>
                    <v-icon size="100px" color="success">mdi-check-circle-outline</v-icon>
                </v-card-title>
            </v-row>
            <v-row class="ma-0 pa-0" style="place-content: center;">
                <v-card-title class="text-h4">
                    {{ title }}
                </v-card-title>
            </v-row>
            <v-card-actions style="place-content: center;">
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="success" dark @click="closeDialog" rounded>
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
        title:String,
    },
    methods: {
        closeDialog() {
            this.$emit("update:dialog", false);
        },
    },
}
</script> 

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 147px;
    /* padding: 0 16px; */
}
</style>