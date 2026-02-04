const fs = require("fs");

console.log("Before reading:");
console.log(process.memoryUsage());

fs.readFileSync("file.txt");

console.log("After reading:");
console.log(process.memoryUsage());

global.gc();
console.log("global gc, ",process.memoryUsage());

// node --expose-gc buffering.js