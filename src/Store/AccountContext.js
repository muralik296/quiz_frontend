import { createContext, useEffect, useState } from "react";
import LoginComponent from "../components/Login";

const AccountContext = createContext();

const Account = ({ children }) => {

    const [isAuth, setAuth] = useState(false);
    // login data is what we are going to be using for all the children of our components post login
    const [data, setData] = useState(null);
    const [is_teacher, setIsTeacher] = useState(null);

    return (
        <AccountContext.Provider value={{ isAuth, setAuth, data, setData, is_teacher, setIsTeacher }}>
            {children}
        </AccountContext.Provider>
    )

}

export { Account, AccountContext };