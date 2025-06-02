import { trpc } from "../lib/trpc";

export const  useAuth = () => {
    const login = (user: {name: string ,email : string, id : string , role : string}) =>{
        console.log("user", user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logout = async() =>{
        localStorage.removeItem("user");
        trpc.auth.logout.useMutation();
    }
    // const isAuthenticated = () =>{
    //     return localStorage.getItem("user") !== null;
    // }
    const getUser = () => {
        const user = localStorage.getItem("user");
        if (user){
            return JSON.parse(user) as {name: string ,email : string, id : string, role : string};
        }
        return {id: "", name: "", email: "", role: ""};    
}

    return { login, logout , getUser };
}
export type AuthContext = ReturnType<typeof useAuth>;