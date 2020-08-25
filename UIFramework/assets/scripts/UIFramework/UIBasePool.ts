import UIBase from "./UIBase";

export default class UIBasePool {
    private static _instance: UIBasePool = null;
    public static get ins() {
        if (UIBasePool._instance == null) {
            UIBasePool._instance = new UIBasePool();
        }
        return UIBasePool._instance;
    }

    private constructor() {}

    private _BaseDict: {[key: string]: Array<UIBase>;} = {};

    public DispatchEvent(uikey: string, name: string, params?: any) {
        if (this._BaseDict[uikey] == null) {
            return;
        }
        let arr = this._BaseDict[uikey];
        for (let i = arr.length - 1; i >= 0; i--) {
            arr[i].DispatchEvent(name, params);
        }
    }

    public Count(uikey: string) {
        return this._BaseDict[uikey] != null ? this._BaseDict[uikey].length : 0;
    }

    public AddBase(uikey: string, uibase: UIBase) {
        if (this._BaseDict[uikey] == null) {
            this._BaseDict[uikey] = new Array<UIBase>();
        }
        this._BaseDict[uikey].push(uibase);
    }

    public RemBase(uikey: string, uibase: UIBase) {
        if (this._BaseDict[uikey] == null) {
            return;
        }
        let arr = this._BaseDict[uikey];
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === uibase) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length === 0) {
            delete this._BaseDict[uikey];
        }
    }
}
