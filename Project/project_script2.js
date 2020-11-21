

//Using a button to submit a post, similar to how we did in lecture

document.addEventListener('DOMContentLoaded', submitcontactButton)

function submitcontactButton(){
  document.getElementById('infoSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {name_data:null, email:null, number:null, subject_data:null, message_data:null, file_upload:null};
    payload.name_data = document.getElementById('name_data').value;
    payload.email = document.getElementById('email').value;
    payload.number = document.getElementById('number').value;
    payload.subject_data = document.getElementById('subject_data').value;
    payload.message_data = document.getElementById('message_data').value;
    payload.file_upload = document.getElementById('file_upload').value;
    //submitted to httpbin because the engineering php link would not allow me to access/submit data to it
    req.open('POST',  'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        // console.log(response)
        document.getElementById('submission_results').textContent = "Hi " + payload.name_data + "! " + "Thanks for reaching out to me! I'll get back to you shortly.";
        console.log("I've received your information. Thank you!")
        
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}