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

function render() {
    let listsHtml = "";
    Object.keys(lists).forEach(key => {
        listName = lists[key].name;
        listsHtml += `<button class="list-group-item border-b-2 border-slate-500 bg-slate-50 w-100 p-2">${listName}</button>`
    });
    
    document.getElementById("list-group").innerHTML = listsHtml;
}

render();
