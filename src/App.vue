<template>
  <ActivityCalendar endDate="123" />
</template>

<script>
import ActivityCalendar from "./components/ActivityCalendar";
export default {
  name: "App",
  components: {
    ActivityCalendar,
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
