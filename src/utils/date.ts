const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MONTHS_LONG = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const DAY_MS = 24 * 60 * 60 * 1000;

const pad = (value: number) => String(value).padStart(2, '0');

const parse = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00`);

export const toIsoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const today = () => toIsoDate(new Date());

export const daysFromNow = (days: number) => toIsoDate(new Date(Date.now() + days * DAY_MS));

export const addDays = (iso: string, days: number) => toIsoDate(new Date(parse(iso).getTime() + days * DAY_MS));

export const diffInDays = (iso: string) => Math.round((parse(iso).getTime() - parse(today()).getTime()) / DAY_MS);

export const formatDate = (iso: string) => {
  const date = parse(iso);
  return `${pad(date.getDate())} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatDayMonth = (iso: string) => {
  const date = parse(iso);
  return `${pad(date.getDate())} ${MONTHS[date.getMonth()]}`;
};

export const formatMonthYear = (iso: string) => {
  const date = parse(iso);
  return `${MONTHS_LONG[date.getMonth()]} de ${date.getFullYear()}`;
};

export const formatRelativeDay = (iso: string) => {
  const diff = diffInDays(iso);
  if (diff === 0) return 'hoje';
  if (diff === 1) return 'amanhã';
  if (diff === -1) return 'ontem';
  return `${WEEKDAYS[parse(iso).getDay()]}, ${formatDayMonth(iso)}`;
};

export const formatTimestamp = (timestamp: string) => {
  const minutes = Math.round((Date.now() - new Date(timestamp).getTime()) / 60000);
  if (minutes < 60) return `há ${Math.max(minutes, 1)} min`;
  if (minutes < 24 * 60) return `há ${Math.round(minutes / 60)} h`;
  return formatRelativeDay(toIsoDate(new Date(timestamp)));
};

export const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60000).toISOString();

export const isValidIsoDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(parse(value).getTime());
