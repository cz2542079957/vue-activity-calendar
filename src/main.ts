import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import ActivityCalendar from "vue-activity-calendar";
import "vue-activity-calendar/style.css";
// import ActivityCalendar from "./components/index.js";

var app = createApp(App);
app.use(ActivityCalendar);

app.mount("#app");
