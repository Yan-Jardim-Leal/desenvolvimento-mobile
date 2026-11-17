import { Sensors } from '../types/models';

export type Period = '7d' | '30d' | 'season';

export interface Series {
  labels: string[];
  values: number[];
}

const PERIOD_LABELS: Record<Period, string[]> = {
  '7d': ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Hoje'],
  '30d': ['S1', 'S2', 'S3', 'S4', 'S5'],
  season: ['Sem. 1', 'Sem. 3', 'Sem. 5', 'Sem. 7', 'Sem. 9', 'Sem. 11'],
};

const wave = (base: number, variation: number, index: number, seed: number) =>
  Math.round((base + Math.sin(index * 1.3 + seed) * variation) * 10) / 10;

const buildSeries = (period: Period, current: number, variation: number, seed: number): Series => {
  const labels = PERIOD_LABELS[period];
  const values = labels.map((_, index) => (index === labels.length - 1 ? current : wave(current, variation, index, seed)));
  return { labels, values };
};

export const sensorHistory = (sensors: Sensors, period: Period) => ({
  humidity: buildSeries(period, sensors.humidity, 6, 1),
  temperature: buildSeries(period, sensors.temperature, 2.5, 2),
  ph: buildSeries(period, sensors.ph, 0.3, 3),
});

export const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
