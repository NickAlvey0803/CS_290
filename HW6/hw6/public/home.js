

document.addEventListener('DOMContentLoaded', bindButtons)
document.addEventListener('DOMContentLoaded', bindButtons2)

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
          
        } else {
          console.log("Error in network request: " + req.statusText);
        }});
      req.send(null);
      //event.preventDefault();
    });
};

// if(document.getElementById('deleteSubmit') !== null){
function bindButtons2(){
  document.getElementById('deleteSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {id:null};
    payload.id = document.getElementById('id').value

    req.open('GET', 'http://flip3.engr.oregonstate.edu:34901/delete?id=' + payload.id, true);

    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    //event.preventDefault();
  });
};
// }



