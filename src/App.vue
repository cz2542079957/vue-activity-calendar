<template>
    <div>
        <ActivityCalendar
            :data="data"
            endDate="2022-10-05"
            :width="40"
            :height="7"
            :cellLength="20"
            :cellInterval="10"
            :colors="colors"
            :cellBorderRadius="4"
            :showWeekDayFlag="true"
            :clickEvent="f"
            :fontSize="16"
        />
    </div>
</template>
  
<script>
export default {
    name: "App",
    setup() {
        return {
            data: [
                { date: "2022-08-02", count: 2 },
                { date: "2022-08-03", count: 3 },
                { date: "2022-08-04", count: 1 },
                { date: "2022-08-05", count: 0 },
                { date: "2022-08-06", count: 0 },
                { date: "2022-08-07", count: 0 },
                { date: "2022-08-08", count: 6 },
                { date: "2022-08-15", count: 6 },
                { date: "2022-08-22", count: 6 },
                { date: "2022-08-29", count: 16 },
                { date: "2022-09-05", count: 6 },
                { date: "2022-09-28", count: 6 },
                { date: "2022-09-22", count: 16 },
                { date: "2022-09-23", count: 5 },
                { date: "2022-09-24", count: 6 },
                { date: "2022-08-04", count: 4 },
                { date: "2022-08-02", count: 6 },
                { date: "2022-08-10", count: 4 },
                { date: "2022-08-11", count: 6 },
                { date: "2022-08-17", count: 4 },
                { date: "2022-03-23", count: 26 },
                { date: "2022-03-24", count: 6 },
                { date: "2022-03-25", count: 26 },
                { date: "2022-03-26", count: 6 },
                { date: "2022-03-27", count: 6 },
                { date: "2022-03-28", count: 6 },
                { date: "2022-08-19", count: 6 },
                { date: "2022-08-23", count: 6 },
                { date: "2022-08-27", count: 6 },
                { date: "2022-08-28", count: 0 },
                { date: "2022-08-29", count: 6 },
                { date: "2022-08-22", count: 6 },
                { date: "2022-08-30", count: 0 },
                { date: "2022-07-08", count: 6 },
                { date: "2022-01-01", count: 0 },
                { date: "2022-01-09", count: 6 },
                { date: "2022-01-16", count: 6 },
                { date: "2022-01-22", count: 6 },
                { date: "2022-01-28", count: 6 },
                { date: "2022-02-03", count: 6 },
                { date: "2022-02-09", count: 6 },
                { date: "2022-07-16", count: 6 },
                { date: "2022-07-24", count: 6 },
                { date: "2022-02-15", count: 16 },
                { date: "2022-02-21", count: 6 },
                { date: "2022-03-21", count: 16 },
                { date: "2022-03-22", count: 6 },
                { date: "2022-03-31", count: 16 },
                { date: "2022-04-03", count: 6 },
                { date: "2022-04-07", count: 6 },
                { date: "2022-04-04", count: 16 },
                { date: "2022-04-10", count: 6 },
                { date: "2022-04-11", count: 6 },
                { date: "2022-04-14", count: 6 },
                { date: "2022-04-17", count: 6 },
                { date: "2022-04-18", count: 6 },
                { date: "2022-04-21", count: 6 },
                { date: "2022-04-24", count: 16 },
                { date: "2022-04-25", count: 6 },
                { date: "2022-04-28", count: 16 },
                { date: "2022-05-01", count: 6 },
                { date: "2022-05-02", count: 6 },
                { date: "2022-05-05", count: 6 },
                { date: "2022-05-08", count: 6 },
                { date: "2022-05-09", count: 6 },
                { date: "2022-05-07", count: 6 },
                { date: "2022-05-15", count: 6 },
            ],

            colors: [
                "#f5f5f5",
                "#fed5cd",
                "#feb3a4",
                "#ff9580",
                "#f7785f",
                "#ff4824",
            ],
            f(item) {
                console.log(item);
            },
        };
    },
};
</script>
  
  <style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>