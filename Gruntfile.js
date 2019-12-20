module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-version');
	grunt.initConfig({
		version: {
			options: {
				flags: ''
			},
			project: {
				src: ['package.json', 'composer.json', 'package-lock.json']
			}
		},
		php: {
			options: {
				prefix: 'THEMEISLE_GUTENBERG_ANIMATION_VERSION\', \'',
				flags: ''
			},
			project: {
				src: ['load.php']
			}
		}
	});


};
