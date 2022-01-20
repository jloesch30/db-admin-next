import React from "react";
import { useEffect, useState } from "react";

const AuthContext = React.createContext({
  userId: null,
  role: null,
  setUserIdContext: (user) => {},
  setUserRoleContext: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const userIdHandler = (id) => {
    setUserId(id);
  };

  const userRoleHandler = (role) => {
    setRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        setUserIdContext: userIdHandler,
        setUserRoleContext: userRoleHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
