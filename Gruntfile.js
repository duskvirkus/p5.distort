module.exports = function (grunt) {

  grunt.initConfig({

    concat: {
      dist: {
        src: 'src/*.js',
        dest: 'dist/p5.distort.js',
      },
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: {
          'dist/temp/p5.distort.legacy.js': 'dist/p5.distort.js',
        }
      }
    },

    uglify: {
      min: {
        src: 'dist/temp/p5.distort.legacy.js',
        dest: 'dist/p5.distort.min.js',
      }
    },

    clean: [
      'dist/temp/'
    ],

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['concat:dist', 'babel:dist', 'uglify:min', 'clean']);

}