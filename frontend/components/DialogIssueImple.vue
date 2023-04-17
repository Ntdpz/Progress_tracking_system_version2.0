<template>
    <v-dialog v-model="dialog" width="90%" persistent>
        <v-card v-if="loading">
            <h1>Loading.....</h1>
        </v-card>
        <v-card v-else width="99%" class="pa-0 ma-0">
            <v-card-title class="text-h5">
                <!-- <h5>{{ ProjectName }} > {{ SystemName }} > {{ IssueName }}</h5> -->
                <h5>Imple: {{ ProjectName }} > {{ SystemName }}</h5>
            </v-card-title>
            <v-row class="pa-5">
                <v-col>
                    <v-row>
                        <v-col>
                            <p>No {{ IssueId }}</p>
                        </v-col>
                        <v-col>
                            <p>Type {{ IssueType }}</p>
                        </v-col>
                        <v-col>
                            <p>Screen {{ IssueScreenId }}</p>
                        </v-col>
                        <v-col>
                            <p>Status {{ IssueStatus }}</p>
                        </v-col>
                        <v-col>
                            <p>Priority {{ IssuePriority }}</p>
                            <v-icon style="color: #ff0000">mdi-flag-outline</v-icon>
                        </v-col>
                        <v-col> End Date {{ IssueEndDate }}</v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Name</p>
                                <v-text-field label="Issue Name" placeholder="Issue Name" outlined dense v-model="IssueName"
                                ></v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea solo name="input-7-4" label="Note" v-model="IssueDes" style=""
                            ></v-textarea></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Informer</p>
                                <v-text-field label="Issue Informer" placeholder="Issue Informer" outlined dense
                                    v-model="IssueInformer"></v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                    <!-- Type PNC option -->
                    <v-row v-if="IssueType == 'PNC'">
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Document No.</p>
                                <v-text-field label="Issue Informer" placeholder="Issue Informer" outlined dense
                                    v-model="IssueDocId"></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Customer Name</p>
                                <v-text-field label="Issue Informer" placeholder="Issue Informer" outlined dense
                                    v-model="IssueCustomer"></v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                    <!-- Type New Req option -->
                    <v-row v-if="IssueType == 'New Rep'">
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Type New Req</p>
                                <v-text-field label="Issue Informer" placeholder="Issue Informer" outlined dense
                                    v-model="IssueTypeSA"></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Note to SA</p>
                                <v-textarea solo name="input-7-4" label="Note" v-model="IssueDesSA"></v-textarea>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Assign To</p>
                                <v-chip class="ma-2" color="primary" text-color="white">
                                    <v-avatar left>
                                        <v-icon>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    {{ IssueAssign }}
                                </v-chip>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">QC</p>
                                <v-chip class="ma-2" color="primary" text-color="white">
                                    <v-avatar left>
                                        <v-icon>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    {{ IssueQC }}
                                </v-chip>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Attachments</p>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- col ใหญ่ฝั่งขวา -->
                <v-col style="width: 100%">
                    <v-row class="ml-2">
                        <v-col>
                            <v-row class="text-h6">
                                <h6>Developer Section 1</h6>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="6">
                                    <v-row>
                                        <!-- Date of accepting-->
                                        <p class="pa-2">
                                            Date of accepting / {{ dateOfAccepting != null ? dateOfAccepting :
                                                IssueAccepting }}
                                        </p>
                                        <v-menu disabled v-model="acceptMenu" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="dateOfAccepting" label="Date of Accepting"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="dateOfAccepting"
                                                @input="acceptMenu = false"></v-date-picker>
                                        </v-menu>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row> </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col>
                                            <p class="pa-2">Start date /{{ startDate != null ? startDate : IssueStart }}</p>
                                        </v-col>
                                        <v-col>
                                            <p class="pa-2">-</p>
                                        </v-col>
                                        <v-col>
                                            <p class="pa-2">
                                                Expected completion Date / {{ expectedCompletionDate != null ?
                                                    expectedCompletionDate : IssueExpected }}
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" class="mb-5">
                                    <v-row>
                                        <!-- Start date -->
                                        <v-menu disabled v-model="startMenu" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" min-width="auto" @change="calculateManday()">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="startDate" label="Start Date"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="startDate" @input="startMenu = false"
                                                @change="calculateManday()"></v-date-picker>
                                        </v-menu>
                                        <!-- Expected completion Date -->
                                        <v-menu disabled v-model="expectedMenu" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" min-width="auto" @change="calculateManday()">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="expectedCompletionDate"
                                                    label="Expected Completion Date" prepend-icon="mdi-calendar" readonly
                                                    v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="expectedCompletionDate" @input="expectedMenu = false"
                                                @change="calculateManday()"></v-date-picker>
                                        </v-menu>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-col cols="6">
                                <v-row v-if="mandayProps">
                                    <p class="pa-2">Manday</p>
                                    <v-text-field disabled label="Manday" placeholder="Manday" outlined dense
                                        v-model="IssueManday"></v-text-field>
                                </v-row>
                                <v-row v-if="mandaySeleted">
                                    <p class="pa-2">Manday (Edit)</p>
                                    <v-text-field disabled label="Manday" placeholder="Manday" outlined dense
                                        v-model="manday"></v-text-field>
                                </v-row>
                            </v-col>
                            <v-divider></v-divider>
                            <v-row class="text-h6 mt-2 mb-2">
                                <h6>Developer Section 2</h6>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-row>
                                        <p class="pa-2">Status</p>
                                        <v-text-field disabled label="Status" placeholder="Status" outlined dense
                                            v-model="IssueStatus"></v-text-field>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-row>
                                        <!-- Completion date-->
                                        <p class="pa-2">Completion date</p>
                                        <v-menu disabled v-model="completionMenu" :close-on-content-click="false" :nudge-right="40"
                                            transition="scale-transition" min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="completionDate" label="Completion date"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="completionDate"
                                                @input="completionMenu = false"></v-date-picker>
                                        </v-menu>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <p class="">Cause / Remedy</p>
                                    <v-textarea disabled solo name="input-7-4" label="Note" v-mode="IssueDesDev"></v-textarea>
                                </v-col>
                            </v-row>
                            <!-- <v-row class="justify-center mr-16 mt-5">
                                <v-btn color="primary" @click="handleClose()">Update</v-btn>
                            </v-row> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider width="50%"></v-divider>
            <v-row class="pa-5">
                <v-col>
                    <v-row class="text-h6">
                        <h6>Implements Section</h6>
                    </v-row>
                    <v-row class="mt-5">
                        <v-col cols="6">
                            <v-row>
                                <p class="pa-2">Status</p>
                                <v-text-field label="Status" placeholder="Status" outlined dense v-model="IssueStatus"
                                ></v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <p class="">Cause / Remedy</p>
                            <v-textarea solo name="input-7-4" label="Note" v-model="IssueDesImplementer"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row justify-center>
                <v-col class="" style="margin-left: 20%">
                    <v-btn color="primary" @click="saveIssue()">Update</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn color="primary" @click="handleClose()">Cancel</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
  
<script>
import moment from "moment";
export default {
    props: {
        ProjectName: String,
        ProjectId: Number,
        SystemName: String,
        SystemId: Number,
        id: {
            type: String,
            required: true,
        },
        IssueId: String,
        IssueType: String,
        IssueScreenId: Number,
        IssueStatus: String,
        IssuePriority: String,
        IssueEndDate: String,
        IssueName: String,
        IssueDesSA: String,
        IssueInformer: String,
        IssueAssign: String,
        IssueQC: String,
        IssueFilename: String,
        IssueAccepting: String,
        IssueManday: String,
        IssueStart: String,
        IssueExpected: String,
        IssueComplete: String,
        IssueDesImplementer: String,
        IssueDesDev: String,
        IssueDes: String,
        IssueDocId: String,
        IssueCustomer: String,
        IssueTypeSA: String,
        dialog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            mandayProps: true,
            mandaySeleted: false,
            completionMenu: false,
            //menu
            acceptMenu: false,
            startMenu: false,
            expectedMenu: false,
            //date
            dateOfAccepting: null,
            startDate: null,
            expectedCompletionDate: null,
            completionDate: null,
            manday: null,
            //data for update
            updateManday: "",
            updateStart: "",
            updateExpected: "",
            updatedateOfAccepting: "",
            updatedateOfStart: "",
            updatedateOfExpectedCompletion: "",
            updateCompletion: "",
        };
    },
    updated() {
        console.log("form", this.updateStart, this.updateExpected);
        // console.log("form", this.form);
    },
    methods: {
        calculateManday() {
            const start = moment(this.startDate);
            const end = moment(this.expectedCompletionDate);
            const days = end.diff(start, "days");
            this.mandaySeleted = true;
            this.mandayProps = false;
            this.manday = days;
        },
        async saveIssue() {
            this.updateManday = this.manday === null ? this.IssueManday : this.manday;
            this.updateStart =
                this.start === null
                    ? moment(this.IssueStart).format("YYYY-MM-DD")
                    : this.startDate;
            this.updateExpected =
                this.start === null
                    ? moment(this.IssueExpected).format("YYYY-MM-DD")
                    : this.expectedCompletionDate;
            this.updatedateOfAccepting =
                this.dateOfAccepting === null
                    ? moment(this.IssueAccepting).format("YYYY-MM-DD")
                    : this.dateOfAccepting;
            this.updatedateOfStart =
                this.startDate === null
                    ? moment(this.IssueStart).format("YYYY-MM-DD")
                    : this.startDate;
            this.updatedateOfExpectedCompletion =
                this.expectedCompletionDate === null
                    ? moment(this.IssueExpected).format("YYYY-MM-DD")
                    : this.expectedCompletionDate;
            this.updateCompletion =
                this.completionDate === null
                    ? moment(this.IssueComplete).format("YYYY-MM-DD")
                    : this.completionDate;

            let formData = new FormData();
            formData.append("screen_id", this.IssueScreenId);
            formData.append("system_id", this.SystemId);
            formData.append("project_id", this.ProjectId);
            formData.append("issue_name", this.IssueName);
            formData.append("issue_id", this.IssueId);
            formData.append("issue_type", this.IssueType);
            formData.append("issue_informer", this.IssueInformer);
            formData.append("issue_priority", this.IssuePriority);
            formData.append("issue_end", this.IssueEndDate);
            formData.append("issue_assign", this.IssueAssign);
            formData.append("issue_qc", this.IssueQC);
            formData.append("issue_des", this.IssueDes);
            formData.append("issue_des_sa", this.IssueDesSA);
            formData.append("issue_type_sa", this.IssueTypeSA);
            formData.append("issue_doc_id", this.IssueDocId);
            formData.append("issue_customer", this.IssueCustomer);
            formData.append("issue_filename", this.IssueFilename);
            formData.append("issue_des_dev", this.IssueDesDev);
            formData.append("issue_des_implementer", this.IssueDesImplementer);
            formData.append("issue_start", this.updatedateOfStart);
            formData.append("issue_expected", this.updatedateOfExpectedCompletion);
            formData.append("issue_status", this.IssueStatus);
            formData.append("issue_accepting", this.updatedateOfAccepting);
            formData.append("issue_manday", this.updateManday);
            formData.append("issue_complete", this.updateCompletion);
            try {
                await this.$axios.put("/issues/updateIssueAdmin/" + this.id, formData);
                console.log("pout success");
                window.location.reload();
                const promise = new Promise((resolve, reject) => {
                    resolve();
                    this.close();
                });
                promise.then(() => {
                    setTimeout(() => {
                        alert("success");
                    }, 2000);
                });
            } catch (error) {
                console.error(error);
                alert("Error submitting form");
            }
        },
        handleClose() {
            this.$emit("update:dialog", false);
        },
    },
};
</script>

<style scoped>* {
    font-family: "Lato", sans-serif;
}</style>