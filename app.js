const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost/27017/wikiDB');

const articlesSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articlesSchema);







app.listen(process.env.POST || 3000, (req, res) => {
  console.log('Server started sucessfully !!!');
})