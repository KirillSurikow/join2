/**
 * resets previous alerts, of invalid requests
 * 
 * 
 */
 function resetAlert() {
    document.getElementById('alertTitle').classList.add('d-none');
    document.getElementById('alertDescription').classList.add('d-none');
    document.getElementById('alertCategory').classList.add('d-none');
    document.getElementById('alertContact').classList.add('d-none');
    document.getElementById('alertDate').classList.add('d-none');
    document.getElementById('alertPriority').classList.add('d-none');
    document.getElementById('alertContact').classList.add('d-none');
}

/**
 * executes the validation, all parameters are strings
 * 
 * @param {*} titleField 
 * @param {*} descriptionField 
 * @param {*} categoryField 
 * @param {*} customizedCategory 
 * @param {*} colorOfCategory 
 * @param {*} assignedContacts 
 * @param {*} dueDate 
 */
 function executeValidation(titleField, descriptionField, categoryField, customizedCategory, colorOfCategory,assignedContacts, dueDate) {
    if (titleField.value.length < 2) {
        document.getElementById('alertTitle').classList.remove('d-none');
    }
    else if (descriptionField.value.length < 2) {
        document.getElementById('alertDescription').classList.remove('d-none');
    }
    else if (categoryField && categoryField.innerHTML == 'Select Task Category') {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Category';
    }
    else if (!categoryField) {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Category';
    }
    else if (customizedCategory && customizedCategory.value == "") {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Name a Category';
    }
    else if (colorOfCategory == 'transparent') {
        document.getElementById('alertCategory').classList.remove('d-none');
        document.getElementById('alertCategory').innerHTML = 'Choose a Color';
    }else if(assignedContacts.innerHTML == ""){
        document.getElementById('alertContact').classList.remove('d-none');
    }
    else if (dueDate.value == "") {
        document.getElementById('alertDate').classList.remove('d-none');
        document.getElementById('alertDate').innerHTML = 'Set a Due Date';
    }
    else if (choosenPrio == false) {
        document.getElementById('alertPriority').classList.remove('d-none');
    } else {
        addNewTask()
    }
}

/**
 * activates and deactivates the dropdown menu of the category section
 * 
 */
 function dropdown() {
    let dropdownContainer = document.getElementById('selectFields');
    dropdownContainer.classList.toggle('d-none')
}

/**
 * the innerHTML of the categoryContainer will be changed, so that you can see the interface for the customized category
 * 
 */
 function createNewCategory() {    
    // newCategoryInterface = true;
    let input = document.getElementById('category');
    input.innerHTML = returnInputInnerHTML()
}

/**
 * The choosen color is displayed on in the input next to the category name. The style of the element receives the color code
 * 
 * @param {string} color an rgb(...)
 */
 function showColor(color) {
    let colorToChange = document.getElementById('colorChoice');
    colorToChange.style.backgroundColor = color;
}


/**
 * returns to the normal interface of the category section
 * 
 */
function returnToNormal() {
    // newCategoryInterface == false;
    let input = document.getElementById('category');
    input.innerHTML = returnNormalInputInnerHTML()
}

/**
 * confirms the choosen color for the customized category, because after the confirmation the input turns into a div container
 * 
 * @param {string} color 
 */
 function showColorInInput(color) {
    let colorSignature = document.getElementById('chosenCategoryColor');
    colorSignature.style.backgroundColor = color;
}


/**
 * changes the innerHTML of of the div element displaying the name of the customized category
 * 
 * @param {string} choice 
 */
function showChoice(choice) {
    let choiceContainer = document.getElementById('choiceContainer');
    choiceContainer.innerHTML = choice;
}

/**
 * confirms the customized category with the linked color choice
 * 
 */
 function confirmNewCategory() {
    resetAlertForCategory();
    let nameOfCategory = document.getElementById('newCategory').value;
    let chosenColor = identifyChosenColor();
    categoryValidation(nameOfCategory, chosenColor);
}

/**
 * identifys the choosen color for future procedures
 * 
 * @returns an rgb code
 */
 function identifyChosenColor() {
    return document.getElementById('chosenCategoryColor').style.backgroundColor;
}

/**
 * validation of the category section
 * 
 * @param {string} nameOfCategory 
 * @param {string} chosenColor 
 */
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


/**
 * dropdown menu of Contact Assignment is activated
 * 
 */
 function dropdownAT(){
    let dropdownContacts = document.getElementById('selectFieldsAT');
    dropdownContacts.classList.toggle('d-none');
    loadAllContacts();
}

/**
 * each contact has an index in the array allContactsSorted
 * 
 * @param {number} i 
 * @param {string} contactsName 
 */
 function renderContact(i,contactsName){
    let contactMenu = document.getElementById('allContactsToAssign');
    contactMenu.innerHTML += returnContactMenuHTML(i,contactsName);
}

/**
 * the you circle, meaning you are assigned is displayed
 * 
 * @param {string} i 
 */
 function displayYou(i){
    let assignToContainer = document.getElementById('assignedContacts')
    assignToContainer.innerHTML += returnAssignToContainerHTML(i);
}

/**
 * the same circle is removed
 * 
 * @param {string} i 
 */
function removeYou(i){
    let elementToRemove = document.getElementById(`${i}`);
    elementToRemove.remove();
}

/**
 * same procedure as displayYou
 * 
 * @param {number} i is the id of the circle with the initials of the contact you want to select or reselct
 */
 function displayContact(i){
    let assignToContainer = document.getElementById('assignedContacts')
    let initials = allContactsUnsorted[i]['initials'];
    let colorID = allContactsUnsorted[i]['colorID'];
    assignToContainer.innerHTML += returnAssignToContainer2(i,initials,colorID);
}


/**
 * same procedure as removeYou
 * 
 * @param {number} i 
 */
function removeContact(i){
    let elementToRemove = document.getElementById(`${i}`);
    elementToRemove.remove();
}

/**
 * reselect a contact by clicking on the hovering cross directly on his initials
 * 
 * @param {number} i is the id of the the circle 
 */
function removeContactAndToggle(i){
    let elementToRemove = document.getElementById(`${i}`);
    elementToRemove.remove(); 
    let assigned = document.getElementById(`assigned${i}`);
    let notAassigned = document.getElementById(`notAssigned${i}`);
    assigned.classList.toggle('d-none');
    notAassigned.classList.toggle('d-none');
}

/**
 * displays the delete cross when hovering on the circle with the initials
 * 
 * @param {string} object is the id of the cross which shall be displayed
 */
 function showCross(object){
    document.getElementById(object).style.display= "flex";
}

/**
 * hides the delete cross, as soon as the pointer leaves the cirle with the initials
 * 
 * @param {string} object 
 */
function hideCross(object){
    document.getElementById(object).style.display= "none";
}

/**
 * changes the innerHTML of the contacts menu. Now it is a search menu
 * 
 */
 function activateSearchContact(){
    let interface = document.getElementById('assignedTo');
    interface.innerHTML = returnSearchContactInterface();
}

/**
 * the old search is deleted
 * 
 */
 function clearSearchContainer(){
    let searchContainer = document.getElementById('foundContacts');
    searchContainer.innerHTML = "";
}

/**
 * render found contacts
 * 
 * @param {*} i  index of contact
 */
 function renderContactAccordingToMail(i){
    let foundContacts = document.getElementById('foundContacts');
    let name = allContactsUnsorted[i]['name'];
    foundContacts.innerHTML += returnFoundContactsInnerHtml(i,name);
}

/**
 * if the selected Prio element is clicked again, it disappears, so that the unselected prio appears agail
 * 
 * @param {html} prio 
 */
 function removeHighlightPrio(prio) {
    let button = document.getElementById(prio);
    button.classList.add('d-none');
}

/**
 * takes the value of an input element and renders a div container below the input, after every adding, the body scrolls down a bit to display all subtasks
 * If the subtasks reach an amout, a scrollbar is installed
 * 
 */
 function addSubtask() {
    let newSubtask = document.getElementById('subtask').value;
    let subtaskList = document.getElementById('subtaskList');
    if (newSubtask.length < 2) {
        document.getElementById('noSubtask').classList.remove('d-none')
    } else {
        document.getElementById('noSubtask').classList.add('d-none')
        subtaskList.innerHTML += returnSubtaskContainerHTML(subtaskCounter,newSubtask);
        document.getElementById('subtask').value = "";
        subtaskCounter++;
        if(window.innerWidth <= 880) {
            scrollDown();
        }
    }
    installScrollBar('subtaskList')
}