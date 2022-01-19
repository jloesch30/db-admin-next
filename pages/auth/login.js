import LoginForm from "../../components/login/LoginForm";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation Login($data: loginInput!) {
    login(data: $data) {
      token
      user {
        fname
      }
    }
  }
`;

export default function SignIn() {
  const [login, { data, loading, error, reset: resetLogin }] =
    useMutation(LOGIN_USER);
  const router = useRouter();

  const submitFormInformation = (
    event,
    resetPasswordInput,
    resetUsernameInput
  ) => {
    const userName = event.target[0].value;
    const pass = event.target[1].value;

    // use login mutation with credentials
    login({
      variables: {
        data: {
          username: userName,
          password: pass,
        },
      },
    })
      .then((data) => {
        console.log(data);
        // redirect the user to the verify page
      })
      .catch((err) => {
        console.log(err);
        resetPasswordInput();
        resetUsernameInput();
      });
    event.preventDefault();
  };

  return (
    <main>
      <div className="flex h-screen">
        <LoginForm
          passFormInfo={submitFormInformation}
          loginError={error}
          loginLoading={loading}
        ></LoginForm>
      </div>
    </main>
  );
}
