import UIFramework from "./UIFramework";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMessageBox extends UIFramework {

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Button)
    okay: cc.Button = null;

    @property(cc.Button)
    cancel: cc.Button = null;

    private _OkayCallback: Function = null;
    private _CancelCallback: Function = null;

    OnOpen(params?: any) {
        super.OnOpen(params);

        // 仅传入展示内容的情况
        if (typeof params === 'string') {
            this.content.string = params;
            this.okay.node.active = false;
            this.cancel.node.x = 0;
            let okayName = cc.find('Background/Label', this.okay.node);
            let cancelName = cc.find('Background/Label', this.cancel.node);
            if (okayName && cancelName) {
                cancelName.getComponent(cc.Label).string = okayName.getComponent(cc.Label).string;
            }
            return;
        }
        // 传入非字符串，非对象的情况
        if (typeof params !== 'object') {
            this.okay.node.active = false;
            this.cancel.node.x = 0;
            this.content.string = '请添加展示内容';
            return;
        }
        // 传入对象的情况
        this.content.string = params['content'] || '请添加展示内容';
        if (params['okay']) {
            if (typeof params['okay'] === 'function') {
                this._OkayCallback = params['okay'];
            }
            else if (typeof params['okay'] === 'object') {
                this._OkayCallback = params['okay']['callback'];
                let name = cc.find('Background/Label', this.okay.node);
                if (name) {
                    name.getComponent(cc.Label).string = params['okay']['name'] || '确定';
                }
            }
        }
        if (params['cancel']) {
            if (typeof params['cancel'] === 'function') {
                this._CancelCallback = params['cancel'];
            }
            else if (typeof params['cancel'] === 'object') {
                this._CancelCallback = params['cancel']['callback'];
                let name = cc.find('Background/Label', this.cancel.node);
                if (name) {
                    name.getComponent(cc.Label).string = params['cancel']['name'] || '取消';
                }
            }
        }
    }

    onOkay(event: cc.Component.EventHandler) {
        if (this._OkayCallback) {
            if (!this._OkayCallback()) {
                this.OnBack();
            }
        }
    }

    onCancel(event: cc.Component.EventHandler) {
        if (this._CancelCallback) {
            if (!this._CancelCallback()) {
                this.OnBack();
            }
        }
        else {
            this.OnBack();
        }
    }
}
