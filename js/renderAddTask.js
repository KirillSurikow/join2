function returnSubtaskContainerHTML(subtaskCounter,newSubtask){
    return /*html*/ `
    <div class="subtask" id="${subtaskCounter}">
        <div class="subtaskName" >${newSubtask} </div>
        <img class="deleteSubtaskBtn" onclick="deleteSubtask(${subtaskCounter})" src="assets/img/Add Task/cross.png" >
    </div>
`
}

function returnInputInnerHTML() {
    return /*html*/`    
        <div class="newCategoryContainer"> 
            <div class="newCategorySignature" id="newCategorySignature">
                <input placeholder= "New Category Name"class="newCategoryOriginal selectField " type="text" name="category" id="newCategory" style="backgroundColor:transparent">
                <div id="chosenCategoryColor" class="chosenCategoryColor" style="background-color:transparent"></div>
            </div>
            <div class="navNewCategoryOriginal">
                    <img onclick= "returnToNormal()" class="crossNewCategory" src="assets/img/Add Task/cross.png">
            <div class="greyLineNewCategory"></div>
            <img  onclick="confirmNewCategory()" class="checkNewCategory"  src="assets/img/Add Task/check.png"></div>
             </div>
            <div id="colorContainer" class="colorContainer">
            <div>
                <div id="lightblueBtn" onclick="checkInput('lightblue','#8AA4FF')" class="coloredCircle lightblue "></div>
                <input  value="#8AA4FF" class="categoryColor " name="categoryColor" id="lightblue" type="radio">
            </div>
            <div>
                <div id="redBtn" onclick="checkInput('red', '#FF0000')" class="coloredCircle red "></div>
                <input  value="#FF0000" class="categoryColor " name="categoryColor" id="red" type="radio">
            </div>
            <div>
                <div id="greenBtn" onclick="checkInput('green', '#2AD300')" class="coloredCircle green "></div>
                <input  value="#2AD300" class="categoryColor " name="categoryColor" id="green" type="radio">
            </div>
            <div>
                <div id="orangeBtn" onclick="checkInput('orange', '#FF8A00')" class="coloredCircle orange "></div>
                <input  value="#FF8A00" class="categoryColor " name="categoryColor" id="orange" type="radio">
            </div>
            <div>
                <div id="purpleBtn" onclick="checkInput('purple', '#E200BE')" class="coloredCircle purple "></div>
                <input  value="#E200BE" class="categoryColor " name="categoryColor" id="purple" type="radio">
            </div>
            <div>
                <div id="blueBtn" onclick="checkInput('blue', '#0038FF')" class="coloredCircle blue "></div>
            <input  value="#0038FF" class="categoryColor " name="categoryColor" id="blue" type="radio">
            </div>
        </div>
        `
}

function returnNormalInputInnerHTML() {
    return /*html*/`
        <div onclick="dropdown()" class="selectHeadFieldOriginal">
               <span id="choiceContainer">Select Task Category</span>
                <div class="colorChoice" id="colorChoice" style="background-color:transparent ;"></div>
                <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
            </div>
            <div class="selectFields d-none" id="selectFields">
             <div onclick="createNewCategory()" class="selectOption">
                 New Category
             </div>
                <div onclick="checkButton('Sales','#E200BE')" class="selectOption">
                 Sales
                 <div class="selectOptionColor sales"></div>
                 <input required type="radio" name="category" id="Sales" value="#E200BE" style="opacity:0;">
             </div>
             <div onclick="checkButton('Backoffice','#1fd7c1')" class="selectOption">
                 Backoffice
                 <div class="selectOptionColor backoffice"></div>
                  <input required type="radio" name="category" id="Backoffice" value="#1fd7c1"style="opacity:0;">
             </div>
        </div>
        `
}

/**
 * changes category with the customized category
 * 
 * @param {string} nameOfCategory 
 * @returns 
 */
function returnCategorySelectInnerHTML(nameOfCategory) {
    return /*html*/ `
        <div onclick="dropdown()" class="selectHeadField">
            <input required class="hiddenInput" type="text" value="${nameOfCategory}">
            <span id="choiceContainer">${nameOfCategory}</span>
            <div class="colorChoice" id="colorChoice" style=""></div>
            <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
        </div>

       <div class="selectFields d-none" id="selectFields">
           <div onclick="createNewCategory()" class="selectOption">
               New Category
           </div>
           <div onclick="checkButton('Sales','#E200BE')" class="selectOption">
                Sales
                <div class="selectOptionColor sales"></div>
                <input type="radio" name="category" id="Sales" value="#E200BE" style="opacity:0;">
           </div>
           <div onclick="checkButton('Backoffice','#1fd7c1')" class="selectOption">
                 Backoffice
                 <div class="selectOptionColor backoffice"></div>
                <input type="radio" name="category" id="Backoffice" value="#1fd7c1" style="opacity:0;">
            </div>
        </div>   
`
}

/**
 * renders contact in the assigned to section
 * 
 * @param {number} i 
 * @param {string} contactsName 
 * @returns 
 */
function returnContactMenuHTML(i, contactsName) {
    return /*html*/`
        <div onclick="assignTo(${i})" class="contactToAssignContainer">
           <span lass="contactToAssignName">${contactsName}</span> 
           <div class="checkBoxesC1">
               <img class="checkBoxC d-none" src="assets/img/Add Task/checked.png" id="assigned${i}">
                <img class="checkBoxC" src="assets/img/Add Task/unchecked.png" id="notAssigned${i}">
           </div>
        </div>
    `
}

/**
 * renders the circle with the initials(in this case You) when you assign a person for a task
 * 
 * @param {number} i 
 * @returns 
 */
function returnAssignToContainerHTML(i) {
    return /*html*/ `
        <div onmouseover="showCross('removeYou')" onmouseout="hideCross('removeYou')" class="assignToCirle" id="You">
            <span class="assignToLetters">You</span>
            <img onclick="removeContactAndToggle('${i}')" class="removeContactCross" src="assets/img/Add Task/cross.png" id="removeYou" style="display:none">
        </div>
    `
}

/**
 * renders the circle with the initials(in this case You) when you assign a person for a task
 * 
 * @param {number} i 
 * @returns 
 */
function returnAssignToContainer2(i, initials, colorID) {
    return /*html*/ `
        <div onmouseover="showCross('remove${i}')" onmouseout="hideCross('remove${i}')" class="assignToCirle" id="${i}" style="background-color:${colorID}">
            <span class="assignToLetters">${initials}</span>
            <img onclick="removeContactAndToggle('${i}')" class="removeContactCross" src="assets/img/Add Task/cross.png" id="remove${i}" style="display:none">
        </div>
    `
}

function returnSearchContactInterface() {
    return /*html*/`
        <div class="searchContactContainer">
            <input onkeyup="findContact()" type="text"  id="searchContactInput" placeholder="Contact e-mail" class="searchFieldAssignTo">
            <img class="searchNavImg1" src="assets/img/Add Task/clear.png" onclick="returnToNormalContactInterface()">  
        </div>
        <div class="foundContacts" id="foundContacts"></div>
    `
}

function returnNormalContactInterface() {
    return /*html*/`
        <div onclick="dropdownAT()" class="selectHeadFieldOriginal">
                    <span id="choiceContainer">Select contacts to assign</span>
                    <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
                </div>
            </div>
            <div class="selectFields d-none adjustWidth" id="selectFieldsAT">
                <div onclick="assignYou()"class="selectOptionC adjustWidth2">
                     <span class="personToAssign">
                        You
                    </span>
                    <div class="checkBoxesC">
                      <img class="checkBoxC d-none" src="assets/img/Add Task/checked.png" id="assigned">
                      <img class="checkBoxC" src="assets/img/Add Task/unchecked.png" id="notAssigned">
                    </div>
                 </div>
                <div class="allContactsToAssign adjustWidth2" id="allContactsToAssign"></div>
                <div class="selectOptionC adjustWidth2" onclick="activateSearchContact()">
                    <span>Invite New Contact</span>
                    <img class="inviteImg" src="assets/img/Add Task/invite.png">
                </div>
    `
}

/**
 * displays the found contact
 * 
 * @param {number} i 
 * @param {string} contactsName 
 * @returns 
 */
function returnFoundContactsInnerHtml(i, contactsName) {
    return /*html*/ `
        <div onclick="assignTo(${i})" class="contactToAssignContainer">
           <span lass="contactToAssignName">${contactsName}</span> 
           <div class="checkBoxesC1">
               <img class="checkBoxC d-none" src="assets/img/Add Task/checked.png" id="assigned${i}">
                <img class="checkBoxC" src="assets/img/Add Task/unchecked.png" id="notAssigned${i}">
           </div>
        </div>
    `
}
