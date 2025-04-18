export async function isLogged() {
    try {
        const rep = await fetch("/auth", {
            method : 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        if (!rep.ok) {
            throw new Error('Failed to connect to the server')
        }

        const data = await rep.json()
        if (data.isLoggedIn) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        console.log("func islogged:",error)
        return false
    }
}