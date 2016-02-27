module.exports = function(grunt) {

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
        script: 'server.js'
      }
    },

    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass', 'concat:css', 'cssmin']
      },
      js: {
        files: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js'],
        tasks: ['jshint', 'concat:js', 'uglify']
      } 
    },



    /** 
     * CSS TASKS
     */
    sass: {                              
      dist: {                            
        options: {  
          style: 'expanded'
        },
        files: {                         
          'public/css/scribo.css': 'src/scss/base.scss'       // 'destination': 'source'
        }
      } 
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true
      },
      target: {
        files: {
          'public/css/scribo.min.css': ['public/css/scribo.concat.css']
        }
      }
    },

   



    /** 
     * JS TASKS
     */
    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js']
    },

    uglify: {
      dist: { 
        files: {
          'public/js/scribo.min.js': ['public/js/scribo.js']
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
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jquery-ui/jquery-ui.js', 
          'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js',
          'bower_components/handlebars/handlebars.js',
          'src/js/**/*.js'],
        dest: 'public/js/scribo.js',
      },
      css: {
         options: {
                    separator: ''
                },
        src: [
          'bower_components/normalize-css/normalize.css',
          'public/css/scribo.css'],
        dest: 'public/css/scribo.concat.css',
      }
    }

  });

  
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concurrent']);

};