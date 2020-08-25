const {ccclass, property} = cc._decorator;

@ccclass
export default class UIToggledObjects extends cc.Component {

    @property({type: [cc.Node], tooltip: '选中时，被激活的节点'})
    activate: Array<cc.Node> = [];

    @property({type: [cc.Node], tooltip: '选中时，被反激活的节点'})
    deactivate: Array<cc.Node> = [];

    onLoad () {
        let toggle = this.getComponent(cc.Toggle);
        if (toggle != null) {
            if (toggle.isChecked) {
                this.onToggle(toggle);
            }
        }
        else {
            cc.warn('建议将本组件挂载到cc.Toggle同节点下');
        }
    }

    onToggle (toggle: cc.Toggle) {
        if (this.enabled) {
            for (let i = 0; i < this.activate.length; i++) {
                if (this.activate[i] != null) {
                    this.activate[i].active = toggle.isChecked;
                }
            }
            for (let i = 0; i < this.deactivate.length; i++) {
                if (this.deactivate[i] != null) {
                    this.deactivate[i].active = !toggle.isChecked;
                }
            }
        }
    }

}
