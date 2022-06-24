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
      },
      js: {
        files: ['Gruntfile.js', 'client/src/js/**/*.js', 'api/**/*.js', 'client/src/templates/*.hbs'],
        tasks: ['concat:js', 'uglify']
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
     * JS TASKS
     */
    uglify: {
      dist: { 
        files: {
          'client/dist/js/scribo.min.js': ['client/dist/js/scribo.js']
        },
        options: {
          sourceMap : true 
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
      js: {
        src: [
          'node_modules/jquery/dist/jquery.js', 
          'node_modules/sortablejs/Sortable.js', 
          'node_modules/underscore/underscore.js',
          'node_modules/backbone/backbone.js',
          'client/dist/js/templates.js',
          'client/src/js/**/*.js'],
        dest: 'client/dist/js/scribo.js',
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy', 'sass', 'concat:css', 'cssmin', 'concat:js', 'uglify']);
  grunt.registerTask('default', ['build', 'concurrent']);

};