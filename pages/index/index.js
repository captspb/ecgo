//index.js
//获取应用实例
var utils = require('../../utils/util.js')
const app = getApp()
const travalProDatas = [
  {
    startTime: {
      year: 2018,
      month: 10,
      day: 20,
      hour: 11,
      minute: 11,
      second: 11
    },
    countTime:{
      countDay:'',
      countHour: '',
      countMinute: '',
      countSecond: ''
    }


  }, 
  {
    startTime: {
      year: 2018,
      month: 10,
      day: 21,
      hour: 12,
      minute: 11,
      second: 11
    },
    countTime: {
      countDay: '',
      countHour: '',
      countMinute: '',
      countSecond: ''
    }
  }
]
const secKillDatas= [
  { isRemind: 0 },
  { isRemind: 1 },
  { isRemind: 0 }
]

Page({
  data: {
   
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    starsData:[1,1,1,1]
  },
  //事件处理函数
  setTip: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    secKillDatas[index].isRemind = !secKillDatas[index].isRemind
    if (secKillDatas[index].isRemind==1){
      wx.showToast({
        title: '已设提示',
        icon: 'success',
        duration: 2000
      })
    }else {
      wx.showToast({
        title: '提示取消',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      secKillDatas: secKillDatas
    })
   
  },
  onLoad: function(){
    this.setData({
      secKillDatas: secKillDatas
    })

    var interval = setInterval(function () {
      let countDownArr = [];
      let obj = null;
      travalProDatas.forEach(function (item) {
        var item_year = item.startTime.year
        var item_month = item.startTime.month
        var item_day = item.startTime.day
        var item_hour = item.startTime.hour
        var item_minute = item.startTime.minute
        var item_seconds = item.startTime.second
        var totalSecond = (new Date(item_year, item_month, item_day, item_hour, item_minute, item_seconds).getTime() - new Date().getTime()) / 1000;

        //秒数
        var second = totalSecond;

        // 天数位
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;

        // 小时位
        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位
        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位
        var sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        obj = {
          day: dayStr,
          hou: hrStr,
          min: minStr,
          sec: secStr
        }
        countDownArr.push(obj)

        console.log(obj)
        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(interval);
          wx.showToast({
            title: '活动已结束',
          });
        }

      })

      console.log(countDownArr)
      this.setData({
        countDownArr: countDownArr
      })
    }.bind(this), 1000)

  },
  onReady:function(){
   
   

  }

})
    
  


