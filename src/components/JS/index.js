import  Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function () {
    var defaults = {
        //默认值
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null
    };
    var MyComponent = Vue.extend(MessageBox);

    return function (opts) {
        //配置参数
        for( var attr in opts){
            defaults[attr] = opts[attr];
        }
        var vm = new MyComponent({
            el: document.createElement('div'),
            data(){
                return{
                    title: defaults.title,
                    content: defaults.content,
                    cancel: defaults.cancel,
                    ok: defaults.ok
                }
            },
            methods: {
                handleCancel(){
                    //改变this指向问题,但是call会触发，bind不会，需要触发一次
                    // defaults.handleCancel && defaults.handleCancel.bind(this)();
                    defaults.bandleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    // defaults.handleOk && defaults.handleOk.bind(this)();
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);

                }
            }
        });
        document.body.appendChild(vm.$el)
    }

})();
