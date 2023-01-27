function returnContactSnippetHTML(i, initials, contact, email, colorID) {
    return /*html*/ `
    <div class="innerAllPersonsContainer" id="person${i}" style="" onclick="initContactPopUp(${i})">
        <div class="contactInitialsCircle" style="background-color:${colorID}">
            <span class="contactInitialsLetters">${initials}</span>
        </div>
        <div class="contactInfo" id="contactInfo${i}" onmouseover="scrollName(${i})" onmouseout="stopScrolling(${i})">
            <span class="contactName" id="contactName${i}">${contact}</span>
            <span class="contactMail">${email}</span>
        </div>
    </div>
`
}

function returnContactPopUpHTML(colorID, initials, name, i, email, phone) {
    return /*html*/`
        <div class="detailedContactHead">
        <img onclick="translateBack(${i})" class="backArrowContacts" src="assets/img/Board/arrowLeft.png" alt="">
            <div class="dcInitialsCircle" style="background-color:${colorID}">
               <span class="dcInitialsLetter">${initials}</span>
            </div>
            <div class="dcContactPlusAddTask" id="dcContactPlusAddTask${i}" onmouseover="scrollNameD(${i})" onmouseout="stopScrollingD(${i})">
                <span class="detailedContactName" id="contactsNameD${i}" >${name}</span>
                <div onclick="initAddTaskToContact(${i})" class="addTaskToContactBtn">
                    <img class="addTaskToContactImg"  src="assets/img/Contacts/plusBlue.png" >
                    <span class="addTaskToContactLetters">Add Task</span>
                </div>
            </div>
        </div>
        <div class="detailedContactEditContainer">
            <div class="contactInformation">
                Contact Information
            </div>
            <div onclick="initEditContact(${i})" class="editContactInformationBtn">
                <img class="bluePen" src="assets/img/Contacts/penBlue.png">
                <span class="editContact">Edit Contact</span>
            </div>
        </div>
        <div class="detailedContactData">
            <div class="contactCategory">E-Mail</div>
            <div class="contactEmail">${email}</div>
            <div class="contactCategory">Phone</div>
            <div class="contactPhone">${phone}</div>
        </div>
     </div>
     <img class="editContactInformationBtnResponsive" onclick="initEditContact(${i})" src="assets/img/Contacts/responsiveEditPen.png">
    `
}

function returnTaskContainerContactsHTML(i) {
    return /*html*/`
        <img class="closePopUp" src="assets/img/Add Task/cross.png" alt="" onclick="closePopUpAddTaskContacts()">
        <div class="responsiveHeaderPopUp">
            <img class="responsiveLogoPopUp" src="assets/img/LogIn/responsiveLogo.png">
            <div class="taskBtnsResponsiveContacts">
                <button class="clearBtnResponsive" onclick="clearFormular()">
                    Clear
                    <img class="btnImg2" src="assets/img/Add Task/clear.png">
                </button>
                <button class="clearBtnResponsive2" onclick="clearFormular()">

                    <img class="btnImg2" src="assets/img/Add Task/clear.png">
                </button>

                <button onclick="requestNewTask(${i})" class="createTaskBtnResponsive grayHighlight" type="submit">
                    Create
                    <img class="btnImg" src="assets/img/Add Task/create.png">
                </button>
        
                <button onclick="requestNewTask(${i})" class="createTaskBtnResponsive2 grayHighlight" type="submit">

                    <img class="btnImg" src="assets/img/Add Task/create.png">
                </button>
            </div>
        </div>
        
    
    
    <div class="addTaskContainerPopUp" id="addTaskContainer">
    <div id="workSpace" class="workSpace">
        <div class="headArea">
            
            <h1 class="headlineT">Add Task</h1>
        </div>
        <div class="formular">
            <div class="leftSide">
                <div class="formularSection">
                    <p>Title</p>
                    <input id="title" class="inputField" type="text" placeholder="Enter a Title">
                    <div class="alert d-none" id="alertTitle">The Title should have at least two letters</div>
                </div>
                <div class="formularSection">
                    <p>Description</p>
                    <textarea class="textareaField" name="" id="description" cols="30" rows="5"
                        placeholder="Enter a Description"></textarea>
                    <div class="alert d-none" id="alertDescription">The Description should have at least two letters
                    </div>
                </div>
                <div class="formularSection">
                    <p>Category</p>
                    <div class="categoryContainer" id="category">
                        <div onclick="dropdown()" class="selectHeadFieldOriginal">
                            <span id="choiceContainer">Select Task Category</span>
                            <div class="colorChoice" id="colorChoice" style="background-color: transparent ;"></div>
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
                    </div>
                    <div class="alert d-none" id="alertCategory">Set a Category</div>
                </div>
            </div>
            <div class="grayLine"></div>
            <div class="rightSide">
                <div class="upperRightside">
                    <div class="formularSection">
                        <p>Due date</p>
                        <input id="dueDate" class="inputField inputWidth3" type="date">
                        <div class="alert d-none" id="alertDate">Set a due date</div>
                    </div>
                    <div class="formularSection">
                        <p>Prio</p>
                        <div class="prioBox">


                            <div class="prioDoubleContainerOriginal">
                                <div onclick="setPrio('prioUrgentHighlight','urgent')" class="prio" id="prioUrgent">
                                    <span>
                                        Urgent
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/urgent.png">
                                    <input value="urgent" class="prioInput" type="radio" name="prio" id="urgent">
                                </div>
                                <div onclick="setPrio('prioUrgentHighlight','urgent')"
                                    class="prioSelected orange d-none" id="prioUrgentHighlight">
                                    <span>
                                        Urgent
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/urgentPrioWhite.png">

                                </div>
                            </div>
                            <div class="prioDoubleContainerOriginal">
                                <div onclick="setPrio('prioMediumHighlight','medium')" class="prio" id="prioMedium">
                                    <span>
                                        Medium
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/medium.png">
                                    <input value="medium" class="prioInput" type="radio" name="prio" id="medium">

                                </div>
                                <div onclick="setPrio('prioMediumHighlight','medium')"
                                    class="prioSelected yellow d-none" id="prioMediumHighlight">
                                    <span>
                                        Medium
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/mediumPrioWhite.png">
                                </div>
                            </div>
                            <div class="prioDoubleContainerOriginal">
                                <div onclick="setPrio('prioLowHighlight','low')" class="prio" id="prioLow">
                                    <span>
                                        Low
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/low.png">
                                    <input value="low" class="prioInput" type="radio" name="prio" id="low">
                                </div>
                                <div onclick="setPrio('prioLowHighlight','low')" class="prioSelected green d-none"
                                    id="prioLowHighlight">
                                    <span>
                                        Low
                                    </span>
                                    <img class="prioImg" src="assets/img/Add Task/lowPrioWhite.png">

                                </div>
                            </div>
                        </div>
                        <div class="alertPriority d-none" id="alertPriority">Set a priority</div>
                    </div>
                    <div class="formularSection">
                        <div class="subtaskContainer">
                            <p>Subtasks</p>
                            <input id="subtask" class="subtasks" type="text" placeholder="Add new subtask">
                            <img onclick="addSubtask()" class="subtaskPlusOriginal" src="assets/img/Add Task/plus.png">
                        </div>
                        <div class="noSubtask d-none" id="noSubtask">Write a Subtask</div>
                        <div class="subtaskList" id="subtaskList"></div>
                    </div>
                    <div class="formularSection">
                        <div class="taskBtnsOriginal">
                            <button class="clearBtnOriginal" onclick="clearFormular()" >
                                Clear
                                <img  class="btnImg2" src="assets/img/Add Task/clear.png">
                            </button>
            
            
                            <button onclick="requestNewTask(${i}); return false"  class="createTaskBtn grayHighlight" type="submit" >
                                Create Task
                                <img class="btnImg" src="assets/img/Add Task/create.png">
                            </button>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
}

function returneditContactContainerHTML(initials, contactsName, contactsEmail, contactsPhone, i) {
    return /*html*/`
    <div class="innerEditContactContainer">
       
       <div class="headBoxEdit">
           <div class="adjustContentheadBoxEdit">
               <img class="editContactsLogo" src="assets/img/Summary/joinLogoSummary.png" alt="">
               <span class="headlineEditC">Edit Contact</span>
               <div class="blueUnderlineEC"></div>
           </div>
       </div>
       <div class="initialsEdit">
           <div class="initialsCirle">
               <div class="initialsLetters">${initials}</div>
           </div>
       </div>
       <div class="allEditsContact">
           <div class="inputEditContainer1">
               <input  class="inputfieldEditContact" type="text" id="editedName" value="${contactsName}">
               <img class="imgEditContact1" src="assets/img/Contacts/nameContact.png">
           </div>
           <div class="inputEditContainer">
               <input class="inputfieldEditContact" type="email" name="" id="editedEmail" value="${contactsEmail}">
               <img class="imgEditContact" src="assets/img/Contacts/mailContact.png" alt="">
           </div>
           <div class="inputEditContainer">
               <input class="inputfieldEditContact" type="tel" name="" id="editedPhone" value="${contactsPhone}">
               <img class="imgEditContact" src="assets/img/Contacts/phoneContact.png" alt="">
           </div>
           <div onclick="saveEdit(${i})" class="saveEditContactBtn">Save</div>
       </div>
       <img class="greyCrossEditContact" onclick="closePopUpEditContacts()" class="greyCross" src="assets/img/Contacts/greyCross.png">
       <img src="assets/img/Contacts/whitCross.png"onclick="closePopUpEditContacts()" class="whiteCrossEditContact" class="greyCross"  alt="">
   </div>
`
}

function returncreateNewContactContainerHTML() {
    return /*html*/`
         <div class="innerEditContactContainer">
       
       <div class="headBoxEdit">
           <div class="adjustContentheadBoxEdit">
               <img class="editContactsLogo" src="assets/img/Summary/joinLogoSummary.png" alt="">
               <span class="headlineEditC">Add Contact</span>
               <span class="subHeadlineCreate">Tasks are better with a team</span>
               <div class="blueUnderlineEC"></div>
           </div>
       </div>
       <div class="initialsEdit">
           <img class="newContactInterfaceImg" src="assets/img/Contacts/newContactImg.png">
       </div>
       <div class="allEditsContact">
           <div class="inputEditContainer1">
               <input  class="inputfieldEditContact" type="text" id="name" placeholder="Name" >
               <img class="imgEditContact1" src="assets/img/Contacts/nameContact.png">
               <div id="incorrectName" class="incorrectName" style="display:none">Type First and Second Name</div>
           </div>
           <div class="inputEditContainer1">
               <input class="inputfieldEditContact" type="email" name="" id="email" placeholder="Email" >
               <img class="imgEditContact" src="assets/img/Contacts/mailContact.png" alt="">
               <div id="incorrectEmail" class="incorrectName" style="display:none">Type an email</div>
           </div>
           <div class="inputEditContainer1">
               <input class="inputfieldEditContact" type="number" name="" id="phone" placeholder="Phone" >
               <img class="imgEditContact" src="assets/img/Contacts/phoneContact.png" alt="">
               <div id="incorrectNumber" class="incorrectName" style="display:none">Type a phone number</div>
           </div>
           <div class="createAndCancelBtns">
               <div class="cancelNewContact" onclick="cancelCreateNewContact()" >
                   Cancel
                <img class="greyCrossSmall" src="assets/img/Contacts/greyCross.png">
               </div>
               <div onclick="requestNewContact()" class="saveEditContactBtn">
                   Create Contact
                   <img class="whiteCheckHookSmall" src="assets/img/Board/whiteCheckHook.png">
               </div>
           </div>
       </div>
       <img class="greyCrossEditContact" onclick="closePopUpEditContacts()" class="greyCross" src="assets/img/Contacts/greyCross.png">
       <img src="assets/img/Contacts/whitCross.png"onclick="closePopUpEditContacts()" class="whiteCrossEditContact" class="greyCross"  alt="">
   </div>
    `
}

function returnSubtaskToContactHTML(subtaskCounter,newSubtask) {
    return /*html*/ `
    <div class="subtask" id="${subtaskCounter}">
        <div class="subtaskName" >${newSubtask} </div>
        <img class="deleteSubtaskBtn" onclick="deleteSubtask(${subtaskCounter})" src="assets/img/Add Task/cross.png" >
    </div>
`
}