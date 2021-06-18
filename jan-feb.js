const express=require("express");
const bodyparser=require("body-parser");
const app=express();

const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/Notesdiary', {useNewUrlParser: true, useUnifiedTopology: true});

let notes=[];
const article=new mongoose.Schema({
    author_name: String,
    month: Number,
    year: Number,
    date:String,
    title: String,
    content:String
});

let title=document.querySelector(".title");
let date=document.querySelector(".date");
let author=document.querySelector(".author");
let contents=document.querySelector(".contents");
const Article=new mongoose.model("Article",article);
Article.find({month:{$lt:03}},function (err, result) {
    if(err)
    {
        
        console.error("No article to show!!");
        // res.send(err);
    }
    else{
        for(let i=0;i<result.length();i++)
        {
            title.innerText=result[i].title;
            date.innerText=result[i].date;
            author.innerText=result[i].author_name;
            contents.innerText=result[i].content;

        }
    }
})