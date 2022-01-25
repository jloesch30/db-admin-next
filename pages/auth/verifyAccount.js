import react, { useContext, useEffect } from "react";
import VerifyForm from "../../components/login/VerifyForm";
import AuthContext from "../../store/auth-context";

export default function verifyUser({ verifyToken }) {
  const ctx = useContext(AuthContext);

  // form submit handler

  const formSubmitHandler = (e) => {
    // send the code along with the validate token to verify that is is still valid
    console.log("the event object", e);
    const validateToken = localStorage.getItem("validateToken");
    const smsInput = e.target[0].value;

    console.log(validateToken);
    console.log(smsInput);
    e.preventDefault();
  };

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
