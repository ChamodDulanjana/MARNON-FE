
export const saveToStorage = (data: any) => {
    sessionStorage.setItem('userName', data.userName);
    sessionStorage.setItem('userId', data.userId);
    sessionStorage.setItem('role', data.role);
}

export const clearStorage = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
}