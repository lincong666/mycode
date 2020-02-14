/**
 * 1:歌曲搜索接口
 * 请求地址：https://autumnfish.cn/search
 * 请求方法：get
 * 请求参数：keywords(查询关键字)
 * 响应内容：歌曲搜索结果
 



  2：歌曲url获取接口
  *请求地址：https://autumnfish.cn/song/url
  请求方法：get
  请求参数：id
  响应内容：歌曲的url地址
 */
var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:""
    },
    methods: {
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response);
                that.musicList = response.data.result.songs;
            },function(err){});
        },
        playMusic:function(musicId){
            console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                // console.log(response);
                console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            },function(){})
        }
    },

})