const fs = require("fs");

const start = process.hrtime.bigint();

function log(label) {
  const now = process.hrtime.bigint();
  const ms = Number(now - start) / 1e6;
  console.log(`${ms.toFixed(3)}ms | ${label}`);
}

Promise.resolve().then(() => {
  log("promise");
});

log("sync code started");

process.nextTick(() => {
  log("next tick");
});

log("sync code ended");

fs.readFile(__filename, () => {
  log("I/O callback");

  setTimeout(() => {
    log("timeout inside I/O");
  }, 0);

  setImmediate(() => {
    log("immediate inside I/O");
  });
});

setTimeout(() => {
  log("timeout");
}, 0);

setImmediate(() => {
  log("immediate");
});

process.nextTick(()=>{
    log("nextTick 1");

    process.nextTick(()=>{
        log("nextTick 2");

        process.nextTick(()=>{
            log("nextTick 3")
        })
    })
})

setTimeout(() => {
    log("timeout after ticks")
}, 0);

function block(ms){
    const end = Date.now() + ms;
    while(Date.now < end){}
}

setTimeout(() => {
    log("timeout before block");
    block(200)
    log("timeout after block")
}, 0);

setImmediate(()=>{
    log("immediate after block")
})

block(500);
log("CPU load finished")

for (let i = 0; i < 5; i++) {
    fs.readFile(__filename, ()=>{
        log(`I/O ${i}`)
    })
}