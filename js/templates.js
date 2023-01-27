async function init(navID) {
    if (navID !== 5) {
        await includeHTML();
    }
    highlight(navID);
}

/**
 * function which downloads all html templates
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * 
 * @param {string} navID every main site has an Id
 */
function highlight(navID) {

    if (navID == 1) {
        document.getElementById('nav1').classList.add('navbarHighlight')
    }

    if (navID == 2) {
        document.getElementById('nav2').classList.add('navbarHighlight')
    }

    if (navID == 3) {
        document.getElementById('nav3').classList.add('navbarHighlight')
    }

    if (navID == 4) {
        document.getElementById('nav4').classList.add('navbarHighlight')
    }

    if (navID == 5) {
        document.getElementById('nav5').classList.add('navbarHighlight')
    }
}


/**
 * some text or list elements can become too long, so that the need a scroll function
 * 
 * @param {string} id 
 */
function installScrollBar(id) {
    let subtaskContainer = document.getElementById(`${id}`);
    let containerHeight = document.getElementById(`${id}`).offsetHeight;
    if (containerHeight >= 26) {
        subtaskContainer.style.overflowY = "scroll";
    }
    else {
        subtaskContainer.style.overflowY = "auto";
    }
}


function openHelp() {
    window.location.href = "help.html"
}
