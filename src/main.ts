import { createApp } from "vue";
import App from "./App.vue";

//引入文件
import ActivityCalendar from "./package";

const app = createApp(App);
app.use(ActivityCalendar);
app.mount("#app");
