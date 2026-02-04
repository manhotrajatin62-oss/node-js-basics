const fs = require("fs");

const stream = fs.createWriteStream("./logs/huge.log");

for (let i = 0; i < 500000; i++) {
    const level = Math.random() > 0.8 ? "ERROR" : "INFO";

    stream.write(
        `${new Date().toISOString()} ${level} User:${i} Action:login\n`
    )
}

stream.end()