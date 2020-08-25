import UIFramework from "./UIFramework/UIFramework";
import UIManager from "./UIFramework/UIManager";
import UIMessageBox from "./UIFramework/UIMessageBox";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIAbout extends UIFramework {

    @property(cc.Label)
    Version_: cc.Label = null;

    OnOpen(params?: any) {
        super.OnOpen(params);
        this.Version_.string = "For " + cc.sys.os + " v1.0.0";
    }

    onClick() {
        UIManager.ins.OpenPage(UIMessageBox, {
            'content': '测试内容',
            'okay': {
                'name': '来下',
                'callback': () => {
                    cc.log('来下');
                    return true; // 不写return，默认为false，关闭弹框。return true时不关闭弹框。
                }
            },
            'cancel': {
                'name': '不来',
                'callback': () => {
                    cc.log('不来');
                }
            }
        });
    }
}
