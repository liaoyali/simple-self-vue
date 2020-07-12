function SelfVue(options) {
    this.data = options.data;
    this.vm = this;

    Object.keys(this.data).forEach(function(key) {
        this.proxyKeys(key); // 绑定代理属性
    }.bind(this));

    observe(data);
    new Compile(options.el, this.vm);
    // el.innerHTML = this.data[exp]; // 初始化模板数据
    // new Watcher(this, exp, function(value) {
    //     el.innerHTML = value;
    //     console.log(value);
    // }); //移到compile中
    return this;
}

SelfVue.prototype = {
    proxyKeys: function(key) {
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