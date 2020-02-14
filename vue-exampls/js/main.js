/**
 * 请求地址：http://wthrcdn.etouch.cn/weather_mini
 * 请求方法：get
 * 请求参数:city
 * 响应内容：天气信息
 */

var app = new Vue({
  el: "#app",
  data: {
    city: "",
    weatherList: []
  },
  methods: {
    searchWeather: function() {
      //  console.log('天气查询');
      //  console.log(this.city);
      // 调用接口
      // 保存this（回调函数this的指向会改变）
      var that = this; //先保存this的指向
      axios
        .get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
        .then(function(response) {
          // console.log(response);
          console.log(response.data.data.forecast);
          that.weatherList = response.data.data.forecast;
        })
        .catch(function(err) {});
    },
    changeCity:function(city){
        this.city = city;
        this.searchWeather();
    }
  }
});
