/**
 * downloads all existing users
 * 
 */
async function backendSignUp() {
    setURL('https://gruppe-335.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allUsers = JSON.parse(backend.getItem('users')) || [];
}

let allUsers = [];

/**
 * adds a user to the array allUser and uploads the array
 * 
 */
async function addUser() {
    let name = document.getElementById('signUpName');
    let email = document.getElementById('signUpEmail');
    let password = document.getElementById('signUpPassword');
    allUsers.push({ name: name.value, email: email.value, password: password.value })
    await backendIntegrationSignUp();
    window.location.href = 'https://gruppe-335.developerakademie.net/Join-1/index.html?msg=Du hast dich erfolgreich registriert';
}

function confirmSignUp() {
    let name = document.getElementById('signUpName').value;
    let mail = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPassword').value;
    signUpValidation(name, mail, password);
}



function signUpValidation(name, mail, password) {
    if (name.length < 2) {
        document.getElementById('signUpNeededName').innerHTML = 'Enter first and lastname'
    }
    if (mail.length < 2) {

        document.getElementById('signUpNeededMail').innerHTML = 'Enter your Email adress'
    }
    if (password.length < 2) {

        document.getElementById('signUpNeededPw').innerHTML = 'Enter your password'
    }
    else {
        addUser();
    }
}










/**
 * uploads
 * 
 */
async function backendIntegrationSignUp() {
    await backend.setItem('users', JSON.stringify(allUsers));
}


function backToLogIn() {
    window.location.href = 'https://gruppe-335.developerakademie.net/Join-1/index.html';
}


