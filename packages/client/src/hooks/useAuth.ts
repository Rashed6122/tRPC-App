export const  useAuth = () => {
    const login = (user: {name: string ,email : string, id : string}) =>{
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logout = () =>{
        localStorage.removeItem("user");
    }
    const isAuthenticated = () =>{
        return localStorage.getItem("user") !== null;
    }
    const getUser = () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }

    return { login, logout, isAuthenticated , getUser };
}
export type AuthContext = ReturnType<typeof useAuth>;