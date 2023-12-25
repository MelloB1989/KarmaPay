import { createContext, useState } from 'react';

export const UserContext = createContext({
    userData: null, 
    setUserData: () => {}
});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};