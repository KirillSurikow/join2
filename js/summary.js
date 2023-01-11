async function downloadSummary() {
    setURL('https://kirill-surikow.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    prepareSummary()
    let currentUserAsString = backend.getItem('user');
    currentUser = JSON.parse(currentUserAsString) || [];
    comingFromLogIn = JSON.parse(backend.getItem('comingFromLogIn')) || [];
    renderGreet(currentUser, comingFromLogIn);
}


let allTasks;
let comingFromLogIn;

function prepareSummary() {
    let tasksTotal = countTasks();
    let tasksInProgress = countTasksInProgress();
    let tasksFeedback = countTasksAwaitingFeedback();
    let tasksUrgent = countTasksUrgent();
    let nextDeadline = showNextDeadline();
    let tasksToDo = countTasksTodDo();
    let tasksDone = countTasksDone();
    renderSummary(tasksTotal, tasksInProgress, tasksFeedback, tasksUrgent, tasksToDo, tasksDone, nextDeadline);
}


function renderSummary(tasksTotal, tasksInProgress, tasksFeedback, tasksUrgent, tasksToDo, tasksDone, nextDeadline) {
    document.getElementById('tasksTotal').innerHTML = /*html*/`${tasksTotal}`;
    document.getElementById('tasksProgress').innerHTML = /*html*/`${tasksInProgress}`;
    document.getElementById('tasksFeedback').innerHTML = /*html*/`${tasksFeedback}`;
    document.getElementById('tasksUrgent').innerHTML = /*html*/`${tasksUrgent}`;
    document.getElementById('nextDeadline').innerHTML = /*html*/`${nextDeadline}`;
    document.getElementById('tasksToDo').innerHTML = /*html*/`${tasksToDo}`;
    document.getElementById('tasksDone').innerHTML = /*html*/`${tasksDone}`;
}


function renderGreet(currentUser, comingFromLogIn) {
    renderGreetMobile(comingFromLogIn)
    let today = new Date();
    let currHour = today.getHours();
    if (currHour < 12) {
        document.getElementById('greet').innerHTML = /*html*/`
        <span class ="greetTime">Good Morning,</span>
        `
    } else if (currHour < 18) {
        document.getElementById('greet').innerHTML = /*html*/`
        <span class ="greetTime">Good Afternoon,</span>
        `
    } else {
        document.getElementById('greet').innerHTML = /*html*/`
        <span class ="greetTime">Good Evening,</span>
        `
    } if (currentUser <= 0) {
        document.getElementById('greet').innerHTML += /*html*/ `<span class="greetName">Guest</span>`;
    }

    for (let i = 0; i < currentUser.length; i++) {
        let user = currentUser[i]['name'];
        document.getElementById('greet').innerHTML += /*html*/ `<span class="greetName">${user}</span>`;

    }
}


async function renderGreetMobile(comingFromLogIn) {
    if (innerWidth < 900 && comingFromLogIn == true) {
        let today = new Date();
        let currHour = today.getHours();
        if (currHour < 12) {
            removeAndAddClass();
            document.getElementById('mobileGreet').innerHTML = /*html*/`
            <span class ="greetTime">Good Morning,</span>
            `
        } else if (currHour < 18) {
            removeAndAddClass()
            document.getElementById('mobileGreet').innerHTML = /*html*/`
            <span class ="greetTime">Good Afternoon,</span>
            `
        } else {
            removeAndAddClass()
            document.getElementById('mobileGreet').innerHTML = /*html*/`
            <span class ="greetTime">Good Evening,</span>
            `
        } if (currentUser <= 0) {
            document.getElementById('mobileGreet').innerHTML += /*html*/ `<span class="greetName">Guest</span>`;
        }

        for (let i = 0; i < currentUser.length; i++) {
            let user = currentUser[i]['name'];
            document.getElementById('mobileGreet').innerHTML += /*html*/ `<span class="greetName">${user}</span>`;

        }
        setTimeout(() => {
            document.getElementById('mobileGreet').classList.remove('mobileGreet');
            document.getElementById('mobileGreet').classList.add('d-none');
        }, 2000);
        await noMoreGreeting()
    }
}

function removeAndAddClass() {
    document.getElementById('mobileGreet').classList.remove('d-none');
    document.getElementById('mobileGreet').classList.add('mobileGreet');
}

async function noMoreGreeting() {
    let comingFromLogIn = false;
    await backend.setItem('comingFromLogIn', JSON.stringify(comingFromLogIn));
}



function showNextDeadline() {
    if (allTasks.length == 0) {
        return "0 Deadlines"
    } else {
        currentDate = allTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

        return currentDate[0]['dueDate'];
    }
};


function countTasks() {
    return allTasks.length;
}


function countTasksInProgress() {
    let totalInProgress = 0;
    for (let i = 0; i < allTasks.length; i++) {
        let taskStatus = allTasks[i]['status']
        if (taskStatus == 'inProgress') {
            totalInProgress++
        }
    }
    return totalInProgress;
}


function countTasksAwaitingFeedback() {
    let totalFeedback = 0;
    for (let i = 0; i < allTasks.length; i++) {
        let taskStatus = allTasks[i]['status']
        if (taskStatus == 'awaitingFeedback') {
            totalFeedback++
        }
    }
    return totalFeedback;
}


function countTasksUrgent() {
    let totalUrgent = 0;
    for (let i = 0; i < allTasks.length; i++) {
        let taskPrio = allTasks[i]['prio']
        if (taskPrio == 'urgent') {
            totalUrgent++
        }
    }
    return totalUrgent;
}


function countTasksTodDo() {
    let totalToDo = 0;
    for (let i = 0; i < allTasks.length; i++) {
        let taskStatus = allTasks[i]['status']
        if (taskStatus == 'toDo') {
            totalToDo++
        }
    }
    return totalToDo;
}


function countTasksDone() {
    let totalDone = 0;
    for (let i = 0; i < allTasks.length; i++) {
        let taskStatus = allTasks[i]['status']
        if (taskStatus == 'done') {
            totalDone++
        }
    }
    return totalDone;
}



function whitePenImg() {
    document.getElementById("pen").src = "assets/img/Summary/whitePenSummary.png";
}


function whiteCheckImg() {
    document.getElementById("check").src = "assets/img/Summary/whiteCheckSummary.png";

}


function blackPenImg() {
    document.getElementById("pen").src = "assets/img/Summary/penSummary.png";
}


function blackCheckImg() {
    document.getElementById("check").src = "assets/img/Summary/checkSummary.png";
}


function goToBoard() {
    window.location.href = 'board.html'
}



