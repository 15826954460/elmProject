<template>
  <div class="info-wrapper">

    <vheader message='账户信息' back='true'>
      <span class="fa fa-angle-left" slot="angle" @click="showUser()"></span>
    </vheader>

    <div class="user-info-wrapper">
      <section class="comment file" @click="loadingImg()">
        <span class="flex-content">头像</span>
        <div class="flex-img">
          <span class="fa fa-user-circle-o"></span>
        </div>
        <span class="fa fa-angle-right"></span>
        <input type="file" name="file" id="file" @change="loadingImg()"/>
      </section>
      <router-link to="/user/username" class="comment self-height" tag="section">
        <span class="flex-content">用户姓名</span>
        <span class="flex-img"></span>
        <span class="fa fa-angle-right flex-angle"></span>
      </router-link>
      <router-link to='/user/edit' class="comment self-height" tag="section">
        <span class="flex-content">收货地址</span>
        <span class="flex-img"></span>
        <span class="fa fa-angle-right flex-angle"></span>
      </router-link>
      <h5>账号绑定</h5>
      <section class="comment self-height phone">
        <div class="icon-phone">
          <img :src="phone_icon">
        </div>
        <span class="phone-content" @click="phone()">手机</span>
        <span class="fa fa-angle-right flex-angle"></span>
      </section>
      <h5>安全设置</h5>
      <router-link to="/user/reset" tag='section' class="comment self-height phone secret">
        <span class="loging-secret">登陆密码</span>
        <span class="refactor">修改</span>
        <span class="fa fa-angle-right flex-angle"></span>
      </router-link>
      <p class="out-loging" @click="logoutwarning = true">退出登录</p>
    </div>

    <transition name="warning-box" mode="out-in">
      <div class="alert" v-show="isShowAlert">
        <div class="warning"><span class="fa fa-warning"></span></div>
        <p class="text" v-show="faileShow">上传失败</p>
        <p class="text" v-show="isShowWarning">请在手机APP中设置</p>
        <button class="sure" @click="sure()">确认</button>
      </div>
    </transition>

    <transition mode="out-in" name="log-out-wrapper">
      <div class="log-out-wrapper" v-show="logoutwarning">
        <div class="warning"><span class="fa fa-warning"></span></div>
        <p class="text">是否退出登录</p>
        <div class="change-box"><span class="waiting" @click="logoutwarning = false">再等等</span><span class="out" @click="sureLogeOut">退出登录</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        phone_icon: require('../../../../../static/icon/icon-phone.png'),
        isShowAlert: false,  // 弹出框
        isShowWarning: false, // 失败
        faileShow: false,  // app中设置
        logoutwarning: false
      }
    },
    methods: {
      showUser () {  // 调回到user页面
        window.localStorage.setItem('state', true)
        this.$root.isShowUser = true
        this.$router.push({path: '/user'})
      },
      loadingImg () {  // 加载图片
        let file = document.getElementById('file').files[0]
        if (file) {
//          let reader = new FileReader()  // new 一个FileReader
//          reader.onload = function (e) {
//            let txt = event.target.result
//            console.log(txt)
//          }
//          reader.readAsDataURL(file)
          this.isShowAlert = true
          this.isShowWarning = false
          this.faileShow = true
        }
      },
      phone () { // 显示app设置
        this.isShowAlert = true
        this.isShowWarning = true
        this.faileShow = false
      },
      sure () {  // 关闭弹框
        this.isShowAlert = false
      },
      sureLogeOut () {
        this.$store.commit('setOrderList', [])
        this.$store.commit('setUserInfomation', false)
        this.$router.push({path: '/user'})
        this.$root.isShowUser = true
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .info-wrapper {
    .box;
    .user-info-wrapper {
      .comment {
        .flex;
        .pl(.3rem);
        .pr(.3rem);
        font-size: .28rem;
        height: 1.6rem;
        line-height: 1.4rem;
        background: @default;
        border-top: 1px solid @ddd;
        .rel;
        .flex-content {
          width: 70%;
        }
        .flex-img {
          flex: 1;
          .rel;
          .fa-user-circle-o {
            font-size: 1.2rem;
            color: @ddd;
            .abs;
            top: 50%;
            left: 50%;
            .trsl();
          }
        }
        .fa-angle-right {
          font-size: .6rem;
          .abs;
          .vc;
          right: .2rem;
          color: @ddd;
        }
      }
      .file {
        .rel;
        #file {
          .abs;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .self-height {
        height: .8rem;
        line-height: .8rem;
      }
      > h5 {
        line-height: .8rem;
        font-weight: normal;
        font-size: .28rem;
        .pl(.3rem);
        border-top: 1px solid @ddd;
      }
      .phone {
        .icon-phone {
          width: 6%;
          .mr(.2rem);
          > img {
            width: 100%;
          }
        }
        .phone-content {
          flex: 1;
        }
      }
      .secret {
        border-bottom: 1px solid @ddd;
        .loging-secret {
          width: 20%;
        }
        .refactor {
          width: 75%;
          .tr;
        }
      }
      .out-loging {
        border: none;
        background: @outloging;
        .b-r(5px);
        color: @default;
        width: 95%;
        line-height: .6rem;
        font-size: .28rem;
        margin: 0 auto;
        .tc;
        .mt(.6rem);
      }
    }
    .alert, .warning-phone-info, .log-out-wrapper {
      width: 80%;
      .abs;
      top: 50%;
      left: 50%;
      z-index: 5;
      background: @default;
      .b-r(10px);
      .trsl();
      font-size: .32rem;
      .warning {
        .tc;
        .pt(.4rem);
        .fa-warning {
          font-size: 1.2rem;
          color: #F8CB86;
        }
      }
      .text {
        .tc;
        line-height: .8rem;
      }
      .sure {
        border: none;
        background: #4CD964;
        font-size: .36rem;
        color: @default;
        width: 100%;
        line-height: .6rem;
        .fw;
        border-radius: 0 0 10px 10px;
      }
    }
    .log-out-wrapper {
      .change-box {
        .flex;
        .pl(.6rem);
        .pr(.6rem);
        .pb(.4rem);
        > span {
          flex: 1;
          .tc;
          color: @default;
          padding: .1rem .2rem;
          .b-r(5px);
        }
        .waiting {
          background: @ddd;
          .mr(.4rem);
        }
        .out {
          background: @outloging;
        }
      }
    }
  }

  .warning-box-enter-active {
    animation: warning-box-in .3s linear
  }

  .warning-box-leave-active {
    animation: warning-box-out .3s linear
  }

  @keyframes warning-box-in {
    0% {
      transform: translate(-50%, -200%)
    }
    100% {
      transform: translate(-50%, -50%)
    }
  }

  @keyframes warning-box-out {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.1);
      opacity: 0;
    }
  }

  .log-out-wrapper-enter-active {
    animation: log-out-wrapper-in linear .3s;
  }

  @keyframes log-out-wrapper-in {
    0% {
      transform: translate(-50%, -60%) scale(0.5)
    }
    50% {
      transform: translate(-50%, -40%) scale(1.2)
    }
    100% {
      transform: translate(-50%, -50%) scale(1)
    }
  }
</style>
