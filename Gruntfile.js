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
            css: {
                src: ['src/less/giffgaff.less'],
                dest: 'src/css/<%= pkg.name %>.css'
            },
            min: {
                options: {
                    compress: true
                },
                src: ['src/less/giffgaff.less'],
                dest: 'src/css/<%= pkg.name %>.min.css'
            }
        },

        glue: {
            icons: {
                src: 'assets/icons/*',
                options: '--css=src/less/sprites --img=src/images/sprites --less --url=../images/sprites/ --namespace=icon --margin=10 --optipng'
            }
        },

        // Copy files not handled in other tasks here
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/', 
                    src: [
                        'css/*',
                        'images/**'
                    ], 
                    dest: 'build/'
                }]
            }
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-glue');

    // CSS distribution task.
    grunt.registerTask('build-css', [
        'glue',
        'recess'
    ]);

    grunt.registerTask('build', [
        'build-css',
        'uglify',
        'copy:src'
    ]);

    // Default task(s).
    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};