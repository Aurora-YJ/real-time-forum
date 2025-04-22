import { isLogged } from  "./auth.js";
import { registerandlogin } from "./registerandlogin.js"
import { pagehome } from "./pagehome.js"
let isLoggedIn = await isLogged()

if (isLoggedIn) {
    console.log("jjjjj");
    
    pagehome()
} else {
    console.log("llllll");
    registerandlogin()
}