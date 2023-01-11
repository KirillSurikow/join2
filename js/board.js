/**
 * downloads allTasks and allContactsSorted and Unsorted
 * 
 */
async function downloadTasks() {
  setURL('https://gruppe-335.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  let allTasksAsString = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsString) || [];
  allContactsSorted = JSON.parse(backend.getItem('allContactsSorted')) || [];
  allContactsUnsorted = JSON.parse(backend.getItem('allContactsUnsorted')) || [];
  divideByStatus();
}




/**
 * before a task can be rendered, the status of the task decides in which statuscontainer it belongs
 * 
 */
function divideByStatus() {
  let allTaskContainer = document.querySelectorAll('.statusContainer');
  clearAllStatusContainer();
  for (let i = 0; i < allTaskContainer.length; i++) {
    for (let j = 0; j < allTasks.length; j++) {
      if (allTasks[j]['status'] == allTaskContainer[i].id) {
        renderTasks(i, j)
      }
    }
  }
}

let subtaskCounterPopUp = 0;



/**
 * decides depending of the amount of assigned persons, how they going to be displayed
 * 
 * @param {number} j index of the assigned task
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





function loadAssignedPersons(j) {
  let assignedToContainer = document.getElementById(`assignedToContainer${j}`);
  let allAssignedPersons = allTasks[j]['assignedTo'];
  if (allAssignedPersons.length < 4) {
    displaySmallAmountOfPersons(allAssignedPersons, assignedToContainer)
  } else {
    displayLargeAmountOfPersons(allAssignedPersons, assignedToContainer);
  }
}

/**
 * loads the subtasks with the status done 
 * 
 * @param {number} i index of allTasks
 */
function displaySmallAmountOfPersons(allAssignedPersons, assignedToContainer) {
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

function displayLargeAmountOfPersons(allAssignedPersons) {
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



function loadSubtaskProgress(i) {
  let doneSubtasks = 0;
  let allSubtasks = allTasks[i]['subtasks'];
  for (let j = 0; j < allSubtasks.length; j++) {
    let subtaskStatus = allSubtasks[j]['status']
    if (subtaskStatus == 'done') {
      doneSubtasks++;
    }
  }
  adjustProgressBar(i, doneSubtasks, allSubtasks);
}

let currentDraggedElement;
let positionDraggedElement;


/**
 * start of dragging
 * 
 * @param {number} id index of allTasks
 * @param {*} event for identifiying the position of the cursor when the task is dragged
 */
function startDragging(id, event) {
  currentDraggedElement = id;
  positionDraggedElement = event.clientY;
}

/**
 * happens ondrag continiously and returns the position of the cursor relative to the begin of dragging.
 * then it decides whether allTasks should scroll up or down
 * 
 * @param {*} event 
 */
function returnPosition(event) {
  let newPosition = event.clientY;
  if (newPosition < positionDraggedElement) {
    dragAndScrollDown();
  }
  if (newPosition > positionDraggedElement) {
    dragAndScrollUp()
  }
}
/**
 * tells the object to scoll down
 * 
 */
function dragAndScrollDown() {
  let scrollContainer = document.getElementById('allTasks')
  scrollContainer.scrollBy({
    top: -200,
    behavior: "smooth"
  });
}

/**
 * tells the object to scroll up
 * 
 */
function dragAndScrollUp() {
  let scrollContainer = document.getElementById('allTasks')
  scrollContainer.scrollBy({
    top: 200,
    behavior: "smooth"
  });
}

/**
 * allows the drop
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * allows the transfer of information. If a task is dropped, its status is changing to the status of the dropzone, afterwards the backend gets an update
 * 
 * @param {string} status 
 */
async function moveTo(status) {
  allTasks[currentDraggedElement]['status'] = status;
  await backendIntegration();
  divideByStatus();
}

/**
 * opens add task pop up on the board
 * 
 */
function taskPopUpFromBoard() {
  let popUpContainer = document.getElementById('popUp');
  document.body.style.overflowY = 'hidden';
  window.scroll(0, 0)
  popUpContainer.style.display = 'flex'
  let popUpContent = document.getElementById('popUpContent');
  popUpContent.innerHTML = returnPopUpContentOriginalHTML();
}

/**
 * create a new task directly to status container
 * 
 * @param {string} id the requested status
 */
function requestNewTaskFromBoard(id) {
  resetAlert();
  initValidationFromBoard(id);
}

/**
 * validates the requested task
 * 
 * @param {string} id status
 */
function initValidationFromBoard(id) {
  let titleField = document.getElementById('title');
  let descriptionField = document.getElementById('description');
  let categoryField = document.getElementById('choiceContainer');
  let customizedCategory = document.getElementById('newCategory');
  let colorOfCategory = document.getElementById('chosenCategoryColor');
  let dueDate = document.getElementById('dueDate');
  executeValidationFromBoard(titleField, descriptionField, categoryField, customizedCategory, colorOfCategory, dueDate, id);
}



/**
 * prepares the information of a task before it gets pushed in the array and saved at the backend.
 * 
 * @param {string} injectedStatus the task is placed at a statuscontainer directly
 */
async function addNewTaskFromBoard(injectedStatus) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let assignedTo = checkAssignedPersons();
  let dueDate = document.getElementById('dueDate').value;
  let subtasks = checkSubtasksFromBoard();
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
    'status': injectedStatus,
  }

  await pushTask(task);
}

/**
 * takes the innerHTML of all subtasks, puts them in a JSON and pushes the JSON in an array allSubtasks
 * 
 * @returns an array with the edited subtasks
 */
function checkSubtasksFromBoard() {
  let allSubtasks = [];
  let allSubtasksFromBoard = document.querySelectorAll('.subtaskName')
  for (let i = 0; i < allSubtasksFromBoard.length; i++) {
    let subtaskName = allSubtasksFromBoard[i].innerHTML;
    let subtask = {
      'subtaskName': subtaskName,
      'status': 'toDO'
    }
    allSubtasks.push(subtask);
  }
  return allSubtasks;
}

/**
 * a for loop through an array of html elements. The loop takes the id of the elements, which represent indexes of the array allContacsSorted
 * 
 * @returns an array with the assigned persons
 */
function checkAssignedPersonsEdit() {
  let newAssignedPersons = [];
  let allAssignedPersons = document.querySelectorAll('.assignedCircleEdit');
  for (let i = 0; i < allAssignedPersons.length; i++) {
    let unclearedId = allAssignedPersons[i].id;
    let id = unclearedId.slice(7);
    newAssignedPersons.push(id)
  }
  return newAssignedPersons
}

/**
 * closes a pop up
 * 
 */
function closePopUpAddTask() {
  let popUpContainer = document.getElementById('popUp');
  document.body.style.overflowY = 'auto';
  popUpContainer.style.display = 'none'
  let popUpContent = document.getElementById('popUpContent');
  popUpContent.innerHTML = "";
}

/**
 * is an onkeyup function. takes the value of an inputfield 
 * 
 */
function searchTask() {
  let search = document.getElementById('search');
  let searchLetters = search.value.toLowerCase();
  clearAllTaskContainer();
  prepareSearch(searchLetters);
}

/**
 * takes all positition the search can be compared
 * 
 * @param {string} searchLetters 
 */
function prepareSearch(searchLetters) {
  for (let i = 0; i < allTasks.length; i++) {
    let title = allTasks[i]['title'];
    let description = allTasks[i]['description'];
    let category = allTasks[i]['category'];
    let assignedTo = allTasks[i]['assignedTo'];
    let dueDate = allTasks[i]['dueDate'];
    let prio = allTasks[i]['prio'];
    startSearch(i, searchLetters, title, description, category, assignedTo, dueDate, prio);
  }
}

/**
 * compares the search with the tasks
 * 
 * @param {number} i 
 * @param {string} searchLetters 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {string} assignedTo 
 * @param {string} dueDate 
 * @param {string} prio 
 */
function startSearch(i, searchLetters, title, description, category, assignedTo, dueDate, prio) {
  if (title.toLowerCase().includes(searchLetters)
    || description.toLowerCase().includes(searchLetters)
    || category.toLowerCase().includes(searchLetters)
    || assignedTo.toLowerCase().includes(searchLetters)
    || dueDate.toLowerCase().includes(searchLetters)
    || prio.toLowerCase().includes(searchLetters)
  ) {
    renderAccordingToStatus(i);
  }
}

/**
 * shows the task in detail, if you click on a taskt on the board
 * 
 * @param {number} i index of a task
 */
function showDetails(i) {
  openPopUp();
  prepareDetails(i);
}

/**
 * pop up appears
 * 
 */
function openPopUp() {
  document.getElementById('popUpEditContainer').style.display = "flex";
}

/**
 * all information which should be displayed in detail are prepared
 * 
 * @param {number} i 
 */
function prepareDetails(i) {
  let category = allTasks[i]['category'];
  let categoryColor = allTasks[i]['categoryColor'];
  let title = allTasks[i]['title'];
  let description = allTasks[i]['description'];
  let dueDate = allTasks[i]['dueDate'];
  let prio = allTasks[i]['prio'];
  renderDetails(category, categoryColor, title, description, dueDate, prio, i);
  renderSubtasksInPopUp(i);
  loadAssignedTo(i)
  checkHeight(i);
}

/**
 * a helpfunction, closes a serie of popups
 * 
 * @param {*} id 
 */
function closePopUp(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflowY = 'auto';
}


/**
 * loads the preassigned prio and displays it on the edit interface
 * 
 * @param {string} prio 
 */
function loadPrio(prio) {
  let capitalizedPrio = capitalize(prio);
  let firstParameter = "prio" + capitalizedPrio + "ReworkSelected";
  let secondParameter = prio + "Rework";
  changePrio(firstParameter, secondParameter);
}

/**
 * 
 * @param {string} prio 
 * @returns an adjusted string to fit in the function changePrio
 */
function capitalize(prio) {
  let firstLetter = prio.charAt(0);
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = prio.slice(1);
  let capitalizedPrio = firstLetterCap + remainingLetters;
  return capitalizedPrio
}



/**
 * sets the checkbox of a subtask on checked or unchecked according to the status of the subtask
 * 
 * @param {number} i index of a task
 */
function loadStatusOfSubtask(i) {
  let allSubtasks = allTasks[i]['subtasks'];
  for (let j = 0; j < allSubtasks.length; j++) {
    let subtaskStatus = allSubtasks[j]['status'];
    let idOfCheckbox = allTasks[i]['subtasks'][j]['subtaskName'];
    let checkbox = document.getElementById(idOfCheckbox);
    if (subtaskStatus == 'done') {
      checkbox.checked = true;
    }
  }
}

/**
 * removes an assigned contact from the task
 * 
 * @param {number} j 
 */
function removeAssignedContact(j) {
  let element = document.getElementById(j);
  element.remove();
}

/**
 * collects the changed or unchanged information of a task
 * 
 * @param {number} i index of the task
 */
function initEdit(i) {
  let newTitle = document.getElementById('newTitle').value;
  let newDescription = document.getElementById('newDescription').value;
  let newDueDate = document.getElementById('newDueDate').value;
  let newPrio = checkPrioAfterEdit();
  let newAssignedPersons = checkAssignedPersonsEdit();
  checkSubtasksProgress(i);
  updateTask(i, newTitle, newDescription, newDueDate, newPrio, newAssignedPersons)
}


/**
 * a for loop going through all prio buttons and returns the value of the checked one
 * 
 * @returns a string with the new prio
 */
function checkPrioAfterEdit() {
  let allPrioInputs = document.querySelectorAll('.prioReworkInput');
  for (let i = 0; i < allPrioInputs.length; i++) {
    let prio = allPrioInputs[i];
    if (prio.checked == true) {
      return prio.value;
    }
  }
}

/**
 * overrides the status of a subtask if the linked checkbox is checked
 * 
 * @param {number} i 
 */
function checkSubtasksProgress(i) {
  let allStatusCheckboxes = document.querySelectorAll('.subtaskCheckbox')
  for (let j = 0; j < allStatusCheckboxes.length; j++) {
    let checkbox = allStatusCheckboxes[j];
    if (checkbox.checked == true) {
      allTasks[i]['subtasks'][j]['status'] = 'done';
    }
    if (checkbox.checked == false) {
      allTasks[i]['subtasks'][j]['status'] = 'toDo';
    }
  }
}

/**
 * overrides the old information with the new information
 * 
 * @param {number} i 
 * @param {string} newTitle 
 * @param {string} newDescription 
 * @param {string} newDueDate 
 * @param {string} newPrio 
 * @param {string} newAssignedPersons 
 */
async function updateTask(i, newTitle, newDescription, newDueDate, newPrio, newAssignedPersons) {
  allTasks[i]['title'] = newTitle;
  allTasks[i]['description'] = newDescription;
  allTasks[i]['dueDate'] = newDueDate;
  allTasks[i]['prio'] = newPrio;
  allTasks[i]['assignedTo'] = newAssignedPersons;
  await backendIntegration();
  divideByStatus();
  showDetails(i);
  loadSubtaskProgress(i)
}



/**
 * before every change of the priority, all div boxes representing a choosen priority are hidden
 * 
 * @param {number} i index of the allSelectedSelected
 * @param {array} allPrioSelected Array
 */
function unSelectAllReworkedPrios(i, allPrioSelected) {
  allPrioSelected[i].style.display = "none"
}









