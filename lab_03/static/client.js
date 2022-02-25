window.onload = function(){
document.getElementById("welcome").innerHTML = document.getElementById("welcomeview").textContent;
}


function validateLogin() {

  let email = document.forms["login"]["username"].value;
  let password = document.forms["login"]["password"].value;


  if (email == "") {
    document.getElementById('log').innerHTML = "Username cannot be empty!";
    return false;
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false){
    document.getElementById('log').innerHTML = "Bad e-mail format!";
    return false;
  }

  if (password == "") {
    document.getElementById('log').innerHTML = "Password cannot be empty!";
    return false;
  }
  if (password.length<5){
    document.getElementById('log').innerHTML = "Password cannot be shorter than 5 characters.";
    return false;
  }

  let dataObject = {"email" : email, "password" : password}
  let a = serverstub.signIn(email, password);
  let token;
  document.getElementById('log').innerHTML = a.message;
  token = a.data;
  console.log(token);
  if(token != null){

    document.getElementById("welcome").innerHTML = document.getElementById("profileview").textContent;
    document.getElementById("token").innerHTML = token;
    document.getElementById("emailNow").textContent = email;
    validateGetMessages();
  }
}

function validateSignUp() {

  let email = document.forms["signUp"]["username"].value;
  let password = document.forms["signUp"]["password"].value;
  let firstname = document.forms["signUp"]["firstName"].value;
  let familyname = document.forms["signUp"]["familyName"].value;
  let city = document.forms["signUp"]["city"].value;
  let country = document.forms["signUp"]["country"].value;
  let rPassword = document.forms["signUp"]["rPassword"].value;
  let gender = document.forms["signUp"]["gender"].value;

  if (email == "") {
    document.getElementById('log').innerHTML = "Username cannot be empty!";
    return false;
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false){
    document.getElementById('log').innerHTML = "Bad e-mail format!";
    return false;
  }

  if (firstname == "") {
    document.getElementById('log').innerHTML = "Name cannot be empty!";
    return false;
  }

  if (familyname == "") {
    document.getElementById('log').innerHTML = "Family name cannot be empty!";
    return false;
  }

  if (city == "") {
    document.getElementById('log').innerHTML = "City cannot be empty!";
    return false;
  }

  if (country == "") {
    document.getElementById('log').innerHTML = "Country cannot be empty!";
    return false;
  }


  if (password == "") {
    document.getElementById('log').innerHTML = "Password cannot be empty!";
    return false;
  }
  if (password.length<5){
    document.getElementById('log').innerHTML = "Password cannot be shorter than 5 characters.";
    return false;
  }

  if(password != rPassword){
    document.getElementById('log').innerHTML = "Passwords should be equal!";
    return false;
  }


  let dataObject = {"email" : email, "password" : password, "firstname" : firstname, "familyname" : familyname, "gender" : gender, "city" : city, "country" : country}
  console.log(dataObject);
  document.getElementById('log').innerHTML = serverstub.signUp(dataObject).message;
}

//TABS
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}



function pswCheck(){
  let oldPassword = document.forms["changePsw"]["oldPassword"].value;
  let password = document.forms["changePsw"]["password"].value;
  let pswConfirm = document.forms["changePsw"]["rPassword"].value;
  let tokendiv = document.getElementById("token");
  let token = tokendiv.textContent;

  if(password != pswConfirm){
    document.getElementById('logA').innerHTML = "Passwords should be equal!";
    return false;
  }
  document.getElementById('logA').innerHTML = serverstub.changePassword(token, oldPassword, password).message;
}

function validateSignOut(){
  let tokendiv = document.getElementById("token");
  let token = tokendiv.textContent;
  document.getElementById("welcome").innerHTML = document.getElementById("welcomeview").textContent;

}

function loadInfos(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    document.getElementById('logB').innerHTML = serverstub.getUserDataByToken(token).message;
    let a = serverstub.getUserDataByToken(token).data;
    let b = JSON.stringify(a);
    document.getElementById('infos').innerHTML = b;
}

function validateMessage(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    let content = document.getElementById("messages").value;
    let toEmail = document.getElementById("emailNow").textContent;
    console.log(toEmail);
    document.getElementById('logB').innerHTML = serverstub.postMessage(token, content, toEmail).message;
    document.getElementById('messagesWall').innerHTML += content + " : " + toEmail;
}

function validateGetMessages(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    document.getElementById('logB').innerHTML = serverstub.getUserMessagesByToken(token).message;
    let a = serverstub.getUserMessagesByToken(token).data;
    let b = JSON.stringify(a);
    document.getElementById('messagesWall').innerHTML = b;
}

// BROWSE FUNCTIONS
function validateGetUserDetails(){

    let targetDiv=document.getElementById("result");
    let email = document.getElementById("insertUser").value;
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    document.getElementById('selectedUserMail').innerHTML = email;

    if(serverstub.getUserDataByEmail(token,email).success == false){
      document.getElementById('logC').innerHTML = "Selected user does not exist.";
    }

    else{
      targetDiv.style.display = "block";
    }

}

function loadInfosBrowse(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    let emaildiv = document.getElementById("selectedUserMail");
    let toEmail = emaildiv.textContent;
    console.log(toEmail);
    document.getElementById('logC').innerHTML = serverstub.getUserDataByEmail(token, toEmail).message;
    let a = serverstub.getUserDataByEmail(token, toEmail).data;
    let b = JSON.stringify(a);
    document.getElementById('infosBrowse').innerHTML = b;
}


function validatePostMessageBrowse(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    let emaildiv = document.getElementById("selectedUserMail");
    let toEmail = emaildiv.textContent;
    let content = document.getElementById("messagesBrowse").value;
    console.log(toEmail);
    document.getElementById('logC').innerHTML = serverstub.postMessage(token, content, toEmail).message;
}

function validateGetMessagesBrowse(){
    let tokendiv = document.getElementById("token");
    let token = tokendiv.textContent;
    let emaildiv = document.getElementById("selectedUserMail");
    let toEmail = emaildiv.textContent;

    document.getElementById('logC').innerHTML = serverstub.getUserMessagesByEmail(token, toEmail).message;
    let a = serverstub.getUserMessagesByEmail(token, toEmail).data;
    let b = JSON.stringify(a);
    document.getElementById('messagesWallBrowse').innerHTML = b;
}
