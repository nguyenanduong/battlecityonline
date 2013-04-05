module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                undef: true,
                boss: true,
                es5: true,
                strict: false,
                trailing: true,
                loopfunc: true,
                // Enviroments
                browser: true,
                devel: true,
                globals: {
                    module: true,
                    define: true,
                    require: true,
                    Box2D: true,
                    expect: true,
                    describe: true,
                    it: true,
                    beforeEach: true,
                    afterEach: true,
                    spyOn: true,
                    runs: true,
                    waitsFor: true
                },
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};