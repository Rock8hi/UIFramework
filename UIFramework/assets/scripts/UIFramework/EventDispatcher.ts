import { Emitter } from "./Emitter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EventDispatcher extends cc.Component {

    private _IsPaused: boolean = false;
    private _Emitter: Emitter;

    private get dispatcher() {
        if (this._Emitter == null) {
            this._Emitter = new Emitter();
        }
        return this._Emitter;
    }
    
    public DispatchEvent (name: string, params?: any) {
        this.dispatcher.fire(name, params);
    }

    protected AddEventListener (name: string, callback: Function, target?: any) {
        this.dispatcher.on(name, callback, target);
    }

    protected RemoveEventListener (name: string, callback: Function, target?: any) {
        this.dispatcher.off(name, callback, target);
    }

    public IsPaused(): boolean {
        return this._IsPaused;
    }

    protected OnPause() {
        this._IsPaused = true;
    }

    protected OnResume() {
        this._IsPaused = false;
    }
    
}