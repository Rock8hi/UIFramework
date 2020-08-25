export default class UIUtils {
    // 将多个元素添加到cc.Layout节点下后，调用以下方法后，content将被撑满
    public static adjust_layout (scrollview: cc.ScrollView) {
        let layout = scrollview.content.getComponent(cc.Layout);
        if (layout == null) {
            cc.warn('please add cc.Layout to cc.ScrollView.content');
            return;
        }
        // 竖向布局
        if (layout.type == cc.Layout.Type.VERTICAL) {
            let children = scrollview.content.children;
            let length = 0;
            for (let i = 0; i < children.length; i++) {
                length += children[i].height;
            }
            length += layout.spacingY * (children.length - 1);
            length += layout.paddingTop + layout.paddingBottom;
            scrollview.content.height = Math.max(scrollview.content.parent.height, length);
            return;
        }
        // 横向布局
        if (layout.type == cc.Layout.Type.HORIZONTAL) {
            let children = scrollview.content.children;
            let length = 0;
            for (let i = 0; i < children.length; i++) {
                length += children[i].width;
            }
            length += layout.spacingX * (children.length - 1);
            length += layout.paddingLeft + layout.paddingRight;
            scrollview.content.width = Math.max(scrollview.content.parent.width, length);
            return;
        }
        cc.warn('GRID not support');
    }

    public static need_layout_size (node: cc.Node) {
        let layout = node.getComponent(cc.Layout);
        if (layout == null) {
            cc.warn('please add cc.Layout to cc.Node');
            return 0;
        }
        
        switch (layout.type) {
            // 竖向布局
            case cc.Layout.Type.VERTICAL: {
                let children = node.children;
                let length = 0;
                for (let i = 0; i < children.length; i++) {
                    length += children[i].height;
                }
                length += layout.spacingY * (children.length - 1);
                length += layout.paddingTop + layout.paddingBottom;
                return length;
            }
            // 横向布局
            case cc.Layout.Type.HORIZONTAL: {
                let children = node.children;
                let length = 0;
                for (let i = 0; i < children.length; i++) {
                    length += children[i].width;
                }
                length += layout.spacingX * (children.length - 1);
                length += layout.paddingLeft + layout.paddingRight;
                return length;
            }
            // 网格布局
            case cc.Layout.Type.GRID: {
                layout.updateLayout();
                // 横向优先布局
                if (layout.startAxis == cc.Layout.AxisDirection.HORIZONTAL) {
                    let children = node.children;
                    if (children.length == 0) {
                        return layout.paddingTop + layout.paddingBottom;
                    }
                    if (children.length == 1) {
                        return children[0].height + layout.paddingTop + layout.paddingBottom;
                    }
                    let length = 0;
                    // 当每个元素的尺寸相同时，可简化计算。
                    // 所有元素排布完成后，总高度等于，第一行元素y坐标到最后一行y坐标的距离，
                    // 加上一个元素的高度(即，第一行元素上半边高度和最后一行元素下半边高度)
                    length += children[0].height + Math.abs(children[children.length-1].y - children[0].y);
                    length += layout.paddingTop + layout.paddingBottom;
                    return length;
                }
                // 竖向优先布局
                else {
                    let children = node.children;
                    if (children.length == 0) {
                        return layout.paddingLeft + layout.paddingRight;
                    }
                    if (children.length == 1) {
                        return children[0].width + layout.paddingLeft + layout.paddingRight;
                    }
                    let length = 0;
                    length += children[0].width + Math.abs(children[children.length-1].x - children[0].x);
                    length += layout.paddingLeft + layout.paddingRight;
                    return length;
                }
            }
        }

        return 0;
    }
}