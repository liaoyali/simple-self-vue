function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    get: function() {
        Dep.target = this; //缓存自己
        let value = this.vm.data[this.exp]; //强制执行监听器里的get函数      只要获取value就可以触发observer里的get
        Dep.target = null; //释放自己
        return value;
    },
    update: function() {
        this.run();
    },
    run: function() {
        let value = this.vm.data[this.exp]; //获取的新值
        let oldVal = this.value; //旧值
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value);
        }
    },
}