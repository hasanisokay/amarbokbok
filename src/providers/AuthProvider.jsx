import AuthContext from "@/contexts/AuthContext.mjs";
import { useState } from "react";


const AuthProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(null);    
    const authValues = {
        currentUser, setCurrentUser
    }
    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;