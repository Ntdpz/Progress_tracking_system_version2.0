<template>
    <v-row class="fill-height">
        <v-col class="mt-0 pt-0">
            <v-sheet height="64">
                <v-toolbar flat>
                    <template>
                        <v-banner class="mt-0 ml-4" style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 30px;
                                border-radius: 30px;
                                padding: 0 0px;
                              " outlined elevation="2">
                            <form class="center">
                                <v-icon color="purple">mdi-magnify</v-icon>
                                <input class="mr-3" type="text" v-model="query" placeholder="Search some task" />
                            </form>
                        </v-banner>
                    </template>

                    <v-divider class="mr-4 ml-4" inset vertical style="background-color:black;"></v-divider>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-toolbar-title v-else>
                        {{ months }} {{ years }}
                    </v-toolbar-title>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>
                            mdi-chevron-left
                        </v-icon>
                    </v-btn>
                    <v-btn outlined class="" color="grey darken-2" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-chip>
                        <v-chip @click="(ClickDay()), (type = 'day')" style="border: none;" :style="{
                            backgroundColor: colorday ? '#883cfe' : null,
                            color: colorday ? 'white' : 'black',
                        }" class="mr-2">
                            Day
                        </v-chip>
                        <v-chip class="mr-2" @click="(ClickWeek()), type = 'week'" style="border: none;" :style="{
                            backgroundColor: colorweek ? '#883cfe' : null,
                            color: colorweek ? 'white' : 'black',
                        }">
                            Week
                        </v-chip>
                        <v-chip class="mr-2" @click="(ClickMonth()), type = 'month'" style="border: none;" :style="{
                            backgroundColor: colormonth ? '#883cfe' : null,
                            color: colormonth ? 'white' : 'black',
                        }">
                            Month
                        </v-chip>
                        <v-chip class="mr-2" @click="(Click4Day()), type = '4day'" style="border: none;" :style="{
                            backgroundColor: color4day ? '#883cfe' : null,
                            color: color4day ? 'white' : 'black',
                        }">
                            4 Day
                        </v-chip>
                    </v-chip>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="500">
                <v-calendar ref="calendar" v-model="focus" color="primary" :type="type">
                </v-calendar>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>
export default {
    layout: "Nav",
    data() {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        console.log(month);
        const today = new Date();
        const months = today.getMonth() + 1;
        const year = today.getFullYear();
        return {
            colorday: false,
            colorweek: false,
            colormonth: false,
            color4day: false,
            months: month,
            years: year,
            query: '',
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
        }
    },
    mounted() {
        this.$refs.calendar.checkChange()
    },

    methods: {
        ClickDay() {
            this.colorday = !this.colorday;
            this.colorweek = false;
            this.colormonth = false;
            this.color4day = false;
        },
        ClickWeek() {
            this.colorweek = !this.colorweek;
            this.colorday = false;
            this.colormonth = false;
            this.color4day = false;
        },
        ClickMonth() {
            this.colormonth = !this.colormonth;
            this.colorday = false;
            this.colorweek = false;
            this.color4day = false;
        },
        Click4Day() {
            this.color4day = !this.color4day;
            this.colorday = false;
            this.colorweek = false;
            this.colormonth = false;
        },
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
    },
}
</script>
<style scoped>
input[type="text"] {
    border: black;
    font-size: 16px;
    padding-left: 10px;
    outline: black;
}
</style>