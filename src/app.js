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

    const userForm = document.getElementById("userForm");
    userForm.classList.add("fade-out");
    userForm.remove();
    const motto = document.getElementById("motto")
    motto.classList.add("fade-out");
    motto.remove();

    let logo = document.getElementById("logo");
    logo.style.transform = "scale(0.8)";
    logo.style.fontSize = "4rem";
    logo.style.opacity = "100";

            setTimeout(() => {
                document.getElementById("profileForm").classList.add("hidden");
                document.getElementById("greeting").textContent = `Hello ${name}, please enter your tasks.`;
                document.getElementById("taskForm").classList.remove("hidden");
                document.getElementById("taskForm").classList.add("fade-in");
            }, 500);
}





