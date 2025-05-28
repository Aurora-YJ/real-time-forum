export async function isLogged() {
    try {
        const response = await fetch("/auth");
        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error in isLogged:", error);
        return false;
    }
}
