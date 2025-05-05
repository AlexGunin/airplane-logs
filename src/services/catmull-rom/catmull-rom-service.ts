// @ts-ignore
import CatmullRomWorker from './catmull-rom.worker.ts?worker';
import { FlyScheme } from '../../fly-scheme';

export class CatmullRomService {
  worker = new CatmullRomWorker();

  private __promiseResolvers: PromiseWithResolvers<FlyScheme> | null = null;

  constructor() {
    this.worker.onmessage = this.onWorkerMessage;
  }

  smoothPoints = (points: FlyScheme, multiplier = 10): Promise<FlyScheme> => {
    this.worker.postMessage({ points, multiplier });

    const promiseResolvers = Promise.withResolvers<FlyScheme>();

    this.__promiseResolvers = promiseResolvers;

    return promiseResolvers.promise;
  };

  private onWorkerMessage: Worker['onmessage'] = (event) => {
    const data = event.data as FlyScheme;

    this.__promiseResolvers?.resolve(data);
  };
}
