// https://blog.csdn.net/a19352226/article/details/52833879

class Observer {
    private _callback: Function = null;
    private _target: any = null;

    constructor (callback: Function, target?: any) {
        this._callback = callback;
        this._target = target;
    }

    notify (...args: any[]): void {
        this._callback.call(this._target, ...args);
    }

    compare (callback: Function, target?: any): boolean {
        if (target != null) {
            return callback === this._callback && target === this._target;
        }
        else {
            return callback === this._callback;
        }
    }
}

export class Emitter {

    private _listeners: {[key: string]: Array<Observer>;} = {};

    public on (name: string, callback: Function, target?: any) {
        let observers: Array<Observer> = this._listeners[name];
        if (!observers) {
            this._listeners[name] = new Array<Observer>();
        }
        this._listeners[name].push(new Observer(callback, target));
    }

    public off (name: string, callback: Function, target?: any) {
        let observers: Array<Observer> = this._listeners[name];
        if (!observers) return;
        for (let i = observers.length - 1; i >= 0; i--) {
            let observer = observers[i];
            if (observer.compare(callback, target)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length === 0) {
            delete this._listeners[name];
        }
    }

    public fire (name: string, ...args: any[]) {
        let observers: Array<Observer> = this._listeners[name];
        if (!observers) return;
        for (let i = observers.length - 1; i >= 0; i--) {
            observers[i].notify(...args);
        }
    }

}
