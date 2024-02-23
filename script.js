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

document.getElementById("list-name-input").value = "";

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
        todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square"></i></button><p>${item.text}</p></div>`
    });

    document.getElementById("current-list-items").innerHTML = todosHtml;
    
    let listButtons = document.querySelectorAll(".list-group-item");
    listButtons.forEach((button) => button.addEventListener("click", switchLists));
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

window.addEventListener("load", render);

document.getElementById("list-submit").addEventListener("click", addList);
document.getElementById("delete-button").addEventListener("click", deleteList);
