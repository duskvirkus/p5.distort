module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: './src/',
          //themedir: 'path/to/custom/theme/',
          outdir: './docs'
        },
      },
    },

    concat: {
      dist: {
        src: [
          'src/DistortController.js',
          'src/DistortElement.js',
          'src/DistortEllipse.js',
          'src/DistortRectangle.js',
          'src/DistortString.js',
          'src/TransformPointBuiltIn.js',
        ],
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

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build-docs', ['yuidoc:compile']);
  grunt.registerTask('build-dist', ['concat:dist', 'babel:dist', 'uglify:min', 'clean']);

  grunt.registerTask('build', ['build-docs', 'build-dist']);

}