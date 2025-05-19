// main.js
import { isLogged } from "./auth.js";
import { registerandlogin } from "./registerandlogin.js";
import { pagehome } from "./pagehome.js";

async function init() {
    let isLoggedIn = await isLogged();

    if (isLoggedIn) {
        pagehome();
    } else {
        registerandlogin();
    }
}

init();
