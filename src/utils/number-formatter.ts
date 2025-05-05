const formatterCache = new Map<number, Intl.NumberFormat>();

export const formatNumber = (value: number, precision: number) => {
  if (!formatterCache.has(precision)) {
    formatterCache.set(
      precision,
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: precision,
      })
    );
  }

  return formatterCache.get(precision)!.format(value);
};
