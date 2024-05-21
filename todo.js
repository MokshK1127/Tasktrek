const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


//NOTE : To persist the data even after page reload we have 2 options. Local storage and session storage. Data stored in Session storage 
// persists only till the session is active i.e. till the tab is open the data will persist even after reload but deletes after tab closes. 
// Local storage persists even after the tab is closed.
// if You want to see Local storage or Session storage data in browser, you can go to inspect element -> Application -> Local Storage/Session Storage



// tasklist used to store the tasks which we will later store in local storage so that data persists even after page reload
// think of this as map where content is key and status of task is value (true if task is completed and false if not)
let taskList = {};


// init function to check if there is any data in local storage and if yes then populate the list with that data
const init = () => {
    let data = localStorage.getItem("taskList");

    //checks if data is not null
    if (data) {

        //data was stored in string format so we need to convert it back to object
        taskList = JSON.parse(data);

        //we loop over all entries and add them back to the list
        for (let key in taskList) {
            let li = document.createElement("li");
            let textSpan = document.createElement("p");
            textSpan.textContent = key;
            li.appendChild(textSpan);
            let span = document.createElement("span");
            span.textContent = "\u00d7";
            li.appendChild(span);
            listContainer.appendChild(li);
            if (taskList[key]) {
                li.classList.toggle("checked");
            }
        }
    }


}


init();

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");

        let textSpan = document.createElement("p");
        textSpan.textContent = inputbox.value;
        li.appendChild(textSpan);
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);

        //we add the task to our taskList object using content as key and false as value
        taskList[inputbox.value] = false;

        //we store the list in localStorage so it persists even afte reload
        localStorage.setItem("taskList", JSON.stringify(taskList));


    }
    inputbox.value = '';

}

listContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        // update the taskList object with the new status of the task
        let content = e.target.getElementsByTagName("p")[0].textContent;
        taskList[content] = !taskList[content];
        console.log(content, taskList[content]);

        // store the updated taskList in localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));

    }
    else if (e.target.tagName === "SPAN") {

        // delete the task from the list using content as key
        let content = e.target.parentElement.getElementsByTagName("p")[0].textContent;
        delete taskList[content];

        //update the list in localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));
        e.target.parentElement.remove();


    }
}, false)

