const express = require("express");
const app = express();
// const ejs=require("ejs");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
app.use(bodyparser(urlencoded({ extended: true })));
app.use(express.static(__dirname));
app.set("view engine","ejs");

// Database work

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Notesdiary', { useNewUrlParser: true, useUnifiedTopology: true });
const article = new mongoose.Schema({
    author_name: String,
    month: Number,
    year: Number,
    date: String,
    category:String,
    title: String,
    content: String
});

const Article = new mongoose.model("Article", article);


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.get("/newpost", function (req, res) {
    res.sendFile(__dirname + "/newpost.html");
})
app.get("/perspectives", function (req, res) {
    res.sendFile(__dirname + "/perspectives.html");
})
app.get("/cinema", function (req, res) {
    res.sendFile(__dirname + "/cinema.html");
})
app.get("/personal", function (req, res) {
    res.sendFile(__dirname + "/personal.html");
})
app.get("/education", function (req, res) {
    res.sendFile(__dirname + "/education.html");
})
app.get("/message", function (req, res) {
    res.sendFile(__dirname + "/message.html");
})
app.get("/jan-feb", function (req, res) {
    let notes=[];


    Article.find({ month: { $lt: 3 } }, function (error, result) {
        if (error) {
            console.error(error);
            res.send(err);

        }
        else {
            // console.log(result);
            console.log(result.length);
            for (let i = 0; i < result.length; i++) {
                notes.push(result[i]);
            }

            res.render("template",{"notes":notes});
        }
    })
});


app.get("/mar-apr", function (req, res) {
    let notes=[];


    Article.find({ month: { $lt: 6, $gt: 2 }}, function(error, result) 
    {
            if (error) {
                console.error(error);
                res.send(err);

            }
            else {
                console.log(result.length);
            for (let i = 0; i < result.length; i++) {
                notes.push(result[i]);
            }

            res.render("template",{"notes":notes});
                // res.render("template",{"notes":result});
            }
    })
});


app.get("/may-jun", function (req, res) {
    let notes=[];


    Article.find({ month: { $lt: 7, $gt: 4 }}, function(error, result) 
    {
            if (error) {
                console.error(error);
                res.send(err);

            }
            else {
                console.log(result.length);
                for (let i = 0; i < result.length; i++) {
                    notes.push(result[i]);
                }
    
                res.render("template",{"notes":notes});
                // res.render("template",{"notes":result});
            }
    })
});

app.get("/personal",function(req,res){
    res.sendFile(__dirname+"/personal.html");
})

app.listen(4040, function (req, res) {
    console.log("Listening to port 4040");
})




app.post("/message", function (req, res) {

    console.log(req.body);
    // console.log(req.body.category);
    const newArticle = new Article({
        author_name: req.body.author_name,
        month: parseInt(req.body.date.substring(5, 7)),
        year: parseInt(req.body.date.substring(0, 4)),
        date: req.body.date,
        category:req.body.category,
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save();

    var date = req.body.date;
    // console.log(date.substring(5,7));
    res.redirect("/message");
})