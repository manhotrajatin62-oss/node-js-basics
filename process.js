const process = require("process");

process.on("exit", (code) => {
  console.log("about to exit with code: ", code);
});

console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.arch);
console.log(process.argv);
console.log(process.env.HELLO); //HELLO="hello" node process.js
// process.exit(1)
// process.exit(0)

const net = require("net");
const { promises } = require("stream");
const server = net.createServer();
server.listen(3000);
// process.on("SIGINT", ()=>{console.log("CTRL+C"); process.exit(0)})

// process.stdin.on("data", (data)=>{
//     console.log(data.toString());
//     process.exit(0)
// })

process.stdout.write("Node js\n");
process.stderr.write("Error 404\n");

console.log(process.uptime());
console.log(process.memoryUsage());
console.log(process.cpuUsage());
console.log(process.cwd());
process.chdir("/tmp");
console.log(process.cwd());

function boom() {
  throw new Error("BOOM");
}

boom();

process.on("uncaughtException", (err) => console.log("uncaught error", err));

Promise.reject(new Error("BOOM"));

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
});
