const {ccclass, property} = cc._decorator;

@ccclass
export default class UIDrag extends cc.Component {

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove (event: cc.Event.EventTouch) {
        let target = event.getCurrentTarget();
        let delta = event.getDelta();
        target.x += delta.x;
        target.y += delta.y;
    }
}
