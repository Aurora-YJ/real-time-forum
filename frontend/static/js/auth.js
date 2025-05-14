export async function isLogged() {
    try {
        const rep = await fetch("/auth")
        if (rep.ok) {
            return true
        }
        
    } catch (error) {
        console.log("func islogged:",error)
        return false
    }
}