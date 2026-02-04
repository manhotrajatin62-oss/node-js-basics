const EventEmitter = require("events");

const study = new EventEmitter();

study.on("success", ()=>{
    console.log("You are now studying")
})

study.on("failure", ()=>{
    console.log("You don't want to study")
})

study.on("error", ()=>{
    console.log("Error occurred")
})

study.emit("success")
study.emit("failure")
study.emit("error")