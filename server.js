const express = require ('express');
const app = express();
const session = require('express-session');
const routes = require('./routes/route');
const path = require ('path');
//-momery unleaked---------
app.use(express.json());
app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:60000
       },

secret: 'secret',
saveUninitialized: true,
resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no')) //handle error
}
next() //otherwise continue
});


app.use(express.urlencoded({extended: true}));
//const PORT = 3000 || process.env.PORT;
const cors = require('cors');

app.use(cors());

app.use(session({
    secret: 'jskjkfjs-sfjsjkskdf@3&*qw',
    resave: false,
    saveUninitialized: false
}));



app.use('/api', routes);


//start server and listen to port 3000/ or the port chosen by the server.
app.listen(process.env.PORT || 4000, ()=> {
    console.log(`server started successfully at port + process.env.PORT || 4000 `);
});
