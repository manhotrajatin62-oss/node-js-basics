const { Transform } = require("stream");

class FilterErrors extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(line, encoding, callback) {
    if (line.includes("ERROR")) {
      this.push(line);
    }

    callback();
  }
}

module.exports = { FilterErrors };

// Normally streams push raw bytes.
// When objectMode: true is enabled each chunk becomes a JavaScript value.