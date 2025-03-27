 // secciones. pagina//
 document.querySelectorAll('.main-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });


document.addEventListener("scroll", function() {
    const header = document.querySelector("header.main-header");
    header.classList.toggle("scrolled", window.scrollY > 50); // Cambia 50 por la cantidad de scroll deseada
});

// Función para redirigir a la página de menú
function goToMenu() {
  // Verifica si estás en la página principal
  if (window.location.pathname === "/principal-web.html" || window.location.pathname === "/") {
    window.location.href = "menu-prin.html"; // Si estás en la página principal, redirige a menu-prin.html
  } else if (window.location.pathname === "/menu-prin.html") {
    // Si ya estás en menu-prin.html, desplázate al menú
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  }
}

