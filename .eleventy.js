
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets/css/main.css");

	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
};
