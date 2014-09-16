/* global module */
module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
		},
		less: {
			development: {
				files: {
					'assets/css/main.css': 'assets/css/main.less'
				}
			},
			production: {
				options: {
					cleancss: true,
				},
				files: {
					'assets/css/main.css': 'assets/css/main.less'
				}
			}
		},
		watch: {
			scripts: {
				files: '**/*.js',
				tasks: ['jshint']
			},
			css: {
				files: 'assets/css/**/*.less',
				tasks: ['dev']
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: '<%= pkg.name %>'
			}
  		},
  		notify: {
  			less: { options: {
  				title: 'Less CSS compilation',
  				message: 'Success!'
  			}}
  		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');


	grunt.task.run('notify_hooks');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('dev', ['less:development', 'notify:less']);
};