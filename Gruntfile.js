module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },  

    copy: {
      main: {
        files: [
          {expand: true, src: ['client/src/img/*'], dest: 'client/dist/img', filter: 'isFile', flatten: true},
          {expand: true, src: ['client/src/manifest.json'], dest: 'client/dist/', filter: 'isFile', flatten: true},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy']);
  grunt.registerTask('default', ['build', 'nodemon']);
};
