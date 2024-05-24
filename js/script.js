document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const logoutButton = document.getElementById("logoutButton");
  const userNameSpan = document.getElementById("userName");
  const userInfoDiv = document.getElementById("userInfo");

  // banco de dados de usuários
  const users = [
    { email: "kaua@email.com", password: "kaua123", name: "Kauã de Melo" },
    { email: "usuario@email.com", password: "usuario123", name: "Usuário" },
  ];

  // armazena os dados no localStorage
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const storedUsers = JSON.parse(localStorage.getItem("users"));

      const user = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        loginError.textContent = "";
        // mensagem de logado com sucesso
        const successMessage = document.createElement("p");
        successMessage.textContent = "Login bem-sucedido!";
        successMessage.classList.add("success-message");
        loginForm.parentNode.insertBefore(
          successMessage,
          loginForm.nextSibling
        );

        setTimeout(() => {
          successMessage.remove();
          window.location.href = "../index.html";
        }, 5000);
      } else {
        // mensagem de email ou senha invalidos
        loginError.textContent = "Email ou senha inválidos.";
        setTimeout(() => {
          loginError.textContent = "";
        }, 5000);
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "../pages/login.html";
    });
  }

  if (userNameSpan && userInfoDiv) {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      userNameSpan.textContent = loggedInUser.name;
      userInfoDiv.innerHTML = `
            <p>Email: ${loggedInUser.email}</p>
            <p>Nome: ${loggedInUser.name}</p>
          `;
    } else {
      window.location.href = "login.html";
    }
  }
});
