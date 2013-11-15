'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * giffgaff styleguide v<%= pkg.version %> by @perpic\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' */\n\n',
        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['recess']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/js/{,*/}*.js'
            ]
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/<%= pkg.name %>.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        
        recess: {
            options: {
                compile: true,
                banner: '<%= banner %>'
            },
            bootstrap: {
                src: ['src/less/giffgaff.less'],
                dest: 'build/css/<%= pkg.name %>.css'
            },
            min: {
                options: {
                    compress: true
                },
                src: ['src/less/giffgaff.less'],
                dest: 'build/css/<%= pkg.name %>.min.css'
            }
        },

        glue: {
            icons: {
                src: 'assets/icons/*',
                options: '--css=src/less/sprites --img=src/images/sprites --less --namespace=icon --margin=10 --optipng'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-glue');

    // CSS distribution task.
    grunt.registerTask('dist-css', [
        'glue',
        'recess'
    ]);

    grunt.registerTask('build', [
        'dist-css',
        'uglify'
    ]);

    // Default task(s).
    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};