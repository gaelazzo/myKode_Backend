// Generated on 2014-03-27 using generator-angular-fullstack 1.2.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
/*globals initConfig, appPath */
/*jshint camelcase: false */



const fs = require("fs");
const path = require("path");
const asyncCmd = require("async-exec-cmd");

const JasmineClass = require('jasmine');
const jasmineObj = new JasmineClass();
jasmineObj.exitOnCompletion = false;

jasmineObj.jasmine.getEnv().clearReporters(); // remove default reporter logs


const rep = JasmineClass.ConsoleReporter;  //require("jasmine.console_reporter.js");
//console.log(JasmineClass);

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
jasmineObj.jasmine.getEnv().addReporter(
    new SpecReporter({
        // add jasmine-spec-reporter
        spec: {
            displaySuccessful:false,
            displayPending: false,
        },
    })
);
//
// jasmineObj.jasmine.getEnv().addReporter(new rep({
//     verbosity: 2,
//     color: true
// }));
//



const exec  = require("child_process").execFileSync;


const {type} = require("JQDeferred/lib/jquery");

//https://www.npmjs.com/package/grunt-contrib-jasmine
//grunt.loadNpmTasks('grunt-contrib-jasmine');

module.exports = function (grunt) {

    // Load grunt tasks automatically (including grunt.loadNpmTasks('grunt-contrib-jasmine');
    require('load-grunt-tasks')(grunt);
    const fs = require('fs');

    const path = require("path");


    var asyncCmd = require("async-exec-cmd");

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    //this is used with grunt.initConfig(gruntConfig), that is equivalen to grunt.config.init
    let gruntConfig = {
        connect: {
            server: { // <-- This is a Target named 'server'.
                options: {
                    // <-- Your connect options go here.
                    //     https://github.com/gruntjs/grunt-contrib-connect#options
                }
            }
        },

        shell: {
            startNode: {
                command: 'node server.js'
            },
            stopNode: {
                command: 'taskkill /F /IM node.exe'
            },
            clientTest: {
                command: 'npx jasmine test/client/*Spec.js'
            }
        },

        pkg: grunt.file.readJSON('package.json'),
        /*
        yuidoc: {
          compile: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
              paths: ['./src'],
              outdir: 'doc'
            }
          }
        },*/

        watch: {
            files: ['src/*.js'],
            tasks: ['test'],
            options: {
                livereload: true
            }
        },

        karma: {
            spece2e: {
                configFile: "test/karma_node_server_e2e.conf.js",
                autoWatch: true,
                singleRun: true,
                reporters: ["spec"],
                specReporter: {
                    maxLogLines: 5, // limit number of lines logged per test
                    suppressErrorSummary: false, // do not print error summary
                    suppressFailed: false, // do not print information about failed tests
                    suppressPassed: true, // do not print information about passed tests
                    suppressSkipped: true, // do not print information about skipped tests
                    showSpecTiming: true, // print the time elapsed for each spec
                    failFast: false // test would finish with error when a first fail occurs.
                }
            }
        },

        jasmine: {
            client: {
                spec_dir: "./test/client",
                spec_files: ["*Spec.js"],
                // Configuration of the Jasmine environment
                // "env" is optional, as are all of its properties.
                env: {
                    // Whether to fail a spec that ran no expectations
                    failSpecWithNoExpectations: false,

                    // Stop execution of a spec after the first expectation failure in it
                    stopSpecOnExpectationFailure: false,

                    // Stop execution of the suite after the first spec failure
                    stopOnSpecFailure: false,

                    // Run specs in semi-random order
                    random: false
                }
            },
            server: {
                spec_dir: "./test/spec",
                spec_files: ["*Spec.js"],
                // Configuration of the Jasmine environment
                // "env" is optional, as are all of its properties.
                env: {
                    // Whether to fail a spec that ran no expectations
                    failSpecWithNoExpectations: false,

                    // Stop execution of a spec after the first expectation failure in it
                    stopSpecOnExpectationFailure: false,

                    // Stop execution of the suite after the first spec failure
                    stopOnSpecFailure: false,

                    // Run specs in semi-random order
                    random: false
                }
            },

            auto: {
                options: {
                    autotest: true,
                    forceExit: false
                }
            }

        }
    };
    let classes = [];
    let classesClient = [];
    let classesMidway = [];


    gruntConfig.jasmine["all_e2e"] = {
        spec_dir: './test/spece2e/',
        spec_files: ["*Spec.js"],
        autotest: false
    };

    fs.readdirSync(path.join(__dirname, 'src')).forEach(file => {
        let className = file.replace(".js", "");
        if (fs.existsSync(path.join(__dirname, 'test', 'spec', className + 'Spec.js'))) {
            classes.push(className);
        }
        if (fs.existsSync(path.join(__dirname, 'test', 'midway', className + 'Spec.js'))) {
            classesMidway.push(className);
        }
    });

    //Cerca i test sulle classi  client/components/metadata
    fs.readdirSync(path.join(__dirname, 'client', 'components', 'metadata')).forEach(file => {
        let className = file.replace(".js", "");
        if (fs.existsSync(path.join(__dirname, 'test', 'spec', className + 'Spec.js'))) {
            classes.push(className);
        }
        if (fs.existsSync(path.join(__dirname, 'test', 'midway', className + 'Spec.js'))) {
            classesMidway.push(className);
        }
        if (fs.existsSync(path.join(__dirname, 'test', 'client', className + 'Spec.js'))) {
            classesClient.push(className);
        }
    });

    //test con jasmine
    classes.forEach(function (className) {
        //console.log("registering "+className+"Spec");
        gruntConfig.jasmine[className + "Spec"] = {
            spec_dir: './test/spec/',
            spec_files: [className + "Spec.js"],
            env: {
                // Whether to fail a spec that ran no expectations
                failSpecWithNoExpectations: false,

                // Stop execution of a spec after the first expectation failure in it
                stopSpecOnExpectationFailure: false,

                // Stop execution of the suite after the first spec failure
                stopOnSpecFailure: false,

                // Run specs in semi-random order
                random: false
            }
        };
    });

    classesMidway.push('jsApplicationAnonymous');


    classesMidway.forEach(function (className) {
        gruntConfig.jasmine[className + "Midway"] = {
            spec_dir: './test/midway/',
            spec_files: [className + "Spec.js"],
            autotest: false
        };
    });

    classesClient.forEach(function (className) {
        gruntConfig.jasmine[className + "Client"] = {
            spec_dir: 'test/client',
            spec_files: [className + "Spec.js"],
            env: {
                // Whether to fail a spec that ran no expectations
                failSpecWithNoExpectations: false,

                // Stop execution of a spec after the first expectation failure in it
                stopSpecOnExpectationFailure: false,

                // Stop execution of the suite after the first spec failure
                stopOnSpecFailure: false,

                // Run specs in semi-random order
                random: false
            }
        };
    });

    // jasmine.configureDefaultReporter({
    //     // The `timer` passed to the reporter will determine the mechanism for seeing how long the suite takes to run.
    //     timer: new jasmine.jasmine.Timer(),
    //     // The `print` function passed the reporter will be called to print its results.
    //     print: function() {
    //         //console.stdout.write(arguments);
    //         console.log(arguments[0].toString('utf8'));
    //
    //     },
    //     // `showColors` determines whether or not the reporter should use ANSI color codes.
    //     showColors: false
    // });


    // Set the configuration for all the tasks
    grunt.initConfig(gruntConfig);

    grunt.registerTask("jasmine", "jasmine runner", async function (configName) {
        let done = this.async();
        jasmineObj.loadConfig(gruntConfig.jasmine[configName]);
        //grunt.log.writeln("starting "+configName);


        let result = await jasmineObj.execute();

        // if (result.overallStatus === 'passed') {
        //     grunt.log.writeln('All specs have passed');
        // } else {
        //     grunt.log.writeln('At least one spec has failed');
        // }
        done();
    });

    grunt.registerTask('test_Client', ['jasmine:client']);
    grunt.registerTask('test_Server', ['jasmine:server']);

    grunt.registerTask("NodeStart", "start Node server.js", function () {
        var done = this.async();
        asyncCmd(
            "node",
            ["server.js"],
            function (err, res, code, buffer) {
                if (err) {
                    grunt.log.writeln("NodeStart error");
                    grunt.log.writeln(err, code);
                    done();
                    return;
                }
                grunt.log.writeln("Node server running (not err)");
                console.log(res, code, buffer);
            }
        );
        setTimeout(function () {
            grunt.log.writeln("Node server running (timeout)");
            done();
        }, 2000);
    });

    grunt.registerTask("test Client", "test client", async function () {
        // //console.log(JSON.stringify());
        // //jasmineObj.loadConfigFile('spec/support/jasmine.json');
        //
        // jasmineObj.loadConfig({
        //     spec_dir: 'test/client',
        //     spec_files: [
        //         'test/client/jsDataSetSpec.js'
        //     ]
        // });
        // jasmineObj.configureDefaultReporter({
        //     showColors: false
        // });
        // jasmineObj.exitOnCompletion = false;
        //
        // // jasmineObj.executeSpecsInFolder("test/client/*.js", function(runner, log) {
        // //     process.exit(runner.results().failedCount);
        // // }, true, true);
        // await jasmineObj.execute();
        let done = this.async();

        asyncCmd(
            "npx",
            ["jasmine", "test/client/jsDataSetSpec.js"],
            function (err, res, code, buffer) {
                if (err) {
                    grunt.log.writeln("Node Version error");
                    grunt.log.writeln(err, code);
                    done();
                    return;
                }
                grunt.log.writeln("Node Version stopped");
                grunt.log.writeln(res, code, buffer);
                //done();
            }
        );
        setTimeout(function () {
            grunt.log.writeln("Node Version stopped (timeout)");
            done();
        }, 10000);

        // console.log("executing npx jasmine");
        // const stdout = exec('node', ['--version']);
        // console.log(stdout);
        //
        // asyncCmd("node",["version"], //"npx",["jasmine","test/client/jsDataSet.js"],
        //     (error, data) => {
        //     if (error) {
        //        // grunt.log.writeln("Error:", error);
        //         //done();
        //         return;
        //     }
        //     grunt.log.writeln(data.toString());
        //     //done();
        // });
        //
        // setTimeout(function() {
        //     grunt.log.writeln("npx timeout");
        //     done();
        // },2000);

        // exec("npx",["jasmine","test/client/jsDataSet.js"], (error, data) => {
        //     console.log(error);
        //     console.log(data.toString());
        // });
        //p.stdout.pipe(process.stdout);
    });


    grunt.registerTask("NodeStop", "stop Node", function () {
        var done = this.async();
        asyncCmd(
            "taskkill",
            ["/F /IM node.exe"],
            function (err, res, code, buffer) {
                if (err) {
                    grunt.log.writeln("NodeStop error");
                    grunt.log.writeln(err, code);
                    done();
                    return;
                }
                grunt.log.writeln("Node server stopped");
                grunt.log.writeln(res, code, buffer);
            }
        );
        setTimeout(function () {
            grunt.log.writeln("Node server stopped (timeout)");
            done();
        }, 2000);
    });

    grunt.registerTask('serverStart', ['shell:startNode']);
    grunt.registerTask('serverStop', ['shell:stopNode']);

    classes.forEach(function (className) {
        grunt.registerTask(className + " Server", ['jasmine:' + className + "Spec"]);
    });

    classesClient.forEach(function (className) {
        grunt.registerTask(className + " Client", ['jasmine:' + className + "Client"]);
    });


    classesMidway.forEach(function (className) {
        grunt.registerTask(className + " Midway", ["NodeStart", 'jasmine:' + className + "Midway"]);
    });


    //grunt.registerTask('default', ['test']);

    //grunt.registerTask("midway", ["NodeServer", "karma:spece2e"]);

    grunt.registerTask("e2e", ["NodeServer", "karma:spece2e"]);
};
