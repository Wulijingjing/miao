<template>
<div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller  v-else :handlerToScroll = 'handlerToScroll' :handlerToTouchEnd="handlerToTouchEnd">
        <ul>
    <!--        <li>
                <div class="pic_show"><img src="images/movie_1.jpg" alt="没找到图片"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评<span class="grade">9.2</span></p>
                    <p>主演：陈建斌，任素喜，潘斌龙</p>
                    <p>今天55加放映ss场</p>
                </div>
                <div class="btn_mall">
                    购片
                </div>
            </li>-->
            <li class = 'pullDown'>{{pullDownMsg}}</li>
            <li v-for="item in movieList" :key="item.id">
                <!--<div class="pic_show"><img :src="item.img" alt="没找到图片"></div>
                这里使用item.img并不能渲染出来图片，是因为item中的img是这样的：
                img: "http://p0.meituan.net/w.h/movie/7b437e3a0d08d10e374ddc34f71b88fe3379132.jpg"
                里面的w.h 是用户指定的宽高，可以设置图片的大小。
                这时候用vue的过滤功能，考虑到会经常用，所以写在main.js中
                -->
                <div class="pic_show" @tap="handlerToDetial"><img :src="item.img | setWH('128.180')" alt="没找到图片"></div>
                <div class="info_list">
                    <h2>{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                    <p>观众评<span class="grade">{{ item.sc }}</span></p>
                    <p>主演：{{ item.star }}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div class="btn_mall">
                    购片
                </div>
            </li>
        </ul>
    </Scroller>
</div>
</template>

<script>
    import BScroll from  'better-scroll';
    export default {
        name: "NowPlaying",
        data(){
          return{
              movieList: [],
              pullDownMsg: '',
              isLoading: true,
              prevCityId: -1
          }
        },
        activated() {
            // 需求，mounted 周期只挂载一次，下一次切换到是不会重新发起ajax请求的，所以改成activated
            //但是选定城市后发一次请求是我们需要的，加载以后切换回来，我们不希望再一次发送ajax请求，所以要用到这个技巧

            //this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
            let cityId = this.$store.state.city.id;

            if(cityId === this.prevCityId) {
                return;
            }

            this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{

            var msg = res.data.msg;
                if( msg === 'ok'){
                    this.movieList = res.data.data.movieList;
                    this.isLoading = false;
                    this.prevCityId = cityId;
                    // this.$nextTick(()=>{
                    //     var scroll =  new BScroll(this.$refs.movie_body, {
                    //         tap: true,//使得tap事件生效
                    //         probeType: 1//是的滑动下拉加载事件为真，具体的better-scroll的配置可以查阅网上资料
                    //     });
                    //     scroll.on('scroll', (pos)=>{
                    //         //传入的pos参数可以判断，什么时候触发下拉刷新
                    //         //注意 pos 有两个属性，x 和 y
                    //         if(pos.y> 30){
                    //             console.log('aa')
                    //
                    //             this.pullDownMsg = '正在刷新'
                    //         }
                    //     });
                    //     scroll.on('touchEnd',(pos)=>{
                    //         //模拟刷新成功数据，此处更改了城市的id，并且设置了延时时间
                    //         if(pos.y > 30){
                    //             this.axios.get('/api/movieOnInfoList?cityId=12').then((res)=>{
                    //                 var msg = res.data.msg;
                    //                 if(msg === 'ok'){
                    //                     this.pullDownMsg = '刷新成功';
                    //                     setTimeout(()=>{
                    //                         this.movieList = res.data.data.movieList;
                    //                         this.pullDownMsg = '';
                    //                     },1000);
                    //                 }
                    //             });
                    //         }
                    //     })
                    //
                    // });//nextTick 保证数据渲染完毕后再使用bscroll
                    //bscroll使用的条件  外层元素比内层的小，但是包裹了内层元素
                }
            })
        },
        methods: {
            handlerToDetial(){
                console.log('aa')
            },
            handlerToScroll(pos){
                if(pos.y > 30){
                    this.pullDownMsg = '正在刷新';
                }
            },
            handlerToTouchEnd(pos){
                console.log('aa')
                if(pos.y > 30 ){
                    //模拟刷新成功数据，此处更改了城市的id，并且设置了延时时间

                    this.axios.get('/api/movieOnInfoList?cityId=12').then((res)=>{
                        var msg = res.data.msg;
                        if(msg === 'ok'){
                            this.pullDownMsg = '刷新成功';
                            setTimeout(()=>{
                                this.movieList = res.data.data.movieList;
                                this.pullDownMsg = '';
                            },1000);
                        }
                    });

                }
            }
        }
    }
</script>

<style scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .pullDown{ margin:0; padding:0; border:none;}
</style>
