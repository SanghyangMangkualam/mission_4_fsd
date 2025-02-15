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
