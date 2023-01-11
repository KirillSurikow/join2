/**
 * resets previous alerts, of invalid requests
 * 
 * 
 */
 function resetAlert() {
    document.getElementById('alertTitle').classList.add('d-none');
    document.getElementById('alertDescription').classList.add('d-none');
    document.getElementById('alertCategory').classList.add('d-none');
    document.getElementById('alertDate').classList.add('d-none');
    document.getElementById('alertPriority').classList.add('d-none');
}

/**
 * executes the validation
 * 
 * @param {number} i 
 * @param {html} titleField 
 * @param {html} descriptionField 
 * @param {html} categoryField 
 * @param {html} customizedCategory 
 * @param {html} colorOfCategory 
 */
 function executeValidation(i, titleField, descriptionField, categoryField, customizedCategory, colorOfCategory) {
    if (titleField.value.length < 2) {
        document.getElementById('alertTitle').classList.remove('d-none')
    }
    else if (descriptionField.value.length < 2) {
        document.getElementById('alertDescription').classList.remove('d-none')
    }
    else if (categoryField && categoryField.innerHTML == 'Select Task Category') {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Category'
    }
    else if (!categoryField) {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Category'
    }
    else if (customizedCategory && customizedCategory.value == "") {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Name a Category'
    }
    else if (colorOfCategory == 'transparent') {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Color';
    }
    else if (dueDate.value == "") {
        document.getElementById('alertDate').classList.remove('d-none');
        document.getElementById('alertDate').innerHTML = 'Set a Due Date';
    }
    else if (choosenPrio == false) {
        document.getElementById('alertPriority').classList.remove('d-none');
    } else {
        addNewTask(i)
    }
}

// are already documented at the addTask.js or addTaskStyle.js
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

function createNewCategory() {
    newCategoryInterface = true;
    let input = document.getElementById('category');
    input.innerHTML = returnInputInnerHTML()
}

function returnToNormal() {
    newCategoryInterface == false;
    let input = document.getElementById('category');
    input.innerHTML = returnNormalInputInnerHTML()
}

function showColor(color) {
    let colorToChange = document.getElementById('colorChoice');
    colorToChange.style.backgroundColor = color;
}

function showColorInInput(color) {
    let colorSignature = document.getElementById('chosenCategoryColor');
    colorSignature.style.backgroundColor = color;
}

function showChoice(choice) {
    let choiceContainer = document.getElementById('choiceContainer');
    choiceContainer.innerHTML = choice;
}

function dropdown() {
    let dropdownContainer = document.getElementById('selectFields');
    dropdownContainer.classList.toggle('d-none')
}

function confirmNewCategory() {
    resetAlertForCategory();
    let nameOfCategory = document.getElementById('newCategory').value;
    let chosenColor = identifyChosenColor();
    categoryValidation(nameOfCategory, chosenColor);
}

function resetAlertForCategory() {
    document.getElementById('alertCategory').classList.add('d-none');
    document.getElementById('alertCategory').innerHTML = "";
}

function identifyChosenColor() {
    return document.getElementById('chosenCategoryColor').style.backgroundColor;
}

function restructureCategorySelect(nameOfCategory, chosenColor) {
    let categorySelect = document.getElementById('category');
    categorySelect.innerHTML = returnCategorySelectInnerHTML(nameOfCategory)
    document.getElementById('colorChoice').style.backgroundColor = chosenColor;
}

function categoryValidation(nameOfCategory, chosenColor) {
    if (nameOfCategory.length < 2) {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'The Category should have at least two letters.'
    }
    if (chosenColor == 'transparent') {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML += 'Choose a color for your category'
    } else {
        restructureCategorySelect(nameOfCategory, chosenColor);
    }
}



function addSubtask() {
    let newSubtask = document.getElementById('subtask').value;
    let subtaskList = document.getElementById('subtaskList');
    if (newSubtask.length < 2) {
        document.getElementById('noSubtask').classList.remove('d-none');/*alert invalid subtask */
    } else {
        document.getElementById('noSubtask').classList.add('d-none');/* remove alert*/
        subtaskList.innerHTML += returnSubtaskToContactHTML(subtaskCounter,newSubtask) ;
        document.getElementById('subtask').value = "";
        subtaskCounter++;
        if(window.innerWidth <= 880){
            scrollDown(); 
        }
    }
    installScrollBar('subtaskList');
}

/**
 * scrolls a bit down after adding a subtask
 * 
 */
function scrollDown() {
    if(subtaskCounter< 6){
    window.scrollBy(0, 25);
    document.getElementById('addTaskContainer').scrollBy(0,25);
    }
}


function deleteSubtask(taskID) {
    let elementToRemove = document.getElementById(taskID)
    elementToRemove.remove();
    installScrollBar();
}

// are already documented at the addTask.js or addTaskStyle.js(end)

/**
 * the section for a new contact is opened
 * 
 */
 function openNewContact() {
    document.getElementById('blurBackground').classList.remove('d-none');
    translateEditMask();
    prepareNewContactMask();
}

/**
 * the edit mask is swipped inside of the screen
 * 
 */
function translateEditMask() {
    document.getElementById('editContactContainer').style.display = "flex"
    document.getElementById('editContactContainer').style.transform = "translate(0,0)"
}

/**
 * the new contact interface is hidden
 * 
 */
 function closeNewContact() {
    document.getElementById('popUp').classList.remove('newContactBackground');
    document.getElementById('popUp').classList.add('d-none');
}

/**
 * the mask for a new Contact is rendered 
 * 
 */
 function prepareNewContactMask(){
    let createNewContactContainer = document.getElementById('editContactContainer'); 
    createNewContactContainer.innerHTML = returncreateNewContactContainerHTML();
}

function clearRegister(){
    let register = document.querySelectorAll('.allPersons')
    for (let i = 0; i < register.length; i++) {
        let registerLetter = register[i].id ;
        document.getElementById(registerLetter).innerHTML = "";
    }
}

/**
 * If the slot of for example "A" is empty, the whole slot "A" should be hidden
 * 
 */
 function hideEmptyRegister(){
    let allRegisters = document.querySelectorAll('.allPersons');
    for (let i = 0; i < allRegisters.length; i++) {
        let registerID =  allRegisters[i].id;
        let register = document.getElementById(registerID);
        if(register.innerHTML == ""){
            document.getElementById(`${registerID}Container`).style.display = "none";
        }
    }
}

/**
 * Before you can hide empty slots you need to display all slots, full and empty
 * 
 */
 function showCompleteRegister(){
    let allRegisters = document.querySelectorAll('.allPersons');
    for (let i = 0; i < allRegisters.length; i++) {
        let registerID =  allRegisters[i].id;
        document.getElementById(`${registerID}Container`).style.display = "flex";
    } 
}

/**
 * setting the register on overflow scroll for responsive Layout
 * 
 */
 function checkResponsiveLayout(){
    let register = document.getElementById('contactsContainer');
    let registerHeight = document.getElementById('contactsContainer').offsetHeight;
    let possibleHeight = window.innerHeight - document.getElementById('header').offsetHeight - 80;
    if (registerHeight >= possibleHeight){
        register.style.overflowY="scroll";
    }
    else{
        register.style.overflowY="auto";
    }    
}

/**
 * setting the register on overflow scroll for normal Layout
 * 
 */
function checkNormalLayout(){
    let register = document.getElementById('contactsContainer');
    let registerHeight = document.getElementById('contactsContainer').offsetHeight;
    let possibleHeight = window.innerHeight - document.getElementById('header').offsetHeight;
    if (registerHeight >= possibleHeight){
        register.style.overflowY="scroll";
    }
    else{
        register.style.overflowY="auto";
    } 
}

/**
 * renders a contact according to his first letter
 * 
 * @param {number} i index of contact
 * @param {string} registerLetter render according to first letter
 */
 function renderContact(i, registerLetter) {
    let letterContainer = document.getElementById(registerLetter);
    let contact = allContactsSorted[i]['name'];
    let email = allContactsSorted[i]['email'];
    let initials = allContactsSorted[i]['initials'];
    let colorID = allContactsSorted[i]['colorID'];
    letterContainer.innerHTML += returnContactSnippetHTML(i, initials, contact, email, colorID);
    checkNameLength(i);
}

/**
 * If a name is too long, the name should be shortend and onmouseover the whole name slides through the span container
 * 
 * @param {number} i 
 */
function checkNameLength(i){
    let idContact = 'contactName' + `${i}`;
    let contactElement = document.getElementById(`contactInfo${i}`)
    let contactName = document.getElementById(idContact).innerHTML;
    let contactNameLength = contactName.length;
    if(contactNameLength > 16){
        reduceLength(i,'contactName',16)
     }else{
        contactElement.removeAttribute("onmouseover");
        contactElement.removeAttribute("onmouseout");
     }
}

/**
 * shortens too long names
 * 
 * @param {number} i 
 * @param {string} text 
 * @param {string} length 
 */
 function reduceLength(i, text, length){
    let id = text + i;
    let nameToShort = document.getElementById(id).innerHTML;
    let shortName = nameToShort.slice(0,length);
    document.getElementById(id).innerHTML = shortName + '...';
}

/**
 * Displays the contactPopUp according to the width of the screen
 * 
 * @param {number} i 
 */
 function initContactPopUp(i) {
    if(window.innerWidth < 880){
        document.getElementById('contactsContainer').style.display = 'none';
        document.getElementById('contactsBoard').style.display = 'flex';
    }
    document.getElementById('detailedContact').style.display = 'flex'
    document.getElementById('detailedContact').style.transform = 'translateX(0)'
    prepareHighlight(i);
    prepareContactInformation(i);
    checkNameLengthD(i)
}

/**
 * rendering the details of a choosen contact from the register
 * 
 * @param {string} initials 
 * @param {string} colorID 
 * @param {string} name 
 * @param {number} i 
 * @param {string} email 
 * @param {number} phone 
 */
 function renderContactPopUp(initials,colorID, name, i, email, phone) {
    let popUp = document.getElementById('detailedContact')
    popUp.innerHTML = returnContactPopUpHTML(colorID,initials, name, i, email, phone);
}

/**
 * If a name is too long it gets a slide function as before
 * 
 * @param {number} i 
 */
 function checkNameLengthD(i){
    let idContact = 'contactsNameD' + `${i}`;
    let contactName = document.getElementById(idContact).innerHTML;
    let contactNameLength = contactName.length;
    let hoverElement = document.getElementById(`dcContactPlusAddTask${i}`)
    if(contactNameLength > 15){
        reduceLength(i,'contactsNameD',15)
     }else{
        hoverElement.removeAttribute("onmouseover");
        hoverElement.removeAttribute("onmouseout");
     }
}

/**
 * in responsive mode there is an additional back arrow, if clicked the viewport returns to the register
 * 
 * @param {number} i 
 */
 function translateBack(i){
    document.getElementById('contactsContainer').style.display = 'flex';
    document.getElementById('contactsBoard').style.display = 'none';
    document.getElementById(`person${i}`).style = "";
}

/**
 * before a contact can be highlighted, every highlight before must be removed
 * 
 * @param {number} i 
 */
 function prepareHighlight(i){
    let allPersons = document.querySelectorAll('.innerAllPersonsContainer');
    for (let j = 0; j < allPersons.length; j++) {
     let person = allPersons[j];
     person.style=""
    }
    highlightPerson(i);
 }
 
 /**
  * highlight of the selected person
  * 
  * @param {number} i 
  */
 function highlightPerson(i){
     document.getElementById(`person${i}`).style=`background-color:#2A3647; color:white`
 }

 /**
 * always used for a pop up
 * 
 */
function blurrBackground() {
    document.getElementById('blurBackground').classList.remove('d-none');
}

/**
 * display and translate the mask
 * 
 */
 function translateMask() {
    document.getElementById('addTaskToContact').style.display = "flex"
    document.getElementById('addTaskToContact').style.transform = "translateX(0vw)"
}

/**
 * close the pop up with display none and translate
 * 
 */
function closePopUpAddTaskContacts() {
    document.getElementById('blurBackground').classList.add('d-none');
    document.getElementById('addTaskToContact').style.transform = "translateX(100vw)"
    document.getElementById('addTaskToContact').style.display = "none"
}

/**
 * renders the pop up if you want to add a task to a contact
 * 
 * @param {number} i 
 */
 function renderAddTaskToContacts(i) {
    let addTaskContainer = document.getElementById('addTaskToContact');
    addTaskContainer.innerHTML = returnTaskContainerContactsHTML(i)
}

/**
 * renders the pop up if you want to edit a contact
 * 
 * @param {number} i 
 */
 function renderEditContact(initials, contactsName, contactsEmail, contactsPhone, i) {
    let editContactContainer = document.getElementById('editContactContainer');
    editContactContainer.innerHTML = returneditContactContainerHTML(initials, contactsName, contactsEmail, contactsPhone, i) 
}

/**
 * closes the pop up which edits contacts
 * 
 */
 function closePopUpEditContacts() {
    document.getElementById('blurBackground').classList.add('d-none');
    if(window.innerWidth > 880){
    document.getElementById('editContactContainer').style.transform = "translateX(100vw)";
    document.getElementById('editContactContainer').style.display = "none";
    }else{
        document.getElementById('editContactContainer').style.transform = "translateY(100vh)" ;
        document.getElementById('editContactContainer').style.display = "none";
    }
}