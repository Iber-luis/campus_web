//menu lateral//
const menuIcon = document.querySelector("#menu-icon");
        const menu2 = document.querySelector(".Menu")
        const closeMenu = document.querySelector("#cerrar-menu");
    
        menuIcon.addEventListener("click", () => {
            menu2.classList.add("active");
            console.log("mostar");
        })
    
        closeMenu.addEventListener("click", () => {
            menu2.classList.remove("active");
        })