import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextWrapper = ({ children }) => {
  const defaultUsername = window.localStorage.getItem("email")
    ? window.localStorage.getItem("email")
    : "";
  const [username, setUsername] = useState(defaultUsername);
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
