// set variable for list of lists object
let lists = {
    1: {
        name: "Schoolwork",
        todos: [
            {
                text: "Work on to-do project",
                completed: false
            },
            {
                text: "Study iterators",
                completed: false
            },
        ]
    },
    2: {
        name: "Chores",
        todos: [

        ]
    },
    3: {
        name: "Date Ideas",
        todos: [
            
        ]
    }
};
// set variables for currentlist, key of next list to be added (newKey), and elements on page for adding new item to todo list
let currentList = 1;
let newKey = 3;
let itemInputSection = document.getElementById("item-input-section");
let itemButton = document.getElementById("add-item-button");
let itemInput = document.getElementById("item-input");
let itemSubmit = document.getElementById("item-submit");

// function to retrieve saved localStorage lists object, currentList value, and newKey value, called when the page is loaded
function restoreSave() {
    lists = JSON.parse(localStorage.getItem("lists"));
    currentList = JSON.parse(localStorage.getItem("currentList"));
    newKey = JSON.parse(localStorage.getItem("newKey"));
};

// function to save lists object, currentList value, and newKey value, called each time render() runs
function saveThings() {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("currentList", JSON.stringify(currentList));
    localStorage.setItem("newKey", JSON.stringify(newKey));
};

function render() {
    // create list of lists on left bar
    let listsHtml = "";
    Object.keys(lists).forEach(key => {
        // loop through each list and add to html element
        listName = lists[key].name;
        listsHtml += `<button class="list-group-item border-b-2 border-slate-500 bg-slate-50 w-100 p-2">${listName}</button>`
    });
    document.getElementById("list-group").innerHTML = listsHtml;

    document.getElementById("current-list-name").innerHTML = lists[currentList].name;

    // create list of current todo items
    let todosHtml = "";
    lists[currentList].todos.forEach(item => {
        // loop through each todo in current list, add to html element
        if (item.completed) {
            // if todo is marked as completed, add checkbox and strikethrough on text
            todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square-check"></i></button><p class="line-through">${item.text}</p><button><i class="fa-solid fa-pencil"></i></button><button><i class="fa-solid fa-trash-can"></i></button></div>`
        } else {
            // if not completed, add regular box and text
            todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square"></i></button><p>${item.text}</p><button><i class="fa-solid fa-pencil"></i></button><button><i class="fa-solid fa-trash-can"></i></button></div>`
        };
    });
    document.getElementById("current-list-items").innerHTML = todosHtml;
    
    // for each box containing a list name on left bar, add event to switch to whichever list was clicked
    let listButtons = document.querySelectorAll(".list-group-item");
    listButtons.forEach((button) => button.addEventListener("click", switchLists));

    // for each checkbox icon on todo item, add event to set completed as true and add checked box and strikethrough on 
    // whichever todo was clicked (or reverse if it was already completed)
    let checkboxButtons = document.querySelectorAll(".current-list-item button:first-child");
    checkboxButtons.forEach((button) => button.addEventListener("click", checkItem));

    // for each edit pencil icon, add event to open edit box and submit changes to whichever todo item was clicked
    let editButtons = document.querySelectorAll(".current-list-item button:nth-last-child(2)");
    editButtons.forEach((button) => button.addEventListener("click", editItem));

    // for each trash can icon, add event to delete whichever todo item was clicked
    let deleteButtons = document.querySelectorAll(".current-list-item button:last-child");
    deleteButtons.forEach((button) => button.addEventListener("click", deleteItem));

    saveThings();
};

function addList() { 
    let inputListName = document.getElementById("list-name-input").value;

    // if there is text in the input field, add to lists object and display
    if (inputListName) {
        let listObjs = Object.values(lists);
        // check if there is already a list with that name
        let findDoubles = listObjs.filter((obj) => obj.name === inputListName).length;
        if (findDoubles === 0) {
            // if there is text and no list with that name, add 1 to newKey counter to get unique key for list object and add to lists
            newKey += 1;
            lists[newKey] = {
                name: `${inputListName}`,
                todos: []
            };

            // switch currentList to whichever list was just created
            currentList = newKey;

            // reset input field text and render new list
            document.getElementById("list-name-input").value = "";
            render();
        } else {
            // if there is already a list with that name, console log why the submit button didn't work
            console.log("name must be unique");
        };
    } else {
        // if input field is empty, console log why the submit button didn't work
        console.log("please enter a name");
    };
};

function deleteList() {
    // check how many keys are in lists, if greater than one delete the list that was clicked
    if (Object.keys(lists).length > 1) {
        delete lists[currentList];
        // set currentList to the key number of the list at the top and render
        currentList = Number(Object.keys(lists)[0]);
        render();
    } else {
        // if there is only one list left, delete that list and set all fields to be blank
        delete lists[currentList];
        document.getElementById("list-group").innerHTML = "";
        document.getElementById("current-list-name").innerHTML = "";
        document.getElementById("current-list-items").innerHTML = "";
    };
};

function switchLists(e) {
    // get the clicked element and an array of each key in lists
    let currentButton = e.target;
    let listsArr = Object.keys(lists);

    // loop through keys and switch currentList to whichever list was clicked
    for (i = 0; i < listsArr.length; i++) {
        let listKey = listsArr[i];
        // find the correct list by checking if the name in the object is the same as the text in the clicked button
        if (lists[listKey].name === currentButton.innerHTML) {
            // once correct key is found, set it to the currentList and render
            currentList = listKey;
            render();
        };
    };
};

function toggleItemInput() {
    // if add button is clicked, hide button and show input field and submit button
    // if submit button is clicked, hide input field and submit button and show add button
    itemButton.classList.toggle("hidden");
    itemInputSection.classList.toggle("hidden");
    itemInputSection.classList.toggle("flex");
};

function addItem() {
    // check if there is text in input field
    if (itemInput.value) {
        // if there is text, get array of current todos and add object with text from input field to array
        let todosList = lists[currentList].todos;
        todosList.push({text: itemInput.value, completed: false});
        // clear input
        itemInput.value = "";
        
        // call function to hide input section and show add button, render
        toggleItemInput();
        render();
    };
};

function checkItem(e) {
    // get the clicked element and the icon it contains, plus the p element next to the button containing todo text
    let currentButton = e.currentTarget;
    let icon = currentButton.querySelector("i");
    let text = currentButton.nextElementSibling;
    
    // if icon is already marked as completed, remove checked and if not, add checked
    icon.classList.toggle("fa-square-check");

    // get current list todos, loop through each to find which one was clicked and mark completed as either true or false, then render
    let listTodos = lists[currentList].todos;
    for (i = 0; i < listTodos.length; i++) {
        todoText = listTodos[i].text;
        // find which index in todo list has the same text as the p element next to clicked button
        if (text.innerHTML === todoText) {
            // once found, check if it contains the checked box and if it does, that means it was marked as not completed
            // before and was toggled through the current function, so completed needs to be marked as true

            // if it does not contain the checked box, that means it was completed before and the current 
            // function removed that class so completed needs to marked as false
            if (icon.classList.contains("fa-square-check")) {
                listTodos[i].completed = true;
            } else {
                listTodos[i].completed = false;
            };
        };
    };
    render();
};

function editItem(e) {
    // check if any other todo items are currently being edited by checking if there are other input fields in the list
    // if there are, don't open a new edit input
    let inputs = document.querySelector("#current-list-items input");
    if (!inputs) {
        // if there are no other items being edited, get button that was clicked, its parent (div container with 
        // all the icons and text for that todo item), the p element before the button which contains the text of 
        // the todo, and the contents of that p element
        let currentButton = e.currentTarget;
        let parent = currentButton.parentElement;
        let pElem = currentButton.previousElementSibling;
        let pContent = pElem.innerHTML;

        // create a new div element as a sibling before the parent element and make a variable to access it
        parent.parentElement.insertBefore(document.createElement("div"), parent);
        let editDiv = parent.previousElementSibling;

        // inside new div element, add an input field and a submit button and make variables for each
        editDiv.appendChild(document.createElement("input"));
        editDiv.appendChild(document.createElement("button"));
        let inputAndButton = editDiv.childNodes;
        let editInput = inputAndButton[0];
        let editSubmit = inputAndButton[1];

        // hide the parent element which contains all the icons and text and add styles for the new edit div, input, and submit button
        parent.classList.toggle("!hidden");
        editDiv.classList.add("flex", "gap-2", "max-w-56")
        editInput.classList.add("p-2", "border-2", "border-slate-500", "w-36", "h-9");
        // make the value of the input field the same as the text of the todo item to be edited
        editInput.value = pContent;
        editSubmit.classList.add("border-2", "border-slate-500", "w-24", "h-9");
        // make submit button contain the word "submit"
        editSubmit.innerHTML = "Submit"

        // add event to submit button and when clicked, find index of edited todo and change text
        editSubmit.addEventListener("click", () => {
            // use map function to get the text of each todo, then use indexOf to get the index of the todo item with the 
            // same text content as the text of the item being edited, before it was edited
            let todoIndex = lists[currentList].todos.map(e => e.text).indexOf(pContent);
            // change text of todo at the previously found index to be the input field value (edited text) and render
            lists[currentList].todos[todoIndex].text = editInput.value;
            render();
        });
    } else {
        // if there is another item being edited, console log why the edit button didn't work
        console.log("finish editing item before trying to edit a new one");
    };
};

function deleteItem(e) {
    // get button that was clicked and its second previous sibling's content (p element with todo text)
    let currentButton = e.currentTarget;
    let pContent = currentButton.previousElementSibling.previousElementSibling.innerHTML;
    
    // use map function to get the text of each todo, then use indexOf to get the index of the todo item with the
    // same text content as the text of the item to be deleted
    let todoIndex = lists[currentList].todos.map(e => e.text).indexOf(pContent);
    // get array of current todos, splice to remove index of item to be deleted, render
    let currentTodosArr = lists[currentList].todos;
    currentTodosArr.splice(todoIndex, 1);
    render();
};

function editListName() {
    // get edit list name section, if it contains hidden then make it show and allow user to edit, if it doesn't
    // that means it's already visible and user is already editing, so do nothing
    let editSection = document.getElementById("listname-edit");
    if (editSection.classList.contains("hidden")) {
        // if edit section is hidden, get current list name element, edit input element, and submit button element
        let titleElement = document.getElementById("current-list-name");
        let listNameInput = document.getElementById("listname-edit-input");
        let listNameSubmit = document.getElementById("listname-edit-submit");

        // hide the list name and show the input field and button
        titleElement.classList.add("hidden");
        editSection.classList.remove("hidden");
        editSection.classList.add("flex");
        // make the value of the input field the same as the text of the list name to be edited
        listNameInput.value = titleElement.innerHTML;

        // add event to submit button and when clicked, change the name of the current list in the lists object
        listNameSubmit.addEventListener("click", () => {
            lists[currentList].name = listNameInput.value;
            //hide the edit section and show the list name, then render new list name
            titleElement.classList.remove("hidden");
            editSection.classList.add("hidden");
            editSection.classList.remove("flex");
            render();
        });
    } else {
        // if edit section is visible, console log why the edit button didn't work
        console.log("already editing!");
    };
};

function clearCompletedItems() {
    // get array of current list todos
    let currentTodos = lists[currentList].todos;
    //loop through each todo to remove the ones marked as completed, then render
    for (i = 0; i < currentTodos.length; i++) {
        // check if current todo is completed, if it is then splice the array to remove the todo
        if (currentTodos[i].completed) {
            currentTodos.splice(i, 1);
        };
    };
    render();
};

// on page load, render everything with the retrieved local storage lists object, currentList, etc
window.addEventListener("load", () => {
    // reset value of input for adding new lists to list of lists
    document.getElementById("list-name-input").value = "";

    restoreSave();
    render();
});

// add events for the list name submit button, list delete button, list name edit button, and clear completed items button
document.getElementById("list-submit").addEventListener("click", addList);
document.getElementById("delete-button").addEventListener("click", deleteList);
document.getElementById("edit-button").addEventListener("click", editListName);
document.getElementById("clear-button").addEventListener("click", clearCompletedItems);

// add events for clicking the add item button and the submit button after adding an item
itemButton.addEventListener("click", toggleItemInput);
itemSubmit.addEventListener("click", addItem);
