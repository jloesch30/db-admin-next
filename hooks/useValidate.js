import react, { useState } from "react";

export function useValidate() {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [formInput, setFormInput] = useState(null);

  // validates the form input
  const getValidation = (validationFunc) => {
    try {
      return validationFunc(formInput);
    } catch (error) {
      console.log(error.message);
      setError(true)
    }
  };
  return {
    getValidation,
    error,
    setFormInput,
    valid
  }
}
