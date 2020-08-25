import EventDispatcher from "./EventDispatcher";

const {ccclass, property} = cc._decorator;

enum PageType {
    NORMAL = 1,
    POPUP = 2,
};

@ccclass
export default abstract class UIBase extends EventDispatcher {

    @property({tooltip: 'UI控件是否拦截触摸、点击、键盘等所有输入事件穿透'})
    blockInputEvent: boolean = true;

    @property({tooltip: 'UI控件是否具有响应<Back>按键能力'})
    backable: boolean = true;

    @property({type: cc.Enum(PageType), tooltip: '界面类型，NORMAL: 不需要打开和关闭的常驻界面；POPUP: 可以打开和关闭的弹框界面'})
    pageType: PageType = PageType.POPUP;

    public static readonly UIOPEN = 'UIOPEN';
    public static readonly UICLOSE = 'UICLOSE';

    // 保存所有继承于UIBase的运行中的实例
    private static _BaseList: Array<UIBase> = new Array<UIBase>();
    private get baselist() {
        return UIBase._BaseList;
    }

    private get toppage() {
        if (this.baselist.length !== 0) {
            return this.baselist[this.baselist.length - 1];
        }
    }

    private pushSelf() {
        let top = this.toppage;
        if (top) {
            top.OnPause();
        }
        this.baselist.push(this);
    }

    private popSelf() {
        for (let i = this.baselist.length - 1; i >= 0; i--) {
            if (this.baselist[i] === this) {
                this.baselist.splice(i, 1);
                break;
            }
        }
        let top = this.toppage;
        if (top) {
            top.OnResume();
        }
    }

    public OnPause() {
        super.OnPause();
        if (this.blockInputEvent) {
            this.node.pauseSystemEvents(true);
        }
    }

    public OnResume() {
        if (this.blockInputEvent) {
            this.node.resumeSystemEvents(true);
        }
        super.OnResume();
    }

    onLoad () {
        if (this.pageType == PageType.POPUP) {
            super.AddEventListener(UIBase.UIOPEN, this.OnOpen, this);
            super.AddEventListener(UIBase.UICLOSE, this.OnClose, this);
        }
        else {
            this.OnOpen();
        }
        this.pushSelf();
        if (this.backable) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    }

    onDestroy () {
        if (this.backable) {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        this.popSelf();
        if (this.pageType == PageType.POPUP) {
            super.RemoveEventListener(UIBase.UIOPEN, this.OnOpen, this);
            super.RemoveEventListener(UIBase.UICLOSE, this.OnClose, this);
        }
        else {
            this.OnClose();
        }
    }

    protected abstract OnOpen(params?: any): void;
    protected abstract OnClose(): void;
    protected abstract OnBack(): void;

    private onKeyUp(event: cc.Event.EventKeyboard) {
        if (!this.backable) {
            return;
        }
        switch (event.keyCode) {
            case cc.macro.KEY.escape:
            case cc.macro.KEY.back:
                if (this === this.toppage) {
                    this.OnBack();
                }
                break;
        }
    }
}
