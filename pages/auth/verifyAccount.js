import react, { useContext, useEffect } from "react";
import VerifyForm from "../../components/login/VerifyForm";
import AuthContext from "../../store/auth-context";

export default function verifyUser({ verifyToken }) {
  const ctx = useContext(AuthContext);

  // form submit handler

  const formSubmitHandler = (e) => {};

  useEffect(() => {
    console.log(ctx.userId);
    console.log(ctx.tmpToken);
  }, []);

  return (
    <main>
      <div className="flex h-screen">
        <VerifyForm passFormInfo={formSubmitHandler}></VerifyForm>
      </div>
    </main>
  );
}
