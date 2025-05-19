// auth.js
export async function isLogged() {
    try {
        const response = await fetch("/auth");
        if (!response.ok) return false;

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        console.error("func isLogged:", error);
        return false;
    }
}
