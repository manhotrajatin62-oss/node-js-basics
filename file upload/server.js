const http = require("http");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/upload") {
    res.statusCode = 404;
    return res.end("Not found\n");
  }

  const filename = `upload-${Date.now()}`;
  const filepath = path.join(uploadDir, filename);

  const fileStream = fs.createWriteStream(filepath);

  req.pipe(fileStream);

  const startMem = process.memoryUsage().rss;
  console.log("start memory: ", startMem);

  fileStream.on("finish", () => {
    const endMem = process.memoryUsage().rss;
    console.log("end memory: ", endMem);

    console.log(`Memory delta: ${(endMem - startMem) / 1024} KB`);
    console.log("uploaded successfully");
    res.end("Upload complete\n");
  });

  fileStream.on("error", (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end("File write error\n");
  });

  // manual backpressure
  // req.on("data", (chunk) => {
  //   const canContinue = fileStream.write(chunk);
  //   if (!canContinue) {
  //     req.pause();
  //     fileStream.once("drain", () => {
  //       req.resume();
  //     });
  //   }
  // });

  // req.on("end", () => {
  //   fileStream.end();
  // });

  req.on("aborted", () => {
    console.log("Client aborted upload");
    fileStream.destroy();
    fs.unlink(filepath, () => {});
  });

  req.on("error", (err) => {
    console.error("Request error", err);
  });
});

function shutdown() {
  console.log("Shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

server.listen(3000, () => {
  console.log("server is running");
});
