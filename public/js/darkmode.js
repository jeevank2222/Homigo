const themeButton = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeButton.innerHTML="☀️";
}

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");
        themeButton.innerHTML="☀️";

    }else{

        localStorage.setItem("theme","light");
        themeButton.innerHTML="🌙";

    }

});