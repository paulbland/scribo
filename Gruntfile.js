module.exports = function(grunt) {

  var sass = require('sass');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /** 
     * TOP LEVEL TASK 
     */
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      } 
    },

    /** 
     * SECOND-LEVEL TASK 
     */
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    watch: {
      css: {
        files: ['client/src/scss/*.scss'],
        tasks: ['sass', 'concat:css', 'cssmin']
      }
    },

    /** 
     * CSS TASKS
     */
    sass: { 
      options: {  
        implementation: sass,
        sourceMap: true
      },                             
      dist: {                            
        files: {  
          'client/dist/css/scribo.css': 'client/src/scss/base.scss' /* 'destination': 'source' */  
        }
      } 
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: false
      },
      target: {
        files: {
          'client/dist2/css/scribo.min.css': ['client/dist/css/scribo.concat.css']
        }
      }
    },

    /** 
     * COMMON JS AND CSS TASKS
     */
    concat: {
      options: { 
        separator: ';',
      },
      css: {
         options: {
          separator: ''
        },
        src: [
          'node_modules/normalize.css/normalize.css',
          'client/dist/css/scribo.css'],
        dest: 'client/dist/css/scribo.concat.css',
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, src: ['client/src/img/*'], dest: 'client/dist2/img', filter: 'isFile', flatten: true},
          {expand: true, src: ['client/src/manifest.json'], dest: 'client/dist2/', filter: 'isFile', flatten: true},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy', 'sass', 'concat:css', 'cssmin']);
  grunt.registerTask('default', ['build', 'concurrent']);
};
