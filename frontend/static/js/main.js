import { isLogged } from  "./api.js";

let isLoggedIn = await isLogged()

if (isLoggedIn) {
    console.log("HHHHH")
} else {
    console.log("qqqqq")
}