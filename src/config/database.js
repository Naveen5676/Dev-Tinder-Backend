const mongoose = require('mongoose')

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://naveenwali:JT5azyfchTsRSZt7@namastenode.g2yo9hi.mongodb.net/DevTinder")
}

module.exports = connectDB