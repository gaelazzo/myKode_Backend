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
module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  const fs = require('fs');

  const path = require("path");

  var asyncCmd = require("async-exec-cmd");

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  let gruntConfig=  {
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

    jasmine_node: {
      //https://www.npmjs.com/package/grunt-jasmine-node2
      all: [],
      options: {
        coffee: false,
        verbose: true,
        match: '.',
        matchall: false,
        specFolders: ['./test/spec/'],
        specNameMatcher: 'spec',
        projectRoot: '',
        //growl:true,
        //specNameMatcher: 'spec',
        forceExit: false,
        useDotNotation: false,
        debug:true,

        jUnit: {
          report: true,
          savePath: "./build/reports/jasmine/",
          useDotNotation: false,
          consolidate: false
        }
      },
      single: {
        options: {
          specFolders: ['./test/spec/'], //'./test/server/dataAccess'
          //specFolders: ['./test/server/dataAccess/'], //'./test/server/dataAccess'
          autotest: false,
          verbose: true,
          forceExit: false,
          useDotNotation: true
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
 let classes=[];
 let classesMidway=[];


  fs.readdirSync(path.join(__dirname, 'src')).forEach(file => {
    let className=file.replace(".js","");
       if (fs.existsSync(path.join(__dirname, 'test','spec', className+'Spec.js'))){
         classes.push(className);
       }
      if (fs.existsSync(path.join(__dirname, 'test','midway', className+'Spec.js'))){
        classesMidway.push(className);
      }
    });

  fs.readdirSync(path.join(__dirname, 'client','components','metadata')).forEach(file => {
    let className=file.replace(".js","");
    if (fs.existsSync(path.join(__dirname, 'test','spec', className+'Spec.js'))){
      classes.push(className);
    }
    if (fs.existsSync(path.join(__dirname, 'test','midway', className+'Spec.js'))){
      classesMidway.push(className);
    }
  });

  classes.forEach(function(className){
    gruntConfig.jasmine_node[className+"Spec"]={
      options: {
        verbose: true,
        specFolders: ['./test/spec/'], //'./test/server/dataAccess'
        specNameMatcher: "*"+className+'Spec',
        autotest: false
      }
    };
  });

  classesMidway.push('jsApplicationAnonymous');

  classesMidway.forEach(function(className){
    gruntConfig.jasmine_node[className+"Midway"]={
      options: {
        verbose: true,
        specFolders: ['./test/midway/'], //'./test/server/dataAccess'
        specNameMatcher: "*"+className+'Spec',
        autotest: false
      }
    };
  });


  // Define the configuration for all the tasks
  grunt.initConfig(gruntConfig );


  grunt.registerTask('test', ['jasmine_node:single']);

  grunt.registerTask("NodeStart", "start Node server.js", function() {
    var done = this.async();
    asyncCmd(
        "node",
        ["server.js"],
        function(err, res, code, buffer) {
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
      setTimeout(function() {
          grunt.log.writeln("Node server running (timeout)");
          done();
      }, 2000);
  });


  grunt.registerTask("NodeStop", "stop Node", function() {
    var done = this.async();
    asyncCmd(
        "taskkill",
        ["/F /IM node.exe"],
        function(err, res, code, buffer) {
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
      setTimeout(function() {
          grunt.log.writeln("Node server stopped (timeout)");
          done();
      }, 2000);
  });

  grunt.registerTask('serverStart', [ 'shell:startNode']);
  grunt.registerTask('serverStop', ['shell:stopNode']);

  classes.forEach(function(className) {
    grunt.registerTask(className+"", ['jasmine_node:'+className+"Spec" ]);
  });

  classesMidway.forEach(function(className) {
    grunt.registerTask(className, ["NodeStart", 'jasmine_node:'+className+"Midway"]);
  });


  //grunt.registerTask('default', ['test']);

  //grunt.registerTask("midway", ["NodeServer", "karma:spece2e"]);

  grunt.registerTask("e2e", ["NodeServer", "karma:spece2e"]);
};
