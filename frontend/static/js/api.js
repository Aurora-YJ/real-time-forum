import { debounce } from "./registerandlogin.js";

export function registerInfo() {
    const regBtn = document.getElementById('signup');

    regBtn.addEventListener('click', debounce(async function (e) {
        e.preventDefault();

        const nickname = document.querySelector('[name="Nickname"]').value;
        const firstname = document.querySelector('[name="firstname"]').value;
        const lastname = document.querySelector('[name="lastname"]').value;
        const gender = document.querySelector('[name="gender"]').value;
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="confirm_password"]').value;

        if (!nickname || !firstname || !lastname || !gender || !email || !password || !confirmPassword) {
            showError("Please fill in all fields before continuing...");
            return;
        }

        if (password !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nickname, firstname, lastname, gender, email, password })
            });

            if (!response.ok) {
                showError("Failed to register. Please try again.");
            }

         
        } catch (error) {
          
            console.error(error);
        }
    }, 500));
}


function showError(message) {
    const errorDiv = document.getElementById("errorreglog");
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.opacity = '1';
    setTimeout(() => {
        errorDiv.style.opacity = '0';
    }, 2000)
}
