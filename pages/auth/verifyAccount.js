import react from "react";
import VerifyForm from "../../components/login/VerifyForm";

export default function verifyUser() {
  return (
    <main>
      <div className="flex h-screen">
        <VerifyForm></VerifyForm>
      </div>
    </main>
  );
}