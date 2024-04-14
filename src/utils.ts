import {AlphabeticSort} from './common/types';

export function sortElements<T>(
  strategy: AlphabeticSort,
  arr: T[],
  key: keyof T,
): T[] {
  return arr.sort((a, b) => {
    if (strategy === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return b[key] > a[key] ? 1 : -1;
    }
  });
}

export const textFormatter = (text: string) => text.replace(/<[^>]*>/g, '');
