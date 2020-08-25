import UIManager from "./UIManager";
import UIDemoPage from "./UIDemoPage";
import UIMessageBox from "./UIMessageBox";
import UIToast from "./UIToast";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {

    }

    // update (dt) {}

    onClick() {
        UIManager.ins.OpenPage(UIMessageBox, {
            'content': '测试内容',
            'okay': {
                'name': '来下',
                'callback': () => {
                    UIManager.ins.OpenPage(UIToast, 'wtttt000tttt');
                    UIManager.ins.ClosePage(UIDemoPage);
                    return true;
                }
            },
            'cancel': {
                'name': '不来',
                'callback': () => {
                    UIManager.ins.OpenPage(UIToast, '88888888');
                    UIManager.ins.DispatchEvent(UIDemoPage, 'HELLO');
                }
            }
        });
    }

    onClick2() {
        UIManager.ins.OpenPage(UIMessageBox, {
            'content': '测试内容',
            'okay': () => {
                UIManager.ins.OpenPage(UIToast, 'wwwwwwwwwww');
                UIManager.ins.ClosePage(UIDemoPage);
                return true;
            },
            'cancel': () => {
                UIManager.ins.OpenPage(UIToast, '88888888');
            }
        });
    }

    onClick3() {
        UIManager.ins.OpenPage(UIMessageBox, '测试内容');
    }

    onClickToast() {
        UIManager.ins.OpenPage(UIDemoPage, '测试下位法');
    }
}
