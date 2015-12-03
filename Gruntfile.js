module.exports = function(grunt) {

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

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
          },
          pretty: true
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
      options: {
        sourceMap: true
      },
      dist: {
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
      sass: {
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
    },

    // copy bower files
    bower: {
      dev: {
        dest: 'build/',
        fonts_dest: 'build/font',
        js_dest: 'build/js',
        css_dest: 'build/css',
        options: {
          keepExpandedHierarchy: false
        }
      }
    },

    useminPrepare: {
      html: 'build/index.html',
      options: {
        dest: 'build/',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['build/{,*/}*.html'],
      css: ['build/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['build/','build/images']
      }
    }
  });

  // Build everything for production
  grunt.registerTask('compiling', ['clean:build', 'jade', 'sass', 'cssmin:sass']);
  grunt.registerTask('building', ['useminPrepare', 'cssmin', 'concat', 'uglify', 'usemin']);

  grunt.registerTask('dev', ['compiling', 'building', 'watch']);
  grunt.registerTask('production', ['compiling', 'building']);

  // Default task(s).
  grunt.registerTask('default', ['dev']);
};
