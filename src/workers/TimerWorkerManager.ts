import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimeWorkerManager | null = null;

export class TimeWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(
      new URL('./timeWorker.js?worker', import.meta.url),
      { type: 'module' }
    );
  }

  static getInstance(): TimeWorkerManager {
    if (!instance) {
      instance = new TimeWorkerManager();
    }
    return instance;
  }

  postMessage(message: TaskStateModel): void {
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) =>  void) {
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }
    this.worker.onmessage = cb;
  }

  terminate(){
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }
    this.worker.terminate();
    instance = null; // Reset instance to allow reinitialization
  }
}
