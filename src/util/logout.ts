import {logout} from "@/services/authService.ts";
import {clearStorage} from "@/services/storageService.ts";
import {addToast} from "@heroui/react";

const handleLogout = async (): Promise<void> => {
    logout().then(() => {
        clearStorage(); // clear session storage after server clears cookie
        window.location.href = '/'; // redirect or refresh

    }).catch((error) => {
        addToast({
            title: 'Logout Failed',
            color: 'danger',
            description: error.message || 'An error occurred while logging out.',
        })
    });
}

export default handleLogout;