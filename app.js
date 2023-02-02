const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash')

mongoose.set('strictQuery', false);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
// mongoose.connect("mongodb+srv://admin-justfidel:Password123@cluster0.30p6n62.mongodb.net/wikiDB");


const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);


//////////////////// Request to target All the Articles  /////////////////////////

app.route('/articles')

.get((req, res) => {

  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
})

.post((req, res) => {

  const newArticle = new Article ({
    title: req.body.title, 
    content: req.body.content
  })

  newArticle.save((err) => {
    if (!err) {
      res.send('Post successful');
    } else {
      res.send(err);
    }
  });
})

.delete((req, res) => {

  Article.deleteMany((err) => {
    if (!err) {
      res.send('Post successful DELETED xxx');
    } else {
      res.send(err);
    }
  })
});



////////////////// Request to target a Specific Article /////////////////////////

app.route('/articles/:articleTitle')
.get((req, res) => {
 Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
    if(foundArticle) {
      res.send(foundArticle);
    } else {
      res.send(err);
    }
   } 
 )
})

.put((req, res) => {
  Article.replaceOne(
    {title: req.params.articleTitle},
    req.body,
    (err) => {
      if (!err) {
        res.send('Successfully Updated article');
      }
    }
  )
})

.patch((req, res) => {
  Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {$set: req.body},
    (err) => {
      if (!err) {
        res.send('Successfully Updated article');
      } else {
        res.send(err)
      }
    }
  )
})

.delete((req, res) => {
  Article.deleteOne(
    {title: req.params.articleTitle},
    (err) => {
      if (!err) {
        res.send('Successfully Deleted article');
      } else {
        res.send(err)
      }
    }
  )
});








app.listen(process.env.POST || 3000, (req, res) => {
  console.log('Server started sucessfully !!!');
})