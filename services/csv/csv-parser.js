// @ts-ignore
import CsvWorker from './csv.worker.ts?worker';
export class CsvParser {
    // worker = new Worker(new URL(require('./csv.worker.ts'), import.meta.url), { type: 'module' });
    worker = new CsvWorker();
    reader = new FileReader();
    __promiseResolvers = null;
    status = 'idle';
    constructor() {
        this.worker.onmessage = this.onWorkerMessage;
        this.reader.onload = this.onFileReaderLoad;
    }
    parse = (file) => {
        if (this.status === 'parsing') {
            this.worker.postMessage({ type: 'abort' });
        }
        this.status = 'parsing';
        this.reader.readAsArrayBuffer(file);
        const promiseResolvers = Promise.withResolvers();
        this.__promiseResolvers = promiseResolvers;
        return promiseResolvers.promise;
    };
    onWorkerMessage = (event) => {
        const data = event.data;
        // const dataContainer = new CsvDataContainer(data.headers, data.values);
        this.status = 'idle';
        this.__promiseResolvers?.resolve(data);
    };
    onFileReaderLoad = (e) => {
        if (!e.target) {
            return;
        }
        const arrayBuffer = e.target.result;
        // @ts-ignore
        this.worker.postMessage({ type: 'data', buffer: arrayBuffer }, [arrayBuffer]);
    };
}
