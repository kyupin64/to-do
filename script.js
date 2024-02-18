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
let currentList = lists[1];
console.log(currentList);

document.getElementById("list-name-input").value = "";

function render() {
    let listsHtml = "";
    Object.keys(lists).forEach(key => {
        listName = lists[key].name;
        listsHtml += `<button class="list-group-item border-b-2 border-slate-500 bg-slate-50 w-100 p-2">${listName}</button>`
    });
    
    document.getElementById("list-group").innerHTML = listsHtml;

    document.getElementById("current-list-name").innerHTML = currentList.name;

    let todosHtml = "";
    currentList.todos.forEach(item => {
        todosHtml += `<div class="current-list-item"><button><i class="fa-regular fa-square"></i></button><p>${item.text}</p></div>`
    });

    document.getElementById("current-list-items").innerHTML = todosHtml;
};

function addList() { 
    let inputListName = document.getElementById("list-name-input").value;
    let newKey = Object.keys(lists).length + 1;

    if (inputListName) {
        lists[newKey] = {
            name: `${inputListName}`,
            todos: []
        };
    };
    render();
};

render();

document.getElementById("list-submit").addEventListener("click", addList);
