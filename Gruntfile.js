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
        files: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js', 'src/templates/*.hbs'],
        tasks: ['jshint', 'handlebars', 'concat:js', 'uglify']
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
          'dist/css/scribo.css': 'src/scss/base.scss'       // 'destination': 'source'
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
          'dist/css/scribo.min.css': ['dist/css/scribo.concat.css']
        }
      }
    },

   



    /** 
     * JS TASKS
     */
    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js']
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'scribo.templates',
          // convert file path into a function name 
          processName: function(filePath) {
            var pieces = filePath.split('/');
            return pieces[pieces.length - 1].split('.')[0];
          }
        },
        files: {
          'dist/js/templates.js': 'src/templates/*.hbs'
        }
      }
    },

    uglify: {
      dist: { 
        files: {
          'dist/js/scribo.min.js': ['dist/js/scribo.js']
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
          'bower_components/Sortable/Sortable.js',
          'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js',
          'bower_components/handlebars/handlebars.js',
          'dist/js/templates.js',
          'src/js/**/*.js'],
        dest: 'dist/js/scribo.js',
      },
      css: {
         options: {
                    separator: ''
                },
        src: [
          'bower_components/normalize-css/normalize.css',
          'dist/css/scribo.css'],
        dest: 'dist/css/scribo.concat.css',
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
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('build', ['sass', 'concat:css', 'cssmin', 'jshint', 'handlebars', 'concat:js', 'uglify']);
  grunt.registerTask('default', ['build', 'concurrent']);

};