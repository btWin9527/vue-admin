<template>
  <div style="padding: 30px;">
    <p @click="twitterShare">twitter分享</p>
    <p @click="facebookShare">faceBook分享</p>
    <p>分享3</p>
    <p>分享4</p>
    <p>分享5</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // twitter
        href_com: 'https://bdx.ysxapp.com/#/login?invite_code=' + 'N98654',// twitter分享链接
        text_com: 'Welcome to the Big Dipper multilingual pc website -> My invitation code: ' + 'N98654',// twitter分享标题
        // facebook
        href_com1: 'https://bdx.ysxapp.com/#/login?invite_code=' + 'N98654',
        text_com1: 'Welcome to the Big Dipper multilingual pc website -> My invitation code: ' + 'N98654',
      }
    },
    methods: {

      twitterShare() {
        // twitter 分享链接
        this.tw_href = `javascript:window.open('https://twitter.com/share?text=` + this.text_com + `&url=` + this.href_com + `','_blank');void(0)`
      },
      facebookShare() {
        let _this = this
        FB.ui({
          method: 'share',
          href: _this.href_com1,
          quote: this.text_com1
        }, function (response) {
          // console.log('response', response)
        });
      },
    },
  }
</script>

<style scoped>

</style>
