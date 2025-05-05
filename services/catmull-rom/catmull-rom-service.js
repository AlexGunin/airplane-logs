// @ts-ignore
import CatmullRomWorker from './catmull-rom.worker.ts?worker';
export class CatmullRomService {
    worker = new CatmullRomWorker();
    __promiseResolvers = null;
    constructor() {
        this.worker.onmessage = this.onWorkerMessage;
    }
    smoothPoints = (points, multiplier = 10) => {
        this.worker.postMessage({ points, multiplier });
        const promiseResolvers = Promise.withResolvers();
        this.__promiseResolvers = promiseResolvers;
        return promiseResolvers.promise;
    };
    onWorkerMessage = (event) => {
        const data = event.data;
        this.__promiseResolvers?.resolve(data);
    };
}
