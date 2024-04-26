module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'src/css/styles.css': 'src/scss/styles.scss'
                }
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            sass: {
                files: ['src/scss/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
}