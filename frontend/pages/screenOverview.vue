<template>
    <!-- Dashboard container -->
    <div class="dashboard" style="
      background-color: #ffffff;
      padding: 10px 70px;
      border-radius: 0;
      margin-right: 30px;
    ">
        <!-- Greeting and current date/time -->
        <v-row no-gutters class="mt-4">
            <v-col class="text-left" style="margin-right: 16px">
                <h1 class="text-01">
                    <v-btn icon @click="handleIconClick" color="#9747FF">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    System Name
                </h1>
            </v-col>

            <!-- Buttons for creating a screen and showing all screen -->
            <v-col cols="6" class="text-right">
                <v-btn @click="handleIconClick" color="#9747FF">
                    <router-link to="/screen/createScreen" style="color: #9747ff">
                        <span style="margin: 0; color: #ffffff">Create Screen</span>
                    </router-link>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Search bar -->
        <v-row no-gutters>
            <v-col cols="12">
                <input type="text" v-model="searchQuery" placeholder="Search..." style="
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          " />
            </v-col>
        </v-row>

        <!-- Screen data table -->
        <v-data-table :headers="headers" :items="filteredScreens" :search="searchQuery">
            <template v-slot:items="props">
                <td>{{ props.item.screen_code }}</td>
                <td>{{ props.item.screen_name_ENG }}</td>
                <td>{{ props.item.screen_name_TH }}</td>
                <td>{{ props.item.screen_progress }}%</td>
                <td>{{ props.item.screen_plan_start }}</td>
                <td>{{ props.item.screen_plan_end }}</td>
                <td>
                    <!-- Buttons for editing, deleting, and showing Screen details -->
                    <v-btn @click="editScreen(props.item)">Edit</v-btn>
                    <v-btn @click="deleteScreen(props.item)">Delete</v-btn>
                    <v-btn @click="showScreenDetails(props.item)">Details</v-btn>
                    <!-- เพิ่มปุ่มสำหรับแสดงรายละเอียด -->
                </td>
            </template>
        </v-data-table>

        <!-- Edit Screen Form Dialog -->
        <v-dialog v-model="editDialog" max-width="600">
            <v-card>
                <v-card-title>Edit Screen</v-card-title>
                <v-card-text>
                    <!-- Form to edit Screen details -->
                    <v-form @submit.prevent="saveEditedScreen">
                        <!-- Include form fields for editing screen details -->
                        <v-text-field v-model="editedScreen.screen_name_TH" label="Screen Name (TH)"></v-text-field>
                        <v-text-field v-model="editedScreen.screen_name_ENG" label="Screen Name (ENG)"></v-text-field>
                        <!-- Button to save changes -->
                        <v-btn type="submit">Save Changes</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- ScreenDetails Dialog -->
        <v-dialog v-model="detailsDialog" max-width="600">
            <v-card v-if="selectedScreen">
                <v-card-title>Screen Details</v-card-title>
                <v-card-text>
                    <!-- Include Screen details here -->
                    <ul>
                        <li>Screen Name (TH): {{ selectedScreen.screen_name_TH }}</li>
                        <li>Screen Name (ENG): {{ selectedScreen.screen_name_ENG }}</li>
                        <!-- Add more details as needed -->
                    </ul>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "ScreenManagement",
    layout: 'admin',
    data() {
        return {
            detailsDialog: false,
            selectedScreen: null,
            greeting: "",
            currentDateTime: "",
            editDialog: false,
            editedScreen: { screen_name_TH: "", screen_name_ENG: "" },
            screens: [], // โครงการทั้งหมด
            searchQuery: "", // Search query
            headers: [
                { text: "Screen Code", value: "screen_code" },
                { text: "Screen Name (ENG)", value: "screen_name_ENG" },
                { text: "Screen Name (TH)", value: "screen_name_TH" },
                { text: "Progress (%)", value: "screen_progress" },
                { text: "Planned Start", value: "screen_plan_start" },
                { text: "Planned End", value: "screen_plan_end" },
                { text: "Actions", value: "actions", sortable: false },
            ],
        };
    },
    methods: {
        showScreenDetails(screen) {
            this.selectedScreen = screen;
            this.detailsDialog = true;
        },
        handleIconClick() {
            // Add your logic for icon click
        },
        handleButtonClick() {
            // Add your logic for button click
        },
        editScreen(screen) {
            this.editedScreen = { ...screen };
            this.editDialog = true;
        },

        async saveEditedScreen() {
            try {
                const response = await fetch(
                    `http://localhost:7777/screens/createScreen/${this.editedScreen.screen_id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(this.editedScreen),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to update screen");
                }

                // Handle success
                console.log("Screen updated successfully");

                // Show success message using SweetAlert2
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Screen updated successfully",
                });

                // Redirect back to the previous page
                this.$router.go(); // Go back to the previous page
            } catch (error) {
                console.error("Error updating Screen:", error);
                // Handle error
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update screen",
                });
            }
        },

        async deleteScreen(screen) {
            try {
                // Display a confirmation SweetAlert before proceeding with deletion
                const confirmResult = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                });

                if (confirmResult.isConfirmed) {
                    // User confirmed, proceed with deletion
                    const response = await fetch(
                        `http://localhost:7777/screens/delete/${screen.screen_id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to delete screen");
                    }

                    console.log("Screen deleted successfully");

                    // Display Sweet Alert for successful screen deletion
                    await Swal.fire(
                        "Success",
                        "Screen deleted successfully.",
                        "success"
                    );

                    // Fetch updated screen list
                    this.fetchScreens();
                }
            } catch (error) {
                console.error("Error deleting screen:", error);

                // Display Sweet Alert for error during screen deletion
                await Swal.fire(
                    "Error",
                    "An error occurred during the screen deletion process.",
                    "error"
                );
            }
        },

        async fetchScreens() {
            try {
                const response = await fetch("http://localhost:7777/screens/getAll");
                if (!response.ok) {
                    throw new Error("Failed to fetch screens");
                }
                const data = await response.json();
                this.screens = data;
            } catch (error) {
                console.error("Error fetching screen:", error);
            }
        },

        updateDateTime() {
            const now = new Date();
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            };

            this.greeting = this.getGreeting(now);
            this.currentDateTime = now.toLocaleDateString("en-US", options);
        },

        getGreeting(date) {
            const hour = date.getHours();

            if (hour >= 0 && hour < 12) {
                return "Good Morning";
            } else if (hour >= 12 && hour < 18) {
                return "Good Afternoon";
            } else {
                return "Good Evening";
            }
        },
    },
    computed: {
        // Filtered screen based on search query
        filteredScreens() {
            return this.screens.filter(
                (screen) =>
                    (screen.creen_name_TH &&
                        screen.screen_name_TH
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase())) ||
                    (screen.screen_name_ENG &&
                        screen.screen_name_ENG
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase())) ||
                    (screen.screen_id &&
                        screen.screen_id
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()))
            );
        },
    },

    mounted() {
        this.updateDateTime();
        this.fetchScreens();
        setInterval(this.updateDateTime, 1000);
    },
};
</script>

<style scoped>
.text-01 {
    color: black !important;
}

.screen-manager {
    color: #3f51b5;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
}

.screen-code {
    text-transform: uppercase;
    font-weight: bold;
    color: #6c757d;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
}

.tracking-work-card {
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(255, 253, 253, 0.1);
    transition: transform 0.3s ease-in-out;
    background-color: #9747ff;
}

.tracking-work-card:hover {
    transform: translateY(-5px);
}

.tracking-work-card h2 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.work-item p {
    margin-bottom: 5px;
}

.work-item p:last-child {
    margin-bottom: 0;
}

.v-card-actions {
    padding: 10px;
    justify-content: space-between;
}

.screen-button {
    color: #9747ff !important;
    background-color: #ffffff !important;
    font-weight: bold;
}

.screen-title {
    display: flex;
    flex-direction: column;
}

.screen-title h2 {
    margin-bottom: 5px;
    /* ปรับขนาดของระยะห่างระหว่างข้อมูล */
}

.router-link-underline {
    text-decoration: none;
    /* นำเส้นใต้ออก */
}

.router-link-underline:hover {
    text-decoration: underline;
    /* นำเส้นใต้กลับมาเมื่อเมาส์ไปวางทับ */
}
</style>
