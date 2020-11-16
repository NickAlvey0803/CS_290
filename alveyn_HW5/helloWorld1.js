var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 38999);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.get('/HW5-get',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('HW5-get', context);
});


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/HW5-post', function(req,res){
  var qParams3 = [];
  for (var p in req.body){
    qParams3.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams3);
  console.log(req.body);
  var context2 = {};
  context2.dataList = qParams;


  var qParams2 = [];
  for (var p in req.query){
    qParams2.push({'name2':p,'value2':req.query[p]})
  }
  
  context2.dataList2 = qParams2;

  res.render('HW5-post', context);
});

// app.use(function(req,res){
//   res.status(404);
//   res.render('404');
// });

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu: ' + app.get('port') + '; press Ctrl-C to terminate.');
});