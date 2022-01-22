import { useCallback, useState } from "react";
import axios from "axios";

const useCheckRefresh = () => {
  const [refreshError, setRefreshError] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkRefreshToken = useCallback(async (token) => {
    // use the verification api to check token
    console.log("checking refresh token");
    setLoading(true);
    const res = await axios.get("http://localhost:3000/api/verification", {
      headers: {
        authorization: token,
      },
    });
    setLoading(false);

    if (res.ok) {
      return res.data.accesstoken;
    }

    return false;
  }, []);

  return {
    refreshError,
    refreshLoading: loading,
    checkRefresh: checkRefreshToken,
  };
};

export default useCheckRefresh;
