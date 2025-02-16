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

    if (!position) {
        alert("Please select your role!");
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
        const greetingContainer = document.createElement("div");
        greetingContainer.id = "greetingContainer";
        greetingContainer.className = "hidden relative bg-black/50 shadow-lg p-6 rounded-2xl max-w-md w-full border border-white z-20 mb-4";
    
        const innerContainer = document.createElement("div");
        innerContainer.className = "flex items-center gap-4";

        const profilePic = document.createElement("img");
        profilePic.src = "./images/profile-picture.svg";
        profilePic.alt = "Profile Picture";
        profilePic.className = "h-10 w-10 rounded-full object-cover mr-4";
    
        const greetingMessage = document.createElement("h2");
        greetingMessage.id = "greetingMessage";
        greetingMessage.className = "text-xl font-bold text-white";
    
        const nameSpan = document.createElement("span");
        nameSpan.className = "text-yellow-400";
        nameSpan.textContent = name;
    
        const roleSpan = document.createElement("span");
        roleSpan.className = "text-yellow-400";
        roleSpan.textContent = `${position === "Other" ? otherPosition : position}`;
    
        greetingMessage.appendChild(document.createTextNode("Hello "));
        greetingMessage.appendChild(roleSpan);
        greetingMessage.appendChild(document.createTextNode(" "));
        greetingMessage.appendChild(nameSpan);
        greetingMessage.appendChild(document.createTextNode(", what are you planning today?"));
    
        innerContainer.appendChild(profilePic);
        innerContainer.appendChild(greetingMessage);
    
        greetingContainer.appendChild(innerContainer);
    
        taskForm.parentNode.insertBefore(greetingContainer, taskForm);

        greetingContainer.classList.remove("hidden");
        greetingContainer.classList.add("fade-in", "active");
    
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
            dueDateSpan.textContent = taskTime ? `Today at ${taskTime}` : "Today";
        } else if (taskDate === tomorrowString) {
            dueDateSpan.textContent = "Tomorrow";
        } else {
            const dateObj = new Date(taskDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            dueDateSpan.textContent = taskTime ? `${formattedDate} at ${taskTime}` : formattedDate;
        }

        dueDateSpan.classList.add("px-2", "text-yellow-400", "text-sm");

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        prioritySpan.classList.add("px-2", "py-1", "rounded", "text-black", "float-right");
        if (priority === "low") prioritySpan.classList.add("bg-green-600");
        if (priority === "medium") prioritySpan.classList.add("bg-yellow-600");
        if (priority === "high") prioritySpan.classList.add("bg-red-500");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "gap-2", "items-center");

        const editButton = document.createElement("button");
editButton.className = "bg-blue-400 text-white px-0 py-1 rounded-md hover:bg-blue-500 transition-all flex items-center gap-1";
editButton.innerHTML = `
    <img id="editIcon" src="images/edit-icon.png">
    <span class="hidden group-hover:inline">Edit</span>
`;
editButton.addEventListener("click", function () {
    const currentText = taskText.textContent;
    const currentDate = taskDate;
    const currentTime = taskTime;
    const currentPriority = priority;

    const newText = prompt(
        "Edit your task:\n\n" +
        `Task: ${currentText}\n` +
        `Date: ${currentDate}\n` +
        `Time: ${currentTime || 'Not set'}\n\n` +
        "Enter new values (leave blank to keep current):\n" +
        "Format: Task Name|Date (YYYY-MM-DD)|Time (HH:MM)",
        `${currentText}|${currentDate}|${currentTime}`
    );

    if (newText) {
        const [newTask, newDate, newTime] = newText.split('|');
        
        if (newTask) taskText.textContent = newTask.trim();

        if (newDate || newTime) {
            const updatedDate = newDate || currentDate;
            const updatedTime = newTime || currentTime;

            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowString = tomorrow.toISOString().split('T')[0];

            if (updatedDate === today) {
                dueDateSpan.textContent = updatedTime ? `Today at ${updatedTime}` : "Today";
            } else if (updatedDate === tomorrowString) {
                dueDateSpan.textContent = "Tomorrow";
            } else {
                const dateObj = new Date(updatedDate);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                dueDateSpan.textContent = updatedTime ? `${formattedDate} at ${updatedTime}` : formattedDate;
            }
        }
    }
});

const deleteButton = document.createElement("button");
deleteButton.className = "bg-red-400 text-white px-0 py-1 rounded-md hover:bg-red-500 transition-all flex items-center gap-1";
deleteButton.innerHTML = `
    <img id="deleteIcon" src="images/remove-icon.png">
    <span class="hidden group-hover:inline">Delete</span>
`;
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
})