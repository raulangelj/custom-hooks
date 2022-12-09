import { act, renderHook } from "@testing-library/react"
import { useCounter } from "./useCounter";

describe('Testing UseContuner', () => {
  test('Return default values', () => {
    const { result }  = renderHook(() => useCounter());
    const { counter, increment, decrement, reset } = result.current;
    expect(counter).toBe(10);
    expect(typeof increment).toBe('function');
    expect(decrement).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  })

  test('Generate counter with sended value, this case 100', () => {
    const { result }  = renderHook(() => useCounter(100));
    const { counter } = result.current;
    expect(counter).toBe(100);
  })

  test('Increment counter by value sended or default 1', () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment } = result.current;

    // increment default value
    act(() => increment());
    const { counter } = result.current;
    expect(counter).toBe(101);

    // increment by 5
    act(() => increment(5));
    const { counter: counter2 } = result.current;
    expect(counter2).toBe(106);
  })

  test('Decrement counter by value sended or default 1', () => {
    const { result } = renderHook(() => useCounter(100));
    const { decrement } = result.current;

    // decrement default value
    act(() => decrement());
    const { counter } = result.current;
    expect(counter).toBe(99);

    // decrement by 5
    act(() => decrement(5));
    const { counter: counter2 } = result.current;
    expect(counter2).toBe(94);
  })

  test('Reset counter to initial value', () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment, reset } = result.current;
    act(() => increment(5));
    const { counter } = result.current;
    expect(counter).toBe(105);
    act(() => reset());
    const { counter: counter2 } = result.current;
    expect(counter2).toBe(100);
  })
})