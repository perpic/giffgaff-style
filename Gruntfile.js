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
      },
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
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  grunt.registerTask('build', [
    'dist-css',
    'uglify'
  ]);

  // Default task(s).
  grunt.registerTask('default', [
    'build'
  ]);
};