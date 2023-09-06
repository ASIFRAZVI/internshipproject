const express =require('express')
const path=require('path');
const bodyparser=require('body-parser')
const dotenv=require('dotenv')
const port= 3000 || process.env.port
const app=express()


dotenv.config()
//view engine
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// export db
require("./server/db");

//require routes--userout
const UserRouter=require("./routes/userRoutes")




app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json({extended:false}))

//rout for user
app.use(UserRouter);



app.listen(port,()=>{
    console.log("server started")
})

