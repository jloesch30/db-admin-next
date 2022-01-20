import react, { useContext, useEffect } from "react";
import VerifyForm from "../../components/login/VerifyForm";
import AuthContext from "../../store/auth-context";

export default function verifyUser({ verifyToken }) {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log(ctx.userId);
  }, []);

  return (
    <main>
      <div className="flex h-screen">
        <VerifyForm></VerifyForm>
      </div>
    </main>
  );
}
