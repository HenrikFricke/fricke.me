module.exports = function(grunt) {

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean up folders
    clean: {
      build: ["build/"],
      production: ["build/app/", "build/bower_components/"]
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
        sourceMap: true,
        includePaths: ['bower_components/']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/style/',
          src: '{,*/}*.scss',
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
        files: ['./app/style/**/*.scss'],
        tasks: ['sass', 'cssmin:sass'],
        options: {
          spawn: false,
        }
      },
      jade: {
        files: ['./app/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
        }
      },
      bower: {
        files: ['./bower_components/**/*'],
        tasks: ['copy:bower'],
        options: {
          spawn: false,
        }
      },
      js: {
        files: ['./app/scripts/**/*'],
        tasks: ['copy:js'],
        options: {
          spawn: false,
        }
      }
    },

    useminPrepare: {
      html: 'build/index.html',
      options: {
        dest: 'build/'
      }
    },

    usemin: {
      html: ['build/{,*/}*.html'],
      css: ['build/{,*/}*.css'],
      options: {
        assetsDirs: ['build/','build/images']
      }
    },

    copy: {
      bower: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: '**/*',
          dest: 'build/bower_components',
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'app/scripts/',
          src: '**/*.js',
          dest: 'build/app/scripts/',
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: '**/*',
          dest: 'build',
        }]
      },
      cname: {
        src: './CNAME',
        dest: 'build/'
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        pushTo: 'origin'
      }
    }
  });

  // Build everything for production
  grunt.registerTask('compiling', ['clean:build', 'jade', 'sass', 'cssmin:sass', 'copy:bower', 'copy:js', 'copy:images']);
  grunt.registerTask('building', ['useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin']);

  grunt.registerTask('dev', ['compiling', 'connect', 'watch']);
  grunt.registerTask('production', ['compiling', 'copy:cname', 'building', 'clean:production', 'bump', 'gh-pages']);

  // Default task(s).
  grunt.registerTask('default', ['dev']);
};
