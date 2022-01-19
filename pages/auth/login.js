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

  const submitFormInformation = (event) => {
    const userName = event.target[0].value;
    const pass = event.target[1].value;

    console.log(userName);
    console.log(pass);
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
        return;
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          console.log("activated");
          resetLogin();
        }, 3000);
      });
    event.preventDefault();
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Something went wrong :(
        <br />
        Redirecting you to the login page..
      </p>
    );
  if (data) return <p>Data is received</p>;

  return (
    <main>
      <div className="flex h-screen">
        <LoginForm passFormInfo={submitFormInformation}></LoginForm>
      </div>
    </main>
  );
}
