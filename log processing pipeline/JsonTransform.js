const { Transform } = require("stream");

class JsonTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(line, encoding, callback) {
    const [timestamp, level, user, action] = line.split(" ");

    const obj = {
      timestamp,
      level,
      user: user.split(":")[1],
      action: action.split(":")[1],
    };

    // this.push(JSON.stringify(obj) + "\n");
    // callback();

    setTimeout(() => {
      this.push(JSON.stringify(obj) + "\n");
      callback();
    }, 5);
  }
}

module.exports = { JsonTransform };
