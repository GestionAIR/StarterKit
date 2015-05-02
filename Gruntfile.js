module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'js/main.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		less: {
			dev: {
				files: {
					"css/main.css": "less/main.less"
				}
			},
			prod: {
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
		concat: {
			main: {
				src: ['vendor/jquery/dist/jquery.js',
					'vendor/bootstrap/dist/js/bootstrap.js',
					'js/*.js'],
				dest: 'js/<%= pkg.name %>-<%= pkg.version %>.js'
			},
			ieSupport: {
				src: ['vendor/html5shiv/dist/html5shiv.js',
					'vendor/respond/dest/respond.js'],
				dest: 'js/<%= pkg.name %>-<%= pkg.version %>-ie-support.js'
			}
		},
		uglify : {
			js: {
				files: {
					'js/<%= pkg.name %>-<%= pkg.version %>.js' : [ 'js/<%= pkg.name %>-<%= pkg.version %>.js' ],
					'js/<%= pkg.name %>-<%= pkg.version %>-ie-support.js' : ['js/<%= pkg.name %>-<%= pkg.version %>-ie-support.js']
				}
			}
		},
		connect: {
			localhost: {
				options: {
					port: 9001,
					open: {
						target: 'http://localhost:9001/'
					},
					keepalive:true,
					base: [''],
					livereload: false,
					hostname: 'localhost',
				}
			},
			dev: {
				options: {
					port: 9001,
					open: {
						target: 'http://localhost:9001/'
					},
					keepalive: false,
					base: [''],
					livereload: false,
					hostname: 'localhost',
				}
			}
		},
		delta: {
			options: {
				livereload: true,
			},
			less: {
				files: 'less/*.less',
				tasks: ['less:dev'],
			},
			script: {
				files: 'js/*.js',
				tasks: ['jshint', 'concat']
			},
			html: {
				files: ['index.html'],
				tasks: []
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['jshint', 'less:dev', 'concat', 'connect:localhost']);
	grunt.registerTask('prod', ['jshint', 'less:prod', 'concat', 'uglify:js']);

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask('watch', ['jshint', 'less:dev', 'concat', 'connect:dev', 'delta']);

};
