module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.base.json", "./packages/**/tsconfig.json"],
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "prettier", "testing-library"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
	],
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	ignorePatterns: [
		".eslintrc.js",
		"next.config.js",
		"dist/*.js",
		"src/stories/**/*.svg",
		"src/stories/**/*.css",
		"src/stories/**/*.mdx",
	],
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/ban-types": 0,
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"react/prop-types": 0,
		"react/react-in-jsx-scope": 1,
		"linebreak-style": ["error", "windows"],
		"prettier/prettier": [
			"error",
			{ singleQuote: false, parser: "babel-ts", semi: true },
		],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	overrides: [
		{
			files: [
				"**/__tests__/**/*.[jt]s?(x)",
				"**/?(*.)+(spec|test).[jt]s?(x)",
			],
			env: {
				jest: true,
			},
			extends: ["plugin:testing-library/react"],
			plugins: ["jest"],
			rules: {
				"jest/no-disabled-tests": "warn",
				"jest/no-focused-tests": "error",
				"jest/no-identical-title": "error",
				"jest/prefer-to-have-length": "warn",
				"jest/valid-expect": "error",
			},
		},
	],
};
