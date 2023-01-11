/**
 * downloads allTasks, allContactsSorted and allContactsUnsorted
 * 
 */
async function initServer() {
    setURL('https://gruppe-335.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allContactsSorted = JSON.parse(backend.getItem('allContactsSorted')) || [];
    allContactsUnsorted = JSON.parse(backend.getItem('allContactsUnsorted')) || [];
    let allTasksAsString = backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString) || [];
    initRender();
}

async function clearContacts() {
    allContactsSorted.splice(0, allContactsSorted.length);
    allContactsUnsorted.splice(0,allContactsUnsorted.length);
    await backendIntegration();
}


let allContactsUnsorted = [];
let allContactsSorted = [];
let allTasks;
let choosenPrio = false;
let subtaskCounter = 0;

/**
 * request a task for a contact
 * 
 * @param {number} i index of a contact
 */
function requestNewTask(i) {
    resetAlert();
    initValidation(i);
}



/**
 * prepares all fields to validate them
 * 
 * @param {number} i index of a contact
 */
function initValidation(i) {
    let titleField = document.getElementById('title');
    let descriptionField = document.getElementById('description');
    let categoryField = document.getElementById('choiceContainer');
    let customizedCategory = document.getElementById('newCategory');
    let colorOfCategory = document.getElementById('chosenCategoryColor');
    let dueDate = document.getElementById('dueDate');
    executeValidation(i, titleField, descriptionField, categoryField, customizedCategory, colorOfCategory, dueDate);
}



/**
 * collects all the information to add a new task in form of a JSON
 * 
 * @param {number} i index of contact
 */
async function addNewTask(i) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let subtasks = checkSubtasks();
    let category = document.getElementById('choiceContainer').innerHTML;
    let categoryColor = document.getElementById('colorChoice').style.backgroundColor;
    let assignedTo = checkAssignedTo(i);
    let prio = checkPrio();

    let task = {
        'title': title,
        'description': description,
        'category': category,
        'categoryColor': categoryColor,
        'assignedTo': assignedTo,
        'dueDate': dueDate,
        'prio': prio,
        'subtasks': subtasks,
        'status': 'toDo'
    }

    await pushTask(task);
}

/**
 * takes the innerHTML of all subtasks and puts them in a JSON. The JSON is pushed in an array
 * 
 * @returns an array with all subtasks
 */
function checkSubtasks() {
    let allSubtasks = []
    let allSubtaskContainer = document.querySelectorAll('.subtaskName');
    for (let i = 0; i < allSubtaskContainer.length; i++) {
        let subtaskName = allSubtaskContainer[i].innerHTML;
        let subtask = {
            'subtaskName': subtaskName,
            'status': 'toDO'
        }
        allSubtasks.push(subtask);
    }
    return allSubtasks;
}

/**
 * the index of the contact who is assigned for a task is pushed in the array
 * 
 * @param {number} i index of a contact
 * @returns array containing the one contact assigned for the task
 */
function checkAssignedTo(i){
    let allAssignedPersonsArray =[];
    allAssignedPersonsArray.push(i);
    return allAssignedPersonsArray;
}


function checkPrio() {
    let allPrioSelected = document.querySelectorAll(".prioInput");
    for (let i = 0; i < allPrioSelected.length; i++) {
        if (allPrioSelected[i].checked) {
            return allPrioSelected[i].id;
        }
    }
}

function unSelectAllPrios(i, allPrioSelected) {
    allPrioSelected[i].classList.add('d-none');
    allPrioSelected[i].checked = false;
}

function highlightPrio(prio) {
    let button = document.getElementById(prio);
    button.classList.remove('d-none');
}

function removeHighlightPrio(prio) {
    let button = document.getElementById(prio);
    button.classList.add('d-none');
}

async function pushTask(task) {
    allTasks.push(task);
    await backendIntegrationForTask();
    redirectToBoard();
}

function redirectToBoard() {
    window.location.href = "board.html"
}

async function backendIntegrationForTask() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}

function checkInput(id, color) {
    let colorBtn = document.getElementById(id);
    colorBtn.checked = true;
    showColorInInput(color)
}

function checkButton(id, color) {
    let radioBtn = document.getElementById(id);
    radioBtn.checked = true;
    dropdown();
    showChoice(id);
    showColor(color);
    resetAlertForCategory()
}

function checkPrio() {
    let allPrios = document.querySelectorAll('.prioInput');
    for (let i = 0; i < allPrios.length; i++) {
        if (allPrios[i].checked == true) {
            return allPrios[i].value;
        }
    }
}

/**
 * the information for a new contact are collected
 * 
 */
async function requestNewContact() {
    document.getElementById('incorrectName').style.display='none'
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let initials = createInitials(name)
    if(name.trim().split(/\s+/).length <2 ){
        document.getElementById('incorrectName').style.display='flex'
    }else{
        addContact(name,email,phone,initials)
    }
}

/**
 * the contact is added to the array allContactsUnsorted
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {string} initials 
 */
async function addContact(name,email,phone,initials){
    let colorID = createRandomColor();
    allContactsUnsorted.push({ "name": name, "email": email, "phone": phone, "initials":initials, "colorID": colorID});
    closePopUpEditContacts();
    await sortByAlpabet();
}

/**
 * 
 * @returns a string(rgb) as a color ID for the contact
 */
function createRandomColor(){
    let redPart = Math.round(Math.random() * 255);
    let greenPart = Math.round(Math.random() * 255);
    let bluePart = Math.round(Math.random() * 255);
    let colorID = `rgb(${redPart},${greenPart},${bluePart})`;
    return colorID;
}


/**
 * the contacts are sort by alphabet
 * 
 */
async function sortByAlpabet() {
    allContactsSorted = allContactsUnsorted.sort((a, b) => a.name.localeCompare(b.name))
    await backendIntegration();
    clearRegister();
    initRender();
}

/**
 * the sorted and unsorted array with the contacts is uploaded
 * 
 */
async function backendIntegration() {
    await backend.setItem('allContactsSorted', JSON.stringify(allContactsSorted));
    await backend.setItem('allContactsUnsorted', JSON.stringify(allContactsUnsorted));
}

/**
 * renders all contacts to a register
 * 
 */
function initRender() {
    let register = document.querySelectorAll('.allPersons');
    showCompleteRegister();
    for (let i = 0; i < allContactsSorted.length; i++) {
        let name = allContactsSorted[i]['name'];
        let firstLetter = name.charAt(0).toLowerCase()
        for (let j = 0; j < register.length; j++) {
            let registerLetter = register[j].id
            if (firstLetter == registerLetter) {
                renderContact(i, registerLetter);
            }
        }
    }
    hideEmptyRegister();
    checkRegisterHeight();
}

/**
 * if the register is to high it should be set on overflow scroll
 * 
 */
function checkRegisterHeight(){
    if(window.innerWidth > 1200){
        checkNormalLayout();
    }
    else{
        checkResponsiveLayout();
    }
   
}

/**
 * fires the function which makes the long name slide
 * 
 * @param {number} i index of contact
 */
function scrollName(i){
    let idContact = 'contactName' + `${i}`;
    document.getElementById(idContact).innerHTML = allContactsSorted[i]['name'];
    document.getElementById(idContact).classList.add('showFullName');
}

/**
 * stops the function which makes the long name slide
 * 
 * @param {number} i index of contact
 */
function stopScrolling(i){
    let idContact = 'contactName' + `${i}`;
    reduceLength(i,'contactName',15);
    document.getElementById(idContact).classList.remove('showFullName') 
}

/**
 * extracts the initials of the name
 * 
 * @param {string} name 
 * @returns 
 */
function createInitials(name) {
    let nameArray = name.split(/\s+/);
    let firstLetter = nameArray[0].charAt(0);
    let secondLetter = nameArray[1].charAt(0);
    let initials = firstLetter + secondLetter;
    return initials;
}

/**
 * prepares the information of the contact
 * 
 * @param {number} i 
 */
function prepareContactInformation(i){
    let initials = allContactsSorted[i]['initials'];
    let colorID = allContactsSorted[i]['colorID'];
    let name = allContactsSorted[i]['name'];
    let email = allContactsSorted[i]['email'];
    let phone = allContactsSorted[i]['phone'];
    renderContactPopUp(initials,colorID, name, i, email, phone);
    checkNameLengthD(i);
}

/**
 * scrolls through the name
 * 
 * @param {number} i 
 */
function scrollNameD(i){
    let idContact = 'contactsNameD' + `${i}`;
    document.getElementById(idContact).innerHTML = allContactsSorted[i]['name'];
    document.getElementById(idContact).classList.add('showFullName');
}

/**
 * stops scrolling through the name
 * 
 * @param {number} i 
 */
function stopScrollingD(i){
    let idContact = 'contactsNameD' + `${i}`;
    reduceLength(i,'contactsNameD',15);
    document.getElementById(idContact).classList.remove('showFullName') 
}


/**
 * onclick: opens a popup. You can add task and assign them to the choosen contact
 * 
 * @param {number} i 
 */
function initAddTaskToContact(i) {
    blurrBackground();
    translateMask();
    renderAddTaskToContacts(i);
}



function initEditContact(i) {
    blurrBackground();
    translateEditMask();
    prepareEditContact(i);
}

/**
 * prepares the information of a contact, which can be edited
 * 
 * @param {number} i 
 */
 function prepareEditContact(i) {
    let contactsName = allContactsSorted[i]['name'];
    let initials =     allContactsSorted[i]['initials'];
    let contactsEmail = allContactsSorted[i]['email'];
    let contactsPhone = allContactsSorted[i]['phone'];
    renderEditContact(initials,contactsName, contactsEmail, contactsPhone, i)
}

/**
 * overrides the old information of the contact
 * 
 * @param {number} i index of contact
 */
async function saveEdit(i){
    let newName = document.getElementById('editedName').value;
    let newMail = document.getElementById('editedEmail').value;
    let newPhone = document.getElementById('editedPhone').value;
    allContactsSorted[i]['name'] = newName;
    allContactsSorted[i]['email'] = newMail;
    allContactsSorted[i]['phone'] = newPhone;
    await backendIntegration();
    clearRegister();
    closePopUpEditContacts()
    initRender();
}

function responsiveTranslate(){
    if(window.innerWidth < 880){
        document.getElementById('contactsContainer').style.transform = 'translateX(-100%)';
    }
}


