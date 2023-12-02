import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const AccountContext = createContext();

const Account = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null);

    const [isAuth, setAuth] = useState(false);
    // login data is what we are going to be using for all the children of our components post login
    const [data, setData] = useState(null);
    const [is_teacher, setIsTeacher] = useState(null);
    
    return (
        <AccountContext.Provider value={{ isAuth, setAuth, data, setData, is_teacher, setIsTeacher, userInfo, setUserInfo }}>
            {children}
        </AccountContext.Provider>
    )

}

export { Account, AccountContext };