import { isLogged } from  "./auth.js";
import { registerandlogin } from "./registerandlogin.js"

let isLoggedIn = await isLogged()

if (isLoggedIn) {
    console.log("HHHHH")
} else {
    registerandlogin()
}