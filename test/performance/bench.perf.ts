import hierarchyPerf from "./hierarchy.perf";
import physxPerf from "./physx.perf";
import rendererPerf from "./renderer.perf";

var fs = require('fs');
var util = require('util');

var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('.benchmark', { flags: 'w' });
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}

physxPerf();
rendererPerf();
hierarchyPerf();