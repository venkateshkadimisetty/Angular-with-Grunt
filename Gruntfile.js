// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'app/javascript/**/*.js']
        },
        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/app/js/magic.min.js': 'app/javascript/**/*.js'
                }
            }
        },
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/app/style/style.min.css': 'app/style/*.css'
                }
            }
        },
        // configure watch to auto update ----------------
        watch: {

            // for stylesheets, watch css and less files
            // only run less and cssmin stylesheets: {
            files: ['app/style/*.css'],
            tasks: ['cssmin'] ,

        // for scripts, run jshint and uglify
        scripts: {
            files: 'app/javascript/**/*.js', tasks: ['jshint', 'uglify']
        }
    },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: {                                   // Dictionary of files
                    'dist/app/view/login.html': 'app/view/login.html',     // 'destination': 'source'
                    'dist/app/view/admin.html': 'app/view/admin.html'
                }
            }/*,
            dev: {                                       // Another target
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/contact.html': 'src/contact.html'
                }
            }*/
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin:{
            html:['dist/index.html']
        },
        copy:{
            html: {
                src: './index.html', dest: 'dist/index.html'
            }
        },
        clean: ["dist"],
        express:{
            all:{
                options:{
                    port:3000,
                    hostname:'localhost',
                    bases:['./dist'],
                    livereload:true
                }
            }
        }
});

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['clean','jshint', 'uglify', 'cssmin','htmlmin','copy:html', 'useminPrepare','usemin']);
    grunt.registerTask('server',['express','watch']);
    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express');
};
