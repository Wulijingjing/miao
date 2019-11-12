<template>
<!--    wrapper 是 scroller 的最外层的哪个框-->
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroller",
        props: {
            handlerToScroll: {
                type: Function,
                default: function () {

                }
            },
            handlerToTouchEnd: {
                type: Function,
                default: function () {

                }
            }
        },
        mounted(){

                 var scroll =  new BScroll(this.$refs.wrapper, {
                     tap:true,
                     probeType:1
                 });
                 scroll.on('scroll',(pos)=>{
                     this.handlerToScroll(pos);
                 });
                 scroll.on('touchEnd',(pos)=>{
                    this.handlerToTouchEnd(pos);
                 });
                this.scroll = scroll ;//把局部的功能添加成属性
                //         tap: true,//使得tap事件生效
                //         probeType: 1//是的滑动下拉加载事件为真，具体的better-scroll的配置可以查阅网上资料
                //     });
        },
        methods:{
            toScrollTop(y){
                this.scroll.scrollTo(0,y);//scrollTo 方法是scroll组件内置的
            }
        }
    }
</script>

<style scoped>
    .wrapper{height: 100%;}
</style>
