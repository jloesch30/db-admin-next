import React from "react";
import { useEffect, useState } from "react";

const AuthContext = React.createContext({
  userId: null,
  role: null,
  tmpToken: null,
  setTmpTokenContext: (token) => {},
  setUserIdContext: (user) => {},
  setUserRoleContext: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [tmpToken, setTmpToken] = useState(null);

  const userIdHandler = (id) => {
    setUserId(id);
  };

  const userRoleHandler = (role) => {
    setRole(role);
  };

  const tmpTokenHandler = (token) => {
    setTmpToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        tmpToken,
        setTmpTokenContext: tmpTokenHandler,
        setUserIdContext: userIdHandler,
        setUserRoleContext: userRoleHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
