module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      build: {
        options: {
          compress: true,
        },
        files: {
          'public/css/main.css': 'assets/styles/css/main.styl'
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
      },
      basic: {
        src: ['assets/js/main/*.js'],
        dest: 'public/js/main.js',
      },
    },

    jshint: {
      all: ['Gruntfile.js', 'app/**/**.js', 'assets/js/main/**/*.js'],
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
        config: '.stylintrc',
        ignore: '.stylintignore'
      },
      src: ['assets/styles/css/components/**/**.styl', 'assets/styles/css/**/**.styl']
    },

    puglint: {
      src: '**/*.pug',
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

      statics: {
        files: ['assets/styles/icons/'],
        tasks: ['copy:icons']
      },

      images: {
        files: ['assets/images/**'],
        tasks: ['copy:images']
      },

      pug: {
        files: '**/*.pug',
        tasks: ['puglint'],
      },
      stylus: {
        files: ['**/*.styl'],
        tasks: ['stylint','stylus', 'copy'],
      },
      mainjs :{
        files: 'assets/js/main/*.js',
        tasks: ['concat'],
        options: {
          interrupt: false,
        },
      },
      vendorjs : {
        files: 'assets/js/vendor/',
        tasks: ['copy:js'],
        options: {
          interrupt: false,
        },
      },
      scripts : {
        files: '**/*.js',
        tasks: ['jshint'],
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

    copy: {
      icons: {
        files: [
          { expand: true, 
            cwd: 'assets/styles/icons/', 
            src: ['**'], 
            dest: 'public/css/icons'
          },
        ],
      },
      images: {
        files: [
          { expand: true, 
            cwd: 'assets/images/', 
            src: ['**'], 
            dest: 'public/images'
          },
        ],
        },
      js: {
        files: [
          { expand: true, 
            cwd: 'assets/js/vendor', 
            src: ['**'], 
            dest: 'public/js/vendor'
          },
        ],
      },
    },

    nodemon: {
      dev: {
        script: 'app/app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '5000'
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
      target: [['jshint', 'stylint', 'stylus', 'puglint', 'concat', 'copy', 'watch'],'nodemon' ],
      options: {
        logConcurrentOutput: true
      }
    }
    
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
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