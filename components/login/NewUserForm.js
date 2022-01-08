import react from "react";
import useInput from "../../hooks/use-input";

export default function NewUserForm({ passFormInfo }) {
  const {
    value: enteredUsername,
    isValid: enteredUsernameValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.includes("@") && value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredFname,
    isValid: enteredFnameIsValid,
    hasError: fnameHasError,
    valueChangeHandler: fnameChangeHandler,
    inputBlurHandler: fnameBlurHandler,
    reset: resetFnameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLname,
    isValid: enteredLnameIsValid,
    hasError: lnameHasError,
    valueChangeHandler: lnameChangeHandler,
    inputBlurHandler: lnameBlurHandler,
    reset: resetLnameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredUsernameValid && enteredPasswordValid) {
    formIsValid = true;
  }

  return (
    <div className="md:w-full md:max-w-sm mb-3">
      <form
        onSubmit={passFormInfo}
        className="bg-white shadow-md rounded md:px-8 px-16 pt-6 pb-8 md:mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none ${
              usernameHasError ? "border-red-500" : ""
            } border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          ></input>
          {usernameHasError && (
            <p className="text-red-500 text-xs italic">
              Please enter a username
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className={`${emailHasError ? "border-red-500" : ""}
            shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
          {emailHasError && (
            <p className="text-red-500 text-xs italic">
              Please enter your email
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fName"
          >
            First Name
          </label>
          <input
            className={`${
              fnameHasError ? "border-red-500" : ""
            } shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="fName"
            type="text"
            placeholder="First Name"
            value={enteredFname}
            onChange={fnameChangeHandler}
            onBlur={fnameBlurHandler}
          ></input>
          {fnameHasError && (
            <p className="text-red-500 text-xs italic">
              Please enter your first name
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lName"
          >
            Last Name
          </label>
          <input
            className={`${
              lnameHasError ? "border-red-500" : ""
            } shadow appearance-none border mb-3 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="lName"
            type="text"
            placeholder="Last Name"
            value={enteredLname}
            onChange={lnameChangeHandler}
            onBlur={lnameBlurHandler}
          ></input>
          {lnameHasError && (
            <p className="text-red-500 text-xs italic">
              Please enter your last name
            </p>
          )}
        </div>
        <div className="mb-0 md:mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`${
              passwordHasError ? "border-red-500" : ""
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="**************"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          ></input>
          {passwordHasError && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
        </div>
        <div className="invisible md:visible flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Account
          </button>
        </div>
        <div className="visible md:invisible flex items-center flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
