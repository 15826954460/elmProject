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
          <img src="../../../../../static/icon/icon-phone.png" alt="">
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
<style scoped>
  @import 'info.css';
</style>
