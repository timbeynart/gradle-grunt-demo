var shell = require('shelljs');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        sourceMap: true
      },
      default: {
        src: ['src/*.js'],
        dest: 'bin/<%= pkg.name %>.js'
      }

    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapRoot: "src",

      },
      default: {
        options: {
          banner: '/* Built on <%= grunt.template.today("mm-dd-yyyy")%> */\n',
          //this tells the minified sourcemap to point to the true source, not the concat file
          sourceMapIn: 'bin/<%= pkg.name %>.js.map'

        },
        files: {
          //use the concat file as the source
          'bin/<%= pkg.name %>.min.js': ['<%= concat.default.dest %>']

        }
      }
    },
    jshint: {
      // all: ['src/api/**/*.js','!test/vendor/*.js'],
      all: ['src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: ['src/**/*.js'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['src/**/*.js'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('clean', [
    'jsbeautifier:modify',
    'jshint'
  ]);
  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);

  //we have to use a shell command because the grunt-jsdoc doesn't support the commands we need
  grunt.registerTask('document', 'document public source', function () {
    shell.exec('"node_modules/.bin/jsdoc" src -r  -c  docs/jsdoc.json  -u docs/tutorial  -t  docs/template --readme docs/README.md  -d  bin/docs');
  });


  // these tasks use different config files when concatenating.
  // see the concat & uglify tasks above, and read up at http://gruntjs.com/configuring-tasks#globbing-patterns
  grunt.registerTask('default', ['jshint', 'karma', 'jsbeautifier:modify', 'concat:default', 'uglify:default', 'document']);

};