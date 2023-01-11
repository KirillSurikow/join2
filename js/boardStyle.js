/**TT
 * clears every statuscontainer before it gets rendered
 * 
 */
 function clearAllStatusContainer() {
    let allTaskContainer = document.querySelectorAll('.statusContainer');
    for (let i = 0; i < allTaskContainer.length; i++) {
      let taskContainer = allTaskContainer[i];
      taskContainer.innerHTML = "";
    }
  }

  /**
 * task is rendered according to status. Also initiating the loadings of the assignde persons and the subtasks and shortening to long text.
 * 
 * @param {number} i index of statuscontainer
 * @param {number} j index of task
 */
function renderTasks(i, j) {
    let allTaskContainer = document.querySelectorAll('.statusContainer');
    let taskContainer = allTaskContainer[i];
    let title = allTasks[j]['title'];
    let description = allTasks[j]['description']
    let category = allTasks[j]['category'];
    let prio = allTasks[j]['prio'];
    let categoryColor = allTasks[j]['categoryColor'];
    taskContainer.innerHTML += returnTaskContainerHTML(j, title, description, category, prio, categoryColor);
    loadAssignedPersons(j);
    loadSubtaskProgress(j);
    reduceLongText(j);
  
  }

  /**
 * displays a small amount of persons
 * 
 * @param {array} allAssignedPersons 
 */
function displaySmallAmountOfPersons(allAssignedPersons, assignedToContainer){
    for (let k = 0; k < allAssignedPersons.length; k++) {
      let assignedPerson = allAssignedPersons[k];
      if (assignedPerson == 'You') {
        let contactsInitials = 'You';
        let contactsColor = 'rgb(36, 36, 222)';
        assignedToContainer.innerHTML += returnAssignedToContainerSnippet(assignedPerson, contactsInitials, contactsColor);
      } else {
        let contactsInitials = allContactsSorted[assignedPerson]['initials'];
        let contactsColor = allContactsSorted[assignedPerson]['colorID'];
        assignedToContainer.innerHTML += returnAssignedToContainerSnippet(assignedPerson, contactsInitials, contactsColor);
      }
    }
  }
  
  
  /**
   * displays a large amount of persons
   * 
   * @param {array} allAssignedPersons 
   */
  function displayLargeAmountOfPersons(allAssignedPersons, assignedToContainer){
    for (let k = 0; k < 2; k++) {
      let assignedPerson = allAssignedPersons[k];
      if (assignedPerson == 'You') {
        let contactsInitials = 'You';
        let contactsColor = 'rgb(36, 36, 222)';
        assignedToContainer.innerHTML += returnAssignedToContainerSnippet(assignedPerson, contactsInitials, contactsColor);
      } else {
        let contactsInitials = allContactsSorted[assignedPerson]['initials'];
        let contactsColor = allContactsSorted[assignedPerson]['colorID'];
        assignedToContainer.innerHTML += returnAssignedToContainerSnippet(assignedPerson, contactsInitials, contactsColor);
      }
    }
    let restAssignedContacts = allAssignedPersons.length - 2;
    assignedToContainer.innerHTML += returnRestAssignedContacts(restAssignedContacts);
  }

  /**
 * adjusts the progressbar for every task, if a task has subtasks
 * 
 * @param {number} i 
 * @param {number} doneSubtasks 
 * @param {array} allSubtasks 
 */
function adjustProgressBar(i, doneSubtasks, allSubtasks) {
    let progressbar = document.getElementById(`progressBar${i}`);
    let progressDigits = document.getElementById(`progressDigits${i}`)
    let amountSubtasks = allSubtasks.length
    let progress = (doneSubtasks / amountSubtasks) * 100 + "%";
    if (amountSubtasks == 0) {
      document.getElementById(`progressDisplay${i}`).style.display = "none"
    } else {
      progressbar.style.width = progress;
      progressDigits.innerHTML = `${doneSubtasks}` + '/' + `${amountSubtasks}`;
    }
  }

  /**
 * decides if a title or a description is to long to be displayed completly
 * 
 * @param {number} i index of allTasks
 */
function reduceLongText(i) {
    let idTitle = 'title' + `${i}`
    let title = document.getElementById(idTitle).innerHTML;
    let titleLength = title.length;
    if (titleLength > 64) {
      reduceLength(i, 'title', 64)
    }
    let idDescription = 'description' + `${i}`
    let description = document.getElementById(idDescription).innerHTML;
    let descriptionLength = description.length;
    if (descriptionLength > 100) {
      reduceLength(i, 'description', 100)
    }
  }
  
  /**
   * shortens to long text
   * 
   * @param {number} i index of allTasks
   * @param {string} text placeholder for title or description
   * @param {number} length the max lengt of description or title
   */
  function reduceLength(i, text, length) {
    let id = `${text}` + `${i}`;
    let string = document.getElementById(id).innerHTML;
    let newString = string.slice(0, length);
    document.getElementById(id).innerHTML = newString + '...';
  }

  /**
 * add task directly to statuscontainer for example in progress
 * 
 * @param {string} id status of the container with the new task 
 */
function taskPopUp(id) {
    let popUpContainer = document.getElementById('popUp');
    window.scroll(0, 0);
    document.body.style.overflowY = 'hidden';
    popUpContainer.style.display = 'flex'
    let popUpContent = document.getElementById('popUpContent');
    popUpContent.innerHTML = returnPopUpContentBoardHTML(id)
  }

  /**
 * opens the interface for customized category
 * 
 */
function createNewCategoryBoard() {
    newCategoryInterface = true;
    let input = document.getElementById('category');
    input.innerHTML = returnInputBoardInnerHTML()
  }
  
  /**
   * closes the interface for customized category
   * 
   */
  function returnToNormalBoard() {
    newCategoryInterface == false;
    let input = document.getElementById('category');
    input.innerHTML = returnNormalInputBoardInnerHTML();
  }

  
  /**
 * executes the validation
 * 
 * @param {string} titleField 
 * @param {string} descriptionField 
 * @param {string} categoryField 
 * @param {string} customizedCategory 
 * @param {string} colorOfCategory 
 * @param {string} dueDate 
 * @param {string} id 
 */
function executeValidationFromBoard(titleField, descriptionField, categoryField, customizedCategory, colorOfCategory, dueDate, id) {
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
      addNewTaskFromBoard(id)
    }
  }

  /**
 * clears the found tasks after every new letter in the searchfield
 * 
 */
function clearAllTaskContainer() {
    let allStatusTaskContainer = document.querySelectorAll('.statusContainer')
    for (let i = 0; i < allStatusTaskContainer.length; i++) {
      allStatusTaskContainer[i].innerHTML = "";
    }
  }

  /**
 * renders the found tasks according to their status
 * 
 * @param {number} i 
 */
function renderAccordingToStatus(i) {
    let statusOfTask = allTasks[i]['status'];
    let statusContainer = document.getElementById(statusOfTask);
    let title = allTasks[i]['title'];
    let description = allTasks[i]['description']
    let category = allTasks[i]['category'];
    let assignedTo = allTasks[i]['assignedTo'];
    let prio = allTasks[i]['prio'];
    let categoryColor = allTasks[i]['categoryColor'];
    statusContainer.innerHTML += returnTaskContainerForSearchHTML(i, title, description, category, assignedTo, prio, categoryColor);
  }

  /**
 * the details of a task are rendered
 * 
 * @param {string} category 
 * @param {string} categoryColor 
 * @param {string} title 
 * @param {string} description 
 * @param {string} dueDate 
 * @param {string} prio 
 * @param {number} i 
 */
 function renderDetails(category, categoryColor, title, description, dueDate, prio, i) {
    let popUpEditContent = document.getElementById('popUpEditContent');
    popUpEditContent.innerHTML = returnDetailedInterfaceHTML(category, categoryColor, title, description, dueDate, prio, i)
  }

  /**
 * loads the assigned persons to a task including their initials and their color id
 * 
 * @param {number} i index of a task
 */
function loadAssignedTo(i) {
    let assignedToContainer = document.getElementById(`assignedToDetailed${i}`);
    let allAssignedPersons = allTasks[i]['assignedTo'];
    for (let k = 0; k < allAssignedPersons.length; k++) {
      let assignedPerson = allAssignedPersons[k];
      if (assignedPerson == 'You') {
        let contactsInitials = 'You';
        let contactsColor = 'rgb(36, 36, 222)';
        let contactsName = 'You';
        assignedToContainer.innerHTML += returnAssignedToDetailed(k, contactsInitials, contactsColor, contactsName);
      } else {
        let contactsInitials = allContactsSorted[assignedPerson]['initials'];
        let contactsColor = allContactsSorted[assignedPerson]['colorID'];
        let contactsName = allContactsSorted[assignedPerson]['name'];
        assignedToContainer.innerHTML += returnAssignedToDetailed(k, contactsInitials, contactsColor, contactsName);
      }
    }
  }

  /**
 * displays all subtasks
 * 
 * @param {number} i index of task
 */
function renderSubtasksInPopUp(i) {
    let subtaskContainer = document.getElementById(`subtasksPopUp${i}`);
    let subtasks = allTasks[i]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
      let subtask = subtasks[j]['subtaskName'];
      subtaskContainer.innerHTML += returnSubtaskDetailedHTML(j, subtask);
      loadGreenCheckbox(i, j)
    }
  }

  
  /**
 * checks if a subtask has the status done
 * 
 * @param {number} i index of task
 * @param {number} j index of subtask
 */
function loadGreenCheckbox(i, j) {
    let subtaskStatus = allTasks[i]['subtasks'][j]['status'];
    if (subtaskStatus == 'done') {
      let checkbox = document.getElementById(`greenCheckBox${j}`);
      checkbox.style.opacity = 1;
    } else {
      checkbox = document.getElementById(`greenCheckBox${j}`);
      checkbox.style.opacity = 0;
    }
  }

  /**
 * if a section of the detailed interface is to high the overflow is set on scroll
 * 
 * @param {number} i 
 */
function checkHeight(i) {
    let titleHeight = document.getElementById(`title${i}`).offsetHeight;
    let descriptionHeight = document.getElementById(`description${i}`).offsetHeight;
    let subtaskHeight = document.getElementById(`subtasksPopUp${i}`).offsetHeight;
    let assignedToHeight = document.getElementById(`assignedToDetailed${i}`).offsetHeight;
    if (titleHeight > 45) {
      document.getElementById(`title${i}`).style.overflowY = "scroll"
    } else {
      document.getElementById(`title${i}`).style.overflowY = "auto"
    }
    if (descriptionHeight > 140) {
      document.getElementById(`description${i}`).style.overflowY = "scroll"
    } else {
      document.getElementById(`description${i}`).style.overflowY = "auto"
    }
    if (subtaskHeight > 75) {
      document.getElementById(`subtasksPopUp${i}`).style.overflowY = "scroll"
    } else {
      document.getElementById(`subtasksPopUp${i}`).style.overflowY = "auto"
    }
    if (assignedToHeight > 75) {
      document.getElementById(`assignedToDetailed${i}`).style.overflowY = "scroll"
    } else {
      document.getElementById(`assignedToDetailed${i}`).style.overflowY = "auto"
    }
  }

  /**
 * the detailed interface of a pop up is re-rendered to an edit-interface
 * 
 * @param {number} i 
 */
function editDetails(i) {
    let title = allTasks[i]['title'];
    let description = allTasks[i]['description'];
    let dueDate = allTasks[i]['dueDate'];
    let prio = allTasks[i]['prio'];
    let popUpEditContent = document.getElementById('popUpEditContent');
    popUpEditContent.innerHTML = returnPopUpEditContentHTML(title, description, dueDate, i)
    loadPrio(prio);
    loadSubtasksToEdit(i);
    loadAssignedToEdit(i);
  }

  /**
 * renders the subtasks of a task in the editinterface
 * 
 * @param {number} i index of task
 */
function loadSubtasksToEdit(i) {
    let subtaskContainerToEdit = document.getElementById('subtasksEdit')
    let subtasks = allTasks[i]['subtasks'];
    for (let j = 0; j < subtasks.length; j++) {
      let subtask = subtasks[j]['subtaskName'];
      subtaskContainerToEdit.innerHTML += returnSubtaskContainerToEditHTML(subtask)
    }
    loadStatusOfSubtask(i);
  }

  /**
 * loads renders the assigned persons 
 * 
 * @param {*} i 
 */
function loadAssignedToEdit(i) {
    let allAssignedPersons = allTasks[i]['assignedTo'];
    let assignedToContainer = document.getElementById(`assignedToEditContainer${i}`);
    for (let j = 0; j < allAssignedPersons.length; j++) {
      let assignedPerson = allAssignedPersons[j];
      if (assignedPerson == 'You') {
        let assignedInitials = 'You';
        let assignedColor = 'rgb(36, 36, 222)';
        assignedToContainer.innerHTML += returnallAssignedPersonsDisplayHTMl(assignedPerson, assignedInitials, assignedColor);
      } else {
        let assignedInitials = allContactsSorted[assignedPerson]['initials'];
        let assignedColor = allContactsSorted[assignedPerson]['colorID'];
        assignedToContainer.innerHTML += returnallAssignedPersonsDisplayHTMl(assignedPerson, assignedInitials, assignedColor);
      }
    }
  }

  /**
 * onmouseover: shows a cross if you hover over circle with initials
 * 
 * @param {number} id of cross on the circle with the initials
 */
function displayCross(id) {
    let cross = document.getElementById(id);
    cross.style.display = "flex"
  }
  
  /**
   * onmouseout: hides the same cross
   * 
   * @param {number} id 
   */
  function hideCross(id) {
    let cross = document.getElementById(id);
    cross.style.display = "none"
  }

  /**
 * onclick: sets the proper radio button of a priority on checked and shows the div box, representing a choosen priority
 * 
 * @param {*} prioField 
 * @param {*} input 
 */
function changePrio(prioField, input) {
    let radioBtn = document.getElementById(input);
    let allPrioSelected = document.querySelectorAll(".prioReworkSelected");
    if (radioBtn.checked == false) {
      for (let i = 0; i < allPrioSelected.length; i++) {
        unSelectAllReworkedPrios(i, allPrioSelected);
      }
      highlightReworkedPrio(prioField);
      radioBtn.checked = true;
    }
    else {
      radioBtn.checked = false;
      removeHighlightReworkedPrio(prioField);
    }
  }

  /**
 * highlight the selected priority
 * 
 * @param {html} prioField 
 */
function highlightReworkedPrio(prioField) {
    let prioButton = document.getElementById(prioField);
    prioButton.style.display = "flex"
  }
  
  /**
   * remove the highlight of the selected priority
   * 
   * @param {html} prioField 
   */
  function removeHighlightReworkedPrio(prioField) {
    let prioButton = document.getElementById(prioField);
    prioButton.style.display = "none"
  }

  /**
 * creates subtasks and puts them on a list
 * 
 */
function addSubtaskFromBoard() {
    let newSubtask = document.getElementById('subtasks').value;
    let subtaskList = document.getElementById('subtaskListPopUp');
    if (newSubtask.length < 2) {
      document.getElementById('noSubtask').classList.remove('d-none')
    } else {
      document.getElementById('noSubtask').classList.add('d-none')
      subtaskList.innerHTML += returnsSubtaskHTML(subtaskCounter, newSubtask);
      document.getElementById('subtasks').value = "";
      subtaskCounterPopUp++;
    }
    installScrollBar('subtaskListPopUp')
  }

  /**
 * creates subtasks and puts them on a list
 * 
 */
function addSubtaskFromBoardBtn() {
    let newSubtask = document.getElementById('subtask').value;
    let subtaskList = document.getElementById('subtaskList');
    if (newSubtask.length < 2) {
      document.getElementById('noSubtask').classList.remove('d-none')
    } else {
      document.getElementById('noSubtask').classList.add('d-none')
      subtaskList.innerHTML += returnsSubtaskHTML(subtaskCounter, newSubtask);
      document.getElementById('subtask').value = "";
      subtaskCounter++;
    }
    installScrollBar('subtaskList')
  }