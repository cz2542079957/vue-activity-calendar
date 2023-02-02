import ActivityCalendar from "./ActivityCalendar.vue";

const components = [ActivityCalendar];

// 批量组件注册
const install = function (Vue) {
	components.forEach((com) => {
		Vue.component(com.__name, com);
	});
};

export default install;
export { ActivityCalendar };
