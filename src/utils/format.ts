export const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const formatDecimal = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',');

export const formatArea = (hectares: number) => `${formatDecimal(hectares)} ha`;

export const plural = (count: number, singular: string, pluralForm: string) => `${count} ${count === 1 ? singular : pluralForm}`;

export const firstName = (name: string) => name.split(' ')[0];

export const createId = (prefix: string) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
