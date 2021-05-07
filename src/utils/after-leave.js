/*
* 给vue实例绑定after-leave事件。确保after-leave支持任何浏览器
* @params {Vue} vue实例
* @params {Function} after-leave事件的回调
* @params {Number} transition动画的速度, 默认 300ms
* @params {Boolean} 是否只绑定after-leave事件一次，默认 false
* */
export default function (instance, callback, speed = 300, once = false) {
  if (!instance || !callback) throw new Error('instance & callback is required');
  let called = false;
  const afterLeaveCallback = function () {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  };
  if (once) {
    instance.$once('after-leave', afterLeaveCallback);
  } else {
    instance.$on('after-leave', afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
};
