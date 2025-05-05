const parseCSV = (text) => {
    const [headerLine, ...lines] = text.trim().split('\n');
    const headersArr = headerLine.split(';').map((h) => h.trim());
    const headers = headersArr.reduce((acc, cur, index) => {
        acc[cur] = {
            index,
            name: cur,
        };
        return acc;
    }, {});
    // const preparedLines = lines.map((line) => {
    //   return line.split(';').map((v) => v.replace(',', '.').trim());
    // });
    //
    const preparedLines = lines.map((line) => {
        const values = line.split(';').map((v) => v.replace(',', '.').trim());
        return Object.fromEntries(headersArr.map((h, i) => [h, values[i]]));
    });
    return {
        headers,
        values: preparedLines,
    };
};
let isAborted = false;
const handleData = (data) => {
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(data.buffer);
    const parsed = parseCSV(csvData);
    if (isAborted) {
        isAborted = false;
        return;
    }
    self.postMessage(parsed);
};
const handleAbort = () => {
    isAborted = true;
};
const handlers = {
    data: handleData,
    abort: handleAbort,
};
self.onmessage = (event) => {
    const data = event.data;
    const handler = handlers[data.type];
    if (!handler || typeof handler !== 'function') {
        return;
    }
    // @ts-ignore
    handler(data);
};
export {};
