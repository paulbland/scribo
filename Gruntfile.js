module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),



    nodemon: {
      dev: {
        script: 'server.js'
      }
    },


    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'public/css/main.css': 'src/scss/main.scss'       // 'destination': 'source'
        }
      }
    },



    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['Gruntfile.js', 'public/js/*.js', 'api/**/*.js'],
        tasks: ['jshint']
      } 
    },


    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      } 
    },



    jshint: {
      all: ['Gruntfile.js', 'public/js/*.js', 'api/**/*.js']
    }




  });

  
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', ['concurrent']);



};