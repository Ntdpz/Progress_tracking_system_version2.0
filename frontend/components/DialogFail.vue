<template >
    <v-dialog v-model="dialog" persistent max-width="400px" max-height="100%">
        <v-card width="100%" max-height="100%">
            <v-row class="ma-0 pa-0" style="place-content: center;">
                <v-card-title>
                    <v-icon size="50px" color="error">mdi-alert-circle-outline</v-icon>
                </v-card-title>
            </v-row>
            <v-row class="ma-0 pa-0" style="place-content: center;">
                <v-card-title class="text-h5">
                    {{ title }}
                </v-card-title>
            </v-row>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="closeDialog">
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
        title: String,
    },
    methods: {
        closeDialog() {
            this.$emit("update:dialog", false);
        },
    },
}
</script> 