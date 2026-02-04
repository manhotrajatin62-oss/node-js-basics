const fs = require("fs");

const stream = fs.createReadStream("file.txt");

stream.on("data", chunk => {
  console.log("Received chunk:", chunk.length);
});

stream.on("end", () => {
  console.log("Finished reading");
});
