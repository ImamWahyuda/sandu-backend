const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

function Startup(app) {
    mongoose.connect("mongodb+srv://massaco:massaco@massaco.jb5qe.mongodb.net/Sandu?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })  .then(() => console.log("Connected to MongoDB..."))
        .catch((e) => { throw new Error("Could not connect to MongoDB..." + e) }
    );

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        exposedHeaders: 'x-auth-token',
    }));
}

module.exports = Startup;