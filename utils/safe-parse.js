export const safeParseArray = (array, schema) => {
    return array.reduce((acc, cur) => {
        const parsed = schema.safeParse(cur);
        if (parsed.success) {
            acc.push(parsed.data);
        }
        return acc;
    }, []);
};
