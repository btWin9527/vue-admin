const dbClick = {
  inserted(el) {
    el.addEventListener('click', () => {
      el.classList.add('is-disabled');
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove('is-disabled');
      }, 1000);
    });
  }
}

const install = function (Vue) {
  Vue.directive('dbClick', dbClick);
}
if (window.Vue) {
  window['dbClick'] = install;
  Vue.use(install);
}

dbClick.installed = install

export default dbClick
