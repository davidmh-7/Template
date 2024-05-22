document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var emailInput = document.getElementById("email");
      var email = emailInput.value.trim();
  
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var domainRegex = /\.(com|es|eus|net|fly|org)$/;

      // Verificar si el formulario es de registro o de inicio de sesión
      var isSignupForm = form.classList.contains("signup-form");

      // Validar el correo electrónico
      if (!emailRegex.test(email) || !domainRegex.test(email)) {
        alert("Por favor, introduce un correo electrónico válido que termine con '.com', '.es', '.eus', '.net', '.fly' o '.org'.");
        emailInput.focus();
        return false; 
      }

      // Validar las contraseñas solo en el formulario de registro
      if (isSignupForm) {
        
        var passwordInput = document.getElementById("password");
        var confirmPasswordInput = document.getElementById("Confirmpassword");
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden. Por favor, verifica.");
          passwordInput.focus();
          return false;
        }
      }
  
      form.submit(); 
    });
});

