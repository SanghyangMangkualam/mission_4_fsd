const userForm = document.getElementById("userForm");
const motto = document.getElementById("motto");
const logo = document.getElementById("logo");
const taskForm = document.getElementById("taskForm");
const taskCounterText = document.getElementById("taskCounter");
const taskList = document.getElementById("taskList");
const deleteAllButton = document.getElementById("deleteAllButton");

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    document.querySelector(".star-container").appendChild(star);
    setTimeout(() => { star.remove(); }, 3000);
}
setInterval(createStar, 500);

function checkOther(select) {
    document.getElementById("otherPosition").classList.toggle("hidden", select.value !== "Other");
}

function saveUser() {
    let name = document.getElementById("name").value.trim();
    let position = document.getElementById("position").value;
    let otherPosition = document.getElementById("otherPosition").value.trim();

    if (!name) {
        alert("Please enter your name first");
        return;
    }

    if (position === "Other" && !otherPosition) {
        alert("Please specify your role!");
        return;
    }

    userForm.classList.add("fade-out");
    userForm.remove();
    motto.classList.add("fade-out");
    motto.remove();

    logo.style.transform = "scale(0.8)";
    logo.style.fontSize = "4rem";
    logo.style.opacity = "0";

    setTimeout(() => {
        logo.remove();
    }, 500);

    setTimeout(() => {
        taskForm.classList.remove("hidden");
        taskForm.classList.add("fade-in", "active");
        navBar.classList.remove("hidden");
        navBar.classList.add("fade-in", "active");
    }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
    const taskListContainer = document.getElementById("taskListContainer");
    const taskCounterText = document.getElementById("taskCounterText");
    const deleteAllButton = document.getElementById("deleteAllButton");

    function updateTaskCounter() {
        const uncheckedTasks = [...taskList.children].filter(task => !task.querySelector("input[type='checkbox']").checked).length;
        if (taskCounterText) {
            taskCounterText.textContent = `You have ${uncheckedTasks} task${uncheckedTasks !== 1 ? "s" : ""} on the list!`;
        }
        deleteAllButton.classList.toggle("hidden", taskList.children.length === 0);
    }
    
    window.submitTask = function () {
        const taskName = document.getElementById("taskName").value.trim();
        const priority = document.getElementById("priority").value;
        const taskDate = document.getElementById("taskDate").value;

        if (!taskName) {
            alert("Task name cannot be empty!");
            return;
        }
        if (!priority) {
            alert("Please select a priority level!");
            return;
        }
        if (!taskDate) {
            alert("Please select a date!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("flex", "items-center", "justify-between", "bg-gray-800", "p-2", "rounded-xl", "text-white", "shadow", "gap-2");

        const taskContent = document.createElement("div");
        taskContent.classList.add("flex", "items-center", "gap-2", "flex-grow", "justify-start");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2");
        checkbox.addEventListener("change", function () {
            taskText.classList.toggle("line-through", this.checked);
            taskItem.classList.toggle("opacity-50", this.checked);
            updateTaskCounter();
        });

        const taskText = document.createElement("span");
        taskText.textContent = taskName;

        const dueDateSpan = document.createElement("span");
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        const taskTime = document.getElementById("taskTime").value;


        if (taskDate === today) {
            dueDateSpan.textContent = `Due Today at ${taskTime}`;
        } else if (taskDate === tomorrowString) {
            dueDateSpan.textContent = "Due Tomorrow";
        } else {
            dueDateSpan.textContent = `Due ${taskDate} at ${taskTime}`;
        }

        dueDateSpan.classList.add("ml-2", "text-yellow-400", "text-sm");

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioritySpan.classList.add("ml-2", "px-2", "py-1", "rounded", "text-black", "float-right");
        if (priority === "low") prioritySpan.classList.add("bg-green-600");
        if (priority === "medium") prioritySpan.classList.add("bg-yellow-600");
        if (priority === "high") prioritySpan.classList.add("bg-red-500");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "gap-2", "items-center");

        const editButton = document.createElement("img");
        editButton.src = "edit-icon.svg";
        editButton.classList.add("w-6", "h-6", "cursor-pointer");
        editButton.title = "Edit";
        editButton.addEventListener("click", function () {
            const newText = prompt("Edit your task:", taskText.textContent);
            if (newText) taskText.textContent = newText;
        });

        const deleteButton = document.createElement("img");
        deleteButton.src = "delete-icon.svg";
        deleteButton.classList.add("w-6", "h-6", "cursor-pointer");
        deleteButton.title = "Delete";
        deleteButton.addEventListener("click", function () {
            taskItem.remove();
            updateTaskCounter();
        });

        buttonContainer.appendChild(dueDateSpan);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        taskContent.appendChild(prioritySpan);

        taskItem.appendChild(taskContent);
        taskItem.appendChild(buttonContainer);

        taskList.appendChild(taskItem);

        document.getElementById("taskName").value = "";
        document.getElementById("priority").value = "";

        taskListContainer.classList.remove("hidden");
        updateTaskCounter();
    };

function deleteAllTasks(){
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };
    updateTaskCounter();
}

deleteAllButton.addEventListener("click", deleteAllTasks);
});
