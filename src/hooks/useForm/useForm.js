import { useEffect, useMemo, useState } from "react";

// const formData = {
//   email: "",
//   password: "",
//   displayName: "",
// };

// ? the object formValdation is for validate the form
// ? first argument is the function to validate the form (if the value is true the validation is ok, if the value is false the error message is shown)
// ? second argument is the message to show if the validation fails
// const formValidations = {
//   email: [(value) => value.includes('@'), 'The email should contain @'],
//   password: [(value) => value.length >= 6, 'The password should be at least 6 characters'],
//   displayName: [(value) => value.length >= 1, 'The name is required'],
// }

export const useForm = (initalForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initalForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const key in errors) {
      if (errors[key] !== null) return false;
    }
    return true
  }, [errors])

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initalForm);
  };

  const createValidators = () => {
    const validators = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "This field is required"] =
        formValidations[formField];
      validators[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setErrors(validators);
  };

  return {
    ...formState,
    ...errors,
    formState,
    onInputChange,
    onResetForm,
    isFormValid
  };
};
