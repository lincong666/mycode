window.onload = function () {
  // 头部搜索块的js效果
  this.searchff();
  this.timeBack();
  this.bannerEffect();
};
// 头部js效果
function searchff() {
  // 获取当前banner的高度
  var banner = document.querySelector(".jd_banner");
  var bannerHeight = banner.offsetHeight;
  var search = document.querySelector(".jd_search");
  // 获取当前屏幕滚动时，banner滚动出屏幕的距离
  window.onscroll = function () {
    var offsetTop = document.body.scrollTop;
    // 计算比例值，获取透明度，设置背景颜色的样式
    var opacity = 0;
    // 判断，如果当banner还没有完全 滚出屏幕，那么才有必要计算透明度和设置透明度
    if (offsetTop < bannerHeight) {
      opacity = offsetTop / bannerHeight;
      search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
    }
  };
}
// 倒计时模块的实现
function timeBack() {
  // 获取用于展示时间的span
  var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
  // 设置初始的倒计时时间
  var totalTime = 5;
  // 开启定时器
  var timerId = setInterval(function () {
    totalTime--;
    if (totalTime < 0) {
      //清除时钟
      clearInterval(timerId);
      return;
    }
    // 得到剩余时间中的 时 分 秒
    var hour = Math.floor(totalTime / 3600);
    var minute = Math.floor((totalTime % 3600) / 60);
    var second = totalTime % 60;
    console.log(hour + " " + minute + " " + second);
    // 开始给span赋值；
    spans[0].innerHTML = Math.floor(hour / 10);
    spans[1].innerHTML = Math.floor(hour % 10);

    spans[3].innerHTML = Math.floor(minute / 10);
    spans[4].innerHTML = Math.floor(minute % 10);

    spans[6].innerHTML = Math.floor(second / 10);
    spans[7].innerHTML = Math.floor(second % 10);
  }, 1000);
}
// 轮播效果实现
function bannerEffect() {
  // 1 设置修改轮播图的页面结构
  // 2 在开始位置添加原始的最后一张图片
  // 3 在结束位置添加原始的第一章图片

  //1.1 获取轮播图结构
  var banner = document.querySelector(".jd_banner");
  // 1.2 获取图片的容器
  var imgBox = banner.querySelector("ul:first-of-type");
  // 1.3 获取原始的第一张图片
  var first = imgBox.querySelector("li:first-of-type");
  // 1.4 获取原始的最后一张图片
  var last = imgBox.querySelector("li:last-of-type");
  // 1.5 在首尾插入两张图片 cloneNode:复制一个dom元素
  imgBox.appendChild(first.cloneNode(true));
  // insertBefore(需要插入的dom元素，位置)
  imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

  // 设置对应的样式
  // 获取所有的li元素
  var lis = imgBox.querySelectorAll("li");
  // 获取li元素的数量
  var count = lis.length;
  // 获取banner宽度
  var bannerWidth = banner.offsetWidth;
  // 2.4 设置图片盒子的宽度
  imgBox.style.width = count * bannerWidth + "px";
  // 设置每一个li元素的宽度
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.width = bannerWidth + "px";
  }
  // 定义图片索引，图片已经有一个宽度的默认偏移
  var index = 1;

  // 设置默认偏移
  imgBox.style.left = -bannerWidth + "px";
  // 4 当屏幕变化的时候，重新计算宽度
  window.onresize = function () {
    // 获取banner宽度
    var bannerWidth = banner.offsetWidth;
    // 2.4 设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    // 设置每一个li元素的宽度
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.width = bannerWidth + "px";
    }
    imgBox.style.left = -bannerWidth + "px";
  };
  // 实现自动轮播
  setInterval(function () {
    // 变换索引
    index++;
    // 添加过渡效果
    imgBox.style.transition = "left 0.5s ease-in-out";
    // 设置偏移
    imgBox.style.left = -index * bannerWidth + "px";
    //判断是否到最后一张，如果是则
    setTimeout(function () {
      if (index == count - 1) {
        index = 1;
        imgBox.style.transition = "none";
        // 偏移到指定位置
        imgBox.style.left = -index * bannerWidth + "px";
      }
    }, 500);
  }, 2000);
}
