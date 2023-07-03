const express =require ('express');
const mongoose=require('mongoose');


const employeeSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    position:{
        type: String,
        require: true,
    },
    about:{
        type: String,
        require: true,
    },
    joining_data:{
        type: Date,
        require: true,
    }
})

module.exports=mongoose.model('Employee',employeeSchema)