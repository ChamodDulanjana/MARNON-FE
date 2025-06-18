import {logout} from "@/services/authService.ts";
import {addToast} from "@heroui/react";

const handleLogout = async (): Promise<void> => {
    logout().then(() => {
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