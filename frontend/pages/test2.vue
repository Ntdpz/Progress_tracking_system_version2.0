<template>
    <div class="calendar">
        <h1>{{ month }} {{ year }}</h1>
        <table>
            <thead>
                <tr>
                    <th v-for="day in days" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in weeks" :key="week">
                    <td v-for="day in week" :key="day" class="day-cell">
                        <div v-if="day" class="day">
                            <div class="day-number">{{ day }}</div>
                            <div class="day-line"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    layout: 'admin',
    data() {
        return {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            month: "",
            year: "",
            weeks: []
        };
    },
    created() {
        const now = new Date();
        this.month = now.toLocaleString("default", { month: "long" });
        this.year = now.getFullYear();
        this.weeks = this.getWeeks(now.getMonth(), now.getFullYear());
    },
    methods: {
        getWeeks(month, year) {
            const weeks = [];
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let day = 1;
            for (let i = 0; i < 6; i++) {
                const week = [];
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDayOfMonth) {
                        week.push(null);
                    } else if (day > daysInMonth) {
                        week.push(null);
                    } else {
                        week.push(day);
                        day++;
                    }
                }
                weeks.push(week);
            }
            return weeks;
        }
    }
};
</script>
<style scoped>
.calendar {
  /* font-size: 2em; */
  width: 80%;
  height: 80%;
  /* display: flex;
  flex-direction: column; */
  justify-content: center;
  align-items: center;
  /* margin: 0;
  padding: 0; */
  /* overflow: hidden; */
}

table {
    border-collapse: collapse;
    width: 70%;
}

th,
td {
    text-align: center;
    padding: 1em;
}

th {
    font-size: 1.2em;
    text-transform: uppercase;
}

.day-cell {
    border: 1px solid #ddd;
}

.day {
    position: relative;
    height: 4em;
}

.day-number {
    /* position: absolute; */
    top: 0.5em;
    left: 0.5em;
}

.day-line {
    /* position: absolute; */
    bottom: 0.5em;
    left: 0.5em;
    width: calc(100% - 1em);
    height: 2px;
    /* background-color: #ddd; */
}

* {
    font-family: "Lato", sans-serif;
}
</style>