import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { useForm } from "./useForm";

describe('Testing useForm', () => {
  const initialForm = {
    name: 'Raul',
    email: 'raulangelj@gmail.com'
  }

  test('Return default values', () => {
    const { result } = renderHook(() => useForm(initialForm));
    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function)
    });
  })

  test('Change the name of the form', () => {
    const newValue = 'John Doe';
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;
    act(() => {
      onInputChange({ target: { name: 'name', value: newValue }});
    })
    const { name, formState } = result.current;
    expect(name).toBe(newValue);
    expect(formState.name).toBe(newValue);
  })

  test('Rest the form', () => {
    const newValue = 'John Doe';
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onResetForm } = result.current;
    act(() => {
      onInputChange({ target: { name: 'name', value: newValue }});
      onResetForm();
    })
    const { name, formState } = result.current;
    expect(name).toBe(initialForm.name);
    expect(formState.name).toBe(initialForm.name);
  })
})