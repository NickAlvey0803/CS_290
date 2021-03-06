// All Setup copied from lectures

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 39999);


app.get('/',function(req,res){
  res.render('home.handlebars') 
});


// Basic Framework of Get and Post mimic the lectures, as in it runs a for-loop to push params
// onto the handlebar template as suggested. The routes are the same style, but the way they're 
// handled is different (see HW5-post.handlebars and HW5-get.handlebars)

app.post('/HW5', function(req,res){

  var qParams3 = [];
  for (var p in req.body){
    qParams3.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams3);
  console.log(req.body);
  var context2 = {};
  context2.dataList = qParams3;
  
  var qParams2 = [];
  for (var p in req.query){
    qParams2.push({'name2':p,'value2':req.query[p]})
  }
  
  context2.dataList2 = qParams2;

  res.render('HW5-post.handlebars', context2); //.handlebars added because I had trouble viewing this window (still do)
});

app.get('/HW5',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('HW5-get.handlebars', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu: ' + app.get('port') + '; press Ctrl-C to terminate.');
});