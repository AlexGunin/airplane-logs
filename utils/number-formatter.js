const formatterCache = new Map();
export const formatNumber = (value, precision) => {
    if (!formatterCache.has(precision)) {
        formatterCache.set(precision, new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: precision,
        }));
    }
    return formatterCache.get(precision).format(value);
};
