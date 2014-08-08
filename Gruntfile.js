module.exports = function (grunt) {

    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jslint: {

            client: {
                src: ['CanvasToVideo.js', 'tests/**/*.js'],
                directives: {
                    nomen: true,
                    globals: {
                        'module': true,
                        'require': true,
                        'window': true,
                        'document': true
                    }
                }
            }

        },

        uglify: {

            my_target: {
                options: {
                    mangle: true,
                    report: 'gzip',
                    sourceMap: true,
                    banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %>\n * https://github.com/neogeek/CanvasToVideo\n * \n * Copyright (c) <%= grunt.template.today("yyyy") %> Scott Doxey\n */\n'
                },
                files: {
                    'CanvasToVideo.min.js': ['CanvasToVideo.js']
                }
            }

        },

        casperjs: {

            files: ['tests/**/*.js']

        },

        shell: {

            buildDoc: {

                command: 'dox < CanvasToVideo.js > docs/CanvasToVideo.json; cd docs/; doxdox.py --title="CanvasToVideo" --description="An experiment in converting Canvas animations to video." > index.html; rm CanvasToVideo.json;'

            }

        },

        watch: {

            jslint: {
                files: ['CanvasToVideo.js', 'tests/**/*.js'],
                tasks: ['jslint']
            },

            uglify: {
                files: ['CanvasToVideo.js', 'tests/**/*.js'],
                tasks: ['uglify']
            },

            casperjs: {
                files: ['CanvasToVideo.js', 'tests/**/*.js'],
                tasks: ['casperjs']
            }

        }

    });

    grunt.registerTask('default', [ 'uglify', 'casperjs', 'jslint' ]);
    grunt.registerTask('docs', [ 'shell' ]);

};
