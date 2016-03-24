module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      build: {
        options: {
          compress: false
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
      beforeconcat: ['assets/js/*.js'],
    },

    watch: {
      options: {
        livereload: true,
      },
      stylus: {
        files: '**/*.styl',
        tasks: ['stylus'],
        options: {
          livereload: true,
        },
      },
      scripts :{
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

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:3000');
              }, 1000);
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
      target: ['nodemon', ['stylus', 'jshint', 'concat', 'watch']],
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

  // Default task(s).
  grunt.registerTask('default', ['concurrent']);

};