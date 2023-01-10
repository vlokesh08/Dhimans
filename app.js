const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require("mongoose")
const ejs = require("ejs");
const _= require('lodash');


const app = express()

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.use(bodyparser.urlencoded({extended : true}));


let posts = [];

const post1 = {
    title: "Product1",
    price: "180",
    content: "This is the description of Product 1"
  };
posts.push(post1);
const post2 = {
    title: "Product2",
    price: "190",
    content: "This is the description of Product 1"
};
posts.push(post2);


app.post("/signup", (req,res) => {
    const post = {
        title: req.body.postTitle,
        price: req.body.postPrice,
        content: req.body.postArea
      };
      posts.push(post);
      res.redirect("/signup");
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html");

})

app.get("/signin", (req,res)=>{
    res.render('main' , {posts : posts});
});

app.get("/signup", (req,res)=>{
    res.render('admin' , {posts : posts});
});


app.get("/posts/:postName", (req,res)=>{
    const reqTitle = _.lowerCase(req.params.postName);
    let i=0;
    posts.forEach((post) => {
      const storedTitle = _.lowerCase(post.title);
        i++;
      if(storedTitle===reqTitle){
        res.render("post", {
          title: post.title,
          price: post.price,
          content: post.content,
          ind:i,
          posts:posts
        });
      }
    //   else{
    //     console.log("Match not found");
    //   }
  
    });
  
  });


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on Port 3000");
})