/**
 * Downloads all existing Tasks and Contacts
 * 
 */
async function initServer() {
    setURL('https://gruppe-335.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allContactsSorted = JSON.parse(backend.getItem('allContactsSorted')) || [];
    allContactsUnsorted = JSON.parse(backend.getItem('allContactsUnsorted')) || [];
}

let allTasks = [];
let choosenPrio = false;
let subtaskCounter = 0;

/**
 * receives a request for a new task
 * 
 */
function requestNewTask() {
    resetAlert();
    initValidation();
}

/**
 * clears the formular
 * 
 */
function clearFormular(){
    clearAllInputFields();
    returnToNormal();
    removeAllAssignedContacts();
    returnToNormalContactInterface();
    clearPrios();
    clearSubtasks();
}

/**
 * clears the inputfields of the formular
 * 
 */
function clearAllInputFields(){
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('dueDate').value = "";
}


/**
 * removes all assigned persons
 * 
 */
function  removeAllAssignedContacts(){
   let allAssignedPersons = document.querySelectorAll('.assignToCirle');
   for (let i = 0; i < allAssignedPersons.length; i++) {
    let assignedPersonID = allAssignedPersons[i].id;
    removeContactAndToggle(assignedPersonID)
   }
}

/**
 * prepares clearing of priotity section
 * 
 */
function clearPrios(){
    let buttons = document.querySelectorAll('.prioInput');
    let priorityFields = document.querySelectorAll('.prioSelected')
    for (let i = 0; i < buttons.length; i++) {
        clearPrio(i,buttons,priorityFields);
    }
}

/**
 * clears prios
 * 
 * @param {number} i 
 * @param {array} buttons 
 * @param {array} priorityFields 
 */
function clearPrio(i,buttons,priorityFields){
    buttons[i].checked = false;
    priorityFields[i].classList.add('d-none');
}

function clearSubtasks(){
    document.getElementById('subtaskList').innerHTML = "";
}


/**
 * prepares validation by selecting all relevant elements
 * 
 * 
 */
function initValidation() {
    let titleField = document.getElementById('title');
    let descriptionField = document.getElementById('description');
    let categoryField = document.getElementById('choiceContainer');
    let customizedCategory = document.getElementById('newCategory');
    let colorOfCategory = document.getElementById('chosenCategoryColor');
    let assignedContacts = document.getElementById('assignedContacts')
    let dueDate = document.getElementById('dueDate');
    executeValidation(titleField, descriptionField, categoryField, customizedCategory, colorOfCategory, assignedContacts, dueDate);
}

/**
 * A task in form of a JSON Object is prepared, including some helpfunctions, generating the necessary information
 * 
 */
async function addNewTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let assignedTo = checkAssignedPersons();
    let dueDate = document.getElementById('dueDate').value;
    let subtasks = checkSubtasks();
    let category = document.getElementById('choiceContainer').innerHTML;
    let categoryColor = document.getElementById('colorChoice').style.backgroundColor;
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
 * Extracts the ids of elements contained by an array and pushes them in a new Array. The ids are numbers or more precisly the index of a contact in the Array allContactsSorted[]
 * 
 * @returns an array with indexes of the assigned contacts
 */
function checkAssignedPersons(){
    let allAssignedPersonsArray =[];
    let allAssignedPersons = document.querySelectorAll('.assignToCirle');
    for (let j = 0; j < allAssignedPersons.length; j++) {
        let idOfContact = allAssignedPersons[j].id;
        allAssignedPersonsArray.push(idOfContact)
    }
    return allAssignedPersonsArray
}

/**
 * makes a for loop through all prio button and select the value of the checked button
 * 
 * @returns the value of the checked prio button
 */
function checkPrio() {
    let allPrios = document.querySelectorAll('.prioInput');
    for (let i = 0; i < allPrios.length; i++) {
        if (allPrios[i].checked == true) {
            return allPrios[i].value;
        }
    }
}

/**
 * Extracts the innerHTML of elements contained by an array and. Each innerHTLM(subtaskName) is put in a JSON object
 * 
 * @returns an Array with JSON objects with the properties subtaskname and the status of the subtask
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
 * Extracts the checked status of elements contained by an array. The elements are radio buttons. In the for loop is an if statement, asking which radio button is checked
 * 
 * @returns if the radio button is checked it returns the id of the radio button element.
 */
function checkPrio() {
    let allPrioSelected = document.querySelectorAll(".prioInput");
    for (let i = 0; i < allPrioSelected.length; i++) {
        if (allPrioSelected[i].checked) {
            return allPrioSelected[i].id;
        }
    }
}

/**
 * a task in form of an jsonobject is pushed in the array allTasks. Afterwards, the array is saved on the server and the user is redirected to the board
 * 
 * @param {JSON} task 
 */
async function pushTask(task) {
    allTasks.push(task);
    await backendIntegration();
    redirectToBoard();
}

/**
 *  redirection to board
 * 
 */
function redirectToBoard() {
    window.location.href = "board.html"
}

/**
 * the array allTasks is transformed to a string and saved in the backend with the key allTasks
 * 
 */
async function backendIntegration() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * every colorChoice is linked to a radio button, so that you can choose only one color. 
 * 
 * @param {string} id the id of the radio button which switches on check if clicked on the colored circle
 * @param {string} color an rgb(...)
 */
function checkInput(id, color) {
    let colorBtn = document.getElementById(id);
    colorBtn.checked = true;
    showColorInInput(color)
}

/**
 * 
 * 
 * @param {string} id of the linked radiobutton
 * @param {string} color the color code
 */
function checkButton(id, color) {
    let radioBtn = document.getElementById(id);
    radioBtn.checked = true;
    dropdown();
    showChoice(id);
    showColor(color);
    resetAlertForCategory()
}


/**
 * resets the alert of invalid validation
 * 
 */
function resetAlertForCategory() {
    document.getElementById('alertCategory').classList.add('d-none');
    document.getElementById('alertCategory').innerHTML = "";
}

/**
 * the input is transformed to a div container, containig the name and the color of the category
 * 
 * @param {*} nameOfCategory 
 * @param {*} chosenColor 
 */
function restructureCategorySelect(nameOfCategory, chosenColor) {
    let categorySelect = document.getElementById('category');
    categorySelect.innerHTML = returnCategorySelectInnerHTML(nameOfCategory)
    document.getElementById('colorChoice').style.backgroundColor = chosenColor;
}

/**
 * all contacts are displayed in a scrollmenu
 * 
 */
function loadAllContacts(){
    for (let i = 0; i < allContactsSorted.length; i++) {
        let contactsName = allContactsSorted[i]['name'];
        renderContact(i,contactsName);
    }
}

/**
 * Apart from the other contacts, if a task is assigned to you the parameter is not the index of the contact, instead it is just 'you'
 * 
 * @param {string} i for further operation, it is necessary to have an identifier like 'you' or an index
 */
function assignYou(i){
    let assigned = document.getElementById(`assigned${i}`);
    let notAassigned = document.getElementById(`notAssigned${i}`);
    assigned.classList.toggle('d-none');
    notAassigned.classList.toggle('d-none');
    showOrRemoveYou(assigned,i)
}

/**
 * decides if you are assigned or reassigned. If the clicked contact slot has a visable and checked checkbox, it means, that the class d-none is removed, which means you are already selected. And if clicked again, the you should be deselected.
 * 
 * @param {*} assigned 
 * @param {*} i 
 */
function showOrRemoveYou(assigned,i){
    if(assigned.classList.contains('d-none')){
        removeYou(i)
    }else{
        displayYou(i) 
    }
}


/**
 * same procedures as assignYou, just with another contact
 * 
 * @param {number} i index of the contact
 */
function assignTo(i){
    let assigned = document.getElementById(`assigned${i}`);
    let notAassigned = document.getElementById(`notAssigned${i}`);
    assigned.classList.toggle('d-none');
    notAassigned.classList.toggle('d-none');
    showOrRemoveInitials(assigned,i)
}

/**
 * same procedure as showOrRemoveYou
 * 
 * @param {html} assigned 
 * @param {number} i 
 */
function showOrRemoveInitials(assigned,i){
    if(assigned.classList.contains('d-none')){
        removeContact(i);
    }else{
        displayContact(i); 
    }
}

/**
 * returns to the normal menu by changing the innerHTML again
 * 
 */
function returnToNormalContactInterface(){
    let interface = document.getElementById('assignedTo');
    interface.innerHTML = returnNormalContactInterface();
}

/**
 * the function is called on keyup, meaning after every new letter in the searchinput, the function is called again
 * 
 */
function findContact(){
    let searchContact = document.getElementById('searchContactInput').value;
    let searchLetters = searchContact.toLowerCase();
    clearSearchContainer();
    prepareForContact(searchLetters);
}

/**
 * 
 * 
 * @param {string} searchLetters 
 */
function prepareForContact(searchLetters){
    for (let i = 0; i < allContactsSorted.length; i++) {
        let contactMail = allContactsSorted[i]['email'];
        startSearchForContact(searchLetters,contactMail,i);
    }
}


/**
 * compares the search with the existing emails
 * 
 * @param {string} searchLetters 
 * @param {string} contactMail 
 * @param {number} i index of the contact
 */
function startSearchForContact(searchLetters,contactMail,i){
    if(contactMail.toLowerCase().includes(searchLetters)){
        renderContactAccordingToMail(i);
    }
}

/**
 * Sets the global variable choosenPrio on true (needed for the validation). 
 * If button is first set on unchecked, the button switches on check and the class of the visual button is changed. 
 * IF clicked a second time the button and the class are deactivated.
 * 
 * @param {html} prio 
 * @param {html} input 
 */
function setPrio(prio, input) {
    choosenPrio = true;
    let button = document.getElementById(input);
    let allPrioSelected = document.querySelectorAll(".prioSelected");
    if (button.checked == false) {
        for (let i = 0; i < allPrioSelected.length; i++) {
            unSelectAllPrios(i, allPrioSelected);
        }
        highlightPrio(prio);
        button.checked = true;
    }

    else {
        button.checked = false;
        removeHighlightPrio(prio);
        choosenPrio = false;
    }
}

/**
 * at the beginning of every prio selection, all selected prio elements will be hidden.
 * 
 * @param {number} i index of Array with all activated buttons
 * @param {array} allPrioSelected contains all activated buttons
 */
function unSelectAllPrios(i, allPrioSelected) {
    allPrioSelected[i].classList.add('d-none');
    allPrioSelected[i].checked = false;
}

/**
 * the selected Prio element appears above the unselected Prio element
 * 
 * @param {html} prio 
 */
function highlightPrio(prio) {
    let button = document.getElementById(prio);
    button.classList.remove('d-none');
}

async function clearBackend() {
    allTasks.splice(0, allTasks.length);
    await backendIntegration();
}


/**
 * a subtask is deleted
 * 
 * @param {number} taskID 
 */
function deleteSubtask(taskID) {
    let elementToRemove = document.getElementById(taskID)
    elementToRemove.remove();
    installScrollBar('subtaskList');
}

/**
 * the window is scrolled down a bit
 * 
 */
function scrollDown() {
    if(subtaskCounter< 6){
    window.scrollBy(0, 25);
    document.getElementById('addTaskContainer').scrollBy(0,25);
    }
}

