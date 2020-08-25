import UIBase from "./UIBase";
import UIBasePool from "./UIBasePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIFramework extends UIBase {

    @property({tooltip: 'UI控件是否具有响应<Back>按键能力'})
    useAnimation: boolean = false;

    @property({type: cc.Sprite, tooltip: 'Prefab根节点下遮罩节点(可为空)'})
    mask: cc.Sprite = null;

    @property({type: cc.Widget, tooltip: 'Prefab根节点下重要节点，所有其他布局节点放在此panel下'})
    panel: cc.Widget = null;

    OnOpen(params?: any) {
        let widget = this.node.getComponent(cc.Widget);
        if (widget == null || !widget.isAlignTop || !widget.isAlignBottom || !widget.isAlignLeft || !widget.isAlignRight) {
            cc.warn('请给Prefab根节点添加cc.Widget，并充满父节点(即上下左右四边选中对齐，并建议距离为0)');
        }
        if (this.blockInputEvent) {
            let block = this.node.getComponent(cc.BlockInputEvents);
            if (block == null) {
                this.node.addComponent(cc.BlockInputEvents);
            }
        }
        if (this.useAnimation) {
            if (this.mask) {
                let opacity = this.mask.node.opacity;
                this.mask.node.opacity = 0;
                this.mask.node.runAction(cc.fadeTo(0.25, opacity));
            }
            this.node.scale = 0.01;
            this.node.runAction(cc.scaleTo(0.2, 1).easing(cc.easeSineOut()));
        }
        UIBasePool.ins.AddBase(cc.js.getClassName(this), this);
    }

    OnClose() {
        UIBasePool.ins.RemBase(cc.js.getClassName(this), this);
        if (this.useAnimation) {
            if (this.mask) {
                this.mask.node.runAction(cc.fadeOut(0.25));
            }
            this.node.runAction(cc.sequence(cc.scaleTo(0.2, 0.01).easing(cc.easeSineIn()), cc.callFunc(() => {
                this.node.destroy();
            })));
        }
        else {
            this.node.destroy();
        }
    }

    OnBack() {
        this.OnClose();
    }
}
