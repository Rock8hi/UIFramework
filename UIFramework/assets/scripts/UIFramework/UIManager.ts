import UIConfig from "./UIConfig";
import UIBasePool from "./UIBasePool";
import UIBase from "./UIBase";

export default class UIManager {
    private static _instance: UIManager = null;
    public static get ins() {
        if (UIManager._instance == null) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    private constructor() {
        UIConfig.Init(this);
    }

    // 保存所有prefab实例，主要用于派发事件
    private _PrefabDict: {[key: string]: {[key: string]: string;};} = {};

    public RegPrefab(uikey: string | any, path: string, parent: string) {
        if (typeof uikey === 'function') {
            uikey = cc.js.getClassName(uikey);
        }
        if (this._PrefabDict[uikey]) {
            return;
        }
        this._PrefabDict[uikey] = {'path': path, 'parent': parent};
    }

    public DispatchEvent(uikey: string | any, name: string, params?: any) {
        if (typeof uikey === 'function') {
            uikey = cc.js.getClassName(uikey);
        }
        if (uikey === UIBase.UIOPEN || uikey === UIBase.UICLOSE) {
            return;
        }
        UIBasePool.ins.DispatchEvent(uikey, name, params);
    }

    public PageCount(uikey: string | any): number {
        if (typeof uikey === 'function') {
            uikey = cc.js.getClassName(uikey);
        }
        return UIBasePool.ins.Count(uikey);
    }

    public OpenPage(uikey: string | any, params?: any) {
        if (typeof uikey === 'function') {
            uikey = cc.js.getClassName(uikey);
        }
        if (this._PrefabDict[uikey] == null) {
            cc.error('请使用RegPrefab接口注册Prefab');
            return;
        }
        let parent = cc.find(this._PrefabDict[uikey]['parent']);
        if (parent == null) {
            cc.error('将要添加Prefab实例的parent不存在');
            return;
        }
        cc.loader.loadRes(this._PrefabDict[uikey]['path'], cc.Prefab, (err: Error, res: any) => {
            if (err) {
                cc.error(err.message);
                return;
            }
            let node = cc.instantiate(res);
            node.parent = parent;
            let base = node.getComponent('UIBase');
            if (base) {
                base.DispatchEvent(UIBase.UIOPEN, params);
            }
        });
    }

    public ClosePage(uikey: string | any) {
        if (typeof uikey === 'function') {
            uikey = cc.js.getClassName(uikey);
        }
        UIBasePool.ins.DispatchEvent(uikey, UIBase.UICLOSE);
    }

}