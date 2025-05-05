export class CsvDataContainer {
    headers;
    values;
    constructor(headers, values) {
        this.headers = headers;
        this.values = values;
    }
    get(index) {
        return this.prepareItem(this.values[index]);
    }
    *[Symbol.iterator]() {
        for (const value of this.values) {
            yield this.prepareItem(value);
        }
    }
    prepareItem(value) {
        return Object.fromEntries(this.headers.map((header, index) => [header, value[index]]));
    }
}
