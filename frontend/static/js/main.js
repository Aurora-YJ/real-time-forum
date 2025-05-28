// main.js
import { isLogged } from "./auth.js";
import { registerandlogin } from "./registerandlogin.js";
import { pagehome } from "./pagehome.js";

async function init() {
    try {
        const isLoggedIn = await isLogged();

        if (isLoggedIn) {
            pagehome(); 
        } else {
            registerandlogin(); 
        }
    } catch (error) {
        console.error("Error in init:", error);
       
    }
}

init();
