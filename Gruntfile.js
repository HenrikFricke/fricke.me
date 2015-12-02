module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean up folders
    clean: {
      build: ["build/"]
    },

    // parse jade
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: '{,*/}*.jade',
          dest: 'build/',
          ext: '.html'
        }]
      }
    }
  });

  // Load packages
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Build everything for production
  grunt.registerTask('production', ['clean:build', 'jade']);

  // Default task(s).
  grunt.registerTask('default', ['production']);

};
