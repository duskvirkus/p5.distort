module.exports = function (grunt) {

  grunt.initConfig({

    concat: {
      build: {
        src: 'src/*.js',
        dest: 'build/p5.distort.js',
      },
    },

    uglify: {
      min: {
        src: 'build/p5.distort.js',
        dest: 'build/p5.distort.min.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat:build', 'uglify:min']);

}