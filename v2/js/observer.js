function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        Object.keys(data).forEach(function(key) {
            this.defineReactive(data, key, data[key]);
        }.bind(this));
    },
    defineReactive: function(data, key, val) {
        observe(val); // 递归遍历所有子属性
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if (Dep.target) {
                    dep.addSub(Dep.target); //在这里添加一个订阅者
                }
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
                dep.notify(); //如果数据变化，通知所有订阅者
            }
        });
    }
}


function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    return new Observer(data);
};

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}

Dep.target = null;





// var library = {
//     book1: {
//         name: ''
//     },
//     book2: ''
// };
// observe(library);
// library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
// library.book2 = '没有此书籍'; // 属性book2已经被监听了，现在值为：“没有此书籍”