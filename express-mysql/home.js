

document.addEventListener('DOMContentLoaded', bindButtons)

function bindButtons(){
  document.getElementById('workoutSubmit').addEventListener('click', function(event){
      var req = new XMLHttpRequest();
      var payload = {name:null, reps:null, weight:null, date:null, unit:null};
      payload.name = document.getElementById('name').value;
      payload.reps = document.getElementById('reps').value;
      payload.weight = document.getElementById('weight').value;
      payload.date = document.getElementById('date').value;
      payload.unit = document.getElementById('unit').value;

      
      req.open('POST', 'http://flip3.engr.oregonstate.edu:34901' + '/insert', true);
      
      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          // document.getElementById('temp').textContent = response.main.temp + " degrees";
          // document.getElementById('feels_like').textContent = response.main.feels_like + " degrees";
          // document.getElementById('humidity').textContent = response.main.humidity + "%";
          // document.getElementById('description').textContent = response.weather[0].description;
          // document.getElementById('temp_max').textContent = response.main.temp_max + " degrees";
          // document.getElementById('temp_min').textContent = response.main.temp_min + " degrees";
          console.log(response)
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
    });