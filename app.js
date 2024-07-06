const express = require("express");
const app = express();

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);

const io = socketIo(server);

const path = require("path");
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({__dirname:true}));

app.get("/",(req,res,next)=>{
    res.render("index.ejs");
})

io.on("connection",(socket)=>{


    socket.on("send-location",(data)=>{
        io.emit("recieve-location",{id:socket.id, ...data});
    });

    socket.on("disconnect",()=>{
        io.emit("user-disconnect",socket.id);
    })
})



server.listen(3000);