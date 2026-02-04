const fs = require("fs");
const { pipeline } = require("stream");
const { LineSplitter } = require("./LineSplitter");
const { FilterErrors } = require("./FilterErrors");
const { JsonTransform } = require("./JsonTransform");

setInterval(() => {
  const m = process.memoryUsage();
  console.log("RSS:", (m.rss/1024/1024).toFixed(1), "MB");
}, 3000);


pipeline(
  fs.createReadStream("./logs/huge.log"),
  new LineSplitter(),
  new FilterErrors(),
  new JsonTransform(),
  fs.createWriteStream("./logs/errors.json"),
  (err) => {
    if (err) console.error("Pipeline failed:", err);
    else console.log("Log processing complete");
  },
);

// pipeline destroys all streams on failure
