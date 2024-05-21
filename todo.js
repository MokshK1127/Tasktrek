const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.textContent = inputbox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

    }
    inputbox.value = '';

}

listContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        
    }
}, false)

