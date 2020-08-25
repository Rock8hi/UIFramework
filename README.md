# UIFramework
在cocos creator基础上做的UI窗口管理框架

#### 1. 简介
主要意义在于统一管理UI的各种弹框，包括单按钮和双按钮弹框，全屏界面，toast弹框等等各种UI窗口。

#### 2. 打开和关闭窗口
打开窗口 UIManager.ins.OpenPage(UIMessageBox); 第二个参数可以设定打开时传递的设置和传递参数等；
关闭窗口 UIManager.ins.ClosePage(UIMessageBox); 打开和关闭都支持动画方式，也可以自定义动画。

#### 3. 传递参数
支持给窗口传递参数
UIManager.ins.DispatchEvent(UIDemoPage, 'HELLO');

#### 4. 阴影遮罩
支持弹框时，带透明黑色背景的遮罩效果。直接creator编辑器中拖拽设置即可。

#### 5. 手机back按钮
支持点击手机back按钮，逐个弹框依次关闭的效果。打开多个窗口时，从最上级向下依次关闭。

#### 目前的问题
目前在同一个窗口多次打开时，无法指定关闭某个窗口。重复的多个窗口会全部关闭。后续在慢慢优化中。

#### 联系方式
QQ：2399695400
