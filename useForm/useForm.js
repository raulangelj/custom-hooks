import { useState } from "react"

export const useForm = ( initalForm = {} ) => {
  const [formState, setFormState] = useState(initalForm);

  const onInputChange = ({ target }) => {
    const { name, value, password } = target;

    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onResetForm = () => {
    setFormState(initalForm);
  }
  
  return {
    ...formState, formState, onInputChange, onResetForm
  }
}
