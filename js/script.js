async function userLoggedIn(){
    setURL('https://kirill-surikow.de/smallest_backend_ever');
    await downloadFromServer();
    let currentUserAsString = backend.getItem('user');
    currentUser = JSON.parse(currentUserAsString) || [];
}

// let currentUser;

/**
 * a helpfunction for the navbar
 * 
 * @param {string} target replaced by by one of the four main sites
 */
function openSection(target){
    window.location.href= target;
}

function logOut(){
    window.location.href='https://kirill-surikow.de/Join-main/Index.html';
}

function returnTo(){
    window.location.href= "https://kirill-surikow.de/Join-main/Summary.html"
}

function moveToForgotPw(){
    window.location.href= "https://kirill-surikow.de/Join-main/forgetPassword.html"
}

function moveToResetPw(){
    window.location.href= "https://kirill-surikow.de/Join-main/resetPassword.html"
}

function moveToLogIn(){
    // logOutUser();
    window.location.href= "https://kirill-surikow.de/Join-main/Index.html"
}

async function logOutUser(){
    currentUser = [{name : '', email : '', passwort : ''}];
    await backendIntegrationLogOut();
}

async function backendIntegrationLogOut(){
    await backend.setItem('user', JSON.stringify(currentUser));
}