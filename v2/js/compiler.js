function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            // 将所有dom元素移入片段fragment
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function(el) {
        let childNodes = el.childNodes;
        let that = this;
        [].slice.call(childNodes).forEach(function(node) {
            let reg = /\{\{\s*(.*?)\s*\}\}/;
            let text = node.textContent;
            if (that.isTextNode(node) && reg.test(text)) {
                // 判断是否是符合资助形式{{}}的指令
                that.compileText(node, reg.exec(text)[1]);
            }
            if (node.childNodes && node.childNodes.length) {
                that.compileElement(node); // 继续递归遍历子节点
            }
        })
    },
    compileText: function(node, exp) {
        let initText = this.vm[exp];
        this.updateText(node, initText); // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, function(value) {
            // 生成订阅器并绑定更新函数
            this.updateText(node, value);
        }.bind(this));
    },
    updateText: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    isTextNode: function(node) {
        return node.nodeType == 3; // 文本节点
    }
}