const Joi = require("joi");
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    berat:{
        type:Number,
        default:0
    },
    tinggi:{
        type:Number,
        default:0
    },
    suhu:{
        type:Number,
        default:0
    },
    detak:{
        type:Number,
        default:0
    },
    date: {
        type: Date,
        default: new Date()
    }
}) 

const userSchema = new mongoose.Schema({
    nik: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 20
    },
    password: {
        type: String,
        minlength:5,
        required: true
    },
    name:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 255
    },
    data:{
        type:[dataSchema]
    }

});

function validateUser(user) {
    const schema = Joi.object({
        nik: Joi.string().min(0).max(20).required(),
        password: Joi.string().min(5).max(255).required(),
        name: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

function validateLogin(user) {
    const schema = Joi.object({
        NIK: Joi.string().min(0).max(20).required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}


const User = mongoose.model('User', userSchema);

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;