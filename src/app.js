const userForm = document.getElementById("userForm");
const motto = document.getElementById("motto");
const logo = document.getElementById("logo");
const taskForm = document.getElementById("taskForm");
const navBar = document.getElementById("navBar");

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

let taskCounter = 0;

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskListContainer = document.getElementById("taskListContainer");
    const taskList = document.getElementById("taskList");

    window.submitTask = function () {
        const taskName = document.getElementById("taskName").value.trim();
        const priority = document.getElementById("priority").value;

        if (!taskName) {
            alert("Task name cannot be empty!");
            return;
        }
        if (!priority) {
            alert("Please select a priority level!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("flex", "items-center", "justify-between", "bg-gray-800", "p-2", "rounded-xl", "text-white", "shadow");

        // Checkbox to mark task as done
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2");
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                taskItem.classList.add("line-through", "opacity-50");
            } else {
                taskItem.classList.remove("line-through", "opacity-50");
            }
        });

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = `${taskName} - (${priority})`;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("ml-2", "text-red-500", "hover:text-red-700");
        deleteButton.onclick = function () {
            taskItem.remove();
            if (taskList.children.length === 0) {
                taskListContainer.classList.add("hidden");
            }
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        document.getElementById("taskName").value = "";
        document.getElementById("priority").value = "";

        taskListContainer.classList.remove("hidden");
    };
});
    