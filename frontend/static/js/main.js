import { isLogged } from  "./auth.js";
import { registerandlogin } from "./registerandlogin.js"
import { pagehome } from "./pagehome.js"
let isLoggedIn = await isLogged()

if (isLoggedIn) {
    pagehome()
} else {
    registerandlogin()
}