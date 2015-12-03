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
          src: '*.jade',
          dest: 'build/',
          ext: '.html'
        }]
      }
    },

    // sass compiling
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'app/style/',
          src: '{,*/}*.sass',
          dest: 'build/',
          ext: '.css'
        }]
      }
    },

    // minify css
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['*.css', '!*.min.css'],
          dest: 'build',
          ext: '.min.css'
        }]
      }
    },

    // watcher
    watch: {
      style: {
        files: ['./app/style/**/*.sass'],
        tasks: ['sass-compiling'],
        options: {
          spawn: false,
        }
      },
      jade: {
        files: ['./app/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Load packages
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Build everything for production
  grunt.registerTask('sass-compiling', ['sass', 'cssmin']);
  grunt.registerTask('dev', ['clean:build', 'jade', 'sass-compiling', 'watch']);
  grunt.registerTask('production', ['clean:build', 'jade', 'sass-compiling']);

  // Default task(s).
  grunt.registerTask('default', ['dev']);

};
