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

cssmin: {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1,
    sourceMap: true
  },
  target: {
    files: {
      'public/css/main.min.css': ['public/css/main.css']
    }
  }
},



    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js'],
        tasks: ['jshint', 'uglify']
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
      all: ['Gruntfile.js', 'src/js/**/*.js', 'api/**/*.js']
    },


    uglify: {
      dist: {
        files: {
          'public/js/scribo.min.js': ['src/js/**/*.js']
        },
        options: {
          sourceMap : true
        }
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


  grunt.registerTask('default', ['concurrent']);



};