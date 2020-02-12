module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'jest-transform-stub',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js'],
	setupFiles: ['./src/setupTests.js'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
};
