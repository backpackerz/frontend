const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
	"backpackerz-core",
	"backpackerz-components",
	"backpackerz-hooks",
	"backpackerz-datepicker",
]);

const { parsed: env } = require("dotenv").config({
	allowEmptyValues: false,
	path: path.resolve(__dirname, `config/.env.${process.env.ENVIRONMENT}`),
});

module.exports = withPlugins([withTM], {
	env,
	i18n: {
		locales: ["ko-KR", "en-US"],
		defaultLocale: "ko-KR",
		domains: [
			{
				domain: "side.com",
				defaultLocale: "ko-KR",
			},
			{
				domain: "side.com/en-US",
				defaultLocale: "en-US",
			},
		],
	},
	future: {
		webpack5: false,
	},
	webpack(config) {
		config.resolve.modules.push(__dirname);
		return config;
	},
	exportPathMap: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId },
	) {
		return {};
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	// proxy
	async rewrites() {
		if (process.env.ENVIRONMENT == "local") {
			return [
				{
					destination: env.APP_API_PROXY_DESTINATION,
					source: env.APP_API_PROXY_SOURCE,
				},
			];
		} else return [];
	},
});
