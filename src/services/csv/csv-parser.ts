import { CsvDataContainer } from './csv-data-container';
// @ts-ignore
import CsvWorker from './csv.worker.ts?worker';
import { CsvHeaders } from './types';
type ParseStatus = 'idle' | 'parsing';

interface CsvData {
  headers: CsvHeaders;
  values: Record<string, unknown>[];
}

export class CsvParser {
  // worker = new Worker(new URL(require('./csv.worker.ts'), import.meta.url), { type: 'module' });
  worker = new CsvWorker();

  reader = new FileReader();

  private __promiseResolvers: PromiseWithResolvers<CsvData> | null = null;

  private status: ParseStatus = 'idle';

  constructor() {
    this.worker.onmessage = this.onWorkerMessage;
    this.reader.onload = this.onFileReaderLoad;
  }

  parse = (file: File): Promise<CsvData> => {
    if (this.status === 'parsing') {
      this.worker.postMessage({ type: 'abort' });
    }

    this.status = 'parsing';

    this.reader.readAsArrayBuffer(file);

    const promiseResolvers = Promise.withResolvers<CsvData>();

    this.__promiseResolvers = promiseResolvers;

    return promiseResolvers.promise;
  };

  private onWorkerMessage: Worker['onmessage'] = (event) => {
    const data = event.data as CsvData;
    // const dataContainer = new CsvDataContainer(data.headers, data.values);

    this.status = 'idle';

    this.__promiseResolvers?.resolve(data);
  };

  private onFileReaderLoad: FileReader['onload'] = (e) => {
    if (!e.target) {
      return;
    }

    const arrayBuffer = e.target.result;
    // @ts-ignore
    this.worker.postMessage({ type: 'data', buffer: arrayBuffer }, [arrayBuffer]);
  };
}
