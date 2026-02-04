const { pipeline } = require("stream");
const fs = require("fs");
const http = require("http")

http.createServer((req, res) => {

  const fileStream = fs.createWriteStream("upload.bin");

  pipeline(req, fileStream, (err) => {

    if (err) {
      console.error("Pipeline failed:", err);
      res.statusCode = 500;
      return res.end("Upload failed");
    }

    res.end("Upload complete");
  });

}).listen(3000)
