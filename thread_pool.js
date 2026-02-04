const crypto = require("crypto");

for (let i = 0; i < 8; i++) {
  crypto.pbkdf2("x", "y", 100000, 64, "sha512", () => {
    console.log("done", i);
  });
}
