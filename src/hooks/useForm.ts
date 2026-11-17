import { useState } from 'react';

export const useForm = <T extends Record<string, string>>(initial: T) => {
  const [values, setValues] = useState(initial);
  const setField = (key: keyof T) => (text: string) => setValues((current) => ({ ...current, [key]: text }));
  const reset = () => setValues(initial);
  return { values, setField, reset };
};
