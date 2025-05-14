export async function isLogged() {
    try {
        const rep = await fetch("/auth")
        const repda = await rep.json()
        console.log(repda);
        
        if (rep.ok) {
            return true
        } else {
            return false
        }
        
        
    } catch (error) {
        console.log("func islogged:",error)
        return false
    }
}