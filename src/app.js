const userForm = document.getElementById("userForm")
const motto = document.getElementById("motto")
const logo = document.getElementById("logo");
const profileForm = document.getElementById("profileForm")
const greeting = document.getElementById("greeting")
const taskForm = document.getElementById("taskForm")


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
    let name = document.getElementById("name").value;
    if (name.trim() === "") {
        alert("Silakan masukkan nama Anda");
        return;
    }

;
    userForm.classList.add("fade-out");
    userForm.remove();
    motto.classList.add("fade-out");
    motto.remove();


    logo.style.transform = "scale(0.8)";
    logo.style.fontSize = "4rem";
    logo.style.opacity = "100";

            setTimeout(() => {
                profileForm.classList.add("hidden");
                document.greeting.textContent = `Hello ${name}, please enter your tasks.`;
                taskForm.classList.remove("hidden");
                document.taskForm.classList.add("fade-in");
            }, 500);
}





