module.exports = function(grunt) {

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // clean up folders
    clean: {
      production: ["dist"]
    },

    webpack: {
      publish: require("./webpack.config.js")
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: ['dist'],
          livereload: true
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
    },

    copy: {
      cname: {
        src: './CNAME',
        dest: 'dist/'
      },
      images: {
        files: [{
          expand: true,
          cwd: 'website/views/',
          src: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg'],
          dest: 'dist',
          flatten: true
        }]
      }
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
    },

    jade: {
      compile: {
        options: {
          data: function(dest, src) {
            var path = require('path');
            return grunt.file.readJSON('dist/' + path.basename(src, '.jade') + '.json');
          }
        },
        files: [{
          expand: true,
          cwd: 'website/pages',
          src: ['**/*.jade'],
          dest: 'dist',
          ext: '.html',
          flatten: true
        }]
      }
    },

    cson: {
      compile: {
        expand: true,
        cwd: 'dist',
        src: ['**/*.cson' ],
        dest: 'dist',
        ext: '.json'
      }
    },

    watch: {
      jade: {
        files: ['website/pages/**/*.jade'],
        tasks: ['jade']
      },
      cson: {
        files: ['dist/*.cson'],
        tasks: ['cson', 'jade']
      }
    }
  });

  grunt.registerTask('compile', ['webpack', 'copy:images', 'cson', 'jade']);
  grunt.registerTask('dev', ['compile', 'connect', 'watch']);
  grunt.registerTask('production', ['clean:production', 'compile', 'copy:cname', 'bump', 'gh-pages']);

  grunt.registerTask('default', 'dev');
};
