import React , { createContext , useContext , useState , useEffect , ReactNode} from "react";

import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import createWallet from "./components/CreateWallet.tsx";


interface User {
    email: string | null;
}

interface  AuthContextProps{
    user: User | null ,
    login: () => void;
    signup: (email: string , password: string ) => void;
    logout: () => void;

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined) ;
interface AuthProviderProps{
    children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children}) => {
    const [user , setUser] = useState<User | null>( null);
    const auth = getAuth();
    const navigate = useNavigate();

    const  signOutUser = async () =>{
        console.log("signing out");
        await signOut(auth);
        navigate('/createWallet')
    }


    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth , (user) =>{

            setUser( user ? { email : user.email } : null );
        });
        return () => unsubscribe();
    },[ auth] );

    const  signup = (email: string , password : string) => {
        createWallet( email , password);
    }

    const login = () =>{
        login();
    }

    const logout =() =>{
        signOutUser();
    }

    return (
        <AuthContext.Provider value={ { user , login , signup , logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export  const useAuth = () : AuthContextProps => {
    const context  = useContext( AuthContext);
    if( !context ) {
        throw new Error ( "useAuth must be used with auth provider" );
    }
    return context ;
}


