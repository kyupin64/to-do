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
let currentList = 1;
console.log(lists[currentList]);
let newKey = 3;
let itemInputSection = document.getElementById("item-input-section");
let itemButton = document.getElementById("add-item-button");
let itemInput = document.getElementById("item-input");
let itemSubmit = document.getElementById("item-submit");

document.getElementById("list-name-input").value = "";

function restoreSave() {
    lists = JSON.parse(localStorage.getItem("lists"));
    currentList = JSON.parse(localStorage.getItem("currentList"));
};

function saveThings() {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("currentList", JSON.stringify(currentList));
};

restoreSave();

function render() {
    let listsHtml = "";
    Object.keys(lists).forEach(key => {
        listName = lists[key].name;
        listsHtml += `<button class="list-group-item border-b-2 border-slate-500 bg-slate-50 w-100 p-2">${listName}</button>`
    });
    
    document.getElementById("list-group").innerHTML = listsHtml;

    document.getElementById("current-list-name").innerHTML = lists[currentList].name;

    let todosHtml = "";
    lists[currentList].todos.forEach(item => {
        console.log(item.completed)
        if (item.completed) {
            todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square-check"></i></button><p class="line-through">${item.text}</p><button><i class="fa-solid fa-pencil"></i></button><button><i class="fa-solid fa-trash-can"></i></button></div>`
        } else {
            todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square"></i></button><p>${item.text}</p><button><i class="fa-solid fa-pencil"></i></button><button><i class="fa-solid fa-trash-can"></i></button></div>`
        };
    });

    document.getElementById("current-list-items").innerHTML = todosHtml;
    
    let listButtons = document.querySelectorAll(".list-group-item");
    listButtons.forEach((button) => button.addEventListener("click", switchLists));

    let checkboxButtons = document.querySelectorAll(".current-list-item button:first-child");
    checkboxButtons.forEach((button) => button.addEventListener("click", checkItem));

    let editButtons = document.querySelectorAll(".current-list-item button:nth-last-child(2)");
    editButtons.forEach((button) => button.addEventListener("click", editItem));

    saveThings();
};

function addList() { 
    let inputListName = document.getElementById("list-name-input").value;

    if (inputListName) {
        let listObjs = Object.values(lists);
        let findDoubles = listObjs.filter((obj) => obj.name === inputListName).length;
        if (findDoubles === 0) {
            newKey += 1;
            lists[newKey] = {
                name: `${inputListName}`,
                todos: []
            };

            currentList = newKey;

            document.getElementById("list-name-input").value = "";
            render();
        } else {
            console.log("name must be unique");
        };
    } else {
        console.log("please enter a name");
    };
};

function deleteList() {
    if (Object.keys(lists).length > 1) {
        delete lists[currentList];
        currentList = Number(Object.keys(lists)[0]);
        render();
    } else {
        delete lists[currentList];
        document.getElementById("list-group").innerHTML = "";
        document.getElementById("current-list-name").innerHTML = "";
        document.getElementById("current-list-items").innerHTML = "";
    }
    
}

function switchLists(e) {
    let currentButton = e.target;
    let listsArr = Object.keys(lists);

    for (i = 0; i < listsArr.length; i++) {
        let listKey = listsArr[i];
        if (lists[listKey].name === currentButton.innerHTML) {
            currentList = listKey;
            render();
            break;
        };
    };
};

function toggleItemInput() {
    itemButton.classList.toggle("hidden");
    itemInputSection.classList.toggle("hidden");
    itemInputSection.classList.toggle("flex");
};

function addItem() {
    if (itemInput.value) {
        let todosList = lists[currentList].todos;
        todosList.push({text: itemInput.value, completed: false});
        itemInput.value = "";
        
        toggleItemInput();
        render();
    };
};

function checkItem(e) {
    let currentButton = e.currentTarget;
    let icon = currentButton.querySelector("i");
    let text = currentButton.nextElementSibling;
    
    icon.classList.toggle("fa-square-check");

    Object.keys(lists).forEach(key => {
        let listTodos = lists[key].todos;
        for (i = 0; i < listTodos.length; i++) {
            todoText = listTodos[i].text;
            if (text.innerHTML === todoText) {
                if (icon.classList.contains("fa-square-check")) {
                    listTodos[i].completed = true;
                } else {
                    listTodos[i].completed = false;
                };
            };
        };
    });
    render();
};

function editItem(e) {
    let inputs = document.querySelector("#current-list-items input");
    if (!inputs) {
        let currentButton = e.currentTarget;
        let parent = currentButton.parentElement;
        let pElem = currentButton.previousElementSibling;
        let pContent = pElem.innerHTML;

        parent.parentElement.insertBefore(document.createElement("div"), parent);
        let editDiv = parent.previousElementSibling;

        editDiv.appendChild(document.createElement("input"));
        editDiv.appendChild(document.createElement("button"));
        let inputAndButton = editDiv.childNodes;
        let editInput = inputAndButton[0];
        let editSubmit = inputAndButton[1];

        parent.classList.toggle("!hidden");
        editDiv.classList.add("flex", "gap-2", "max-w-56")
        editInput.classList.add("p-2", "border-2", "border-slate-500", "w-36", "h-9");
        editInput.value = pContent;
        editSubmit.classList.add("border-2", "border-slate-500", "w-24", "h-9");
        editSubmit.innerHTML = "Submit"

        editSubmit.addEventListener("click", () => {
            let todoIndex = lists[currentList].todos.map(function(e) { return e.text; }).indexOf(pContent);
            lists[currentList].todos[todoIndex].text = editInput.value;
            render();
        });
    };
};

window.addEventListener("load", render);

document.getElementById("list-submit").addEventListener("click", addList);
document.getElementById("delete-button").addEventListener("click", deleteList);

itemButton.addEventListener("click", toggleItemInput);
itemSubmit.addEventListener("click", addItem);
