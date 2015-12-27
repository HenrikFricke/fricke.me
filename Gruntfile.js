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
          hostname: 'localhost',
          base: ['app', 'dist'],
          keepalive: true
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
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

  grunt.registerTask('dev', ['webpack','connect']);
  grunt.registerTask('production', ['clean:production', 'webpack', 'bump', 'gh-pages']);

  grunt.registerTask('default', 'dev');
};
