import UIFramework from "./UIFramework";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIDemoPage extends UIFramework {

    @property(cc.Label)
    label: cc.Label = null;

    OnOpen(params?: any) {
        super.OnOpen(params);

        this.AddEventListener('HELLO', this.onEventTest, this);

        this.label.string = params;
    }

    OnClose() {
        this.RemoveEventListener('HELLO', this.onEventTest, this);
        super.OnClose();
    }

    private onEventTest() {
        cc.log('cccssssssssssss', this.onEventTest.bind(this) == this.onEventTest.bind(this))
    }
}
