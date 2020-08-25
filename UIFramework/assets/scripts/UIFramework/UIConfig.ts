import UIManager from "./UIManager";
import UIMessageBox from "./UIMessageBox";
import UIAbout from "../UIAbout";

export default class UIConfig {

    private static readonly MAIN_UI = 'Canvas/MainUI';
    private static readonly COMM_UI = 'Canvas/CommonUI';

    // 新添加的UI界面在这里注册定义
    public static Init (uimgr: UIManager) {
        uimgr.RegPrefab(UIMessageBox, 'prefabs/UIMessageBox', UIConfig.COMM_UI);
        uimgr.RegPrefab(UIAbout, 'prefabs/UIAbout', UIConfig.MAIN_UI);
    }
}
