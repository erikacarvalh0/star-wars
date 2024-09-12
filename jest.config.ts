/** @type {import('jest').Config} */
const config = {
	transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
	"transform": {
		"\\.[jt]sx?$": "babel-jest",
		"\\.css$": "some-css-transformer",
	},
	moduleNameMapper: {
		'^axios$': require.resolve('axios'),
	},
};

module.exports = config;