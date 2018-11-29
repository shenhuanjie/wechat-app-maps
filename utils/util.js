// 引入本地json数据，
var location = require("../data/location.js");
/**
 * 
 * @param {*} callback 
 */
function getLocationAndOpenMap(callback) {
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function(res) {
      var latitude = res.longitude;
      var longitude = res.longitude;
      console.log(res);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    }
  })
}

/**
 * 
 * @param {*} callback 
 */
function getLocationPois(callback) {
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function(res) {
      var latitude = res.longitude;
      var longitude = res.longitude;
      getPoisByLocation(latitude, longitude, callback);
    }
  })
}
/**
 * 
 * @param {*} defaultUrl 
 * @param {*} callback 
 */
function getDefaultPoiData(callback) {
  callback(location.data.result);
}
/**
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 * @param {*} callback 
 */
function getPoisByLocation(latitude, longitude, callback) {
  var key = "LGFBZ-IRO6I-FQDGC-5YPUC-XPDK5-BVBDR";
  var url = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + latitude + "," + longitude + "&key=" + key +
    "&get_poi=1";
  console.log(url);
  wx.request({
    url: url,
    success: function(res) {
      callback(res.data.result);
    },
    fail: function(res) {
      getDefaultPoiData(callback);
    }
  })
}
module.exports = {
  getLocationAndOpenMap: getLocationAndOpenMap,
  getLocationPois: getLocationPois
}