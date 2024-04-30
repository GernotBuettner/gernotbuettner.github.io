
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/fonts/pp-neue-machina-plain-light.otf");
	eleventyConfig.addPassthroughCopy("src/assets/fonts/pp-neue-machina-plain-regular.otf");
	eleventyConfig.addPassthroughCopy("src/assets/fonts/pp-neue-machina-plain-ultra-bold.otf");

	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
};
