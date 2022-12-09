import { useState } from "react";

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value = 1) => setCounter((currentValue) => currentValue + value);
  const decrement = (value = 1) => setCounter((currentValue) => currentValue - value);
  const reset = () => setCounter(initialValue);

  return { counter, increment, decrement, reset };
}