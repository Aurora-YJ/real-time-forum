
export function registerInfo() {
    const regBtn = document.getElementById('signup');

    regBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        const nickname = document.querySelector('[name="Nickname"]').value;
        const firstname = document.querySelector('[name="firstname"]').value;
        const lastname = document.querySelector('[name="lastname"]').value;
        const gender = document.querySelector('[name="gender"]').value;
        const email = document.querySelector('[name="email"]').value;
        const age = document.querySelector('[name="age"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="confirm_password"]').value;

        if (!nickname || !firstname || !lastname || !gender || !email || !password || !confirmPassword || !age) {
            showError("Please fill in all fields before continuing...");
            return;
        }

        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 18) {
            showError("Your age is not allowed...");
            return;
        }

        if (!isValidEmail(email)) {
            showError("Invalid email format...");
            return;
        }
        
        if (password !== confirmPassword) {
            showError("Passwords do not match...");
            return;
        }


        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nickname, firstname, lastname, gender, email, age, password, confirmPassword })
            });

            if (!response.ok) {
                showError("Failed to register. Please try again.");
                return;
            }

        } catch (error) {
            console.log("hhhhhhhhhhhhhh");
            console.error(error);
        }
    });
}

export function LoginInfo() {
    const log = document.getElementById("signin");
    log.addEventListener('click', async function (e) {
        e.preventDefault();

        const nameOrEmail = document.querySelector('[name="Nicknameoremail"]').value
        const password = document.querySelector('[name="password"]').value
        const confpassword = document.querySelector('[name="confirm_password"]').value

        if (!nameOrEmail || !password) {
            showError("Please fill in all fields before continuing...");
            return;
        }

        if (isLikelyEmail(nameOrEmail)) {
            if (!isValidEmail(nameOrEmail)) {
                showError("Invalid email format...");
                return;
            }
        }
       
        
        if (password != confpassword ) {
            showError("Passwords do not match...");
            return;
        }

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nameOrEmail, password , confpassword})
            });


            if (!response.ok) {
                showError("Failed to login. Please try again.");
                return;
            }

        } catch (error) {
            console.error(error);
        }

    });
}

function showError(message) {
    const errorDiv = document.getElementById("errorreglog");
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.opacity = '1';
    setTimeout(() => {
        errorDiv.style.opacity = '0';
    }, 2000);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isLikelyEmail(str) {
    return /@/.test(str) && /\./.test(str);
}