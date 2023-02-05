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
                            <form class="center" @submit.prevent="search">
                                <v-icon color="purple">mdi-magnify</v-icon>
                                <input class="mr-3" type="text" v-model="query" placeholder="Search some task" />
                            </form>
                        </v-banner>
                    </template>

                    <v-divider class="mr-4 ml-4" inset vertical style="background-color:black;"></v-divider>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
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
                        <v-chip class="mr-2" @click="(type = 'day')">
                            Day
                        </v-chip>
                        <v-chip class="mr-2" @click="type = 'week'">
                            Week
                        </v-chip>
                        <v-chip class="mr-2" @click="type = 'month'">
                            Month
                        </v-chip>
                        <v-chip class="mr-2" @click="type = '4day'">
                            4 Day
                        </v-chip>
                    </v-chip>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="500">
                <v-calendar ref="calendar" v-model="focus" color="primary" :type="type" @click:date="viewDay">
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
        return {
            month: month,
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
    created() {
    },
    methods: {
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
        updateRange({ start, end }) {
            const events = []
            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = this.rnd(days, days + 20)

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
            }
            this.events = events
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
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