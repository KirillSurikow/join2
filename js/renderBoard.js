function returnTaskContainerHTML(j, title, description, category, prio, categoryColor) {
    return /*html*/`
    <div onclick="showDetails(${j})" id="${j}" draggable="true" class="task" ondragstart="startDragging(${j},event)" ondrag="returnPosition(event)">
       <div class="category" style="background-color:${categoryColor};">${category}</div>
       <div class="title" id="title${j}">${title}</div>
       <div class="description" id="description${j}">${description}</div>
       <div class="progressDisplay" id="progressDisplay${j}">
           <div class="progress" >
               <div id="progressBar${j}" class="progressbar" role="progressbar" style="width:25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
           </div>
           <div class="progressDigits" id="progressDigits${j}"></div>
       </div>
       <div class="assignedAndPrio">
           <div id="assignedToContainer${j}" class="assignedToContainer">
               
           </div>
           <img class="prioBoard" src="assets/img/Add Task/${prio}.png">
       </div>
    </div>  `
}

function returnTaskContainerForSearchHTML(i, title, description, category, prio, categoryColor) {
    return  /*html*/`
    <div onclick="showDetails(${i})"  id="${i}" draggable="true" class="task" ondragstart="startDragging(${i})">
       <div class="category" style="background-color:${categoryColor};">${category}</div>
       <div class="title">${title}</div>
       <div class="description">${description}</div>
       <div class="assignedAndPrio">
           <div id="assignedToContainer${i}" class="assignedToContainer">
               
           </div>
           <img class="prioBoard" src="assets/img/Add Task/${prio}.png">
       </div>
    </div>  `
}

function returnPopUpEditContentHTML(title, description, dueDate, i) {
    return /*html*/`
    <div class="responsiveHeaderShowDetails">
        <img class="responsiveLogoPopUp" src="assets/img/LogIn/responsiveLogo.png">
    </div>
    <img class="popUpEditContentArrow" onclick="closePopUp('popUpEditContainer')" src="assets/img/Board/arrowLeft.png">
    <img class="popUpEditContentCross" onclick="closePopUp('popUpEditContainer')" src="assets/img/Add Task/cross.png">
    <div class="boardPopUpEditTitel"><span>Titel</span>
        <input type="text" id="newTitle" value='${title}'>
    </div>
    <div class="boardPopUpEditDescription">Description
        <textarea name="" id="newDescription" cols="30" rows="10" value='${description}'>${description}</textarea>
    </div>
    <div class="boardPopUpEditDueDate">Due Date
        <input class="" type="date" name="" id="newDueDate" value='${dueDate}'>
    </div>


    <div class="boardPopUpEditAllPrio">
       <span class="headlinePrio">Prio</span> 
        <div class="boardPopUpEditAllPrioRow">
            <div class="prioDoubleContainerRework">
                <div onclick="changePrio('prioUrgentReworkSelected','urgentRework')" class="prioRework"
                    id="prioUrgentRework">
                    <input class="prioReworkInput" type="radio" name="prioRework" id="urgentRework" value="urgent">
                    <span>Urgent</span>
                    <img class="prioImg" src="assets/img/Add Task/urgent.png">
                </div>
                <div onclick="changePrio('prioUrgentReworkSelected','urgentRework')" style="display:none"
                    class="prioReworkSelected orange" id="prioUrgentReworkSelected">
                    <span>
                        Urgent
                    </span>
                    <img class="prioImg" src="assets/img/Add Task/urgentPrioWhite.png">
                </div>
            </div>
            <div class="prioDoubleContainerRework">
                <div onclick="changePrio('prioMediumReworkSelected','mediumRework')" class="prioRework"
                    id="prioMediumRework">
                    <input class="prioReworkInput" type="radio" name="prioRework" id="mediumRework" value="medium">
                    <span>Medium</span>
                    <img class="prioImg" src="assets/img/Add Task/medium.png">
                </div>
                <div onclick="changePrio('prioMediumReworkSelected','mediumRework')" style="display:none"
                    class="prioReworkSelected yellow" id="prioMediumReworkSelected">
                    <span>
                        Medium
                    </span>
                    <img class="prioImg" src="assets/img/Add Task/mediumPrioWhite.png">
                </div>
            </div>
            <div class="prioDoubleContainerRework">
                <div onclick="changePrio('prioLowReworkSelected','lowRework')" class="prioRework" id="prioLowRework">
                    <input class="prioReworkInput" type="radio" name="prioRework" id="lowRework" value="low">
                    <span>Low</span>
                    <img class="prioImg" src="assets/img/Add Task/low.png">
                </div>
                <div onclick="changePrio('prioLowReworkSelected','lowRework')" style="display:none"
                    class="prioReworkSelected green" id="prioLowReworkSelected">
                    <span>
                        Low
                    </span>
                    <img class="prioImg" src="assets/img/Add Task/lowPrioWhite.png">
                </div>
            </div>
        </div>
    </div>
    <div class="subtaskContainerPopUp" id="subtasksEdit"></div>
    <div class="boardPopUpEditAssignedTo">Assigned to: </div>
    <div class="assignedToEditContainer" id="assignedToEditContainer${i}">

    </div>
    <div onclick="deleteTicket(${i})"  class="deleteBtn">
        Delete
        <img class="insidePopUpPencil" src="assets/img/Board/bin.png" alt="">
    </div>
    <div onclick="initEdit(${i})"  class="submitEditBtn">
        OK
        <img class="insidePopUpPencil" src="assets/img/Board/whiteCheckHook.png" alt="">
    </div>
    
  `
}

function returnInputBoardInnerHTML() {
    return /*html*/`    
        <div class="newCategoryContainer"> 
            <div class="newCategorySignature" id="newCategorySignature">
                <input placeholder= "New Category Name"class="newCategoryBoard selectField " type="text" name="category" id="newCategory" style="backgroundColor:transparent">
                <div id="chosenCategoryColor" class="chosenCategoryColorBoard" style="background-color:transparent"></div>
            </div>
            <div class="navNewCategoryBoard">
                    <img onclick= "returnToNormalBoard()" class="crossNewCategory" src="assets/img/Add Task/cross.png">
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

function returnAssignedToContainerSnippet(assignedPerson, contactsInitials, contactsColor){
    return /*html*/ `
        <div class="initialsBoardCircle" id="${assignedPerson}" style="background-color:${contactsColor}">
            <div class="initialsBoardLetter" >${contactsInitials}</div>
        </div>
    `
}

function returnallAssignedPersonsDisplayHTMl(assignedPerson,assignedInitials,assignedColor){
    return /*html*/`
        <div onmouseover="displayCross('removeAssignedContact${assignedPerson}')" onmouseout="hideCross('removeAssignedContact${assignedPerson}')" class="assignedCircleEdit" id="element${assignedPerson}" style="background-color:${assignedColor}">
            <img onclick="removeAssignedContact('element${assignedPerson}')" class="removeAssignedContact" id="removeAssignedContact${assignedPerson}" src="assets/img/Add Task/cross.png" style="display:none">
            <span class="assignedLettersEdit">${assignedInitials}</span>
        </div>
    `
}

function returnRestAssignedContacts(restAssignedContacts){
    return /*html*/`
        <div class="initialsBoardCircle" style="background-color:#2A3647">
            <div class="initialsBoardLetter" >+${restAssignedContacts}</div>
        </div>
`
}

function returnsSubtaskHTML(subtaskCounter, newSubtask){
    return /*html*/ `
    <div class="subtask" id="${subtaskCounter}">
        <div class="subtaskName" >${newSubtask} </div>
        <img class="deleteSubtaskBtn" onclick="deleteSubtask(${subtaskCounter})" src="assets/img/Add Task/cross.png" >
    </div>
  `
}

function returnSubtaskContainerToEditHTML(subtask){
    return /*html*/ `
    <div>
        <input class="subtaskCheckbox" type="checkbox" name="subtasks" id="${subtask}" value="toDo">
        ${subtask}
    </div>
`
}

function returnNormalInputBoardInnerHTML() {
    return /*html*/`
    <div onclick="dropdown()" class="selectHeadFieldPopUp">
           <span id="choiceContainer">Select Task Category</span>
            <div class="colorChoice" id="colorChoice" style="background-color:transparent ;"></div>
            <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
        </div>
        <div class="selectFields d-none" id="selectFields">
         <div onclick="createNewCategoryBoard()" class="selectOption">
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
 * 
 * @param {*} id 
 * @returns 
 */
function returnPopUpContentBoardHTML(id) {
    return /*html*/ `
    
<div class="responsiveHeaderPopUp">
    <img class="responsiveLogoPopUp" src="assets/img/LogIn/responsiveLogo.png">
    <div class="taskBtnsResponsive">
        <button class="clearBtnResponsive" onclick="clearFormular()">
            Clear
            <img class="btnImg2" src="assets/img/Add Task/clear.png">
        </button>
        <button class="clearBtnResponsive2" onclick="clearFormular()">

            <img class="btnImg2" src="assets/img/Add Task/clear.png">
        </button>

        <button onclick="requestNewTaskFromBoard('${id}')" class="createTaskBtnResponsive grayHighlight" type="submit">
            Create
            <img class="btnImg" src="assets/img/Add Task/create.png">
        </button>

        <button onclick="requestNewTaskFromBoard('${id}')" class="createTaskBtnResponsive2 grayHighlight" type="submit">

            <img class="btnImg" src="assets/img/Add Task/create.png">
        </button>
    </div>
</div>
<div class="addTaskContainerPopUp" id="addTaskContainer">
    <div id="workSpace" class="workSpace">
        <div class="headArea">
            <h1 class="headlineT">Add Task</h1>
            <img class="closePopUp" src="assets/img/Add Task/cross.png" onclick="closePopUp('popUp')">
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
                <div class="formularSection">
                    <p>Assigned to</p>
                    <div class="bigAssignedToContainer" id="assignedTo">
                        <div class="assignedToContainer">
                            <div onclick="dropdownAT()" class="selectHeadFieldOriginal">
                                <span id="choiceContainer">Select contacts to assign</span>
                                <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
                            </div>
                        </div>
                        <div class="selectFields d-none adjustWidth" id="selectFieldsAT">
                            <div class="allContactsToAssign adjustWidth2" id="allContactsToAssign"></div>
                            <div class="selectOptionC adjustWidth2" onclick="activateSearchContact()">
                                <span>Invite New Contact</span>
                                <img class="inviteImg" src="assets/img/Add Task/invite.png">
                            </div>
                        </div>
                    </div>
                    <div class="assignedContacts" id="assignedContacts"></div>
                    <div class="alert d-none" id="alertContact">Assign the task to a contact</div>
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
            
            
                            <button onclick="requestNewTaskFromBoard('${id}'); return false"  class="createTaskBtn grayHighlight" type="submit" >
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
</div>
 `
}



function returnPopUpContentOriginalHTML() {
    return /*html*/ `
        <div class="responsiveHeaderPopUp">
    <img class="responsiveLogoPopUp" src="assets/img/LogIn/responsiveLogo.png">
    <div class="taskBtnsResponsive">
        <button class="clearBtnResponsive" onclick="clearFormular()">
            Clear
            <img class="btnImg2" src="assets/img/Add Task/clear.png">
        </button>
        <button class="clearBtnResponsive2" onclick="clearFormular()">

            <img class="btnImg2" src="assets/img/Add Task/clear.png">
        </button>

        <button onclick="requestNewTask()" class="createTaskBtnResponsive grayHighlight" type="submit">
            Create
            <img class="btnImg" src="assets/img/Add Task/create.png">
        </button>

        <button onclick="requestNewTask()" class="createTaskBtnResponsive2 grayHighlight" type="submit">

            <img class="btnImg" src="assets/img/Add Task/create.png">
        </button>
    </div>
</div>
<div class="addTaskContainerPopUp" id="addTaskContainer">
    <div id="workSpace" class="workSpace">
        <div class="headArea">
            <h1 class="headlineT">Add Task</h1>
            <img class="closePopUp" src="assets/img/Add Task/cross.png" onclick="closePopUp('popUp')">
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
                <div class="formularSection">
                    <p>Assigned to</p>
                    <div class="bigAssignedToContainer" id="assignedTo">
                        <div class="assignedToContainer">
                            <div onclick="dropdownAT()" class="selectHeadFieldOriginal">
                                <span id="choiceContainer">Select contacts to assign</span>
                                <img class="dropdownImg" src="assets/img/Add Task/dropdown.png">
                            </div>
                        </div>
                        <div class="selectFields d-none adjustWidth" id="selectFieldsAT">
                            <div class="allContactsToAssign adjustWidth2" id="allContactsToAssign"></div>
                            <div class="selectOptionC adjustWidth2" onclick="activateSearchContact()">
                                <span>Invite New Contact</span>
                                <img class="inviteImg" src="assets/img/Add Task/invite.png">
                            </div>
                        </div>
                    </div>
                    <div class="assignedContacts" id="assignedContacts"></div>
                    <div class="alert d-none" id="alertContact">Assign the task to a contact</div>
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
            
            
                            <button onclick="requestNewTask(); return false"  class="createTaskBtn grayHighlight" type="submit" >
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
</div>`
}

/**
 * returns a task in details
 * 
 * @param {string} category 
 * @param {string} categoryColor 
 * @param {string} title 
 * @param {string} description 
 * @param {string} dueDate 
 * @param {string} prio 
 * @param {number} i 
 * @returns 
 */
function returnDetailedInterfaceHTML(category, categoryColor, title, description, dueDate, prio, i) {
    return /*html*/ `
    <div class="responsiveHeaderShowDetails">
        <img class="responsiveLogoPopUp" src="assets/img/LogIn/responsiveLogo.png">
    </div>
    <div class ="boardPopUp">
        <div class="test"></div>
        <!-- <img class="popUpEditContentArrow" onclick="closePopUp('popUpEditContainer')" src="assets/img/Board/arrowLeft.png">
        <img class="popUpEditContentCross1" onclick="closePopUp('popUpEditContainer')"src="assets/img/Add Task/cross.png">
        <div class="boardPopUpCategory" style="background-color:${categoryColor}">
            <div class="boardPopUpCategoryText">
                ${category}
            </div>
        </div>
        <div class="boardPopUpTitel" id="boardPopUpTitel${i}" style="overflow-y:auto" >
            ${title}
        </div>
        <div class="boardPopUpDescrition" id="boardPopUpDescrition${i}" style="overflow-y:auto" >
            ${description}
        </div>
        <div class="boardPopUpDate" >
            <span class="boardPopUpDateText">
                Due date:
            </span>  
            <span class="boardPopUpDateNumbers">
                ${dueDate}
            </span>
        </div>
        <div class="boardPopUpPrio" >
            <span class="boardPopUpPrioText"
                 >Priority:
            </span>  
            <div class="boardPopUpPrioInside ${prio}Background">
                ${prio}<img src="assets/img/Add Task/${prio}PrioWhite.png">
            </div> 
        </div> 
        <div class="subtasksBPopUpContainer">
            <div class="subtaskHeadlineBPopUp">Subtasks:</div>
            <div class="subtasksPopUp" id="subtasksPopUp${i}" style="overflow-y:auto" ></div>
        </div>
        <div class="boardPopUpAssignedTo" >
            Assigned To:
        </div>
        <div class="boardPopUpAssignedToContainer" id="assignedToDetailed${i}">
            
        </div>
        <div class="pencilContainer">
           <img class="popUpContentPencil" onclick="editDetails('${i}')" src="assets/img/Board/pen.png">
        </div>
    </div>   -->
</div>
`
}

/**
 * returns an assigned person
 * 
 * @param {number} k 
 * @param {string} contactsInitials 
 * @param {string} contactsColor 
 * @param {string} contactsName 
 * @returns 
 */
function returnAssignedToDetailed(k, contactsInitials, contactsColor,contactsName){
    return /*html*/`
        <div class="assignedContact" id="assignedContact${k}">
            <div class="assignedContactCircle"style="background-color:${contactsColor}">
                <span class="assignedContactLetters">
                    ${contactsInitials}
                </span>
            </div>
            <div class="assignedContactsName">
                ${contactsName}
            </div>
        </div>
    `
}



function returnSubtaskDetailedHTML(j, subtask) {
    return /*html*/`
          <div class="subtaskWithHookContainer" >
              <div id="greenCheckBox${j}" class="whiteCheckHookContainer">
              <img class="whiteCheckHookInDetails" src="assets/img/Board/whiteCheckHook.png">
            </div>
              ${subtask}
          </div>
      `
}

