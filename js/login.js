/**
 * downloads all registered users
 * 
 */
async function backendLogIn(){
setURL('https://kirill-surikow.developerakademie.net/smallest_backend_ever')
await downloadFromServer();
let AllUsersAsString = backend.getItem('users');
  AllUsers = JSON.parse(AllUsersAsString) || [];
}

let currentUser =[];
let comingFromLogIn;

/**
 * uploads the current user and gives the summary the info to prepare the greet for the user 
 * 
 */
async function backendIntegrationLogin(){
    await backend.setItem('user', JSON.stringify(currentUser));
    await backend.setItem('comingFromLogIn', JSON.stringify(comingFromLogIn));
}

/**
 * directs to summary
 * 
 */
function directToSummary(){
    window.location.href="https://kirill-surikow.developerakademie.net/Join-1/summary.html"
}

/**   
 * directs to sign up
 * 
 */
function signUp(){
    window.location.href="https://kirill-surikow.developerakademie.net/Join-1/signUp.html"
}

/**
 * messages the user that his registration was successful
 * 
 */
function showLogInSucces(){
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if (msg) {
   document.getElementById('msgBox').innerHTML = msg;
   document.getElementById('msgBox').classList.remove('d-none');
} 
}


/**
 * checks if there is an account with a matching email and password
 * 
 */
async function logIn(){ 
    let email = document.getElementById('loginEmail');
    let password = document.getElementById('loginPassword');
    let mail = email.value;
    let user = AllUsers.find(u => u.email == email.value && u.password == password.value);
    // let mailName = AllUsers.findIndex(mail);
    if (user) {
        comingFromLogIn = true;
        for (let i = 0; i < AllUsers.length; i++) {
            if (mail == AllUsers[i]['email']) {
                currentUser.push(AllUsers[i]);
                comingFromLogIn = true;
                await backendIntegrationLogin();
            }
            }
            directToSummary();
    }
}


function confirmLogIn() {
    let mail = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    logInValidation(name, mail, password);
}



function logInValidation(mail, password) {
    if (mail.length < 2) {

        document.getElementById('logInNeededMail').innerHTML = 'Enter your Email adress'
    }
    if (password.length < 2) {

        document.getElementById('logInNeededPw').innerHTML = 'Enter your password'
    }
    else {
        logIn();
    }
}


 





