const mongoose = require('mongoose')

const connString = process.env.DaTABASE

const connection =  mongoose.connect(connString)

connection.then(()=>{
    console.log("Server connected to mongoose!!");
    }).catch((err)=>{
        console.log(err);
        
    })

    