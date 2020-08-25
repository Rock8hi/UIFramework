const {ccclass, property} = cc._decorator;

@ccclass
export default class UIToast extends cc.Component {

    private static readonly PREFAB_PATH: string = 'prefabs/UIToast';
    private static readonly PARENT_PATH: string = 'Canvas/CommonUI';

    @property(cc.Label)
    content: cc.Label = null;

    onShow(content: string) {
        this.content.string = content;
        this.node.runAction(cc.sequence(cc.delayTime(1),
                                        cc.fadeOut(0.5),
                                        cc.callFunc(this.node.destroy, this.node)));
    }

    public static show(content: string) {
        cc.loader.loadRes(UIToast.PREFAB_PATH, cc.Prefab, function(err: Error, res: any) {
            if (err) {
                cc.error(err.message);
                return;
            }

            let root = cc.find(UIToast.PARENT_PATH);
            let node = cc.instantiate(res);
            node.parent = root;

            let script = node.getComponent('UIToast');
            script.onShow(content);
        });
    }
}
