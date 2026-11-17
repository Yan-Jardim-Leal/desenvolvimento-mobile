export const hasEmpty = (...values: string[]) => values.some((value) => value.trim() === '');

export const isEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim());
