<template>
  <div class='downLoad-wrapper'>

    <vheader message='下载'>
      <span @click="$router.go(-1)" class='fa fa-angle-left' slot='angle'></span>
    </vheader>

    <div class='downLoad-content-wrapper'>
      <div class='img-wrapper'><img :src='ele_logo'></div>
      <p class='down-text'>下载饿了么App</p>
      <button class='download-btn' @click='download'>下载</button>
    </div>

    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>

  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  import alertBounced from '../../components/bounced/bounced.vue'
  export default {
    data () {
      return {
        ele_logo: require('../../../static/logo/elmlogo.jpeg'),
        system: null,
        alertText: '', // 弹框内容
        showAlert: false // 弹框
      }
    },
    components: {
      vheader,
      alertBounced
    },
    created () {
      // 判断系统
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
        this.system = 'Android'
      } else if (isIOS) {
        this.system = 'IOS'
      } else {
        this.system = 'pc'
      }
    },
    methods: {
      download () {
        // 如果是ios用户则提示，否则直接下载
        if (this.system === 'IOS') {
          this.showAlert = true  // 显示弹框
          this.alertText = 'IOS用户请前往AppStore下载'
        } else {
          try {
            let elemIF = document.createElement('iframe')
            elemIF.src = 'http://static10.elemecdn.com/uploads/androidapp/eleme6_4_1476672934695.apk'
            elemIF.style.display = 'none'
            document.body.appendChild(elemIF)
          } catch (e) {
            alert('下载失败')
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/headerComment.less';
  .downLoad-wrapper {
    .box;
    .rel;
    min-height: 100vh;
    .downLoad-content-wrapper {
      padding: .4rem .4rem;
      font-size:0;
      .rel;
      .img-wrapper {
        .tc;
        img {
          .b-r(15px);
          width: 2.6rem;
        }
      }
      .down-text {
        font-size: .4rem;
        .tc;
        line-height: .8rem;
      }
      .download-btn {
        width: 100%;
        background: @button;
        border: none;
        color: @default;
        line-height: .5rem;
        font-size: .36rem;
        .b-r(5px);
        outline:none;
      }
    }
  }
</style>
