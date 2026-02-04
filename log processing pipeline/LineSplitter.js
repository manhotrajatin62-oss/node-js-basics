const { Transform } = require("stream");

class LineSplitter extends Transform {
  constructor() {
    super({readableObjectMode:true}); // we still want to RECEIVE buffers from the file stream.
    this.buffer = "";
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();

    const lines = this.buffer.split("\n");

    this.buffer = lines.pop();

    for (const line of lines) {
      this.push(line);
    }

    console.log(this)

    callback();
  }

  _flush(callback) {
    if (this.buffer) {
      this.push(this.buffer);
    }
    callback();
  }
}

module.exports = { LineSplitter };

// The Chunk Boundary Problem

// Streams do NOT respect line endings.

// A chunk might look like:
// 2025-01-01 ERR
// OR User:42

// This buffer solves the problem.