const fs = require("fs");

console.log("sync start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

fs.readFile("file.txt", () => console.log("file"));

setImmediate(() => console.log("immediate"));

console.log("sync end");

process.nextTick(() => {
  console.log("nextTick");
});

// sync start
// sync end
// nextTick
// promise
// timeout
// file
// immediate

const net = require("net");
const socket = net.connect(1234);

socket.on("error", (err)=>console.log(err))

const server = net.createServer();
server.listen(3000);
server.close(()=>console.log("server closed"))
