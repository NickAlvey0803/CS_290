var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'CS290_alveyn',
  password: '8904',
  database: 'cs290_alveyn'
});