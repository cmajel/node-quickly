module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      build: {
        options: {
          compress: false,
        },
        files: {
          'public/css/main.css': 'assets/styles/main.styl',
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
      },
      basic: {
        src: ['assets/js/*.js'],
        dest: 'public/js/main.js',
      },
    },

    jshint: {
      all: ['Gruntfile.js', 'app.js', 'assets/**/*.js'],
      options: {
        force: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },

    stylint: {
      options: {
        configFile: false,
        config: {
          colons: 'never',
          "sortOrder": "alphabetical",
        },
      },
      src: ['assets/**/*.styl'],
    },

    puglint: {
      src: '**/**.pug',
      options: {
        requireClassLiteralsBeforeAttributes: true,
        requireIdLiteralsBeforeAttributes: true,
        requireLowerCaseAttributes: true,
        requireLowerCaseTags: true,
        validateIndentation: 2,
        disallowDuplicateAttributes: true,
        validateAttributeQuoteMarks: "\""
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      pug: {
        files: '**/**.pug',
        tasks: ['puglint'],
        options: {
          livereload: true,
        },
      },
      stylus: {
        files: '**/**.styl',
        tasks: ['stylint','stylus'],
        options: {
          livereload: true,
        },
      },
      scripts :{
        files: 'assets/js/*.js',
        tasks: ['concat'],
        options: {
          interrupt: false,
        },
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      } 

    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },
          // omit this property if you aren't serving HTML files and 
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    concurrent: {
      target: [['stylus', 'jshint', 'stylint', 'puglint', 'concat', 'watch'],'nodemon' ],
      options: {
        logConcurrentOutput: true
      }
    }
    
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-stylint');
  grunt.loadNpmTasks('grunt-puglint');

  // Default task(s).
  grunt.registerTask('default', ['concurrent']);

};