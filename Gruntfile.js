module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'js/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"css/main.css": "less/main.less"
				}
			}
		},
		uglify : {
			js: {
				files: {
					'js/main.min.js' : [ 'js/main.js' ]
				}
			}
		},
		watch: {
			files: ['Gruntfile.js', 'less/*', 'js/*.js'],
			tasks: ['jshint', 'less']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'less']);
	grunt.registerTask('prod', ['jshint', 'less', 'uglify:js']);

};
