

document.addEventListener('DOMContentLoaded', bindButtons)

function bindButtons(){
  document.getElementById('workoutSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {name:null, reps:null, weight:null, date:null, unit:null};
      payload.name = document.getElementById('name').value;
      payload.reps = document.getElementById('reps').value;
      payload.weight = document.getElementById('weight').value;
      payload.date = document.getElementById('date').value;
      payload.lbs = document.getElementById('lbs').value;

      
      console.log('http://flip3.engr.oregonstate.edu:34901/insert?name=' + payload.name + '&reps=' 
        + payload.reps + '&weight='+ payload.weight + '&date=' + payload.date + '&lbs=' + payload.lbs)

      req.open('GET', 'http://flip3.engr.oregonstate.edu:34901/insert?name=' + payload.name + '&reps=' 
        + payload.reps + '&weight='+ payload.weight + '&date=' + payload.date + '&lbs=' + payload.lbs, true);
      


      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          // var response = JSON.parse(req.responseText);
          // var params = [];
          // for(var i in response){
          //   params.push({'date':i.date}, {'lbs':i.lbs}, {'name':i.name}, {'reps':i.reps}, {'weight':i.weight})
          // }
          // console.log(response)
          // context.datalist = params;
          // res.render('home.handlebars', context)
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(null);
      //event.preventDefault();
    });
};