<template>
  <div style="padding: 30px;">
    <a :href="tw_href" @click="twitterShare">twitter分享</a>
    <p @click="facebookShare">faceBook分享</p>
    <p @click="shareWa" class="xq-whatsapp" data-action="share/whatsapp/share">whatsapp分享</p>
    <p @click="shareWa">分享4</p>
    <p>分享5</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // twitter
        href_com: 'https://bdx.ysxapp.com/#/login?invite_code=' + 'N98654',// twitter分享链接
        text_com: '测试内容: ' + 'N98654',// twitter分享标题
        tw_href: '',
        // facebook
        href_com1: 'https://bdx.ysxapp.com/#/login?invite_code=' + 'N98654',
        text_com1: 'Welcome to the Big Dipper multilingual pc website -> My invitation code: ' + 'N98654',
      }
    },
    methods: {
      /* twitter分享 */
      twitterShare() {
        // twitter 分享链接
        this.tw_href = `javascript:window.open('https://twitter.com/share?text=` + this.text_com + `&url=` + this.href_com + `','_blank');void(0)`
      },
      /* facebook分享 */
      facebookShare() {
        let u = document.getElementsByClassName("share_url")[0].content;
        let t = document.getElementsByClassName("share_title")[0].content;
        window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(u) + "&t=" + encodeURIComponent(t), "sharer");
      },
      /* whatsapp分享 */
      shareWa(str) {
        // content是我们自己定义的一些需要分享的内容;
        let u = document.getElementsByClassName("share_url")[0].content;
        let t = document.getElementsByClassName("share_title")[0].content;
        window.open("http://web.whatsapp.com/send?text=" + encodeURIComponent(t) + encodeURIComponent("nn" + u) + "&via=lopscoop");
      },
    },
  }
</script>

<style scoped>

</style>
