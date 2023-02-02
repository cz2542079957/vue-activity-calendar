import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
	build: {
		outDir: "release",
		lib: {
			entry: path.resolve(__dirname, "./src/components/index.js"),
			name: "vue-activity-calendar",
			fileName: "vue-activity-calendar",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
