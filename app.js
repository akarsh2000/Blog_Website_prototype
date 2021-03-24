//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "A warm welcome to my blogging website prototype!";
const aboutContent = "This is a blogging website prototype through which user can write down his/her day to day feelings or activities and share it with people all over the world, as we know happiness increases with sharing!";
const contactContent = "You can contact me via my email address: akarshgupta2000@gmail.com";

const app = express();
let posts =[]
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', function(req,res){
  res.render('home',{
    first: homeStartingContent,
    posts: posts
  });
})
app.get('/about', function(req,res){
res.render('about',{
  middle: aboutContent
});
})
app.get('/contact', function(req,res){
res.render('contact',{
  bottom: contactContent
});
})

app.get('/compose', function(req,res){
res.render('compose');
})



app.post('/compose', function(req,res){
  var post ={
      Title: req.body.newTitle,
      Post: req.body.newPost
}
  posts.push(post)
  res.redirect('/');
})
app.post('/', function(req,res){
  res.redirect('/compose');
})
app.get('/posts/:postName', function(req,res){
  const requestTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(head){
      const updated = _.lowerCase(head.Title);
    if(updated === requestTitle){
      res.render('post', {
        newto: head.Title,
        content: head.Post
      });
    }
})
})




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
