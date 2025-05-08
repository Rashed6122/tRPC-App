export const  useAuth = () => {
    const login = (user: {name: string , id : string}) =>{
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logout = () =>{
        localStorage.removeItem("user");
    }
    const isAuthenticated = () =>{
        return localStorage.getItem("user") !== null;
    }

    return { login, logout, isAuthenticated };
}
export type AuthContext = ReturnType<typeof useAuth>;