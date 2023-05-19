const express = require('express');
const session = require('express-session')
const bp = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');

// ENVIRONMENT SETUP
require('dotenv').config();
if(require('dotenv').config().error){consol.log("Environment Varaible Error Occured")}

const { addUser, getUsersInRoom, getUser, removeUser } = require('./opperations/chat/chat');


const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

//BODY PARSER
app.use(bp.json());

//BODY PARSER
app.use(bp.urlencoded({extended: true}));

// MORGAN DEV TOOLS
app.use(morgan('dev'));

// SESSION / TOKEN
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cors());
app.options('*', cors());

// ROUTING
require('./router')(app);
// const router = require('./router');
// app.use(router);

// SOCKET.IO
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    socket.on("join", ({username, room}, callback)=>{

        // Initiation
        const {user, error} = addUser({id:socket.id, username, room}); 

        // const error = "";
        // Error Handling
        if(error){
            return callback(error);
        }

        socket.emit("message", {user: "system", text: `${user.username}, Welcome to the SafeTech ${user.room}`});
        socket.broadcast.to(user.room).emit("message", {user: "system", text: `${username} has joined`});

        socket.join(user.room);

        callback();

    });

    socket.on("sendMessage", (messeage, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", {user: user.username, text: messeage });

        callback();
    })

    socket.on("endit", ()=>{
        console.log("User left!");
    });
});



server.listen(PORT, () => {console.log("Server is running on "+ PORT)});