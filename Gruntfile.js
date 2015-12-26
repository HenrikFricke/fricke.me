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
        updateConfigs: [],
        commit: true,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    }
  });

  // Build everything for production
  grunt.registerTask('compiling', ['clean:build', 'jade', 'sass', 'cssmin:sass', 'copy']);
  grunt.registerTask('building', ['useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin']);

  grunt.registerTask('dev', ['compiling', 'connect', 'watch']);
  grunt.registerTask('production', ['compiling', 'building', 'clean:production', 'gh-pages']);

  // Default task(s).
  grunt.registerTask('default', ['dev']);
};
