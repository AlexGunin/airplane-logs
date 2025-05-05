export class CsvDataContainer {
  constructor(
    private headers: string[],
    private values: any[][]
  ) {}

  get(index: number) {
    return this.prepareItem(this.values[index]);
  }

  *[Symbol.iterator]() {
    for (const value of this.values) {
      yield this.prepareItem(value);
    }
  }

  private prepareItem(value: any[]) {
    return Object.fromEntries(this.headers.map((header, index) => [header, value[index]]));
  }
}
