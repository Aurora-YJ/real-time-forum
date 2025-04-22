export async function isLogged() {
    try {
        const rep = await fetch("/auth")

        const data = await rep.json()
        
        if (data.message == "able") {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        console.log("func islogged:",error)
        return false
    }
}