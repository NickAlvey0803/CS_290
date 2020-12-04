var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// document.addEventListener('DOMContentLoaded', bindButtons);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 34901);

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    for (var i in context.results){
    	console.log(i)
    }
    res.render('home', context);
  });
});

function bindButtons(){
  document.getElementById('workoutSubmit').addEventListener('click', function(event){
      
  	
	  var context = {};
	  var payload = {};
	  payload.name = document.getElementById('name_data').value;
      payload.reps = document.getElementById('reps_data').value;
      payload.weight = document.getElementById('weight_data').value;
      payload.date = document.getElementById('date_data').value;
      payload.unit = document.getElementById('unit_data').value;

	  mysql.pool.query("INSERT INTO todo (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?,?,?,?,?)", 
	  	[payload.name, payload.reps, payload.weight, payload.date, payload.unit], function(err, result){
	    if(err){
	      next(err);
	      return;
	    }
	    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
		    if(err){
		      next(err);
		      return;
		    }
		    context.results = JSON.stringify(rows);
		    for (var i in context.results){
		    	console.log(i)
		    }
		    res.render('home', context);
		  });
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
	    
	  });

      
      req.send(null);
      event.preventDefault();
    });
}

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT null," +
    "reps VARCHAR(255)," +
    "weight VARCHAR(255)," +
    "date DATE," +
    "unit VARCHAR(255))";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
