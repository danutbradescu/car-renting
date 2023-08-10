const express = require('express')

const mongoose = require('mongoose')

const routes = require('./routes/routes')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const app = express()

//car schema and what i added 
const Car = require('./SchemaFolder/car-schema');

mongoose.connect("mongodb://localhost:27017/car-renting", {
    useNewUrlParser: true,
})
 .then(() =>{
    console.log("connected with database from cars..");
    app.listen(5001, () =>{
        console.log("App is listen on port 5001.Connected with cars");    
    });
 })
.catch(error =>{
    console.error('Error connecting with cars-database', error);
    
});


app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api",routes)

mongoose.connect("mongodb://localhost:27017/car-renting", {
    useNewUrlParser: true,
})


.then(() => {
    console.log("connected to database for users");
    app.listen(5000,() =>{
        console.log("App is listening on port 5000. Connected with users")
    })
})
