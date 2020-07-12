function SelfVue(options) {
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key) {
        this.proxyKeys(key); // 绑定代理属性
    }.bind(this));

    observe(this.data);
    new Compile(options.el, this.vm);

    // el.innerHTML = this.data[exp]; // 初始化模板数据
    // new Watcher(this, exp, function(value) {
    //     el.innerHTML = value;
    //     console.log(value);
    // });
    return this;
}

SelfVue.prototype = {
    proxyKeys: function(key) {
        // let that = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return this.data[key];
            },
            set: function proxySetter(newVal) {
                this.data[key] = newVal;
            }
        })
    }
}