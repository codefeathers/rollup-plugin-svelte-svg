export default {
	input: "src/index.js",
	output: {
		sourcemap: true,
		format: "cjs",
		file: "dist/index.js",
	},
	external: ["path", "os", "rollup-pluginutils", "svelte/compiler"],
};
